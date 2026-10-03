import { describe, expect, test } from "bun:test";
import { search } from "../../src/services/search";
import { getAllTopLevelDocs, getChildren, findBySlug } from "../../src/services/documents";
import docs from "../../assets/docs.json";

describe("offline search and navigation", () => {
  test("cold search yields while restoring the index and concurrent queries share it", async () => {
    let ticks = 0;
    const timer = setInterval(() => ticks++, 0);
    try {
      const [angelus, rosary] = await Promise.all([search("Angelus"), search("Rosário")]);
      expect(angelus.some((doc) => doc.url === "/devocionario/dia/angelus")).toBe(true);
      expect(rosary.some((doc) => doc.url === "/devocionario/rosario")).toBe(true);
      expect(ticks).toBeGreaterThan(0);
    } finally {
      clearInterval(timer);
    }
  });

  test("filters apply before the result limit", async () => {
    const all = await search("Maria", 1000);
    const expected = all.filter((doc) => doc.level === 2).slice(0, 10);
    const filtered = await search("Maria", 10, { level: 2 });
    expect(filtered.map((doc) => doc.id)).toEqual(expected.map((doc) => doc.id));
    expect(filtered).toHaveLength(10);
    const devotional = await search("Maria", 20, { sections: ["devocionario"] });
    expect(devotional.length).toBeGreaterThan(0);
    expect(devotional.every((doc) => doc.section === "devocionario")).toBe(true);
  });

  test("empty queries and zero limits return no matches", async () => {
    expect(await search(" ")).toEqual([]);
    expect(await search("Maria", 0)).toEqual([]);
  });

  test("the navigation catalog preserves every document's parent relationship", () => {
    const parents = new Set(docs.map((doc) => doc.parent ?? ""));
    for (const parent of parents) {
      const expected = docs
        .filter((doc) => (doc.parent ?? "") === parent)
        .map((doc) => doc.id)
        .sort();
      expect(
        getChildren(parent)
          .map((doc) => doc.id)
          .sort(),
      ).toEqual(expected);
    }
    expect(getAllTopLevelDocs()).toHaveLength(5);
    expect(findBySlug("/devocionario/dia/").map((doc) => doc.id)).toEqual(
      getChildren("devocionario/dia").map((doc) => doc.id),
    );
  });
});
