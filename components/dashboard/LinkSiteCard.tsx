"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Globe, LinkIcon, LoaderCircle, X } from "lucide-react";
import { FRAMEWORKS, type DiyFramework } from "@/lib/diy";
import { linkDiySite } from "@/app/dashboard/actions";

/* Where the DIY account's deployed site gets linked. Two looks:

   not linked → one input + button ("mysite.com" is enough; the action adds
                the scheme).
   linked     → the address with a Visit button, plus Change (reopens the
                form prefilled) and Unlink (same action, empty url).

   The server action is passed to useActionState directly so the form still
   posts without JavaScript. Success needs no local flag: the action
   revalidates, siteUrl changes, and the page keys this card by siteUrl —
   the remount is what closes the edit form.

   The action only stores a public address (localhost is rejected), so the
   empty state links the kit's deploy docs — the card asks "deployed already?"
   and this is the answer for whoever hasn't. */

export default function LinkSiteCard({
  siteUrl,
  framework,
}: {
  siteUrl: string;
  framework: DiyFramework;
}) {
  const [editing, setEditing] = useState(false);
  const [state, formAction, pending] = useActionState(linkDiySite, null);

  const showForm = !siteUrl || editing;

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
                Deployed your site already? Link it here so it&apos;s one click away.
              </p>
              <form action={formAction} className="mt-3 flex flex-wrap items-center gap-2">
                <input
                  name="url"
                  type="text"
                  inputMode="url"
                  defaultValue={siteUrl}
                  placeholder="mysite.com"
                  className="min-w-0 flex-1 basis-52 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-shadow placeholder:text-slate-400 focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10"
                />
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
                  {pending ? "Saving…" : "Link my site"}
                </button>
                {siteUrl && (
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                )}
              </form>
              {state?.error && (
                <p className="mt-2 text-sm font-medium text-rose-600">{state.error}</p>
              )}
              {/* Only while nothing's linked — once it's live this is noise,
                  and the edit form reopening shouldn't bring it back. */}
              {!siteUrl && (
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
              <p className="truncate text-sm text-slate-500">{siteUrl}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <a
                  href={siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit my site
                </a>
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                >
                  Change
                </button>
                <form action={formAction}>
                  {/* Empty url = unlink, same action */}
                  <input type="hidden" name="url" value="" />
                  <button
                    type="submit"
                    disabled={pending}
                    className="text-xs font-semibold text-slate-400 underline-offset-2 transition-colors hover:text-rose-600 hover:underline disabled:opacity-60"
                  >
                    Unlink
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
