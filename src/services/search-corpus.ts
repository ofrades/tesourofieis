import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Docs } from "../../lib/documents";
import type { SearchCorpus } from "./search-corpus.types";

// Bun/Node entry point: `bun test` has no Metro asset registry, so it reads the
// same corpus files straight from disk. Metro resolves the `.native`/`.web`
// variants, keeping this file out of the app bundle.
const assetsDir = join(import.meta.dir, "..", "..", "assets");

export async function loadSearchCorpus(): Promise<SearchCorpus> {
  return {
    index: readFileSync(join(assetsDir, "search-index.searchdata"), "utf8"),
    docs: JSON.parse(readFileSync(join(assetsDir, "docs.searchdata"), "utf8")) as Docs[],
  };
}
