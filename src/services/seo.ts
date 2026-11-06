import type { DirectoryEntry } from "../../lib/documents";
import navigationData from "../../assets/navigation.json";

export const SITE_URL = "https://tesourofieis.com";
export const SITE_NAME = "Tesouro dos Fiéis";
export const SITE_DESCRIPTION =
  "Espaço dedicado à oração, exposição e preservação das santas tradições da Igreja.";
export const SITE_IMAGE = `${SITE_URL}/og.png`;

const HOME_TITLE = "Tesouro dos Fiéis — Missal Romano e Liturgia Diária";
const HOME_DESCRIPTION =
  "Missal Romano Tradicional, liturgia diária, devocionário e cânticos sacros em latim e português.";
const DEFAULT_ROBOTS = "index, follow";
const NOINDEX_ROBOTS = "noindex, follow";

interface StaticPage {
  title: string;
  description: string;
  indexable: boolean;
}

export interface Breadcrumb {
  name: string;
  path: string;
}

export interface PageSeo {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogType: "website" | "article";
  breadcrumbs: Breadcrumb[];
  jsonLd: string;
}

const SECTION_TITLES = new Map<string, string>([
  ["canticos", "Cânticos Sacros e Populares"],
  ["devocionario", "Devocionário Católico"],
  ["fe", "Documentos da Fé"],
  ["missal", "Missal Romano Tradicional"],
  ["ritual", "Ritual dos Sacramentos"],
]);

const SECTION_DESCRIPTIONS = new Map<string, string>([
  ["canticos", "Cânticos sacros e populares da tradição católica, em latim e português."],
  ["devocionario", "Orações, novenas, ladainhas e Ofício Divino da tradição católica."],
  ["fe", "Documentos e textos da fé católica."],
  [
    "missal",
    "Missal Romano Tradicional em latim e português: orações, leituras e ordinário da Missa.",
  ],
  ["ritual", "Ritos e sacramentos segundo a tradição católica."],
]);

const STATIC_PAGES = new Map<string, StaticPage>([
  [
    "/",
    {
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      indexable: true,
    },
  ],
  [
    "/calendario",
    {
      title: "Calendário Litúrgico — Tesouro dos Fiéis",
      description:
        "Calendário litúrgico tradicional: festas, memórias, tempos e dias de guarda de cada ano.",
      indexable: true,
    },
  ],
  [
    "/configurar",
    {
      title: "Configurações — Tesouro dos Fiéis",
      description: "Ajustes de leitura, idioma e notificações do aplicativo.",
      indexable: false,
    },
  ],
]);

const STATIC_SEGMENT_NAMES = new Map<string, string>([
  ["/calendario", "Calendário"],
  ["/configurar", "Configurações"],
]);

const navigationEntries: DirectoryEntry[] = navigationData;
const entriesByPath = new Map<string, DirectoryEntry>();

for (const entry of navigationEntries) {
  entriesByPath.set(normalizePath(entry.url), entry);
}

function findDuplicateTitles(): Set<string> {
  const counts = new Map<string, number>();
  for (const entry of navigationEntries) {
    counts.set(entry.title, (counts.get(entry.title) ?? 0) + 1);
  }

  const duplicates = new Set<string>();
  for (const [title, count] of counts) {
    if (count > 1) duplicates.add(title);
  }
  return duplicates;
}

const duplicateTitles = findDuplicateTitles();

function normalizePath(pathname: string): string {
  const withoutQuery = pathname.split(/[?#]/)[0] ?? "/";
  const trimmed = withoutQuery.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function canonicalFor(path: string): string {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

function humanizeSegment(segment: string): string {
  return segment
    .replace(/\(.*?\)/g, "")
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const body = lastSpace > maxLength * 0.6 ? cut.slice(0, lastSpace) : cut;
  return `${body.trimEnd()}…`;
}

function compact(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function breadcrumbsFor(path: string): Breadcrumb[] {
  const crumbs: Breadcrumb[] = [{ name: "Início", path: "/" }];
  if (path === "/") return crumbs;

  let current = "";
  for (const segment of path.split("/").filter(Boolean)) {
    current = `${current}/${segment}`;
    const entry = entriesByPath.get(current);
    crumbs.push({
      name: entry?.title ?? STATIC_SEGMENT_NAMES.get(current) ?? humanizeSegment(segment),
      path: current,
    });
  }
  return crumbs;
}

function contentTitle(entry: DirectoryEntry): string {
  const topLevel = entry.level === 0 && entry.section !== null && entry.section !== undefined;
  const sectionTitle = topLevel ? SECTION_TITLES.get(entry.section ?? "") : undefined;
  const baseTitle = sectionTitle ?? entry.title;
  const suffix = duplicateTitles.has(entry.title) ? duplicateSuffix(entry) : "";
  return `${baseTitle}${suffix} — ${SITE_NAME}`;
}

function formularyNumber(value: number): string | undefined {
  if (value === 1) return "I";
  if (value === 2) return "II";
  if (value === 3) return "III";
  return undefined;
}

function hasPrefixedVariant(entry: DirectoryEntry, path: string): boolean {
  for (const other of navigationEntries) {
    if (other.title !== entry.title) continue;
    if (normalizePath(other.url).startsWith(`${path}-`)) return true;
  }
  return false;
}

function hasForaPascalVariant(entry: DirectoryEntry): boolean {
  for (const other of navigationEntries) {
    if (other.title !== entry.title) continue;
    if (normalizePath(other.url).endsWith("forapascal")) return true;
  }
  return false;
}

/**
 * Some routes legitimately share a title: numbered common Mass formularies,
 * the 1962 Triduum, a transferred Sunday and a local calendar variant. Search
 * results need to tell them apart, so append the smallest truthful context.
 */
function duplicateSuffix(entry: DirectoryEntry): string {
  const path = normalizePath(entry.url);
  if (path.endsWith("-1962")) return " (1962)";
  if (hasPrefixedVariant(entry, path)) return "";

  const segment = path.split("/").at(-1) ?? "";
  if (segment.endsWith("forapascal")) return " (fora do Tempo Pascal)";
  if (hasForaPascalVariant(entry)) return "";

  const locality = /^\d{2}-\d{2}-(.+)$/.exec(segment);
  const localityName = locality?.[1];
  if (localityName !== undefined) {
    const basePath = path.slice(0, path.length - localityName.length - 1);
    if (entriesByPath.has(basePath)) return ` (${humanizeSegment(localityName)})`;
  }

  if (entry.parent === "missal/comum") {
    const numbered = /(\d+)$/.exec(segment);
    if (numbered !== null) {
      const roman = formularyNumber(Number(numbered[1]));
      if (roman !== undefined) return ` (Missa ${roman})`;
    }
  }

  const parentEntry =
    entry.parent === null || entry.parent === undefined
      ? undefined
      : entriesByPath.get(`/${entry.parent}`);
  return parentEntry !== undefined ? ` (${parentEntry.title})` : "";
}

function contentDescription(entry: DirectoryEntry): string {
  const extracted = compact(entry.description);
  const sectionDescription =
    entry.section === null || entry.section === undefined
      ? undefined
      : SECTION_DESCRIPTIONS.get(entry.section);
  const fallback = sectionDescription ?? SITE_DESCRIPTION;

  let description = extracted;
  if (description.length === 0) {
    description = entry.level === 0 ? fallback : compact(`${entry.title}. ${fallback}`);
  } else if (description.length < 70) {
    description = compact(`${entry.title}. ${description}`);
  }
  if (description.length < 70) {
    description = compact(`${description} ${SITE_DESCRIPTION}`);
  }
  return truncate(description, 158);
}

function homeJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "pt-PT",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
          width: 512,
          height: 512,
        },
        sameAs: ["https://github.com/tesourofieis/tesourofieis"],
      },
    ],
  });
}

function pageJsonLd(
  path: string,
  title: string,
  description: string,
  breadcrumbs: Breadcrumb[],
  includeWebPage: boolean,
): string {
  const breadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: canonicalFor(crumb.path),
    })),
  };

  if (!includeWebPage) {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [breadcrumbList],
    });
  }

  const canonical = canonicalFor(path);
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": canonical,
        url: canonical,
        name: title,
        description,
        inLanguage: "pt-PT",
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      breadcrumbList,
    ],
  });
}

export function getSeo(pathname: string): PageSeo {
  const path = normalizePath(pathname);
  const entry = entriesByPath.get(path);
  const staticPage = STATIC_PAGES.get(path);

  if (staticPage !== undefined) {
    const breadcrumbs = breadcrumbsFor(path);
    return {
      title: staticPage.title,
      description: staticPage.description,
      canonical: canonicalFor(path),
      robots: staticPage.indexable ? DEFAULT_ROBOTS : NOINDEX_ROBOTS,
      ogType: "website",
      breadcrumbs,
      jsonLd:
        path === "/"
          ? homeJsonLd()
          : pageJsonLd(
              path,
              staticPage.title,
              staticPage.description,
              breadcrumbs,
              staticPage.indexable,
            ),
    };
  }

  if (entry !== undefined) {
    const title = contentTitle(entry);
    const description = contentDescription(entry);
    const breadcrumbs = breadcrumbsFor(path);
    return {
      title,
      description,
      canonical: canonicalFor(path),
      robots: DEFAULT_ROBOTS,
      ogType: entry.level > 0 ? "article" : "website",
      breadcrumbs,
      jsonLd: pageJsonLd(path, title, description, breadcrumbs, true),
    };
  }

  return {
    title: `Página não encontrada — ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    canonical: canonicalFor(path),
    robots: NOINDEX_ROBOTS,
    ogType: "website",
    breadcrumbs: breadcrumbsFor("/"),
    jsonLd: "",
  };
}
