"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  GitBranch,
  Globe,
  LinkIcon,
  LoaderCircle,
  X,
} from "lucide-react";
import { FRAMEWORKS, repoSlug, type DiyFramework } from "@/lib/diy";
import { linkDiySite } from "@/app/dashboard/actions";

/* Where a DIY account tells us where its site is. Two different "wheres", and
   the difference is the whole point of this card:

   siteUrl  where it's SERVED. Renders a Visit button and nothing else — a live
            address lets us look at a site, which is all you can do with one.
   repoUrl  where the CODE is. No Visit button: a repo isn't the site, it's the
            thing you can work on. This is what makes "Have us finish it"
            possible, so the empty state sells it that way rather than as
            another address field.

   Both are optional and independent; whoever has only one sees only that row.

   Two looks:

   nothing linked → the form, both fields, one save.
   linked         → what's set, plus Change (reopens the form prefilled) and
                    Unlink (submits both blank — same action, no second one).

   The server action is passed to useActionState directly so the form still
   posts without JavaScript. Success needs no local flag: the action
   revalidates, the values change, and the page keys this card by them — the
   remount is what closes the edit form. */

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-shadow placeholder:text-slate-400 focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10";

export default function LinkSiteCard({
  siteUrl,
  repoUrl,
  framework,
}: {
  siteUrl: string;
  repoUrl: string;
  framework: DiyFramework;
}) {
  const [editing, setEditing] = useState(false);
  const [state, formAction, pending] = useActionState(linkDiySite, null);

  const linked = Boolean(siteUrl || repoUrl);
  const showForm = !linked || editing;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700">
          <Globe className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold text-slate-900">My site</h2>

          {showForm ? (
            <>
              <p className="text-sm text-slate-500">
                Tell us where your site lives. Either one on its own is fine.
              </p>

              <form action={formAction} className="mt-4 flex flex-col gap-4">
                <label className="block">
                  <span className="text-xs font-semibold text-slate-700">Live address</span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    If it&apos;s online already — we&apos;ll keep it one click away.
                  </span>
                  <input
                    name="url"
                    type="text"
                    inputMode="url"
                    defaultValue={siteUrl}
                    placeholder="mysite.com"
                    className={`mt-2 ${inputCls}`}
                  />
                </label>

                <label className="block">
                  <span className="text-xs font-semibold text-slate-700">Code repository</span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    Still on your computer? Push it to GitHub and paste the link — that&apos;s
                    what lets us step in and finish the build with you.
                  </span>
                  <input
                    name="repoUrl"
                    type="text"
                    inputMode="url"
                    defaultValue={repoUrl}
                    placeholder="github.com/you/my-website"
                    className={`mt-2 ${inputCls}`}
                  />
                </label>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40 disabled:opacity-60"
                  >
                    {pending ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <LinkIcon className="h-4 w-4" />
                    )}
                    {pending ? "Saving…" : "Save"}
                  </button>
                  {linked && (
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                    >
                      <X className="h-4 w-4" />
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              {state?.error && (
                <p className="mt-2 text-sm font-medium text-rose-600">{state.error}</p>
              )}

              {/* Only while nothing's linked — once something is, this is noise,
                  and reopening the edit form shouldn't bring it back. */}
              {!linked && (
                <Link
                  href={`${FRAMEWORKS[framework].docsHref}/deployment`}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-slate-500 transition-colors hover:text-blue-700"
                >
                  Not live yet? Put it online free with Netlify or Vercel
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </>
          ) : (
            <>
              <dl className="mt-2 flex flex-col gap-3">
                {siteUrl && (
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <dt className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                      <Globe className="h-3.5 w-3.5" />
                      Live
                    </dt>
                    <dd className="min-w-0 flex-1 truncate text-sm text-slate-600">{siteUrl}</dd>
                    <a
                      href={siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Visit my site
                    </a>
                  </div>
                )}
                {repoUrl && (
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <dt className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                      <GitBranch className="h-3.5 w-3.5" />
                      Code
                    </dt>
                    {/* No Visit button: this is where your site is worked on,
                        not where it's read. */}
                    <dd className="min-w-0 flex-1 truncate text-sm text-slate-600">
                      {repoSlug(repoUrl)}
                    </dd>
                  </div>
                )}
              </dl>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                >
                  Change
                </button>
                <form action={formAction}>
                  {/* Both blank = unlink everything, same action */}
                  <input type="hidden" name="url" value="" />
                  <input type="hidden" name="repoUrl" value="" />
                  <button
                    type="submit"
                    disabled={pending}
                    className="text-xs font-semibold text-slate-400 underline-offset-2 transition-colors hover:text-rose-600 hover:underline disabled:opacity-60"
                  >
                    Unlink
                  </button>
                </form>
              </div>

              {state?.error && (
                <p className="mt-2 text-sm font-medium text-rose-600">{state.error}</p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
