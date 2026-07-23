"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { LoaderCircle, Trash2, X } from "lucide-react";
import { canDeleteSite, type SiteStage } from "@/lib/site-stage";
import { deleteSite } from "@/app/dashboard/actions";

/* Start over: delete this build so a new one can be sent.

   Two steps on purpose, in place rather than through window.confirm — this
   throws away the documents and photos they uploaded, and the second click
   should land under a sentence that says so. The confirm state is local; the
   action revalidates the layout, so on success this whole card is replaced by
   the empty state without any "deleted!" flag to manage.

   Past approval there is nothing to click: a committed payment or a live site
   is a conversation, not a button. */

export default function DeleteSiteCard({ stage }: { stage: SiteStage }) {
  const [confirming, setConfirming] = useState(false);
  const [state, action, deleting] = useActionState(deleteSite, null);

  if (!canDeleteSite(stage)) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Start over</h2>
        <p className="mt-2 text-sm text-slate-500">
          {stage === "live"
            ? "Your site is live, so it can't be deleted from here."
            : "You've approved this build, so it can't be deleted from here."}{" "}
          <Link href="/contact" className="font-semibold text-blue-700 hover:underline">
            Get in touch
          </Link>{" "}
          and we&apos;ll sort it out with you.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-900">Start over</h2>

      {!confirming ? (
        <>
          <p className="mt-2 text-sm text-slate-500">
            Changed your mind about this business? Delete it and you can send us a new one.
          </p>
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-5 py-2.5 text-sm font-semibold text-rose-600 transition-colors hover:border-rose-300 hover:bg-rose-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete this site
          </button>
        </>
      ) : (
        <>
          <p className="mt-2 text-sm text-slate-600">
            This deletes your build request, everything you uploaded — your document and photos —
            and any preview we made. We can&apos;t undo it, and there&apos;s nothing to pay:
            you&apos;d simply start again from scratch.
          </p>
          <form action={action} className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="submit"
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-rose-600/25 transition-all hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-600/40 disabled:opacity-60"
            >
              {deleting ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              {deleting ? "Deleting…" : "Yes, delete it"}
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              disabled={deleting}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 disabled:opacity-60"
            >
              <X className="h-4 w-4" />
              Keep my site
            </button>
          </form>
        </>
      )}

      {state?.error && <p className="mt-3 text-sm font-medium text-rose-600">{state.error}</p>}
    </section>
  );
}
