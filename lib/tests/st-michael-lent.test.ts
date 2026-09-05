import { describe, expect, test } from "bun:test";
import { isStMichaelLent, stMichaelLentDay } from "../utils";

describe("Quaresma de São Miguel (15 Aug – 29 Sep)", () => {
  test("boundaries", () => {
    expect(stMichaelLentDay(new Date(2026, 7, 14))).toBeNull();
    expect(stMichaelLentDay(new Date(2026, 7, 15))).toBe(1);
    expect(stMichaelLentDay(new Date(2026, 8, 29))).toBe(46);
    expect(stMichaelLentDay(new Date(2026, 8, 30))).toBeNull();
    expect(stMichaelLentDay(new Date(2026, 0, 1))).toBeNull();
  });

  test("today (5 Sep 2026) is day 22", () => {
    expect(stMichaelLentDay(new Date(2026, 8, 5))).toBe(22);
  });

  test("ignores time of day", () => {
    expect(stMichaelLentDay(new Date(2026, 8, 29, 10, 30))).toBe(46);
    expect(stMichaelLentDay(new Date(2026, 7, 15, 23, 59))).toBe(1);
  });

  test("period always spans 46 consecutive days", () => {
    let count = 0;
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(2026, month + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const lentDay = stMichaelLentDay(new Date(2026, month, day));
        if (lentDay !== null) {
          count++;
          expect(lentDay).toBe(count);
        }
      }
    }
    expect(count).toBe(46);
  });

  test("isStMichaelLent matches stMichaelLentDay", () => {
    expect(isStMichaelLent(new Date(2026, 7, 15))).toBe(true);
    expect(isStMichaelLent(new Date(2026, 8, 29))).toBe(true);
    expect(isStMichaelLent(new Date(2026, 7, 14))).toBe(false);
    expect(isStMichaelLent(new Date(2026, 9, 1))).toBe(false);
  });
});
