import { addDays, isAfter, isBefore, isLeapYear, isSaturday, isSunday } from "../date";
import type { Mass } from "../domain";
import type { MassIndex } from "../observanceManager";
import { parseLocalDate, shiftLocalDate, yyyyMMDD } from "../utils";
import type { Calendar } from "../calendar";
import { legacyToPrecedence, PRECEDENCE } from "./precedence";
import type { Rubrics } from "./rubrics";
import type { ConcurrencyRule, RuleResolution, ShiftInstruction } from "./types";

/**
 * Concurrency rules for solving conflicts between observances on the same date.
 *
 * The '62 edition's rule list mirrors missalemeum's 1962 engine
 * (backend/api/kalendar/rules.py in that project); pre-55 diverges where
 * rubrics differ. Mapping against missalemeum:
 *
 * | missalemeum rule                                | ours                                   |
 * |-------------------------------------------------|----------------------------------------|
 * | rule_nativity_vigil                             | NativityVigilRule                      |
 * | rule_nativity_has_multiple_masses               | NativityMultipleMassesRule             |
 * | rule_all_souls                                  | AllSoulsRule                           |
 * | rule_st_matthias / rule_feb27                   | StMatthiasRule / Feb27Rule             |
 * | rule_seven_sorrows_on_friday_after_passion      | SevenSorrowsRule                       |
 * | rule_same_class_..._advent_feria_and_ember_days | AdventEmberDayRule                     |
 * | rule_shift_conflicting_1st_class_feasts         | FirstClassConflictRule                 |
 * | rule_bmv_office_on_saturday                     | BmvSaturdayRule                        |
 * | rule_2nd_class_sunday                           | SundayPrecedenceRule (rubrics knob)    |
 * | second_class_feast_no_sunday_commemoration      | SundayPrecedenceRule take-over list    |
 * | rule_general                                    | GeneralRankRule                        |
 * | Annunciation out of Holy Week/Easter octave     | AnnunciationTransferredRule            |
 * | vigil shifting when feasts move                 | VigilManager                           |
 *
 * Verified covered by existing machinery (no dedicated rule needed):
 * rule_lord_feast1/2 and rule_first_class_feast_with_sunday_commemoration -
 * an I-class feast on a II-class Sunday already celebrates the feast and
 * commemorates the Sunday (removeDuplicates sorts rank before precedence:
 * Michael 2030-09-29, Peter&Paul 2031-06-29), while equal-grade collisions
 * fall to SundayPrecedenceRule under '62 and general ordering pre-55
 * (St Anne 2026-07-26 diverges between editions as expected). Takeover
 * feasts (Cross, Basilica) suppress the Sunday entirely via the rubrics
 * list (2031-09-14, 2031-11-09).
 *
 * Remaining gaps vs missalemeum: rule_st_lawrence_vigil (needs an Aug 9th
 * vigil observance), rule_lent_commemoration, and the 3rd/4th class local
 * commemoration rules (partially covered by GeneralRankRule + feria
 * fallback).
 */

/** Effective DO-scale precedence of a day mass (static entries fall back
 * to the coarse-rank mapping). */
export function effectivePrecedence(mass: Mass): number {
  return mass.precedence ?? legacyToPrecedence(mass.rank);
}

function isFirstClass(mass: Mass): boolean {
  return effectivePrecedence(mass) >= PRECEDENCE.DUPLEX_I_CLASSIS;
}

function isSecondClass(mass: Mass): boolean {
  const p = effectivePrecedence(mass);
  return p >= PRECEDENCE.DUPLEX_II_CLASSIS && p < PRECEDENCE.DUPLEX_I_CLASSIS;
}

/**
 * Centralized logic for handling Vigil shifting.
 */
export class VigilManager {
  getVigilShift(
    oldFeastDate: string,
    newFeastDate: string,
    calendar: Calendar,
  ): ShiftInstruction | undefined {
    // 1. Look for the Vigil on the day before the OLD feast date
    const prevDateStr = shiftLocalDate(oldFeastDate, -1);
    const prevDay = calendar.get(prevDateStr);

    if (!prevDay) return undefined;

    // Find the Vigil mass
    const vigilMass = prevDay.mass.find((mass) => mass.name.startsWith("Vigília"));

    if (!vigilMass) return undefined;

    // 2. Vigil moves to the day before the NEW feast date
    const targetVigilDate = shiftLocalDate(newFeastDate, -1);
    return {
      date: targetVigilDate,
      observances: [vigilMass],
      sourceDate: prevDateStr, // Source is the day before the old feast date
    };
  }
}
const vigilManager = new VigilManager();

/**
 * Abstract base class that implements the generic logic for handling "survivors"-
 * masses that were present but were not involved in the shift or conflict.
 * Concrete rules only need to implement 'getResolution'.
 */
abstract class BaseConcurrencyRule implements ConcurrencyRule {
  // Abstract methods the rule must implement
  abstract applies(observances: Mass[], date: string, calendar: Calendar): boolean;
  protected abstract getResolution(
    observances: Mass[],
    date: string,
    calendar: Calendar,
  ): RuleResolution;

  resolve(observances: Mass[], date: string, calendar: Calendar): RuleResolution {
    const resolution = this.getResolution(observances, date, calendar);

    // If no shift is generated, return the original list as the 'stay' list.
    if (resolution.shifts.length === 0) {
      return {
        stay: resolution.stay.length ? resolution.stay : observances,
        shifts: [],
      };
    }

    // 1. Identify ALL masses being shifted (the losers)
    const shiftedIds = new Set(resolution.shifts.flatMap((s) => s.observances.map((o) => o.id)));

    // 2. Filter out masses that were on the day but are now being shifted out (the survivors).
    const survivors = observances.filter((obs) => !shiftedIds.has(obs.id));

    // 3. Combine rule winners (resolution.stay) with the masses that were untouched (survivors).
    const finalStay = this.removeDuplicates([...resolution.stay, ...survivors]);

    return { stay: finalStay, shifts: resolution.shifts };
  }

  protected removeDuplicates(masses: Mass[]): Mass[] {
    const seen = new Set<string>();
    return masses.filter((mass) => {
      if (seen.has(mass.id)) return false;
      seen.add(mass.id);
      return true;
    });
  }
}

/**
 * NativityMultipleMassesRule
 */
class NativityMultipleMassesRule implements ConcurrencyRule {
  private nativityMasses: Mass[];

  constructor(private masses: MassIndex) {
    this.nativityMasses = masses
      .getSanctiClass1()
      .filter((mass) => mass.month === 12 && mass.day === 25);
  }

  applies(observances: Mass[]): boolean {
    return Boolean(this.masses.match(observances, this.nativityMasses));
  }

  resolve(): RuleResolution {
    return { stay: this.nativityMasses, shifts: [] };
  }
}

/**
 * SevenSorrowsRule
 */
class SevenSorrowsRule implements ConcurrencyRule {
  private sevenSorrowsTempora: Mass | undefined;
  private sevenSorrowsSancti: Mass | undefined;

  constructor(private masses: MassIndex) {
    this.sevenSorrowsTempora = masses.getById("TEMPORA_QUAD5_5");
    this.sevenSorrowsSancti = masses.getById("SANCTI_09_15");
  }

  applies(observances: Mass[]): boolean {
    return Boolean(this.masses.match(observances, this.sevenSorrowsTempora));
  }

  resolve(observances: Mass[]): RuleResolution {
    if (!this.sevenSorrowsSancti) return { stay: observances, shifts: [] };
    const sancti = this.masses.match(observances, this.masses.getSancti());

    if (sancti) {
      return { stay: [this.sevenSorrowsSancti, sancti], shifts: [] };
    }

    return { stay: [this.sevenSorrowsSancti], shifts: [] };
  }
}

/**
 * AllSoulsRule
 */
class AllSoulsRule extends BaseConcurrencyRule {
  private allSoulsMass: Mass | undefined;

  constructor(private masses: MassIndex) {
    super();
    this.allSoulsMass = masses.getById("SANCTI_11_02");
  }

  applies(observances: Mass[]): boolean {
    return Boolean(this.masses.match(observances, this.allSoulsMass));
  }

  protected getResolution(observances: Mass[], date: string): RuleResolution {
    const allSouls = observances.filter((ld) => ld.id.startsWith("SANCTI_11_02")).reverse();

    if (isSunday(parseLocalDate(date))) {
      const sunday = this.masses.match(observances, this.masses.getTemporaSunday());

      if (sunday) {
        return {
          stay: [sunday!],
          shifts: [
            {
              date: shiftLocalDate(date, 1),
              observances: allSouls,
            },
          ],
        };
      }
    }
    return { stay: allSouls, shifts: [] };
  }
}

/**
 * NativityVigilRule
 */
class NativityVigilRule implements ConcurrencyRule {
  private nativityVigilMass: Mass | undefined;

  constructor(private masses: MassIndex) {
    this.nativityVigilMass = masses.getById("SANCTI_12_24");
  }

  applies(observances: Mass[], date: string): boolean {
    const nativityVigil = this.masses.match(observances, this.nativityVigilMass);
    return Boolean(nativityVigil && isSunday(parseLocalDate(date)));
  }

  resolve(observances: Mass[]): RuleResolution {
    const nativityVigil = this.masses.match(observances, this.nativityVigilMass);
    if (!nativityVigil) return { stay: observances, shifts: [] };
    return { stay: [nativityVigil], shifts: [] };
  }
}

/**
 * NativityOctaveFeriaRule
 */
class NativityOctaveFeriaRule implements ConcurrencyRule {
  private nativityOctaveMass: Mass | undefined;

  constructor(private masses: MassIndex) {
    this.nativityOctaveMass = masses.getById("SANCTI_01_01");
  }

  applies(observances: Mass[], date: string): boolean {
    const nativity = this.masses.match(observances, this.nativityOctaveMass);
    return Boolean(nativity && isSunday(parseLocalDate(date)));
  }

  resolve(observances: Mass[]): RuleResolution {
    const nativity = this.masses.match(observances, this.nativityOctaveMass);
    if (!nativity) return { stay: observances, shifts: [] };
    return { stay: [nativity], shifts: [] };
  }
}

/**
 * StMatthiasRule
 */
class StMatthiasRule extends BaseConcurrencyRule {
  private stMatthias: Mass | undefined;

  constructor(private masses: MassIndex) {
    super();
    this.stMatthias = masses.getById("SANCTI_02_24");
  }

  applies(observances: Mass[], date: string): boolean {
    const parsed = parseLocalDate(date);
    return Boolean(
      this.masses.match(observances, this.stMatthias) &&
      isLeapYear(parsed) &&
      parsed.getDate() === 24,
    );
  }

  protected getResolution(observances: Mass[], date: string): RuleResolution {
    const temp = this.masses.match(observances, this.masses.getTempora());
    const stMatthias = this.stMatthias;
    if (!stMatthias) return { stay: observances, shifts: [] };

    if (temp) {
      // A transferred feast never lands on a Sunday - cascade past it.
      const candidate = shiftLocalDate(date, 1);
      const target = isSunday(parseLocalDate(candidate)) ? shiftLocalDate(date, 2) : candidate;
      return {
        stay: [temp],
        shifts: [
          {
            observances: [stMatthias],
            date: target,
          },
        ],
      };
    }
    return { stay: observances, shifts: [] };
  }
}

/**
 * Feb27Rule
 */
class Feb27Rule extends BaseConcurrencyRule {
  private feb27Mass: Mass | undefined;

  constructor(private masses: MassIndex) {
    super();
    this.feb27Mass = masses.getById("SANCTI_02_27");
  }

  applies(observances: Mass[], date: string): boolean {
    const parsed = parseLocalDate(date);
    return Boolean(
      this.masses.match(observances, this.feb27Mass) &&
      parsed.getDate() === 27 &&
      isLeapYear(parsed),
    );
  }

  protected getResolution(observances: Mass[], date: string): RuleResolution {
    const mass = this.feb27Mass;
    if (!mass) return { stay: observances, shifts: [] };
    const shiftedDate = shiftLocalDate(date, 1);
    return {
      stay: [],
      shifts: [
        {
          observances: [mass],
          date: shiftedDate,
        },
      ],
    };
  }
}

/**
 * BmvSaturdayRule
 */
class BmvSaturdayRule implements ConcurrencyRule {
  private holyWeekWednesdayDate: string | null | undefined;

  constructor(private masses: MassIndex) {}

  applies(observances: Mass[], date: string): boolean {
    if (!isSaturday(parseLocalDate(date))) return false;

    // Fires only when everything on the day is simplex-tier.
    const maxPrec = Math.max(...observances.map((i) => effectivePrecedence(i)), PRECEDENCE.SIMPLEX);
    return maxPrec <= PRECEDENCE.SIMPLEX;
  }

  resolve(observances: Mass[], date: string, calendar: Calendar): RuleResolution {
    const bmvOffice = this.calculateProperForPeriod(observances, date, calendar);

    if (bmvOffice) {
      return {
        stay: [
          this.masses.createMassWithDate(bmvOffice, date),
          ...observances.filter((i) => i.flexibility === "santos"),
        ],
        shifts: [],
      };
    }

    return { stay: observances, shifts: [] };
  }

  private calculateProperForPeriod(
    observances: Mass[],
    date: string,
    calendar: Calendar,
  ): Mass | undefined {
    const parsed = parseLocalDate(date);
    const tempora = observances.filter((i) => i.flexibility === "tempora");

    if (tempora && this.masses.match(tempora, this.masses.getByTypeId("advent"))) {
      return this.masses.getById("COMMUNE_C_10A");
    }

    if (
      isAfter(parsed, new Date(parsed.getFullYear(), 11, 25)) ||
      isBefore(parsed, new Date(parsed.getFullYear(), 1, 2))
    ) {
      return this.masses.getById("COMMUNE_C_10B");
    }

    const wednesdayInHolyWeek = this.getHolyWeekWednesdayDate(calendar);

    if (
      isAfter(parsed, new Date(parsed.getFullYear(), 1, 2)) &&
      wednesdayInHolyWeek &&
      isBefore(parsed, parseLocalDate(wednesdayInHolyWeek))
    ) {
      return this.masses.getById("COMMUNE_C_10C");
    }

    if (tempora && this.masses.match(tempora, this.masses.getEaster())) {
      return this.masses.getById("COMMUNE_C_10PASC");
    }

    return this.masses.getById("COMMUNE_C_10T");
  }

  private getHolyWeekWednesdayDate(calendar: Calendar): string | null {
    if (this.holyWeekWednesdayDate !== undefined) {
      return this.holyWeekWednesdayDate;
    }

    this.holyWeekWednesdayDate =
      calendar.findDay(this.masses.getById("TEMPORA_QUAD6_3")?.id)?.[0] || null;

    return this.holyWeekWednesdayDate;
  }
}

/**
 * AdventEmberDayRule
 */
class AdventEmberDayRule implements ConcurrencyRule {
  private adventAndEmberDays: Mass[];

  constructor(private masses: MassIndex) {
    this.adventAndEmberDays = masses.getEmberDays().concat(masses.getAdvent());
  }

  applies(observances: Mass[], date: string): boolean {
    const advOrEmber = this.masses.match(observances, this.adventAndEmberDays);
    return Boolean(!isSunday(parseLocalDate(date)) && advOrEmber);
  }

  resolve(observances: Mass[]): RuleResolution {
    const advOrEmber = this.masses.match(observances, this.adventAndEmberDays);
    const sancti = this.masses.match(observances, this.masses.getSancti());

    if (!sancti) {
      return { stay: [advOrEmber!], shifts: [] };
    }

    // Everyone else on the day is commemorated under the winners, never
    // dropped - a missal lists the whole stack.
    const rest = observances.filter((o) => o.id !== advOrEmber!.id && o.id !== sancti.id);
    const s = sancti as Mass;
    if (effectivePrecedence(advOrEmber!) === effectivePrecedence(s)) {
      return { stay: [s, advOrEmber!, ...rest], shifts: [] };
    }

    if (effectivePrecedence(advOrEmber!) < effectivePrecedence(s)) {
      return { stay: [advOrEmber!, s, ...rest], shifts: [] };
    }

    return { stay: observances, shifts: [] };
  }
}

/**
 * FirstClassConflictRule
 */
class FirstClassConflictRule extends BaseConcurrencyRule {
  constructor(private masses: MassIndex) {
    super();
  }

  applies(observances: Mass[], date: string): boolean {
    if (observances.length < 2) {
      return false;
    }

    let firstClassCount = 0;
    for (const observance of observances) {
      if (isFirstClass(observance)) {
        firstClassCount += 1;
        if (firstClassCount > 1) {
          break;
        }
      }
    }

    if (firstClassCount < 2) {
      return false;
    }

    const parsed = parseLocalDate(date);
    const sancti = this.masses.match(observances, this.masses.getSancti());
    const tempora = this.masses.match(observances, this.masses.getTempora());

    if (
      sancti &&
      tempora &&
      parsed.getDate() === 8 &&
      parsed.getMonth() === 11 &&
      isSunday(parsed)
    ) {
      return false;
    }

    return true;
  }

  protected getResolution(observances: Mass[], date: string, calendar: Calendar): RuleResolution {
    const firstClassFeasts = observances.filter(isFirstClass);
    if (firstClassFeasts.length < 2) return { stay: firstClassFeasts, shifts: [] };
    const [celebration, shiftDay] = firstClassFeasts as [Mass, Mass];
    const targetDate = this.findNextAvailableDate(date, calendar);

    const shifts: ShiftInstruction[] = [{ observances: [shiftDay], date: targetDate }];

    const vigilShift = vigilManager.getVigilShift(date, targetDate, calendar);
    if (vigilShift) {
      shifts.push(vigilShift);
    }

    return {
      stay: [celebration],
      shifts: shifts,
    };
  }

  private findNextAvailableDate(date: string, calendar: Calendar): string {
    let targetDate = parseLocalDate(date);
    const startYear = targetDate.getFullYear();
    while (targetDate.getFullYear() === startYear) {
      targetDate = addDays(targetDate, 1);
      const targetDateStr = yyyyMMDD(targetDate);
      const targetDay = calendar.get(targetDateStr);

      const isConflicting = targetDay?.all.some((obs) => isFirstClass(obs) || isSecondClass(obs));

      if (!isConflicting) {
        return targetDateStr;
      }
    }
    return yyyyMMDD(targetDate);
  }
}

/**
 * SecondClassConflictRule
 */
class SecondClassConflictRule extends BaseConcurrencyRule {
  constructor(private masses: MassIndex) {
    super();
  }

  applies(observances: Mass[]): boolean {
    if (observances.length < 2) {
      return false;
    }

    let firstClass: Mass | undefined;
    for (const observance of observances) {
      if (isFirstClass(observance)) {
        firstClass = observance;
        break;
      }
    }

    // A privileged Sunday (Advent/Lent-Quadragesima, 6.9) reduces a
    // colliding feast to a commemoration (DO occurrence()); other
    // I-class offices cause transfer.
    if (!firstClass) return false;
    if (
      firstClass.flexibility === "tempora" &&
      firstClass.weekday === 0 &&
      effectivePrecedence(firstClass) >= PRECEDENCE.DUPLEX_I_CLASSIS + 0.4
    ) {
      return false;
    }

    const secondClassFeasts = this.masses.match(observances, this.masses.getSanctiClass2());

    return Boolean(secondClassFeasts && isSecondClass(secondClassFeasts));
  }

  protected getResolution(observances: Mass[], date: string, calendar: Calendar): RuleResolution {
    const firstClassFeasts = observances.filter(isFirstClass);
    const secondClassFeasts = this.masses.match(observances, this.masses.getSanctiClass2());
    if (!secondClassFeasts) return { stay: observances, shifts: [] };
    const targetDate = this.findNextAvailableDate(date, calendar);

    const shifts: ShiftInstruction[] = [{ observances: [secondClassFeasts], date: targetDate }];

    const vigilShift = vigilManager.getVigilShift(date, targetDate, calendar);
    if (vigilShift) {
      shifts.push(vigilShift);
    }

    return {
      stay: firstClassFeasts,
      shifts: shifts,
    };
  }

  private findNextAvailableDate(date: string, calendar: Calendar): string {
    let targetDate = parseLocalDate(date);
    const startYear = targetDate.getFullYear();
    while (targetDate.getFullYear() === startYear) {
      targetDate = addDays(targetDate, 1);
      const targetDateStr = yyyyMMDD(targetDate);
      const targetDay = calendar.get(targetDateStr);

      const isConflicting = targetDay?.all.some(isFirstClass);

      if (!isConflicting) {
        return targetDateStr;
      }
    }
    return yyyyMMDD(targetDate);
  }
}

/**
 * GeneralRankRule
 */
class GeneralRankRule implements ConcurrencyRule {
  applies(observances: Mass[]): boolean {
    return observances.length >= 1;
  }

  resolve(observances: Mass[]): RuleResolution {
    if (observances.length === 1) {
      return { stay: observances, shifts: [] };
    }

    const sorted = [...observances].sort(
      (a, b) =>
        effectivePrecedence(a) - effectivePrecedence(b) ||
        a.flexibility.localeCompare(b.flexibility),
    );
    return { stay: sorted, shifts: [] };
  }
}

/**
 * AnnunciationTransferredFromHolyWeekAndEasterOctaveRule
 *
 * Ported from divinum-officium's Tabulae/Transfer tables: when the
 * Annunciation (03-25) falls between Palm Sunday and the Easter octave
 * (inclusive), both pre-55 and Rubrics 1960 transfer it to the Monday
 * after Low Sunday (Easter + 9). Verified against DO rows:
 *   322.txt 03-30=03-25, 323.txt 03-31=03-25,
 *   331.txt 04-08=03-25, 401.txt 04-09=03-25
 */
class AnnunciationTransferredRule extends BaseConcurrencyRule {
  private annunciation: Mass | undefined;

  constructor(private masses: MassIndex) {
    super();
    this.annunciation = masses.getById("SANCTI_03_25");
  }

  applies(observances: Mass[], date: string, calendar: Calendar): boolean {
    const annunciation = this.masses.match(observances, this.annunciation);
    if (!annunciation) return false;

    // Only fire on the feast's original fixed date (03-25), never on the
    // day it was transferred TO.
    const parsed = parseLocalDate(date);
    if (parsed.getMonth() !== 2 || parsed.getDate() !== 25) return false;

    const palmSunday = this.findPalmSunday(calendar);
    return Boolean(
      palmSunday && !isBefore(parsed, palmSunday) && !isAfter(parsed, addDays(palmSunday, 7)),
    );
  }

  protected getResolution(observances: Mass[], date: string, calendar: Calendar): RuleResolution {
    const annunciation = this.masses.match(observances, this.annunciation);
    if (!annunciation) return { stay: observances, shifts: [] };

    const palmSunday = this.findPalmSunday(calendar);
    if (!palmSunday) return { stay: observances, shifts: [] };

    // Easter + 9 = Monday after Low Sunday.
    const targetDate = yyyyMMDD(addDays(palmSunday, 16));

    return {
      stay: [],
      shifts: [{ observances: [annunciation], date: targetDate }],
    };
  }

  private palmSundayCache: string | null | undefined;

  private findPalmSunday(calendar: Calendar): Date | undefined {
    if (this.palmSundayCache !== undefined) {
      return this.palmSundayCache ? parseLocalDate(this.palmSundayCache) : undefined;
    }

    const entry = calendar.findDay(this.masses.getById("TEMPORA_QUAD6_0")?.id)?.[0] ?? null;
    this.palmSundayCache = entry;

    return entry ? parseLocalDate(entry) : undefined;
  }
}

/**
 * VigilSundayOmissionRule
 *
 * Pio-Benedictine and Rubrics 1960 rubrics agree: a vigil that falls on
 * a Sunday is wholly omitted - neither celebrated nor commemorated
 * (unlike feasts, which are commemorated under the Sunday). Only the
 * Vigil of the Nativity escapes, displacing the 4th Advent Sunday via
 * NativityVigilRule.
 */
class VigilSundayOmissionRule implements ConcurrencyRule {
  private static isVigil(mass: Mass): boolean {
    return mass.flexibility === "santos" && mass.name.startsWith("Vigília");
  }

  applies(observances: Mass[], date: string): boolean {
    if (!isSunday(parseLocalDate(date))) return false;
    return observances.some((m) => VigilSundayOmissionRule.isVigil(m));
  }

  resolve(observances: Mass[]): RuleResolution {
    return {
      stay: observances.filter((m) => !VigilSundayOmissionRule.isVigil(m)),
      shifts: [],
    };
  }
}

/**
 * SundayPrecedenceRule
 *
 * Edition-configured via Rubrics (typed knobs, DO-sourced values):
 *
 * - rubrics.sundays.commemoratesFeastsUnder (true under Rubrics 1960,
 *   cf. missalemeum rule_2nd_class_sunday): a Sunday colliding with a
 *   sanctoral feast keeps precedence; the feast is commemorated under it
 *   (kept in day.mass, ordered after the Sunday - never displaced).
 * - rubrics.sundays.feastsTakingOverCompletely (cf. missalemeum
 *   second_class_feast_no_sunday_commemoration): listed feasts take over
 *   a Sunday entirely.
 *
 * Not installed when commemoratesFeastsUnder is false (pre-55), where
 * semidouble Sundays are superseded by duplex feasts through the general
 * rank ordering instead.
 */
class SundayPrecedenceRule implements ConcurrencyRule {
  constructor(
    private masses: MassIndex,
    private rubrics: Rubrics,
  ) {}

  private findFeastTakingOverSunday(observances: Mass[]): Mass | undefined {
    return this.masses.match(
      observances,
      this.rubrics.sundays.feastsTakingOverCompletely.map((id) => this.masses.getById(id)),
    );
  }

  applies(observances: Mass[], date: string): boolean {
    if (!this.rubrics.sundays.commemoratesFeastsUnder) return false;
    if (!isSunday(parseLocalDate(date))) return false;
    if (!observances.some((m) => m.flexibility === "santos")) return false;
    return Boolean(this.masses.match(observances, this.masses.getTemporaSunday()));
  }

  resolve(observances: Mass[]): RuleResolution {
    const sunday = this.masses.match(observances, this.masses.getTemporaSunday());
    if (!sunday) return { stay: observances, shifts: [] };

    const feast = this.findFeastTakingOverSunday(observances);
    if (feast) return { stay: [feast], shifts: [] };

    // Sunday leads; colliding feasts are commemorated under it.
    const rest = observances.filter((m) => m.id !== sunday.id);
    return { stay: rest.length ? [sunday, ...rest] : [sunday], shifts: [] };
  }
}

/**
 * Single rule-composition point for every edition. The ordered list is
 * identical across editions; edition behavior emerges from the typed
 * Rubrics config and from rules that no-op under a given configuration.
 *
 * Composition per edition is pinned by lib/tests/calendars/composition.test.ts -
 * changing this function's output requires updating that test deliberately.
 */
export function buildRules(masses: MassIndex, rubrics: Rubrics): ConcurrencyRule[] {
  const rules: ConcurrencyRule[] = [
    new NativityMultipleMassesRule(masses),
    new AllSoulsRule(masses),
    new NativityVigilRule(masses),
    new NativityOctaveFeriaRule(masses),
    new StMatthiasRule(masses),
    new Feb27Rule(masses),
    new SevenSorrowsRule(masses),
    new AdventEmberDayRule(masses),
    new FirstClassConflictRule(masses),
    new SecondClassConflictRule(masses),
    new BmvSaturdayRule(masses),
    new AnnunciationTransferredRule(masses),
    new VigilSundayOmissionRule(),
    new SundayPrecedenceRule(masses, rubrics),
    new GeneralRankRule(),
  ];

  // The Sunday precedence rule only exists when its rubrics knob is on;
  // otherwise it would be a dead entry in the resolver loop.
  return rules.filter(
    (rule) => !(rule instanceof SundayPrecedenceRule) || rubrics.sundays.commemoratesFeastsUnder,
  );
}
