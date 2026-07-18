"use client";

import { useActionState, useState } from "react";
import {
  Check,
  Clock,
  CreditCard,
  ExternalLink,
  Eye,
  LoaderCircle,
  PenLine,
  X,
} from "lucide-react";
import type { SiteStage } from "@/lib/site-stage";
import { CURRENCY, TIERS, type Tier } from "@/lib/pricing";
import type { ChangeRequest } from "@/src/data/dashboard";
import { approvePreview, requestChanges } from "@/app/dashboard/actions";

/* The owner's half of the review loop. Rendered only once a preview URL
   exists, in the three stages where it means something:

   preview_ready     → the decision: Approve, or open the notes form.
   changes_requested → their notes are with the team; nothing to do but wait.
   approved          → done deciding; the launch is being prepared.

   Success needs no local state: the actions revalidate /dashboard, the stage
   prop changes, and the buttons are replaced by the matching notice. Only
   errors come back through useActionState. */

type PreviewCardProps = {
  stage: SiteStage;
  previewUrl: string;
  changeRequests: ChangeRequest[];
  /** Null until the team scopes the build — then it's the price they're quoted
      before approving and charged after. */
  tier: Tier | null;
  /** Their personalized Stripe link; "" when there's nothing to link to. */
  paymentUrl: string;
};

export default function PreviewCard({
  stage,
  previewUrl,
  changeRequests,
  tier,
  paymentUrl,
}: PreviewCardProps) {
  const [notesOpen, setNotesOpen] = useState(false);
  const [approveState, approveAction, approving] = useActionState(approvePreview, null);
  const [notesState, notesAction, sending] = useActionState(requestChanges, null);

  return (
    <section className="rounded-2xl border border-blue-500/30 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700">
          <Eye className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-slate-900">Your preview</h2>
          <p className="truncate text-sm text-slate-500">{previewUrl}</p>
        </div>
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40 sm:ml-auto"
        >
          <ExternalLink className="h-4 w-4" />
          Open my preview
        </a>
      </div>

      {stage === "preview_ready" && (
        <div className="mt-5 border-t border-slate-100 pt-5">
          <p className="text-sm text-slate-600">
            Take your time. When it looks right, approve it — or tell us what to change and
            we&apos;ll get back to work.
          </p>

          {/* What approving costs, stated before the button that commits them
              to it. Never let someone approve without seeing the price. */}
          {tier && (
            <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600 ring-1 ring-slate-100">
              Approving confirms your{" "}
              <span className="font-semibold text-slate-900">{TIERS[tier].label}</span> package —{" "}
              <span className="font-semibold text-slate-900">
                {CURRENCY}
                {TIERS[tier].price}
              </span>
              , a one-off payment. Your site goes live as soon as it&apos;s through. Nothing
              recurring.
            </p>
          )}

          {!notesOpen ? (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <form
                action={approveAction}
                onSubmit={(e) => {
                  if (!window.confirm("Approve this preview? We'll prepare your launch next.")) {
                    e.preventDefault();
                  }
                }}
              >
                <button
                  type="submit"
                  disabled={approving}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40 disabled:opacity-60"
                >
                  {approving ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                  {approving ? "Sending…" : "It looks great — approve it"}
                </button>
              </form>
              <button
                type="button"
                onClick={() => setNotesOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
              >
                <PenLine className="h-4 w-4" />
                Request changes
              </button>
            </div>
          ) : (
            <form action={notesAction} className="mt-4">
              <label className="block">
                <span className="text-xs font-medium text-slate-500">
                  What should we change? Plain words are perfect.
                </span>
                <textarea
                  name="notes"
                  rows={4}
                  maxLength={5000}
                  required
                  autoFocus
                  placeholder="e.g. The photo on the front page is outdated, and our opening hours changed to 8–17."
                  className="mt-1 w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-shadow placeholder:text-slate-400 focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10"
                />
              </label>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40 disabled:opacity-60"
                >
                  {sending ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <PenLine className="h-4 w-4" />
                  )}
                  {sending ? "Sending…" : "Send my notes"}
                </button>
                <button
                  type="button"
                  onClick={() => setNotesOpen(false)}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              </div>
            </form>
          )}

          {(approveState?.error || notesState?.error) && (
            <p className="mt-3 text-sm font-medium text-rose-600">
              {approveState?.error ?? notesState?.error}
            </p>
          )}
        </div>
      )}

      {stage === "changes_requested" && (
        <p className="mt-5 flex items-start gap-2 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 text-sm text-slate-600">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
          We&apos;ve got your notes and we&apos;re on it — this preview updates when the changes
          are done.
        </p>
      )}

      {/* Approved is the payment moment under pay-at-approval: one button, the
          price on it, and a plain statement of what happens after. Without a
          configured link we promise an invoice rather than show a dead button. */}
      {stage === "approved" && (
        <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <p className="flex items-start gap-2 text-sm text-slate-600">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            {paymentUrl && tier ? (
              <span>
                Approved — one step left. Settle the {TIERS[tier].label} package and we&apos;ll
                put your site on its own address, usually the same day.
              </span>
            ) : (
              <span>
                Approved — we&apos;re preparing your launch. We&apos;ll email you your invoice,
                and your site goes live as soon as it&apos;s settled.
              </span>
            )}
          </p>
          {paymentUrl && tier && (
            <>
              <a
                href={paymentUrl}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40"
              >
                <CreditCard className="h-4 w-4" />
                Activate my site — {CURRENCY}
                {TIERS[tier].price}
              </a>
              <p className="mt-2 text-center text-xs text-slate-400">
                One-off payment, secured by Stripe. No subscription.
              </p>
            </>
          )}
        </div>
      )}

      {/* Their own request history — so a second round doesn't erase the memory
          of the first, and they can see exactly what they asked and when. */}
      {changeRequests.length > 0 && (
        <div className="mt-5 border-t border-slate-100 pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Your change requests
          </p>
          <ul className="mt-3 flex flex-col gap-3">
            {changeRequests.map((req) => (
              <li key={req.createdAt} className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
                <p className="text-xs text-slate-400">
                  {new Date(req.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="mt-1 whitespace-pre-wrap text-sm text-slate-600">{req.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
