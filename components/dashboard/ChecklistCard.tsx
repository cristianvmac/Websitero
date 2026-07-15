"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ExternalLink, Sparkles, X } from "lucide-react";
import type { ChecklistStep } from "@/src/data/dashboard";

export default function ChecklistCard({ steps }: { steps: ChecklistStep[] }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const done = steps.filter((s) => s.done).length;
  const total = steps.length;
  const percent = Math.round((done / total) * 100);
  const remaining = total - done;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700">
          <Sparkles className="h-6 w-6" />
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Site {percent}% complete</h2>
          <p className="text-sm text-slate-500">
            {remaining > 0
              ? `Just ${remaining} step${remaining === 1 ? "" : "s"} to a perfect site.`
              : "Your site is all set."}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm font-bold text-blue-700">
            {done}/{total}
          </span>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-blue-500 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ul className="mt-4">
        {steps.map((step) => (
          <li key={step.id} className="flex items-center gap-3 py-2.5">
            {step.done ? (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check className="h-4 w-4" />
              </span>
            ) : (
              <span className="h-6 w-6 shrink-0 rounded-full border-2 border-slate-200" />
            )}
            <span
              className={
                step.done ? "text-sm text-slate-400 line-through" : "text-sm font-medium text-slate-800"
              }
            >
              {step.label}
            </span>
            {!step.done && step.action && (
              <Link
                href={step.action.href}
                className="ml-auto inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-blue-700 hover:underline"
              >
                {step.action.label}
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
