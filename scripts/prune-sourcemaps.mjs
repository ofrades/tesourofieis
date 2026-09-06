// Prunes web-hostile artifacts from dist/ after `expo export --platform web`.
// - Removes *.map — Cloudflare Workers Assets rejects any single asset over
//   25 MB (web sourcemaps have exceeded that), and maps are dead weight in
//   production hosting.
// - Removes native-only leftovers (_expo/static/js/{android,ios},
//   metadata.json, assetmap.json): Hermes bytecode for OTA updates that no
//   browser can use. A correct `--platform web` export never emits them, but
//   if dist/ is ever rebuilt without the platform flag (default is `all`)
//   they would breach the 25 MB limit and bloat the upload ~100 MB.
// Invoked without dash-flags because alchemy's command plumbing routes
// through npm arg parsing, which eats flags like `-name` / `-delete`.
import { readdirSync, rmSync } from "node:fs";

function walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const p = `${dir}/${entry.name}`;
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith(".map")) rmSync(p);
  }
}

walk("dist");

// Native-only artifacts: useless (and oversized) on Cloudflare web hosting.
for (const p of [
  "dist/_expo/static/js/android",
  "dist/_expo/static/js/ios",
  "dist/metadata.json",
  "dist/assetmap.json",
]) {
  rmSync(p, { recursive: true, force: true });
}
