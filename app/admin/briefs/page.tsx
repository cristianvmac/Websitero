import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { Inbox, ExternalLink, CheckCircle2, CircleDashed, FileText, Code2 } from "lucide-react";
import type { Brief } from "@/app/forme/brief";
import BuildButton from "./BuildButton";
import DeleteButton from "./DeleteButton";
import EditBrief from "./EditBrief";

/* Internal fulfillment queue: every brief submitted via /forme or
   /builditforme, its build status, the owner's materials (sent text, doc
   download, photo thumbnails — files served via /api/admin/uploads), an
   inline editor to complete a brief before building, and one-click
   (re)build / delete. No auth yet — do NOT deploy this publicly before
   adding access control. */

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
    <section className="min-h-screen bg-white px-6 pb-24 pt-28">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-white shadow-lg shadow-blue-500/30">
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
              <Link href="/builditforme" className="font-semibold text-blue-700 hover:underline">
                /builditforme
              </Link>
              .
            </div>
          )}

          {records.map(({ id, receivedAt, brief }) => {
            const built = manifest[id];
            // Materials briefs (the /builditforme upload flow) arrive without
            // the structured wizard fields — the doc/text/photos ARE the brief.
            const isMaterials = !brief.business.name?.trim();
            const uploads = brief.images?.mode === "upload" ? brief.images.files ?? [] : [];
            const sentText = brief.prompt?.trim();

            const parts: string[] = [];
            if (brief.doc) parts.push("doc");
            if (uploads.length > 0)
              parts.push(`${uploads.length} photo${uploads.length === 1 ? "" : "s"}`);
            if (sentText) parts.push("text");
            const summary = isMaterials
              ? parts.join(" · ") || "empty brief"
              : `${brief.business.type} · ${brief.business.location}`;

            return (
              <div
                key={id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {/* Brand color swatch from the wizard */}
                  <span
                    aria-hidden
                    className="hidden h-10 w-10 shrink-0 rounded-xl ring-1 ring-black/5 sm:block"
                    style={{ backgroundColor: brief.style.brandColor }}
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-slate-900">
                      {isMaterials ? (
                        <span className="inline-flex items-center gap-1.5">
                          <FileText className="h-4 w-4 text-blue-500" />
                          Materials
                        </span>
                      ) : (
                        brief.business.name
                      )}
                      <span className="ml-2 text-xs font-medium text-slate-400">{summary}</span>
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
                    {/* Where the developer hand-edits this customer's site */}
                    {built && (
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                        <Code2 className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">
                          Edit{" "}
                          <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[11px] text-slate-600">
                            workspaces/{built.slug}/
                          </code>{" "}
                          then hit Rebuild code
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
                    {built && (
                      <a
                        href={`/previews/${built.slug}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 px-4 py-2 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-500/10"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Preview
                      </a>
                    )}
                    {/* Only once a workspace exists is there code to recompile */}
                    {built && <BuildButton briefId={id} rebuild codeOnly />}
                    <BuildButton briefId={id} rebuild={Boolean(built)} />
                    <DeleteButton briefId={id} />
                  </div>
                </div>

                {/* The owner's materials — sent text, doc download, photo thumbnails */}
                {(sentText || brief.doc || uploads.length > 0) && (
                  <div className="flex flex-col gap-3 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
                    {sentText && (
                      <p className="max-h-40 overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
                        {sentText}
                      </p>
                    )}
                    {brief.doc && (
                      <a
                        href={`/api/admin/uploads/${id}/${brief.doc.file}`}
                        download
                        className="inline-flex w-fit items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-500/40 hover:text-blue-700"
                      >
                        <FileText className="h-3.5 w-3.5 text-blue-500" />
                        {brief.doc.file}
                      </a>
                    )}
                    {uploads.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {uploads.map((f) => (
                          <a
                            key={f}
                            href={`/api/admin/uploads/${id}/${f}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={f}
                            className="transition-opacity hover:opacity-80"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element -- served by the admin uploads route */}
                            <img
                              src={`/api/admin/uploads/${id}/${f}`}
                              alt={f}
                              className="h-16 w-16 rounded-lg object-cover ring-1 ring-black/5"
                            />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Complete / correct the brief before (re)building */}
                <EditBrief briefId={id} brief={brief} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
