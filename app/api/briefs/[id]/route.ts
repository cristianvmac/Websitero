import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { BRIEFS_BUCKET, supabaseAdmin } from "@/lib/supabase";
import type { Brief } from "@/app/forme/brief";

/* Admin mutations for a stored brief:
   PATCH  — merge edited fields (business, style, prompt, contact) into the
            brief's jsonb so the team can complete a materials brief before
            building it.
   DELETE — remove the brief, its uploads, and any built preview.
   Team-only: proxy.ts gates this path behind ADMIN_PASSWORD. */

const ID_RE = /^[a-zA-Z0-9-]+$/;

// Only trimmed strings make it into the stored brief — anything else in the
// payload (wrong types, missing keys) leaves the existing value untouched.
const str = (v: unknown) => (typeof v === "string" ? v.trim() : undefined);

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!ID_RE.test(id)) {
    return NextResponse.json({ ok: false, error: "Invalid brief id" }, { status: 400 });
  }

  let patch: Partial<Brief>;
  try {
    patch = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const supabase = supabaseAdmin();
  const { data: row, error: readError } = await supabase
    .from("briefs")
    .select("brief")
    .eq("id", id)
    .maybeSingle();
  if (readError) {
    console.error("[briefs] read failed:", readError);
    return NextResponse.json({ ok: false, error: "Could not read brief" }, { status: 500 });
  }
  if (!row) {
    return NextResponse.json({ ok: false, error: "Brief not found" }, { status: 404 });
  }

  // Merge only the fields the edit form owns — the owner's uploads (`images`,
  // `doc`) and `features` can't be clobbered from here.
  const b = row.brief as Brief;
  b.business = {
    name: str(patch.business?.name) ?? b.business.name,
    type: str(patch.business?.type) ?? b.business.type,
    location: str(patch.business?.location) ?? b.business.location,
  };
  const color = str(patch.style?.brandColor);
  b.style = {
    brandColor: color && /^#[0-9a-fA-F]{3,8}$/.test(color) ? color : b.style.brandColor,
    vibe: str(patch.style?.vibe) ?? b.style.vibe,
  };
  if (typeof patch.prompt === "string") b.prompt = patch.prompt.trim();
  const email = str(patch.contact?.email);
  if (email !== undefined) {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }
    b.contact.email = email;
  }
  const phone = str(patch.contact?.phone);
  if (phone !== undefined) b.contact.phone = phone;

  const { error: writeError } = await supabase.from("briefs").update({ brief: b }).eq("id", id);
  if (writeError) {
    console.error("[briefs] update failed:", writeError);
    return NextResponse.json({ ok: false, error: "Could not save changes" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, brief: b });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!ID_RE.test(id)) {
    return NextResponse.json({ ok: false, error: "Invalid brief id" }, { status: 400 });
  }

  const supabase = supabaseAdmin();

  // The owner's materials go first: an orphaned row is visible and fixable in
  // the queue, whereas an orphaned folder is invisible and would quietly keep
  // customer documents around after their brief is gone.
  const { data: listed } = await supabase.storage.from(BRIEFS_BUCKET).list(id);
  if (listed?.length) {
    const { error } = await supabase.storage
      .from(BRIEFS_BUCKET)
      .remove(listed.map((f) => `${id}/${f.name}`));
    if (error) {
      console.error("[briefs] could not remove uploads:", error);
      return NextResponse.json({ ok: false, error: "Could not remove uploads" }, { status: 500 });
    }
  }

  const { data: deleted, error } = await supabase
    .from("briefs")
    .delete()
    .eq("id", id)
    .select("id");
  if (error) {
    console.error("[briefs] delete failed:", error);
    return NextResponse.json({ ok: false, error: "Could not delete brief" }, { status: 500 });
  }
  if (!deleted?.length) {
    return NextResponse.json({ ok: false, error: "Brief not found" }, { status: 404 });
  }

  // Local-only cleanup: the preview, its manifest entry, and the workspace (which
  // holds any code hand-written for this customer). None of these exist on a
  // deployed host — previews/ and workspaces/ are gitignored build output — so
  // this is a no-op there and only does real work on the developer's machine.
  try {
    const manifestPath = path.join(process.cwd(), "previews", "manifest.json");
    const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
    const slug: string | undefined = manifest[id]?.slug;
    if (slug) {
      delete manifest[id];
      await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
      if (ID_RE.test(slug)) {
        for (const dir of ["previews", "workspaces"]) {
          await fs.rm(path.join(process.cwd(), dir, slug), { recursive: true, force: true });
        }
      }
    }
  } catch {
    /* never built, or not running locally — no preview or workspace to clean */
  }

  return NextResponse.json({ ok: true });
}
