import { Context, Effect, Layer } from "./effect";
import type { CalendarEdition, LiturgicalSeason, Mass } from "./domain";
import { Calendar } from "./calendar";
import { getCalendarDefinition } from "./calendars";
import type { Day } from "./day";
import { MassesLive } from "./observanceManager";
import { ObservabilityLive } from "./observability";
import { shiftLocalDate } from "./utils";

const calendarLayer = Layer.mergeAll(MassesLive, ObservabilityLive);

/**
 * Bounded LRU cache of built liturgical calendars keyed by "year:edition".
 * A built Calendar costs roughly half a MB of heap, so the capacity bounds
 * worst-case memory on mobile; entries are touched on read so the app's
 * working set (current year plus the next one) never gets evicted.
 */
export class CalendarStore {
  private readonly entries = new Map<string, Calendar>();

  constructor(private readonly capacity = DEFAULT_CAPACITY) {}

  getOrCreate(year: number, edition: CalendarEdition): Calendar {
    const key = `${year}:${edition}`;
    const cached = this.entries.get(key);
    if (cached) {
      this.entries.delete(key);
      this.entries.set(key, cached);
      return cached;
    }

    const calendar = new Calendar(year, getCalendarDefinition(edition));
    // Throws UnsupportedYearError for years outside the model (fail fast).
    Effect.runSync(calendar.build().pipe(Effect.provide(calendarLayer)));

    this.entries.set(key, calendar);
    this.evictOverflow();
    return calendar;
  }

  getDays(year: number, edition: CalendarEdition): Day[] {
    return this.getOrCreate(year, edition).getAllDays();
  }

  getDay(dateKey: string, edition: CalendarEdition): Day | undefined {
    return this.getOrCreate(parseYear(dateKey), edition).get(dateKey);
  }

  getSeason(dateKey: string, edition: CalendarEdition): LiturgicalSeason | undefined {
    return this.getDay(dateKey, edition)?.season;
  }

  /**
   * Novena observances celebrated between dateKey and nine days later.
   */
  getNovenas(dateKey: string, edition: CalendarEdition): Mass[] {
    const endDate = shiftLocalDate(dateKey, 9);
    const novenas: Mass[] = [];

    for (const day of this.getOrCreate(parseYear(dateKey), edition).getAllDays()) {
      if (day.date < dateKey || day.date > endDate) continue;

      for (const mass of day.mass) {
        if (mass.novena) novenas.push(mass);
      }
    }

    return novenas;
  }

  clear(): void {
    this.entries.clear();
  }

  get size(): number {
    return this.entries.size;
  }

  private evictOverflow(): void {
    while (this.entries.size > this.capacity) {
      const oldest = this.entries.keys().next();
      if (oldest.done) break;
      this.entries.delete(oldest.value);
    }
  }
}

/** Covers current year + next year across both editions with room to browse. */
const DEFAULT_CAPACITY = 16;

function parseYear(dateKey: string): number {
  return Number.parseInt(dateKey.slice(0, 4), 10);
}

/**
 * Effect service exposing the shared calendar store.
 * Requires nothing itself; provide via `CalendarsLive`.
 */
export class Calendars extends Context.Service<Calendars, CalendarStore>()(
  "@tesourofieis/Calendars",
) {}

/** Process-wide store backing the synchronous public API in getCalendar.ts. */
export const sharedCalendarStore = new CalendarStore();

export const CalendarsLive: Layer.Layer<Calendars> = Layer.succeed(Calendars, sharedCalendarStore);
