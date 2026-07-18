"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Code2,
  Copy,
  ExternalLink,
  GraduationCap,
  Rocket,
  UploadCloud,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { FRAMEWORKS, DIY_FRAMEWORKS, type DiyFramework } from "@/lib/diy";
import { chooseDiyFramework } from "@/app/dashboard/actions";

/* The DIY product's home on the dashboard: their kit, their docs, in order.
   Client component only for the copy button — everything it shows is static
   per framework (lib/diy.ts).

   The docs rows are links, not checkboxes: the platform can't see their local
   progress, and a progress bar it can't verify would be theater. */

const DOC_STEPS: { slug: string; label: string; sub: string; icon: LucideIcon }[] = [
  { slug: "quick-setup", label: "Quick setup", sub: "Install the tools", icon: Wrench },
  { slug: "get-started", label: "Get started", sub: "Clone, run, first edit", icon: Rocket },
  { slug: "tutorials", label: "Tutorials", sub: "Build your pages", icon: GraduationCap },
  { slug: "deployment", label: "Deployment", sub: "Put it online", icon: UploadCloud },
];

export default function KitCard({ framework }: { framework: DiyFramework }) {
  const kit = FRAMEWORKS[framework];
  const other = DIY_FRAMEWORKS.find((f) => f !== framework)!;
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(kit.cloneCommand);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the command is selectable text either way */
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-700">
          <Code2 className="h-6 w-6" />
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-900">Your developer kit</h2>
          <p className="text-sm text-slate-500">
            {kit.label} — {kit.tagline}
          </p>
        </div>
      </div>

      {/* The kit itself. Dark on purpose: it's a terminal command. */}
      <div className="mt-5 flex items-center gap-2 rounded-xl bg-slate-900 py-2.5 pl-4 pr-2">
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[13px] text-slate-100">
          {kit.cloneCommand}
        </code>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy clone command"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
      <a
        href={kit.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-blue-700"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        View the kit on GitHub
      </a>

      {/* The docs path, in the order the docs teach it. */}
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {DOC_STEPS.map((step) => (
          <Link
            key={step.slug}
            href={`${kit.docsHref}/${step.slug}`}
            className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 transition-colors hover:border-blue-500/40 hover:bg-blue-500/5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-colors group-hover:bg-blue-500/10 group-hover:text-blue-700">
              <step.icon className="h-4.5 w-4.5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-slate-900">{step.label}</span>
              <span className="block truncate text-xs text-slate-500">{step.sub}</span>
            </span>
            <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-700" />
          </Link>
        ))}
      </div>

      {/* Harmless and reversible: only repoints the docs links and command. */}
      <form action={chooseDiyFramework} className="mt-4 border-t border-slate-100 pt-3">
        <button
          type="submit"
          name="framework"
          value={other}
          className="text-xs font-semibold text-slate-500 underline-offset-2 transition-colors hover:text-blue-700 hover:underline"
        >
          Prefer {FRAMEWORKS[other].label}? Switch your kit
        </button>
      </form>
    </section>
  );
}
