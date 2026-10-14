import type { DirectoryEntry } from "../../lib/documents";
import navigationData from "../../assets/navigation.json";

const entries: DirectoryEntry[] = navigationData;
const childrenByParent = new Map<string, DirectoryEntry[]>();

/**
 * Portuguese title collation, cached. `String.prototype.localeCompare(other,
 * "pt")` rebuilds a collator on every call, which made this module-load sort
 * the single largest cost of app startup (measured: ~2.3s on device vs ~15ms
 * on a JS engine that caches it).
 */
const titleCollator = new Intl.Collator("pt");

for (const entry of entries) {
  const parent = entry.parent ?? "";
  const siblings = childrenByParent.get(parent) ?? [];
  siblings.push(entry);
  childrenByParent.set(parent, siblings);
}
for (const siblings of childrenByParent.values()) {
  siblings.sort((a, b) => titleCollator.compare(a.title, b.title));
}

export function findBySlug(slug: string): DirectoryEntry[] {
  return getChildren(slug.replace(/^\/+|\/+$/g, ""));
}

export function getAllTopLevelDocs(): DirectoryEntry[] {
  return getChildren("");
}

export function getChildren(parent: string): DirectoryEntry[] {
  return childrenByParent.get(parent) ?? [];
}

export function getAvailableSections(): string[] {
  return [...new Set(entries.flatMap((entry) => (entry.section ? [entry.section] : [])))].sort();
}

const SECTION_DISPLAY_NAMES = new Map<string, string>([
  ["canticos", "Cânticos"],
  ["devocionario", "Devocionário"],
  ["fe", "Fé"],
  ["missal", "Missal"],
  ["ritual", "Ritual"],
]);

export function getSectionDisplayName(section: string): string {
  return SECTION_DISPLAY_NAMES.get(section) ?? section;
}
