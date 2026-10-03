import { describe, expect, test } from "bun:test";
import { createElement } from "react";
import { printBilingual, printDocument, printInline } from "../../src/printing/markup";

describe("native print content", () => {
  test("preserves nested rubrics and escapes content rather than injecting HTML", () => {
    const paragraph = createElement(
      "span",
      null,
      "Ave & <Maria>",
      createElement("span", { className: "response" }, " ℟. Amen."),
    );
    const html = printInline(paragraph);
    expect(html).toContain("Ave &amp; &lt;Maria&gt;");
    expect(html).toContain('class="rubric"');
    expect(html.match(/Amen/g)).toHaveLength(1);
  });

  test("prints both languages in paired rows, including an unpaired final paragraph", () => {
    const html = printBilingual([
      createElement("span", { className: "latin", key: "l1" }, "Angelus Dómini"),
      createElement("span", { className: "vernacular", key: "v1" }, "O Anjo do Senhor"),
      createElement("span", { className: "latin", key: "l2" }, "Orémus."),
    ]);
    expect(html.match(/<tr>/g)).toHaveLength(2);
    expect(html).toContain("Angelus Dómini");
    expect(html).toContain("O Anjo do Senhor");
    expect(html).toContain("Orémus.");
  });

  test("creates a standalone A4 document with a repeated double rule and content", () => {
    const html = printDocument("<h1>Angelus</h1><p>Amen.</p>");
    expect(html).toStartWith("<!DOCTYPE html>");
    expect(html).toContain("size:A4 portrait");
    expect(html).toContain("position:fixed; inset:0");
    expect(html).toContain("table-header-group");
    expect(html).toContain("<h1>Angelus</h1><p>Amen.</p>");
  });
});
