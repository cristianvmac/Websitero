import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { Inbox, ExternalLink, CheckCircle2, CircleDashed } from "lucide-react";
import type { Brief } from "@/app/forme/brief";
import BuildButton from "./BuildButton";

/* Internal fulfillment queue: every brief submitted via /forme, its build
   status, and a one-click (re)build. No auth yet — do NOT deploy this
   publicly before adding access control. */

export const dynamic = "force-dynamic"; // always read the briefs dir fresh

interface BriefRecord {
  id: string;
  receivedAt: string;
  brief: Brief;
}

interface ManifestEntry {
  slug: string;
  builtAt: string;
}

async function loadData() {
  const root = process.cwd();
  let records: BriefRecord[] = [];
  try {
    const files = await fs.readdir(path.join(root, "briefs"));
    records = await Promise.all(
      files
        .filter((f) => f.endsWith(".json"))
        .map(async (f) =>
          JSON.parse(await fs.readFile(path.join(root, "briefs", f), "utf8")),
        ),
    );
    records.sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
  } catch {
    /* no briefs dir yet — empty queue */
  }

  let manifest: Record<string, ManifestEntry> = {};
  try {
    manifest = JSON.parse(
      await fs.readFile(path.join(root, "previews", "manifest.json"), "utf8"),
    );
  } catch {
    /* nothing built yet */
  }

  return { records, manifest };
}

export default async function AdminBriefs() {
  const { records, manifest } = await loadData();

  return (
    <section className="min-h-screen bg-linear-to-b from-slate-50 to-white px-6 pb-24 pt-28">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#4588ba] to-[#316994] text-white shadow-lg shadow-[#4588ba]/30">
            <Inbox className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Briefs</h1>
            <p className="text-sm text-slate-500">
              {records.length} {""} submitted · every &quot;Build it for me&quot; request lands here
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {records.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
              No briefs yet — submit one via{" "}
              <Link href="/forme" className="font-semibold text-[#316994] hover:underline">
                /forme
              </Link>
              .
            </div>
          )}

          {records.map(({ id, receivedAt, brief }) => {
            const built = manifest[id];
            return (
              <div
                key={id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
              >
                {/* Brand color swatch from the wizard */}
                <span
                  aria-hidden
                  className="hidden h-10 w-10 shrink-0 rounded-xl ring-1 ring-black/5 sm:block"
                  style={{ backgroundColor: brief.style.brandColor }}
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-slate-900">
                    {brief.business.name}
                    <span className="ml-2 text-xs font-medium text-slate-400">
                      {brief.business.type} · {brief.business.location}
                    </span>
                  </p>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {brief.contact.email}
                    {brief.contact.phone && ` · ${brief.contact.phone}`} ·{" "}
                    {new Date(receivedAt).toLocaleString()}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-medium">
                    {built ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-700">
                          Built {new Date(built.builtAt).toLocaleString()}
                        </span>
                      </>
                    ) : (
                      <>
                        <CircleDashed className="h-3.5 w-3.5 text-slate-400" />
                        <span className="text-slate-500">Not built yet</span>
                      </>
                    )}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
                  {built && (
                    <a
                      href={`/previews/${built.slug}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#4588ba]/30 bg-[#4588ba]/5 px-4 py-2 text-xs font-semibold text-[#316994] transition-colors hover:bg-[#4588ba]/10"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Preview
                    </a>
                  )}
                  <BuildButton briefId={id} rebuild={Boolean(built)} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
