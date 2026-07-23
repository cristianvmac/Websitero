import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, CreditCard, Receipt, Sparkles } from "lucide-react";
import { CURRENCY, TIERS } from "@/lib/pricing";
import { getDashboardData } from "@/src/data/dashboard";

export const metadata: Metadata = {
  title: "Billing | Websitero",
  description: "Your package, what it costs and when you pay for it.",
};

/* There is no subscription to manage here, and that's the point of the page.
   Pricing is one one-time build fee per site, collected at approval
   (lib/pricing.ts) — so this answers three questions and stops: which package
   am I on, what does it cost, and have I paid it yet.

   "Have I paid" is inferred from the stage, not from Stripe. Payment Links
   have no webhook, so the app never hears about a payment; the team confirms
   it in Stripe and moves the brief to 'live'. Live therefore means paid, and
   nothing earlier can be called paid without lying. Wiring real Checkout later
   is what would let this read a payment record instead.

   Session guard is inherited: getDashboardData() redirects to /login. */

export default async function BillingPage() {
  const { site } = await getDashboardData();

  const tier = site?.tier ? TIERS[site.tier] : null;
  const paid = site?.stage === "live";
  // The one moment money is actually due: they've approved, we haven't launched.
  const payable = site?.stage === "approved" && Boolean(site.paymentUrl);

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-3xl">Billing</h1>
        <p className="mt-2 text-slate-500">
          Your package and what it costs. One payment, no subscription.
        </p>
      </header>

      {/* ------------------------------------------------- nothing to bill yet */}
      {!site ? (
        <section className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700">
            <Sparkles className="h-6 w-6" />
          </span>
          <h2 className="mt-4 text-lg font-bold text-slate-900">No package yet</h2>
          <p className="mt-1 text-sm text-slate-500">
            Nothing to pay for until you have a site being built. Send us your business and
            we&apos;ll hand-code it — you only pay once you&apos;ve seen it and approved it.
          </p>
          <Link
            href="/builditforme"
            className="mt-5 inline-flex items-center gap-2 self-start rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40"
          >
            Start your website
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      ) : (
        <>
          {/* ------------------------------------------------------ the package */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-700">
                  <CreditCard className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Your package
                  </p>
                  <p className="truncate text-lg font-bold text-slate-900">
                    {tier ? tier.label : "Being set"}
                  </p>
                  <p className="truncate text-sm text-slate-500">
                    {tier
                      ? "One-time build fee — nothing recurring."
                      : "We scope your package while reviewing what you sent. You'll see the price here before anything is due."}
                  </p>
                </div>
              </div>

              {tier && (
                <p className="text-3xl font-bold tracking-tight text-slate-900">
                  {CURRENCY}
                  {tier.price}
                </p>
              )}
            </div>

            {/* Where this payment stands, in the customer's own words. */}
            <div className="mt-6 border-t border-slate-100 pt-5">
              {paid ? (
                <p className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                  <CheckCircle2 className="h-4.5 w-4.5 shrink-0" />
                  Paid — your site is live.
                </p>
              ) : payable ? (
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="text-sm text-slate-500">
                    You&apos;ve approved your preview. Paying is what puts your site on its own
                    address.
                  </p>
                  {/* External (Stripe), so <a>, not Link. */}
                  <a
                    href={site.paymentUrl}
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40"
                  >
                    Pay {CURRENCY}
                    {tier?.price} and launch
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  Nothing is due yet. Your build is free until you&apos;ve seen your preview and
                  approved it — that&apos;s the only moment you pay.
                </p>
              )}
            </div>
          </section>

          {/* ---------------------------------------------------------- receipts */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Receipt className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-slate-900">Receipts</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Your receipt is emailed to you by Stripe the moment your payment goes
                  through. Need another copy, or a proper invoice for your accountant? Reply to
                  that email and we&apos;ll send one.
                </p>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
