import { parseLocalDate } from "../utils";
import type { Mass } from "../domain";
import { OBSERVANCES } from "../observances";
import { legacyToPrecedence, PRECEDENCE } from "./precedence";
import { buildRules } from "./rules";
import { RUBRICS_1954 } from "./rubrics";
import type { CalendarDefinition, DevotionalVotives } from "./types";

/**
 * First Friday / First Saturday votives under Divino Afflatu.
 *
 * Friday: the Leonine privilege (Leo XIII, 1889; cf. O'Connell, The
 * Celebration of Mass): the votive Mass of the Sacred Heart where morning
 * devotions are held with the Ordinary's approval, unless a feast of the
 * Lord, a double of the first class, or a privileged feria, vigil or
 * octave occurs. Doubles of the second class and greater ferias
 * (Advent, Lent, Ember days) are allowed with commemoration.
 * Privileged octaves (Easter, Pentecost) and the Triduum/All Souls are
 * already at Duplex I or above in the data, so rank covers them; the
 * Christmas-octave days of Jan 2-4 (Puer natus rule) and the privileged
 * Epiphany vigil of Jan 5 need explicit civil-date vetoes, as do the
 * feasts of the Lord ranking below Duplex I (Purification, Transfiguration).
 *
 * Saturday: the First-Saturday Immaculate Heart privilege only dates to
 * the early 1960s, so pre-55 offers the general private votive (1913
 * Catholic Encyclopedia: allowed on semidouble, simple or feria, except
 * Sundays, Ash Wednesday, the Christmas/Epiphany/Pentecost vigils, the
 * Epiphany/Easter/Pentecost/Corpus Christi octaves, Holy Week and All
 * Souls). Below-Duplex rank covers all but the Epiphany vigil (Jan 5)
 * and the Epiphany octave (Jan 7), vetoed by civil date. Major ferias
 * (Advent/Lent, precedence 3.5) are conservatively withheld.
 */
const PRE55_DEVOTIONAL_VOTIVES: DevotionalVotives = {
  friday: {
    observanceId: "VOTIVE_PENT02_5",
    belowPrecedence: PRECEDENCE.DUPLEX_I_CLASSIS,
    excludedIds: ["SANCTI_02_02", "SANCTI_08_06"],
    excludedMonthDays: [
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
    ],
  },
  saturday: {
    observanceId: "VOTIVE_IMMACULATE_HEART",
    belowPrecedence: 3,
    excludedIds: [],
    excludedMonthDays: [
      [0, 5],
      [0, 7],
    ],
  },
};

/**
 * The pre-1955 rubrics calendar.
 *
 * doVersion maps to divinum-officium's "Divino Afflatu - 1954": the last
 * fully pre-55 code of rubrics, from which DO's "Reduced - 1955" and
 * "Rubrics 1960" chains descend. rankVariants keyed to other DO versions
 * (e.g. Tridentine) resolve through the chain when this edition is the leaf.
 */
export const pre55Calendar: CalendarDefinition = {
  id: "pre-55",
  label: "Rubricas pré-55",
  doVersion: "Divino Afflatu - 1954",
  observances: OBSERVANCES,
  rubrics: RUBRICS_1954,
  devotionalVotives: PRE55_DEVOTIONAL_VOTIVES,
  adjustRank(mass: Mass, date: string | undefined, precedence: number): number {
    // The Semiduplex grades of the Epiphany-octave week hold only through
    // Jan 12; from the Commemoration of the Baptism (Jan 13) the same
    // tempora keys are plain ferias again.
    if (
      mass.id?.startsWith("TEMPORA_EPI1_") &&
      mass.id !== "TEMPORA_EPI1_0A" &&
      precedence >= 5.6 &&
      date
    ) {
      const parsed = parseLocalDate(date);
      if (parsed.getMonth() === 0 && parsed.getDate() >= 13) {
        // Plain per-annum feria once the octave is over.
        return PRECEDENCE.SIMPLEX;
      }
    }

    const promotion = RUBRICS_1954.adventFeriasPromotionRank;
    if (promotion === null || mass.type !== "advent" || mass.weekday === 0 || !date) {
      return precedence;
    }

    const parsed = parseLocalDate(date);
    if (parsed.getMonth() === 11 && parsed.getDate() >= 17 && parsed.getDate() <= 23) {
      return Math.max(precedence, legacyToPrecedence(promotion));
    }
    return precedence;
  },
  rules: buildRules,
};
