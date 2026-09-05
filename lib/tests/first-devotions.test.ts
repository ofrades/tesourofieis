import { describe, expect, test } from "bun:test";
import { isFirstFriday, isFirstSaturday } from "../utils";

describe("first Friday / first Saturday devotions", () => {
  test("detects first Fridays", () => {
    // Aug 2026: 7th is the first Friday
    expect(isFirstFriday(new Date(2026, 7, 7))).toBe(true);
    // Second Friday is not a first Friday
    expect(isFirstFriday(new Date(2026, 7, 14))).toBe(false);
    // First Saturday is not a first Friday
    expect(isFirstFriday(new Date(2026, 7, 1))).toBe(false);
  });

  test("detects first Saturdays", () => {
    // Aug 2026: 1st is the first Saturday
    expect(isFirstSaturday(new Date(2026, 7, 1))).toBe(true);
    // Second Saturday is not a first Saturday
    expect(isFirstSaturday(new Date(2026, 7, 8))).toBe(false);
    // First Friday is not a first Saturday
    expect(isFirstSaturday(new Date(2026, 7, 7))).toBe(false);
  });

  test("first Friday and Saturday never coincide", () => {
    for (let month = 0; month < 12; month++) {
      for (let day = 1; day <= 7; day++) {
        const date = new Date(2026, month, day);
        expect(isFirstFriday(date) && isFirstSaturday(date)).toBe(false);
      }
    }
  });

  test("every month of 2026 has exactly one of each", () => {
    for (let month = 0; month < 12; month++) {
      let fridays = 0;
      let saturdays = 0;
      const daysInMonth = new Date(2026, month + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(2026, month, day);
        if (isFirstFriday(date)) fridays++;
        if (isFirstSaturday(date)) saturdays++;
      }
      expect(fridays).toBe(1);
      expect(saturdays).toBe(1);
    }
  });
});
