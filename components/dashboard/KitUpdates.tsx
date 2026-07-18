import { ExternalLink, Megaphone } from "lucide-react";
import { FRAMEWORKS, type DiyFramework } from "@/lib/diy";
import { kitChangelog } from "@/lib/kit-changelog";

/* What's new in their kit — the DIY account's reason to come back. Reads the
   kit repo's CHANGELOG.md (lib/kit-changelog.ts, cached an hour) and renders
   nothing at all when there's nothing to show: a kit without a changelog file
   gets no empty-state card nagging its author. Async server component; the
   only interaction is the link out to the full file on GitHub. */

export default async function KitUpdates({ framework }: { framework: DiyFramework }) {
  const updates = await kitChangelog(framework);
  if (updates.length === 0) return null;

  const kit = FRAMEWORKS[framework];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700">
          <Megaphone className="h-6 w-6" />
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Kit updates</h2>
          <p className="text-sm text-slate-500">
            What&apos;s new in the {kit.label} kit — pull to get the latest.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        {updates.map((update) => (
          <div key={update.version} className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100">
            <p className="text-sm font-bold text-slate-900">
              {update.version}
              {update.title && (
                <span className="ml-2 font-medium text-slate-500">{update.title}</span>
              )}
            </p>
            {update.items.length > 0 && (
              <ul className="mt-2 flex flex-col gap-1">
                {update.items.slice(0, 4).map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-slate-600">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <a
        href={`${kit.repoUrl}/blob/HEAD/CHANGELOG.md`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-blue-700"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        Full changelog on GitHub
      </a>
    </section>
  );
}
