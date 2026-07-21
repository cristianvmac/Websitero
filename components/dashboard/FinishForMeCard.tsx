"use client";

import { useActionState } from "react";
import { LifeBuoy, LoaderCircle, Send } from "lucide-react";
import { repoSlug } from "@/lib/diy";
import { requestBuildHelp } from "@/app/dashboard/actions";

/* The way out for a DIY owner who got stuck: hand the half-built site over and
   we finish it. Standing offer, not a nag — it sits under the links card for
   as long as they're building and asks nothing until they use it.

   It only works with a linked repo, so the no-repo state says why instead of
   showing a disabled button: the request is "take over my code", and without a
   remote there is no code to take over. (The action re-checks — this is the
   explanation, not the guard.)

   No success state to render. The action creates their brief, so the very next
   render swaps this whole DIY section for the build tracker. */

export default function FinishForMeCard({ repoUrl }: { repoUrl: string }) {
  const [state, formAction, pending] = useActionState(requestBuildHelp, null);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700">
          <LifeBuoy className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-bold text-slate-900">Stuck? Have us finish it</h2>

          {repoUrl ? (
            <>
              <p className="text-sm text-slate-500">
                A developer picks up your code from where you left off. We work on a separate
                branch and hand it back for you to merge — nothing you&apos;ve built gets
                overwritten. You approve it before it goes live, and only pay then.
              </p>

              <form action={formAction} className="mt-4 flex flex-col gap-3">
                <label className="block">
                  <span className="text-xs font-semibold text-slate-700">
                    What do you need finished?
                  </span>
                  <textarea
                    name="notes"
                    rows={4}
                    required
                    placeholder="The contact form doesn't send, and I never got the services page laid out the way I wanted…"
                    className="mt-2 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-relaxed text-slate-800 outline-none transition-shadow placeholder:text-slate-400 focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10"
                  />
                </label>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40 disabled:opacity-60"
                  >
                    {pending ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {pending ? "Sending…" : "Hand it over"}
                  </button>
                  <p className="text-xs text-slate-400">
                    We&apos;ll work from{" "}
                    <span className="font-semibold text-slate-500">{repoSlug(repoUrl)}</span>
                  </p>
                </div>
              </form>

              {state?.error && (
                <p className="mt-2 text-sm font-medium text-rose-600">{state.error}</p>
              )}
            </>
          ) : (
            <p className="text-sm text-slate-500">
              Whenever you want a hand, we can pick up your build and finish it. Add your code
              repository above first — that&apos;s how your site gets from your computer to us,
              and our work back to you.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
