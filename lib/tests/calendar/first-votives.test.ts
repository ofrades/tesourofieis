import { describe, expect, test } from "bun:test";

import { getCalendarDay } from "../../getCalendar";

function alternativeIds(date: string, edition: "62" | "pre-55"): string[] {
  return (getCalendarDay(date, edition)?.alternatives ?? []).map((m) => m.id ?? "");
}

function alternativeLinks(date: string, edition: "62" | "pre-55"): string[] {
  return (getCalendarDay(date, edition)?.alternatives ?? []).map((m) => m.link ?? "");
}

describe("First Friday / First Saturday votive alternatives (1962)", () => {
  test("ferial First Friday offers the Sacred Heart votive", () => {
    expect(alternativeIds("2026-09-04", "62")).toContain("VOTIVE_PENT02_5");
    expect(alternativeLinks("2026-09-04", "62")).toContain("missal/votivas/coracaojesus");
  });

  test("Duplex First Saturday offers the Immaculate Heart votive", () => {
    expect(alternativeIds("2026-09-05", "62")).toContain("VOTIVE_IMMACULATE_HEART");
    expect(alternativeLinks("2026-09-05", "62")).toContain("missal/santos/08-22");
  });

  test("Simplex First Saturday offers the Immaculate Heart votive", () => {
    expect(alternativeIds("2026-08-01", "62")).toContain("VOTIVE_IMMACULATE_HEART");
  });

  test("celebrated Masses are untouched", () => {
    expect(getCalendarDay("2026-09-04", "62")?.mass[0]?.id).toBe("TEMPORA_PENT14_5");
    expect(getCalendarDay("2026-09-05", "62")?.mass[0]?.id).toBe("SANCTI_09_05");
  });

  test("Duplex II feasts veto the votive", () => {
    // Purification, first Friday 2024
    expect(alternativeIds("2024-02-02", "62")).not.toContain("VOTIVE_PENT02_5");
    // Transfiguration, first Friday 2027
    expect(alternativeIds("2027-08-06", "62")).not.toContain("VOTIVE_PENT02_5");
    // Nativity of Our Lady, first Saturday 2029
    expect(alternativeIds("2029-09-08", "62")).not.toContain("VOTIVE_IMMACULATE_HEART");
  });

  test("Good Friday and privileged octaves veto the votive", () => {
    // Good Friday 2026 is a first Friday: no Mass to replace, no votive
    expect(alternativeIds("2026-04-03", "62")).not.toContain("VOTIVE_PENT02_5");
    // Epiphany, first Friday 2023
    expect(alternativeIds("2023-01-06", "62")).not.toContain("VOTIVE_PENT02_5");
  });

  test("the Sacred Heart feast needs no votive", () => {
    // 7 June 2024 is both the feast and a first Friday
    expect(alternativeIds("2024-06-07", "62")).not.toContain("VOTIVE_PENT02_5");
  });

  test("ordinary Fridays offer nothing", () => {
    expect(alternativeIds("2026-09-11", "62")).not.toContain("VOTIVE_PENT02_5");
  });
});

describe("First Friday / First Saturday votive alternatives (pre-55)", () => {
  test("ferial First Friday offers the Sacred Heart votive", () => {
    expect(alternativeIds("2026-09-04", "pre-55")).toContain("VOTIVE_PENT02_5");
  });

  test("Saturday of Our Lady offers the Immaculate Heart votive", () => {
    // 4 Sep 2027: only the Salve Sancta Parens Saturday office
    expect(alternativeIds("2027-09-04", "pre-55")).toContain("VOTIVE_IMMACULATE_HEART");
  });

  test("Duplex feasts veto the Saturday private votive", () => {
    // S. Lourenço Justiniano, Duplex
    expect(alternativeIds("2026-09-05", "pre-55")).not.toContain("VOTIVE_IMMACULATE_HEART");
    // S. Pedro ad Vincula, first Saturday 2026
    expect(alternativeIds("2026-08-01", "pre-55")).not.toContain("VOTIVE_IMMACULATE_HEART");
  });

  test("feasts of the Lord veto the Friday votive", () => {
    // Purification, first Friday 2024 (Duplex II: rank passes, Lord-feast vetoes)
    expect(alternativeIds("2024-02-02", "pre-55")).not.toContain("VOTIVE_PENT02_5");
    // Transfiguration, first Friday 2027
    expect(alternativeIds("2027-08-06", "pre-55")).not.toContain("VOTIVE_PENT02_5");
  });

  test("Christmas octave and Epiphany vigil veto the Friday votive", () => {
    // 2 Jan 2026, first Friday in the Christmas octave (Puer natus rule)
    expect(alternativeIds("2026-01-02", "pre-55")).not.toContain("VOTIVE_PENT02_5");
    // 5 Jan 2024, privileged Epiphany vigil and first Friday
    expect(alternativeIds("2024-01-05", "pre-55")).not.toContain("VOTIVE_PENT02_5");
  });

  test("common octaves do not veto the Friday votive", () => {
    // 5 June 2026, first Friday within the Corpus Christi octave
    expect(alternativeIds("2026-06-05", "pre-55")).toContain("VOTIVE_PENT02_5");
  });

  test("Good Friday offers nothing", () => {
    expect(alternativeIds("2026-04-03", "pre-55")).not.toContain("VOTIVE_PENT02_5");
  });
});
