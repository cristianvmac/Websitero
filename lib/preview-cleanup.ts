import "server-only";
import { promises as fs } from "fs";
import path from "path";

/* What a deleted brief leaves behind on a developer's machine: the built
   preview, its manifest entry, and the workspace holding any code hand-written
   for that customer. Shared by the two places a brief can be deleted — the
   admin queue (app/api/briefs/[id]/route.ts) and the owner's own "delete my
   site" action — so neither can drift into leaving half of it around.

   None of this exists on a deployed host: previews/ and workspaces/ are
   gitignored build output, so there it's a no-op. Failure is swallowed for the
   same reason — the brief row and the uploads are already gone by the time this
   runs, and stale local build output is not worth failing a delete over. */

const SLUG_RE = /^[a-zA-Z0-9-]+$/;

export async function removeLocalPreview(briefId: string): Promise<void> {
  try {
    const manifestPath = path.join(process.cwd(), "previews", "manifest.json");
    const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
    const slug: string | undefined = manifest[briefId]?.slug;
    if (!slug) return;

    delete manifest[briefId];
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    // The slug comes off disk, and it's about to be joined into an rm -rf path.
    if (!SLUG_RE.test(slug)) return;
    for (const dir of ["previews", "workspaces"]) {
      await fs.rm(path.join(process.cwd(), dir, slug), { recursive: true, force: true });
    }
  } catch {
    /* never built, or not running locally — no preview or workspace to clean */
  }
}
