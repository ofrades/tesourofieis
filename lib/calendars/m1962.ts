import { composeObservances1960 } from "./overrides";
import { pre55Calendar } from "./pre55";
import { PRECEDENCE } from "./precedence";
import { RUBRICS_1960 } from "./rubrics";
import type { CalendarDefinition, DevotionalVotives } from "./types";

/**
 * First Friday / First Saturday votives under the 1960 Code of Rubrics
 * (Missale Romanum 1962, Rubricae Generales nn. 385, 387-389): the Mass
 * of the Sacred Heart on First Fridays and of the Immaculate Heart on
 * First Saturdays may be said as 3rd-class votives where the devotions
 * are held — i.e. whenever the occurring day ranks below the 2nd class.
 * Privileged octaves, vigils, the Triduum and All Souls all rank 2nd
 * class or above in the data, so rank alone decides; no civil-date
 * vetoes are needed.
 */
const M1962_DEVOTIONAL_VOTIVES: DevotionalVotives = {
  friday: {
    observanceId: "VOTIVE_PENT02_5",
    belowPrecedence: PRECEDENCE.DUPLEX_II_CLASSIS,
    excludedIds: [],
    excludedMonthDays: [],
  },
  saturday: {
    observanceId: "VOTIVE_IMMACULATE_HEART",
    belowPrecedence: PRECEDENCE.DUPLEX_II_CLASSIS,
    excludedIds: [],
    excludedMonthDays: [],
  },
};

/**
 * The 1962 typical edition calendar, corresponding to divinum-officium's
 * "Rubrics 1960 - 1960". Inherits from pre-55 and declares deltas only:
 * its observance map composes the shared base with the Rubrics 1960
 * override layer (suppressions + proper additions).
 */
export const m1962Calendar: CalendarDefinition = {
  ...pre55Calendar,
  observances: composeObservances1960(),
  id: "62",
  label: "Missal de 1962",
  doVersion: "Rubrics 1960 - 1960",
  base: "pre-55",
  rubrics: RUBRICS_1960,
  devotionalVotives: M1962_DEVOTIONAL_VOTIVES,
};
