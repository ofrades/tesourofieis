import type { Docs } from "../../lib/documents";

/** The offline search corpus: the serialized index plus the documents it points at. */
export interface SearchCorpus {
  /** Serialized MiniSearch index, restored by `MiniSearch.loadJSONAsync`. */
  index: string;
  /** Every indexable document, keyed by id by the caller. */
  docs: Docs[];
}
