import { execFileSync } from "node:child_process";
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const baseUrl = "https://tesourofieis.com";
const appDir = join(process.cwd(), "src/app");
const publicDir = join(process.cwd(), "public");

/** Pages that should not be indexed: settings has no search value. */
const EXCLUDED_ROUTES = new Set(["/configurar"]);

interface RouteFile {
  route: string;
  file: string;
}

function getRoutes(dir: string, base = ""): RouteFile[] {
  const routes: RouteFile[] = [];
  const files = readdirSync(dir);

  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory() && !file.startsWith("_") && !file.startsWith("[")) {
      routes.push(...getRoutes(fullPath, `${base}/${file}`));
    } else if (file === "index.tsx" || file === "index.ts") {
      routes.push({ route: base || "/", file: fullPath });
    } else if (
      (file.endsWith(".tsx") || file.endsWith(".ts")) &&
      !file.startsWith("_") &&
      !file.startsWith("[") &&
      !file.startsWith("+")
    ) {
      routes.push({
        route: `${base}/${file.replace(/\.(tsx|ts)$/, "")}`,
        file: fullPath,
      });
    }
  }

  return routes;
}

/**
 * Latest commit date for every file under `src/app`, newest first. Using git
 * history instead of the build clock keeps `<lastmod>` meaningful: Google
 * discounts a sitemap where every URL claims to have changed on build day.
 */
function getLastModifiedDates(): Map<string, string> {
  try {
    const output = execFileSync("git", ["log", "--format=%cs", "--name-only", "--", "src/app"], {
      cwd: process.cwd(),
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
    });

    const dates = new Map<string, string>();
    let currentDate = "";

    for (const rawLine of output.split("\n")) {
      const line = rawLine.trim();
      if (line.length === 0) continue;

      if (/^\d{4}-\d{2}-\d{2}$/.test(line)) {
        currentDate = line;
      } else if (currentDate.length > 0 && !dates.has(line)) {
        dates.set(line, currentDate);
      }
    }

    return dates;
  } catch {
    return new Map<string, string>();
  }
}

function lastModifiedFor(file: string, dates: Map<string, string>, fallback: string): string {
  const repoPath = relative(process.cwd(), file).split("\\").join("/");
  const fromGit = dates.get(repoPath);
  if (fromGit !== undefined) return fromGit;

  try {
    return statSync(file).mtime.toISOString().slice(0, 10);
  } catch {
    return fallback;
  }
}

function generateSitemap(
  routes: RouteFile[],
  dates: Map<string, string>,
  buildDate: string,
): string {
  const urls = routes
    .map(({ route, file }) => {
      // The homepage is rebuilt around today's liturgy on every deploy, so its
      // real modification date is the build date rather than the file's commit.
      const lastmod = route === "/" ? buildDate : lastModifiedFor(file, dates, buildDate);

      return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const buildDate = new Date().toISOString().slice(0, 10);
const dates = getLastModifiedDates();
const routes = getRoutes(appDir)
  .filter(({ route }) => !EXCLUDED_ROUTES.has(route))
  .sort((a, b) => a.route.localeCompare(b.route));

const sitemap = generateSitemap(routes, dates, buildDate);
const outputPath = join(publicDir, "sitemap.xml");

writeFileSync(outputPath, sitemap, "utf-8");
console.log(`Generated sitemap.xml with ${routes.length} routes at ${outputPath}`);

if (routes.length < 50) {
  console.log("\nRoutes:");
  routes.forEach(({ route }) => console.log(`  ${baseUrl}${route}`));
}
