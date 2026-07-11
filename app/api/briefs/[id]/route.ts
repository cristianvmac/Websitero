import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import type { Brief } from "@/app/forme/brief";

/* Admin mutations for a stored brief:
   PATCH  — merge edited fields (business, style, prompt, contact) into
            briefs/<id>.json so the team can complete a materials brief
            before building it.
   DELETE — remove the brief, its uploads, and any built preview.
   Same caveat as /admin/briefs: no auth yet, local / self-hosted only. */

const ID_RE = /^[a-zA-Z0-9-]+$/;

const briefPath = (id: string) => path.join(process.cwd(), "briefs", `${id}.json`);

// Only trimmed strings make it into the stored brief — anything else in the
// payload (wrong types, missing keys) leaves the existing value untouched.
const str = (v: unknown) => (typeof v === "string" ? v.trim() : undefined);

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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

  let record: { id: string; receivedAt: string; brief: Brief };
  try {
    record = JSON.parse(await fs.readFile(briefPath(id), "utf8"));
  } catch {
    return NextResponse.json({ ok: false, error: "Brief not found" }, { status: 404 });
  }

  // Merge only the fields the edit form owns — the owner's uploads (`images`,
  // `doc`) and `features` can't be clobbered from here.
  const b = record.brief;
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

  await fs.writeFile(briefPath(id), JSON.stringify(record, null, 2));
  return NextResponse.json({ ok: true, brief: b });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!ID_RE.test(id)) {
    return NextResponse.json({ ok: false, error: "Invalid brief id" }, { status: 400 });
  }

  try {
    await fs.rm(briefPath(id));
  } catch {
    return NextResponse.json({ ok: false, error: "Brief not found" }, { status: 404 });
  }

  // Best-effort cleanup of everything the brief produced: the owner's uploads,
  // and — if it was ever built — its preview, its manifest entry, and the
  // workspace (which holds any code the developer hand-wrote for them).
  await fs
    .rm(path.join(process.cwd(), "briefs", "uploads", id), { recursive: true, force: true })
    .catch(() => {});

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
    /* never built — no preview, manifest entry, or workspace to clean */
  }

  return NextResponse.json({ ok: true });
}
