import { Asset } from "expo-asset";
import docsAsset from "../../assets/docs.searchdata";
import indexAsset from "../../assets/search-index.searchdata";
import type { Docs } from "../../lib/documents";
import type { SearchCorpus } from "./search-corpus.types";

async function readAssetText(moduleId: number): Promise<string> {
  const asset = Asset.fromModule(moduleId);
  await asset.downloadAsync();
  const uri = asset.localUri ?? asset.uri;
  if (!uri) throw new Error("Search corpus asset is unavailable.");
  return (await fetch(uri)).text();
}

/**
 * Web entry point. The corpus is a static asset fetched only when the user
 * first opens search, so it stays out of the initial client bundle.
 */
export async function loadSearchCorpus(): Promise<SearchCorpus> {
  const [index, docs] = await Promise.all([readAssetText(indexAsset), readAssetText(docsAsset)]);
  return { index, docs: JSON.parse(docs) as Docs[] };
}
