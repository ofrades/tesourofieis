import {
  addDays,
  isSameDay,
  isSunday,
  nextSunday,
  nextWednesday,
  previousSaturday,
  previousSunday,
  subDays,
} from "date-fns";
import { Effect } from "effect";
import { type LiturgicalSeason, type Mass, Season, UnsupportedYearError } from "./domain";
import {
  type CalendarDefinition,
  type ConcurrencyRule,
  type RuleResolution,
  type ShiftInstruction,
} from "./calendars/types";
import { type MassIndex, Masses } from "./observanceManager";
import { legacyToPrecedence } from "./calendars/precedence";
import { parseLocalDate, yyyyMMDD } from "./utils";

export type { ShiftInstruction };

/**
 * Represents a single calendar day in the liturgical calendar.
 */
export { Day } from "./day";
import { Day } from "./day";

interface KeyDates {
  christmas: Date;
  epiphany: Date;
  easterSunday: Date;
  ashWednesday: Date;
  septuagesima: Date;
  passionSunday: Date;
  palmSunday: Date;
  pentecostSunday: Date;
  adventStart: Date;
  yearEnd: Date;
  yearStart: Date;
}

// ======================================
// === CORE LOGIC START ===
// ======================================

/**
 * LiturgicalYearCalculator
 */
class LiturgicalYearCalculator {
  constructor(private year: number) {}

  calculateKeyDates(): KeyDates {
    const christmas = new Date(this.year, 11, 25);
    const epiphany = new Date(this.year, 0, 6);
    const easterSunday = this.calculateEaster();
    const ashWednesday = subDays(easterSunday, 46);
    const septuagesima = subDays(ashWednesday, 17);
    const passionSunday = subDays(easterSunday, 14);
    const palmSunday = subDays(easterSunday, 7);
    const pentecostSunday = addDays(easterSunday, 49);
    const adventStart = this.calculateAdventStart();
    const yearEnd = new Date(this.year, 11, 31);
    const yearStart = new Date(this.year, 0, 1);

    return {
      christmas,
      epiphany,
      easterSunday,
      ashWednesday,
      septuagesima,
      passionSunday,
      palmSunday,
      pentecostSunday,
      adventStart,
      yearEnd,
      yearStart,
    };
  }

  private calculateEaster(): Date {
    const year = this.year;
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;

    return new Date(year, month - 1, day);
  }

  private calculateAdventStart(): Date {
    const christmasDay = new Date(this.year, 11, 25);
    const weekday = christmasDay.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6;

    const adventDates = [
      new Date(this.year, 10, 27),
      new Date(this.year, 11, 3),
      new Date(this.year, 11, 2),
      new Date(this.year, 11, 1),
      new Date(this.year, 10, 30),
      new Date(this.year, 10, 29),
      new Date(this.year, 10, 28),
    ];

    return adventDates[weekday]!;
  }

  holyFamily(): Date {
    return nextSunday(new Date(this.year, 0, 6));
  }

  sundayBefore24AfterPentecost(adventStart: Date): Date {
    return previousSunday(adventStart);
  }

  saturdayBefore24AfterPentecost(adventStart: Date): Date {
    return previousSaturday(this.sundayBefore24AfterPentecost(adventStart));
  }

  emberWednesdaySeptember(): Date {
    let date = new Date(this.year, 8, 15);
    while (!isSunday(date) || date.getDate() > 21) {
      date = addDays(date, 1);
      if (date.getMonth() > 8) break;
    }
    return nextWednesday(date);
  }

  holyName(): Date {
    let date = new Date(this.year, 0, 1);

    while (date.getDate() <= 7) {
      if (isSunday(date)) {
        const day = date.getDate();
        return day === 1 || day === 6 || day === 7 ? new Date(this.year, 0, 2) : date;
      }
      date = addDays(date, 1);
    }
    return new Date(this.year, 0, 2);
  }

  christKing(): Date {
    return previousSunday(new Date(this.year, 10, 1));
  }

  sundayInChristmasOctave(): Date | null {
    for (let day = 26; day <= 31; day++) {
      const date = new Date(this.year, 11, day);
      if (isSunday(date)) return date;
    }
    return null;
  }
}

/**
 * SeasonManager
 */
class SeasonManager {
  private boundaries: Map<LiturgicalSeason, [Date, Date]>;

  constructor(private keyDates: KeyDates) {
    this.boundaries = this.calculateBoundaries();
  }

  private calculateBoundaries(): Map<LiturgicalSeason, [Date, Date]> {
    const {
      christmas,
      epiphany,
      easterSunday,
      ashWednesday,
      septuagesima,
      passionSunday,
      palmSunday,
      pentecostSunday,
      adventStart,
      yearEnd,
    } = this.keyDates;

    const boundaries = new Map<LiturgicalSeason, [Date, Date]>();

    boundaries.set(Season.ADVENT, [adventStart, subDays(christmas, 1)]);
    boundaries.set(Season.CHRISTMAS, [christmas, yearEnd]);
    boundaries.set(Season.EPIPHANY, [epiphany, subDays(septuagesima, 1)]);
    boundaries.set(Season.SEPTUAGESIMA, [septuagesima, subDays(ashWednesday, 1)]);
    boundaries.set(Season.LENT, [ashWednesday, subDays(passionSunday, 1)]);
    boundaries.set(Season.PASSIONTIDE, [passionSunday, subDays(palmSunday, 1)]);
    boundaries.set(Season.HOLY_WEEK, [palmSunday, subDays(easterSunday, 1)]);
    boundaries.set(Season.EASTER, [easterSunday, subDays(pentecostSunday, 1)]);
    boundaries.set(Season.PENTECOST, [pentecostSunday, subDays(adventStart, 1)]);

    return boundaries;
  }

  getSeasonForDate(date: Date): LiturgicalSeason {
    const month = date.getMonth();
    const dayOfMonth = date.getDate();

    if (month === 11 && dayOfMonth >= 25 && dayOfMonth <= 31) {
      return Season.CHRISTMAS;
    }

    if (month === 0 && dayOfMonth <= 5) {
      return Season.CHRISTMAS;
    }

    for (const [season, [start, end]] of this.boundaries.entries()) {
      if (date >= start && date <= end) {
        return season;
      }
    }

    return Season.PENTECOST;
  }
}

/**
 * MassInserter
 */
class MassInserter {
  constructor(
    private container: Map<string, Day>,
    private calculator: LiturgicalYearCalculator,
    private keyDates: KeyDates,
    private masses: MassIndex,
    private edition: string,
  ) {}

  /**
   * Edition-specific observances (mass.calendar) are primary under their
   * own edition and surface as alternatives everywhere else; local
   * observances and untagged "outro" masses never participate in
   * concurrency.
   */
  private isAlternative(mass: Mass): boolean {
    if (mass.calendar !== undefined) {
      return mass.calendar !== this.edition;
    }
    return mass.outro === true || mass.local !== undefined;
  }

  insertTemporaDays(): void {
    this.insertBlock(this.calculator.holyFamily(), this.masses.getByTypeId("post-epiphany"));
    this.insertBlock(this.keyDates.septuagesima, this.masses.getByTypeId("pre-lent-to-pentcost"));
    this.insertBlock(
      this.calculator.saturdayBefore24AfterPentecost(this.keyDates.adventStart),
      this.masses.getByTypeId("pentepi"),
      true,
      false,
      this.keyDates.adventStart,
    );
    this.insertBlock(
      this.calculator.sundayBefore24AfterPentecost(this.keyDates.adventStart),
      this.masses.getByTypeId("week-24-after-pentcost"),
    );
    this.insertBlock(
      this.keyDates.adventStart,
      this.masses.getByTypeId("advent"),
      false,
      false,
      new Date(this.keyDates.adventStart.getFullYear(), 11, 23),
    );

    const w = this.calculator.emberWednesdaySeptember();
    this.insertBlock(w, this.masses.getByIds(["TEMPORA_PENT_3"]));
    this.insertBlock(addDays(w, 2), this.masses.getByIds(["TEMPORA_PENT_5"]));
    this.insertBlock(addDays(w, 3), this.masses.getByIds(["TEMPORA_PENT_6"]));

    this.insertBlock(this.calculator.holyName(), this.masses.getByIds(["TEMPORA_NAT2_0"]));
    this.insertBlock(this.calculator.christKing(), this.masses.getByIds(["SANCTI_10_DUR"]));

    const christmasOctaveSunday = this.calculator.sundayInChristmasOctave();
    if (christmasOctaveSunday) {
      this.insertBlock(christmasOctaveSunday, this.masses.getByIds(["TEMPORA_NAT1_0"]));
    }
  }

  insertSanctiDays(): void {
    for (const [date, day] of this.container) {
      const month = Number.parseInt(date.slice(5, 7), 10);
      const dayOfMonth = Number.parseInt(date.slice(8, 10), 10);

      const allMasses = this.masses
        .getSanctiByMonthDay(month, dayOfMonth)
        .map((mass) => this.masses.createMassWithDate(mass, date));

      // Separate special masses (outro, local, calendar:62) from regular masses
      // Special masses don't participate in concurrency resolution - they're just appended
      for (const mass of allMasses) {
        if (this.isAlternative(mass)) {
          day.alternatives.push(mass);
        } else {
          day.mass.push(mass);
        }
      }
    }
  }

  private insertBlock(
    date: Date,
    block: Mass[],
    reverse = false,
    overwrite = true,
    stopDate?: Date,
  ): void {
    const resolvedBlock: Mass[] = block.filter((m): m is Mass => Boolean(m));

    // Separate special masses (outro, local, calendar:62) from regular masses
    // Special masses don't participate in date sequencing - they're appended to their fixed dates
    const regularMasses: Mass[] = [];
    const specialMasses: Mass[] = [];

    for (const mass of resolvedBlock) {
      if (this.isAlternative(mass)) {
        specialMasses.push(mass);
      } else {
        regularMasses.push(mass);
      }
    }

    // Insert special masses to their proper dates based on weekday
    for (const mass of specialMasses) {
      // Find the date that matches this mass's weekday within the block range
      if (mass.weekday !== undefined && mass.week !== undefined) {
        // Calculate the date for this mass based on its weekday offset from the start
        const daysFromStart = regularMasses.findIndex(
          (m) => m.weekday === mass.weekday && m.week === mass.week,
        );
        if (daysFromStart >= 0) {
          const massDate = addDays(new Date(date), daysFromStart);
          const dateKey = yyyyMMDD(massDate);
          const day = this.container.get(dateKey);
          if (day) {
            day.alternatives.push(this.masses.createMassWithDate(mass, dateKey));
          }
        }
      }
    }

    // Process regular masses sequentially
    const currentDate = new Date(date);

    if (reverse) {
      for (let i = regularMasses.length - 1; i >= 0; i--) {
        const observance = regularMasses[i];
        if (!observance) continue;

        const dateKey = yyyyMMDD(currentDate);
        const day = this.container.get(dateKey);

        if (!day) {
          currentDate.setDate(currentDate.getDate() - 1);
          continue;
        }

        if (day.mass.length && !overwrite) break;

        if (stopDate && isSameDay(stopDate, subDays(currentDate, 1))) break;

        day.mass.push(this.masses.createMassWithDate(observance, dateKey));
        currentDate.setDate(currentDate.getDate() - 1);
      }
      return;
    }

    for (const observance of regularMasses) {
      if (!observance) continue;

      const dateKey = yyyyMMDD(currentDate);
      const day = this.container.get(dateKey);

      if (!day) {
        currentDate.setDate(currentDate.getDate() + 1);
        continue;
      }

      if (day.mass.length && !overwrite) break;

      if (stopDate && isSameDay(stopDate, subDays(currentDate, 1))) break;

      day.mass.push(this.masses.createMassWithDate(observance, dateKey));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
}
// ======================================
// === CORE LOGIC END ===
// ======================================

/**
 * ConcurrencyResolver
 */
class ConcurrencyResolver {
  private rules: ConcurrencyRule[];

  constructor(rules: ConcurrencyRule[]) {
    this.rules = rules;
  }

  resolve(observances: Mass[], date: string, calendar: Calendar): RuleResolution | undefined {
    for (const rule of this.rules) {
      if (rule.applies(observances, date, calendar)) {
        const result = rule.resolve(observances, date, calendar);
        if (result) {
          return result;
        }
      }
    }
    return undefined; // If no rule applies, we return undefined
  }
}

// ======================================
// === CALENDAR CLASS ===
// ======================================

/** First full year of the Gregorian calendar; the missal model presumes it. */
const MIN_SUPPORTED_YEAR = 1583;
const MAX_SUPPORTED_YEAR = 2400;

export class Calendar {
  private container: Map<string, Day>;
  private keyDates: KeyDates;
  private calculator: LiturgicalYearCalculator;
  private seasonManager: SeasonManager;
  private masses: MassIndex | undefined;

  private definition: CalendarDefinition;

  constructor(
    public year: number,
    definition: CalendarDefinition,
  ) {
    this.definition = definition;
    this.container = new Map();
    this.calculator = new LiturgicalYearCalculator(year);
    this.keyDates = this.calculator.calculateKeyDates();
    this.seasonManager = new SeasonManager(this.keyDates);
  }

  /**
   * The sequential build pipeline, expressed as a single Effect so each phase
   * is traced as a span and failures surface through the error channel.
   * Requires the `Masses` service; provide it via `MassesLive`.
   */
  build(): Effect.Effect<void, UnsupportedYearError, Masses> {
    const self = this;

    return Effect.gen(function* () {
      if (
        !Number.isInteger(self.year) ||
        self.year < MIN_SUPPORTED_YEAR ||
        self.year > MAX_SUPPORTED_YEAR
      ) {
        return yield* new UnsupportedYearError({ year: self.year });
      }

      const getIndex = yield* Masses;
      self.masses = getIndex(self.definition.id);

      yield* Effect.logDebug(`Building liturgical calendar for ${self.year}`);

      yield* Effect.sync(() => self.buildEmptyCalendar()).pipe(
        Effect.withSpan("Calendar.buildEmptyCalendar", { attributes: { year: self.year } }),
      );
      yield* Effect.sync(() => self.fillInMasses()).pipe(
        Effect.withSpan("Calendar.fillInMasses", { attributes: { year: self.year } }),
      );
      yield* Effect.sync(() => self.resolveConcurrency()).pipe(
        Effect.withSpan("Calendar.resolveConcurrency", { attributes: { year: self.year } }),
      );
      yield* Effect.sync(() => self.insertDevotionalVotives()).pipe(
        Effect.withSpan("Calendar.insertDevotionalVotives", { attributes: { year: self.year } }),
      );

      yield* Effect.logDebug(`Built calendar for ${self.year}: ${self.container.size} days`);
    }).pipe(Effect.withSpan("Calendar.build", { attributes: { year: self.year } }));
  }

  private buildEmptyCalendar(): void {
    const date = new Date(this.year, 0, 1);

    while (date.getFullYear() === this.year) {
      const dateString = yyyyMMDD(date);
      const day = new Day(dateString, this.seasonManager.getSeasonForDate(date));
      this.container.set(dateString, day);
      date.setDate(date.getDate() + 1);
    }
  }

  private fillInMasses(): void {
    const inserter = new MassInserter(
      this.container,
      this.calculator,
      this.keyDates,
      this.masses!,
      this.definition.id,
    );
    inserter.insertTemporaDays();
    inserter.insertSanctiDays();
  }

  /**
   * resolveConcurrency: Orchestrates conflict resolution and shift processing.
   */
  private resolveConcurrency(): void {
    const resolver = new ConcurrencyResolver(
      this.definition.rules(this.masses!, this.definition.rubrics),
    );
    let fallbackMass: Mass | undefined;

    for (const [date, day] of this.container) {
      const parsedDate = parseLocalDate(date);
      const isAnchorDay =
        isSunday(parsedDate) ||
        (parsedDate.getMonth() === 0 && (parsedDate.getDate() === 1 || parsedDate.getDate() === 6));

      // 1. Get the resolution from the rules (BaseRule ensures 'stay' includes winners + survivors)
      const result = resolver.resolve(day.mass, date, this);

      // If no rule applied or no conflict was found, result is undefined or only has original mass.
      if (!result) {
        // Fallback to GeneralRankRule if absolutely necessary, but ConcurrencyResolver should handle this.
        if (day.mass.length > 0) {
          day.mass = this.removeDuplicates(day.mass);
        } else if (fallbackMass) {
          this.updateDay(date, [
            this.masses!.createMassWithDate({ ...fallbackMass, name: "Feria" }, date),
          ]);
        } else {
          this.handleEmptyDay(date);
        }

        if (isAnchorDay) {
          fallbackMass = day.mass[0];
        }

        continue;
      }

      let finalObservances = result.stay;

      // 2. Existing logic for tempora selection
      const temporaObservances = finalObservances.filter((obs) => obs.flexibility === "tempora");

      if (temporaObservances.length > 1) {
        const bestTempora = temporaObservances.sort(
          (a, b) =>
            (b.precedence ?? 0) - (a.precedence ?? 0) || (a.week && b.week ? a.week - b.week : 0),
        )[0]!;

        finalObservances = [
          ...finalObservances.filter((obs) => obs.flexibility !== "tempora"),
          bestTempora,
        ];
      }

      // 3. Process Shifts
      if (result.shifts.length) {
        for (const shift of result.shifts) {
          // If the shift is moving a Mass TO the current date (date === shift.date),
          // we merge it into `finalObservances` so it's included in the final assignment.
          if (shift.date === date) {
            // Shifted observances arrive as templates: restamp day data,
            // preserving their original liturgical date label.
            finalObservances.push(
              ...shift.observances.map((m) => {
                const stamped = this.masses!.createMassWithDate({ ...m }, date);
                return m.date ? { ...stamped, date: m.date } : stamped;
              }),
            );
          } else {
            // Otherwise, update the target day in the container
            this.handleShiftedDay(shift);
          }

          // Handle removal from source (e.g., removing Vigil from yesterday)
          if (shift.sourceDate) {
            this.removeFromDay(shift.sourceDate, shift.observances);
          }
        }
      }

      // 4. Final Assignment
      if (finalObservances.length > 0) {
        day.mass = this.removeDuplicates(finalObservances);
      } else if (fallbackMass) {
        this.updateDay(date, [
          this.masses!.createMassWithDate({ ...fallbackMass, name: "Feria" }, date),
        ]);
      } else {
        this.handleEmptyDay(date);
      }

      if (isAnchorDay) {
        fallbackMass = day.mass[0];
      }
    }
  }

  /**
   * insertDevotionalVotives: after concurrency is settled, offer the First
   * Friday (Sacred Heart) and First Saturday (Immaculate Heart) votive
   * Masses as `alternatives` where the edition's own rule permits.
   *
   * Alternatives never participate in concurrency: the celebrated Masses
   * are untouched, so precedence logic cannot be corrupted — at worst an
   * option is withheld. Unknown ranks veto rather than permit.
   */
  private insertDevotionalVotives(): void {
    const spec = this.definition.devotionalVotives;
    if (!spec || !this.masses) return;

    for (const [dateKey, day] of this.container) {
      if (day.mass.length === 0) continue;
      const parsed = parseLocalDate(dateKey);
      if (parsed.getDate() > 7) continue;
      const weekday = parsed.getDay();
      const rule = weekday === 5 ? spec.friday : weekday === 6 ? spec.saturday : undefined;
      if (!rule) continue;

      const votive = this.masses.getById(rule.observanceId);
      if (!votive) continue;
      if (day.mass.some((m) => m.id === votive.id)) continue;
      if (day.alternatives.some((m) => m.id === votive.id)) continue;

      const top = Math.max(...day.mass.map((m) => m.precedence ?? Number.POSITIVE_INFINITY));
      if (top >= rule.belowPrecedence) continue;
      if (day.mass.some((m) => m.id !== undefined && rule.excludedIds.includes(m.id))) continue;
      if (
        rule.excludedMonthDays.some(
          ([month, date]) => parsed.getMonth() === month && parsed.getDate() === date,
        )
      ) {
        continue;
      }

      day.alternatives.push(this.masses.createMassWithDate(votive, dateKey));
    }
  }

  /**
   * handleEmptyDay: Handles the original logic for filling empty weekdays with Feria.
   */
  private handleEmptyDay(date: string): void {
    let currentDate = parseLocalDate(date);
    const { yearStart } = this.keyDates;

    while (
      !isSunday(currentDate) &&
      !(currentDate.getMonth() === 0 && currentDate.getDate() === 6)
    ) {
      if (isSameDay(currentDate, yearStart)) break;
      currentDate = subDays(currentDate, 1);
    }

    const previousDay = this.get(yyyyMMDD(currentDate));
    if (previousDay?.mass[0]) {
      this.updateDay(date, [
        this.masses!.createMassWithDate({ ...previousDay.mass[0], name: "Feria" }, date),
      ]);
    }
  }

  /**
   * handleShiftedDay: Applies a ShiftInstruction to a future date.
   */
  private handleShiftedDay(toShift: ShiftInstruction): void {
    const shiftedDay =
      this.container.get(toShift.date) ||
      new Day(toShift.date, this.seasonManager.getSeasonForDate(parseLocalDate(toShift.date)));
    shiftedDay.mass = this.removeDuplicates([
      ...shiftedDay.mass,
      // Restamp: shift payloads are templates without day data.
      ...toShift.observances.map((m) => {
        const stamped = this.masses!.createMassWithDate({ ...m }, toShift.date);
        return m.date ? { ...stamped, date: m.date } : stamped;
      }),
    ]);
    this.container.set(toShift.date, shiftedDay);
  }

  /**
   * removeFromDay: Removes masses from their original day if they were shifted.
   */
  private removeFromDay(date: string, observancesToRemove: Mass[]): void {
    const day = this.container.get(date);
    if (!day) return;

    const idsToRemove = new Set(observancesToRemove.map((m) => m.id));
    day.mass = day.mass.filter((m) => !idsToRemove.has(m.id));
  }

  private removeDuplicates(masses: Mass[]): Mass[] {
    // Missal-book order: highest precedence first. Stable ties keep the
    // rules' intentional sequence (e.g. Sunday ahead of an equal-grade
    // feast under Rubrics 1960); locals sink below universal offices.
    masses.sort((a, b) => {
      // Every observance carries edition-resolved precedence.
      const pa = a.precedence ?? 0;
      const pb = b.precedence ?? 0;
      if (pa !== pb) return pb - pa;
      // Parity favours the sanctoral office (DA): an equal-grade feast
      // outranks a semiduplex Sunday pre-55. Under '62 Sundays sit above
      // all II-class feasts numerically (5.1 vs 5), so no tie arises.
      if (a.flexibility !== b.flexibility) return a.flexibility === "santos" ? -1 : 1;
      if (a.local || b.local) return a.local ? 1 : -1;
      return 0;
    });

    const seen = new Set<string>();
    return masses.filter((mass) => {
      if (seen.has(mass.id)) return false;
      seen.add(mass.id);
      return true;
    });
  }

  /* -------------------- public API -------------------- */

  public get(date: string): Day | undefined {
    return this.container.get(date);
  }

  public findDay(observanceId?: string): [string, Day] | undefined {
    if (!observanceId) return;

    for (const [date, day] of this.container) {
      if (day.all.some((obs) => obs.id === observanceId)) {
        return [date, day];
      }
    }
    return undefined;
  }

  public getAllDays(): Day[] {
    return Array.from(this.container.values());
  }

  private updateDay(date: string, masses: Mass[]): void {
    const day = this.get(date);
    if (day) {
      day.mass = masses;
    }
  }
}
