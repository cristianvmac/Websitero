"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Sparkles, TrendingUp, X } from "lucide-react";
import type { DashboardData } from "@/src/data/dashboard";

export default function SeoCard({ seo }: { seo: DashboardData["seo"] }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const lastArticle = seo.lastArticleAt
    ? new Date(seo.lastArticleAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
    : "none";

  return (
    <section className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700">
          <TrendingUp className="h-6 w-6" />
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Your SEO this month</h2>
          <p className="text-sm text-slate-500">
            {seo.articlesPublished === 0
              ? "Publish your 1st article."
              : "Keep publishing to grow your traffic."}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Articles published
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{seo.articlesPublished}</p>
        </div>
        <div className="rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Last article
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{lastArticle}</p>
        </div>
      </div>

      <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
        <Sparkles className="h-3.5 w-3.5" />
        Autopilot {seo.autopilot ? "ON" : "OFF"}
      </span>

      <p className="mt-3 flex items-start gap-2 text-sm text-slate-600">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
        Without new content, Google doesn&apos;t index new keywords on your site.
      </p>

      <Link
        href="/dashboard/content"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 hover:bg-blue-700 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:shadow-lg hover:shadow-blue-500/40"
      >
        Generate my free article
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
