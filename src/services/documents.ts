import type { DirectoryEntry } from "../../lib/documents";
import navigationData from "../../assets/navigation.json";

const entries: DirectoryEntry[] = navigationData;
const childrenByParent = new Map<string, DirectoryEntry[]>();
for (const entry of entries) {
  const parent = entry.parent ?? "";
  const siblings = childrenByParent.get(parent) ?? [];
  siblings.push(entry);
  childrenByParent.set(parent, siblings);
}
for (const siblings of childrenByParent.values()) {
  siblings.sort((a, b) => a.title.localeCompare(b.title, "pt"));
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
