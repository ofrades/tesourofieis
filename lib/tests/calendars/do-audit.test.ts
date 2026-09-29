import { describe, expect, test } from "bun:test";
import { getCalendarDay } from "../../getCalendar";
import type { CalendarEdition } from "../../domain";
import do2026pre from "./fixtures/do-pre-55-2026.json";
import do2027pre from "./fixtures/do-pre-55-2027.json";
import do202662 from "./fixtures/do-62-2026.json";
import do202762 from "./fixtures/do-62-2027.json";
import allowlistRaw from "./fixtures/audit-allowlist.json";

/**
 * Full-calendar audit against divinum-officium's own precedence engine,
 * dumped headless via its Perl API (see fixtures/do-*.json generators in
 * the DO checkout). For every day of 2026-2027 and both editions this
 * verifies:
 *   1. every sanctoral office DO resolves for the date exists somewhere
 *      in our day stack (as celebration or commemoration),
 *   2. when DO says the sanctoral wins (so=1) our head mass is that
 *      sanctoral; when it loses, our head is temporal,
 *   3. DO's commemorations appear in our stack.
 * Vigils on Sundays are expected absent (both rubrics omit them).
 */

const FIXTURES = {
  "pre-55-2026": do2026pre,
  "pre-55-2027": do2027pre,
  "62-2026": do202662,
  "62-2027": do202762,
};

type DoDay = {
  so: number;
  t: string;
  s: string;
  com: string[];
  ph?: boolean;
  srank?: number | null;
  slatin?: string | undefined;
};

const coreOf = (key: string): string | null => {
  const m = key.match(/(\d{2}-\d{2})/);
  return m?.[1] ?? null;
};

const ALLOW = new Set(Object.keys(allowlistRaw));

describe("divinum-officium full-calendar audit", () => {
  const isVideFeria = (d: DoDay): boolean =>
    (d.srank ?? 99) <= 1.45 && /(^\\b(Die|Feria|Sabbato)\\b|^In [IVX]+ )/i.test(d.slatin ?? "");

  for (const [fixtureKey, fixture] of Object.entries(FIXTURES)) {
    const year = fixtureKey.split("-").pop() as string;
    const edition = fixtureKey.slice(0, fixtureKey.length - year.length - 1) as CalendarEdition;

    test(`${fixtureKey}: sanctoral identity and precedence`, () => {
      const problems: string[] = [];

      for (const [mmdd, doDay] of Object.entries(fixture)) {
        if (doDay.ph || isVideFeria(doDay)) continue;
        if (ALLOW.has(`${edition}|${mmdd}`)) continue;
        const iso = `${year}-${mmdd}`;
        const dow = new Date(`${iso}T12:00:00Z`).getUTCDay();
        const masses = getCalendarDay(iso, edition)?.mass ?? [];
        const cores = new Set(
          masses.map(
            (m) => `${String(m.month).padStart(2, "0")}-${String(m.day).padStart(2, "0")}`,
          ),
        );
        const top = masses[0];
        const topIsSancti = top?.flexibility === "santos";

        const sCore = doDay.s ? coreOf(doDay.s) : null;
        const isVigilFile = doDay.s.endsWith("t");
        const omittedVigil = isVigilFile && dow === 0;

        if (sCore && !omittedVigil) {
          if (!cores.has(sCore)) {
            problems.push(
              `${iso} missing ${doDay.s} (${edition}); ours=${[...cores].join(",") || "-"}`,
            );
          }
          const topCore =
            top && topIsSancti
              ? `${String(top.month).padStart(2, "0")}-${String(top.day).padStart(2, "0")}`
              : null;
          if (doDay.so === 1 && !topIsSancti) {
            problems.push(`${iso} DO: sanctoral wins, our head=${top?.id} (${edition})`);
          }
          if (doDay.so === 1 && topIsSancti && topCore !== sCore) {
            problems.push(`${iso} DO winner ${doDay.s}, our head core ${topCore} (${edition})`);
          }
          if (doDay.so === 0 && topIsSancti) {
            problems.push(`${iso} DO: temporal wins, our head=${top?.id} (${edition})`);
          }
        }

        for (const c of doDay.com ?? []) {
          if (c.startsWith("Tempora")) continue;
          const cCore = coreOf(c);
          if (cCore && !cores.has(cCore)) {
            problems.push(`${iso} DO commemoration ${c} absent (${edition})`);
          }
        }
      }

      if (problems.length) {
        console.error(`\n[${fixtureKey}] ${problems.length} divergences:`);
        for (const p of problems.slice(0, 60)) console.error("  " + p);
        if (problems.length > 60) console.error(`  ...and ${problems.length - 60} more`);
      }
      expect(problems).toEqual([]);
    });
  }
});
