// The component library the build pipeline picks homepage sections from.
//
// The single source of truth is the docs site itself: every component page
// under app/docs/<docsSet>/components/<category>/samples/*.ts exports its
// CodeStitch block as `sampleHtml` / `sampleCss` / `sampleJs` template
// literals. This module parses those files (no TS compile needed — they're
// plain tagged strings) so the docs and the builder can never drift apart:
// a component added to the docs is automatically available to the builder.
//
// `docsSet` picks the library: "eleventy" (default) or "astro" — one per kit,
// mirroring the two docs sections. Both follow the same CodeStitch class
// contract, so the composer treats them identically.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const componentsDir = (docsSet) => path.join(repoRoot, "app", "docs", docsSet, "components");

function extractExport(source, name) {
  const match = source.match(new RegExp(`export const ${name}\\s*=\\s*\`([\\s\\S]*?)\`;`));
  return match ? match[1].trim() : "";
}

/**
 * Read every sample in a docs component category.
 * Returns [{ id: "hero/LandingCenter", category, name, html, css, js }]
 * — samples without real markup (empty docs placeholders) are skipped.
 */
export function loadCategory(category, docsSet = "eleventy") {
  const dir = path.join(componentsDir(docsSet), category, "samples");
  if (!fs.existsSync(dir)) return [];
  const variants = [];
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".ts"))) {
    const source = fs.readFileSync(path.join(dir, file), "utf8");
    const html = extractExport(source, "sampleHtml");
    if (html.length < 100) continue; // placeholder sample, nothing to inject
    const name = path.basename(file, ".ts").replace(/^samples/, "");
    variants.push({
      id: `${category}/${name}`,
      category,
      name,
      html,
      css: extractExport(source, "sampleCss"),
      js: extractExport(source, "sampleJs"),
    });
  }
  return variants;
}

/** Look up specific variants by id ("category/Name"), keeping the given order. */
export function loadVariants(ids, docsSet = "eleventy") {
  const byCategory = new Map();
  return ids
    .map((id) => {
      const [category, name] = id.split("/");
      if (!byCategory.has(category)) byCategory.set(category, loadCategory(category, docsSet));
      const hit = byCategory.get(category).find((v) => v.name === name);
      if (!hit) console.warn(`⚠ component library (${docsSet}): no sample for ${id}`);
      return hit;
    })
    .filter(Boolean);
}
