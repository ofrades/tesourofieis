import { Asset } from "expo-asset";
import { File } from "expo-file-system";
import docsAsset from "../../assets/docs.searchdata";
import indexAsset from "../../assets/search-index.searchdata";
import type { Docs } from "../../lib/documents";
import type { SearchCorpus } from "./search-corpus.types";

async function readAssetText(moduleId: number): Promise<string> {
  const asset = await Asset.fromModule(moduleId).downloadAsync();
  if (!asset.localUri) throw new Error("Search corpus asset is unavailable.");
  return new File(asset.localUri).text();
}

/**
 * Native entry point. The corpus ships as a bundled asset rather than a JS
 * module, so it is read from disk only when the user first opens search.
 */
export async function loadSearchCorpus(): Promise<SearchCorpus> {
  const [index, docs] = await Promise.all([readAssetText(indexAsset), readAssetText(docsAsset)]);
  return { index, docs: JSON.parse(docs) as Docs[] };
}
