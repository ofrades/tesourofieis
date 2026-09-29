import { describe, expect, test } from "bun:test";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

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

const DOM_TAG_PATTERN = new RegExp(`</?(${DOM_ONLY_TAGS.join("|")})(?=[\\s/>])`);

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
  test("no raw HTML elements outside the web-only html shell", () => {
    const offenders: string[] = [];
    const files: string[] = [];
    collectTsx(SRC, files);

    for (const file of files) {
      // `+html.tsx` is the web static-rendering shell; raw HTML is its job.
      if (file.includes("+html")) continue;

      const lines = readFileSync(file, "utf8").split("\n");
      lines.forEach((line, index) => {
        const match = DOM_TAG_PATTERN.exec(line);
        if (match) {
          offenders.push(`${relative(SRC, file)}:${index + 1}  ${match[0]}`);
        }
      });
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
