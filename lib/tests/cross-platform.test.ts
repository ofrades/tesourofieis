import { describe, expect, test } from "bun:test";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import ts from "typescript";

/**
 * Cross-platform guard: React Native has no lowercase intrinsic elements.
 *
 * A raw HTML tag such as `<aside>` renders fine under react-native-web, but
 * on iOS/Android React Native throws
 *   "View config getter callback for component `aside` must be a function"
 * and the screen blanks out or the app crashes.
 *
 * Two safety nets normally catch this class of mistake and both miss it here:
 *  - TypeScript passes because tsconfig enables the DOM lib, which declares
 *    `aside` (and friends) as valid JSX intrinsics.
 *  - oxlint has no rule for it, and the tag is invisible to the layout checks.
 *
 * Inline tags (`b`, `i`, `em`, `strong`, `code`, `pre`, `sup`, `sub`, `small`)
 * are intentionally omitted from the list below: they legitimately appear
 * inside strings, e.g. the FTS highlight markers in src/components/Search.tsx.
 */

const SRC = join(import.meta.dir, "../..", "src");

const DOM_ONLY_TAGS = [
  "aside",
  "article",
  "section",
  "main",
  "nav",
  "header",
  "footer",
  "div",
  "span",
  "ul",
  "ol",
  "li",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "td",
  "th",
  "blockquote",
  "figure",
  "figcaption",
  "form",
  "label",
  "input",
  "button",
  "select",
  "option",
  "textarea",
  "img",
  "video",
  "audio",
  "iframe",
  "canvas",
  "hr",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "dl",
  "dt",
  "dd",
  "fieldset",
  "legend",
  "details",
  "summary",
];

function findHtmlElements(file: string, source: string): string[] {
  const parsed = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const offenders: string[] = [];
  function visit(node: ts.Node): void {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName.getText(parsed);
      if (DOM_ONLY_TAGS.includes(tag)) {
        const { line } = parsed.getLineAndCharacterOfPosition(node.getStart(parsed));
        offenders.push(`${file}:${line + 1}  <${tag}>`);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(parsed);
  return offenders;
}

function collectTsx(dir: string, into: string[]): void {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      collectTsx(full, into);
      continue;
    }
    if (entry.endsWith(".tsx")) into.push(full);
  }
}

describe("cross-platform rendering", () => {
  test("distinguishes native JSX from printable HTML strings", () => {
    expect(findHtmlElements("native.tsx", 'const html = `<img src="image" />`;')).toEqual([]);
    expect(findHtmlElements("native.tsx", "const view = <div />;")).toEqual([
      "native.tsx:1  <div>",
    ]);
  });

  test("no raw HTML elements outside web-only modules", () => {
    const offenders: string[] = [];
    const files: string[] = [];
    collectTsx(SRC, files);

    for (const file of files) {
      // `+html.tsx` is the web static-rendering shell; raw HTML is its job.
      if (file.includes("+html") || file.endsWith(".web.tsx")) continue;
      offenders.push(...findHtmlElements(relative(SRC, file), readFileSync(file, "utf8")));
    }

    if (offenders.length) {
      console.error(
        `Raw HTML elements crash native renders. Use a React Native component instead:\n${offenders
          .map((o) => `  ${o}`)
          .join("\n")}`,
      );
    }
    expect(offenders).toEqual([]);
  });
});
