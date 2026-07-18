import "server-only";
import { FRAMEWORKS, type DiyFramework } from "./diy";

/* Kit updates for the DIY dashboard, read from CHANGELOG.md in the kit's own
   repo — chosen over a database table on purpose: the changelog is part of the
   kit, ships in the same commit as the change it describes, and needs no admin
   surface. Publishing an update = pushing a commit.

   Format it parses (Astro-Starter's real one, as of Jul 2026):

     ## 3.0.0 - Major Architecture Update
     ### Some subsection          ← ignored, only top-level bullets collected
     - Split large monolithic pages …
       - nested bullet            ← ignored (indented)

   The "## version - title" line splits on the first dash; a heading without a
   dash becomes a version with no title. Anything unparseable just yields fewer
   entries — never an error.

   Failure story is the opposite of our own tables: GitHub being down or the
   file missing (Eleventy-Starter has none yet) must NOT break the dashboard,
   so every failure path returns []. The card renders nothing and the rest of
   the page stands. Cached for an hour per framework via Next's fetch cache. */

export type KitUpdate = {
  version: string;
  title: string;
  items: string[];
};

export async function kitChangelog(framework: DiyFramework): Promise<KitUpdate[]> {
  const raw =
    FRAMEWORKS[framework].repoUrl.replace(
      "https://github.com/",
      "https://raw.githubusercontent.com/",
    ) + "/HEAD/CHANGELOG.md"; // HEAD = default branch, whatever it's named

  try {
    const res = await fetch(raw, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return parseChangelog(await res.text());
  } catch (err) {
    console.error(`[kit-changelog] could not fetch ${framework} changelog:`, err);
    return [];
  }
}

function parseChangelog(md: string): KitUpdate[] {
  const entries: KitUpdate[] = [];
  let current: KitUpdate | null = null;

  for (const line of md.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+)/);
    if (heading) {
      const [version, ...rest] = heading[1].split(/\s+[-—–]\s+/);
      current = { version: version.trim(), title: rest.join(" — ").trim(), items: [] };
      entries.push(current);
      continue;
    }
    // Top-level bullets only: indented ones are sub-details of the line above.
    const bullet = line.match(/^[-*]\s+(.+)/);
    if (bullet && current) current.items.push(bullet[1].trim());
  }

  // Newest first is the file's own order; three entries is plenty for a card.
  return entries.slice(0, 3);
}
