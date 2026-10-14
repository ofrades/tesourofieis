import { Context, Layer, Schema } from "./effect";
import { type CalendarEdition, Mass } from "./domain";
import { legacyToPrecedence, PRECEDENCE } from "./calendars/precedence";
import { computePrecedenceFor, computeRankFor, getCalendarDefinition } from "./calendars";

/**
 * Validates the static observance data against the domain schema.
 * Throws at startup (a defect) if the data violates the model: bad data
 * would silently corrupt every calendar calculation downstream.
 */
function parseObservances(observances: unknown[]): readonly Mass[] {
  return Schema.decodeUnknownSync(Schema.Array(Mass))(observances);
}

class MassManager {
  private observances: Record<string, Mass>;
  private edition: CalendarEdition;
  private masses: readonly Mass[];
  private byId: Map<string, Mass>;
  private byFlexibility: Map<Mass["flexibility"], Mass[]>;
  private byType: Map<Mass["type"], Mass[]>;
  private santosByMonthDay: Map<string, Mass[]>; // key: "m-d"

  private easterMasses: Mass[];
  private temporaSundayMasses: Mass[];
  private lentEmberDays: Mass[];
  private septemberEmberDays: Mass[];
  private adventEmberDays: Mass[];
  private emberDays: Mass[];
  private sanctiClass1: Mass[];
  private sanctiClass2: Mass[];
  private criteriaIdSetCache: WeakMap<(Mass | undefined)[], Set<string>>;

  constructor(observances: Record<string, Mass>, edition: CalendarEdition) {
    this.observances = observances;
    this.edition = edition;
    // Editions never see observances explicitly suppressed under them.
    // Templates are stamped once with the edition-resolved precedence and
    // derived coarse rank (date-less: dated adjustments apply later, per
    // day, in createMassWithDate).
    this.masses = parseObservances(
      Object.values(observances)
        .filter((mass) => !mass.suppressedIn?.includes(edition))
        .map((mass) => ({
          ...mass,
          precedence: computePrecedenceFor(edition, mass),
          rank: computeRankFor(edition, mass),
        })),
    );
    // getById serves the same stamped copies the indexes see.
    this.byId = new Map(this.masses.map((mass) => [mass.id, mass]));
    this.byFlexibility = new Map();
    this.byType = new Map();
    this.santosByMonthDay = new Map();

    this.easterMasses = [];
    this.temporaSundayMasses = [];
    this.lentEmberDays = [];
    this.septemberEmberDays = [];
    this.adventEmberDays = [];
    this.emberDays = [];
    this.sanctiClass1 = [];
    this.sanctiClass2 = [];
    this.criteriaIdSetCache = new WeakMap();

    for (const mass of this.masses) {
      // index by flexibility
      const flexList = this.byFlexibility.get(mass.flexibility) || [];
      flexList.push(mass);
      this.byFlexibility.set(mass.flexibility, flexList);

      // index by type
      const typeList = this.byType.get(mass.type) || [];
      typeList.push(mass);
      this.byType.set(mass.type, typeList);

      // index santos by month-day
      if (mass.flexibility === "santos" && mass.month && mass.day) {
        const key = `${mass.month}-${mass.day}`;
        const list = this.santosByMonthDay.get(key) || [];
        list.push(mass);
        this.santosByMonthDay.set(key, list);
      }

      if (
        mass.category === "pascoa" &&
        ((mass.weekday !== undefined && mass.weekday < 5) ||
          (mass.week !== undefined && mass.week < 4))
      ) {
        this.easterMasses.push(mass);
      }

      if (mass.flexibility === "tempora" && mass.weekday === 0) {
        this.temporaSundayMasses.push(mass);
      }

      if (
        mass.category === "quaresma" &&
        mass.week === 1 &&
        (mass.day === 3 || mass.day === 5 || mass.day === 6)
      ) {
        this.lentEmberDays.push(mass);
      }

      if (mass.type === "ember-september") {
        this.septemberEmberDays.push(mass);
      }

      if (
        mass.category === "advento" &&
        mass.week === 3 &&
        (mass.day === 3 || mass.day === 5 || mass.day === 6)
      ) {
        this.adventEmberDays.push(mass);
      }

      if (mass.category === "santos") {
        const p = mass.precedence ?? legacyToPrecedence(mass.rank);
        if (p >= PRECEDENCE.DUPLEX_I_CLASSIS) this.sanctiClass1.push(mass);
        else if (p >= PRECEDENCE.DUPLEX_II_CLASSIS) this.sanctiClass2.push(mass);
      }
    }

    this.emberDays = this.lentEmberDays
      .concat(this.septemberEmberDays)
      .concat(this.adventEmberDays);
  }

  createMassWithDate(mass: Mass, date: string): Mass {
    // rankVariants is static edition configuration, not day data.
    const { rankVariants: _, ...dayMass } = mass;
    const updatedMass = {
      ...dayMass,
      date,
      precedence: computePrecedenceFor(this.edition, mass, date),
      rank: computeRankFor(this.edition, mass, date),
    };
    return updatedMass;
  }

  getById(id: string): Mass | undefined {
    return this.byId.get(id);
  }

  getByIds(ids: string[]): Mass[] {
    return ids.map((id) => this.byId.get(id)).filter((m): m is Mass => Boolean(m));
  }

  getByTypeId(type: Mass["type"]): Mass[] {
    return this.byType.get(type) || [];
  }

  getTempora(): Mass[] {
    return this.byFlexibility.get("tempora") || [];
  }

  getSancti(): Mass[] {
    return this.byFlexibility.get("santos") || [];
  }

  getSanctiByMonthDay(month: number, day: number): Mass[] {
    return this.santosByMonthDay.get(`${month}-${day}`) || [];
  }

  getAdvent(): Mass[] {
    return this.byType.get("advent") || [];
  }

  getEaster(): Mass[] {
    return this.easterMasses;
  }

  getTemporaSunday(): Mass[] {
    return this.temporaSundayMasses;
  }

  getLentEmberDays(): Mass[] {
    return this.lentEmberDays;
  }

  getSeptemberEmberDays(): Mass[] {
    return this.septemberEmberDays;
  }

  getAdventEmberDays(): Mass[] {
    return this.adventEmberDays;
  }

  getEmberDays() {
    return this.emberDays;
  }

  getSanctiClass1(): Mass[] {
    return this.sanctiClass1;
  }

  getSanctiClass2(): Mass[] {
    return this.sanctiClass2;
  }

  match(observances: Mass[], criteria: Mass | undefined | (Mass | undefined)[]): Mass | undefined {
    if (!criteria) {
      return undefined;
    }

    if (Array.isArray(criteria)) {
      let criteriaIds = this.criteriaIdSetCache.get(criteria);

      if (!criteriaIds) {
        criteriaIds = new Set(
          criteria.map((criterion) => criterion?.id).filter((id): id is string => Boolean(id)),
        );
        this.criteriaIdSetCache.set(criteria, criteriaIds);
      }

      for (const observance of observances) {
        if (criteriaIds.has(observance.id)) {
          return observance;
        }
      }

      return undefined;
    }

    for (const observance of observances) {
      if (observance.id === criteria.id) {
        return observance;
      }
    }

    return undefined;
  }
}

const managersByEdition = new Map<CalendarEdition, MassManager>();

/**
 * Returns (and caches) the observance index for a calendar edition.
 */
export function getMassIndex(edition: CalendarEdition): MassIndex {
  const existing = managersByEdition.get(edition);
  if (existing) return existing;

  const definition = getCalendarDefinition(edition);
  const manager = new MassManager(definition.observances, edition);
  managersByEdition.set(edition, manager);
  return manager;
}

/**
 * Effect service exposing the validated observance index.
 * Provides an edition -> MassIndex lookup; provide via `MassesLive`.
 */
export type MassIndex = InstanceType<typeof MassManager>;

export class Masses extends Context.Service<Masses, (edition: CalendarEdition) => MassIndex>()(
  "@tesourofieis/Masses",
) {}

export const MassesLive: Layer.Layer<Masses> = Layer.succeed(Masses, getMassIndex);
