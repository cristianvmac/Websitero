"use client";

import { useState } from "react";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import {
  Image as ImageIcon,
  Code2,
  Copy,
  Check,
  Sparkles,
  Feather,
  Palette,
  Maximize2,
  Info,
} from "lucide-react";

// ─────────────────────────────────────────────────────────
// Reusable code block with window chrome + copy-to-clipboard.
// ─────────────────────────────────────────────────────────
function CodeBlock({ code, filename }: { code: string; filename?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-lg shadow-slate-900/10">
      {/* Window header */}
      <div className="flex items-center justify-between border-b border-slate-700/60 bg-slate-800/50 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-50/80" />
          <span className="h-3 w-3 rounded-full bg-blue-50/80" />
          <span className="h-3 w-3 rounded-full bg-blue-50/80" />
          {filename && (
            <span className="ml-3 font-mono text-xs text-slate-400">{filename}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-700/60 hover:text-slate-100"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

const WHY_SVG = [
  {
    icon: Maximize2,
    title: "Infinitely scalable",
    desc: "Crisp on every screen size and pixel density — no blur, ever.",
  },
  {
    icon: Feather,
    title: "Tiny file size",
    desc: "Just markup, so logos stay lightweight and load instantly.",
  },
  {
    icon: Palette,
    title: "Styleable",
    desc: "Recolor, theme, and restyle directly with CSS or Tailwind.",
  },
  {
    icon: Sparkles,
    title: "Animatable",
    desc: "Bring marks to life with CSS or SMIL animations.",
  },
];

export default function LogoSvg() {
  return (
    <section className="relative overflow-hidden min-h-full p-12">
      {/* Decorative background glow */}
      <div className="relative mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
          <Link href="/docs/astro" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Astro
          </Link>
          <span><LuChevronRight /></span>
          <Link href="/docs/astro/extras" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Extras
          </Link>
          <span><LuChevronRight /></span>
          <span aria-current="page">Logo SVG</span>
        </nav>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Adding an SVG Logo
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
          SVG logos are scalable, lightweight, and perfect for modern websites. This
          Astro starter already ships its logo through{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-base text-slate-800">
            astro-icon
          </code>
          , but you can also drop one straight into{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-base text-slate-800">
            public/
          </code>
          .
        </p>

        {/* ── Option 1 ── */}
        <div className="mt-14 rounded-2xl border border-blue-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-slate-700 shadow-sm">
              <Code2 className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Option 1
              </span>
              <h2 className="text-xl font-semibold text-slate-900">
                Use astro-icon (inline &amp; styleable)
              </h2>
            </div>
            <span className="ml-auto rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
              How this starter does it
            </span>
          </div>

          <p className="mt-5 text-slate-700">
            Drop your SVG into the{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800">
              src/icons/
            </code>{" "}
            folder — the filename (without the extension) becomes the icon name.
          </p>

          {/* SVG file + live preview */}
          <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto]">
            <CodeBlock
              filename="src/icons/logo-black.svg"
              code={`<svg viewBox="0 0 100 100"
     xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="currentColor" />
</svg>`}
            />

            {/* Rendered preview */}
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-[radial-gradient(circle,#e5e7eb_1px,transparent_1px)] bg-size-[12px_12px] p-6">
              <svg
                width="80"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Example SVG logo"
              >
                <circle cx="50" cy="50" r="40" fill="black" />
              </svg>
              <span className="text-xs font-medium text-slate-500">Live preview</span>
            </div>
          </div>

          <p className="mt-5 mb-3 text-slate-700">
            Then render it with the{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800">
              {"<Icon>"}
            </code>{" "}
            component — exactly how{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800">
              Header
            </code>{" "}
            already does it:
          </p>

          <CodeBlock
            filename="src/components/Header/StaticHeader.astro"
            code={`---
import { Icon } from "astro-icon/components";
---
<a href="/" class="cs-logo" aria-label="Return to home page">
  <Icon name="logo-black" />
</a>`}
          />

          <p className="mt-5 text-slate-700">
            Because <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800">astro-icon</code>{" "}
            inlines the SVG into the page, you can restyle it with CSS — use{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800">
              fill: currentColor
            </code>{" "}
            so the logo automatically follows your theme (handy with the dark-mode toggle).
          </p>
        </div>

        {/* ── Option 2 ── */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-slate-700 shadow-sm">
              <ImageIcon className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Option 2
              </span>
              <h2 className="text-xl font-semibold text-slate-900">
                Drop it in <span className="font-mono">public/</span> as a static file
              </h2>
            </div>
          </div>

          <p className="mt-5 text-slate-700">
            Place your logo inside{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm text-slate-800">
              public/assets/images/logo.svg
            </code>{" "}
            and reference it from the site root:
          </p>

          <div className="mt-4">
            <CodeBlock
              filename="src/layouts/BaseLayout.astro"
              code={`<img src="/assets/images/logo.svg" alt="Site Logo" width="120" />`}
            />
          </div>

          {/* Info callout */}
          <div className="mt-5 flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-slate-600" />
            <p className="text-sm leading-relaxed text-slate-900">
              Astro serves everything in{" "}
              <code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-xs">
                public/
              </code>{" "}
              at the site root as-is — so{" "}
              <code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-xs">
                public/assets/images/logo.svg
              </code>{" "}
              becomes{" "}
              <code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-xs">
                /assets/images/logo.svg
              </code>
              . No copy or passthrough config is needed.
            </p>
          </div>
        </div>

        {/* ── Why SVG ── */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-900">Why use SVG for logos?</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {WHY_SVG.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-slate-600 transition-colors group-hover:bg-blue-100 group-hover:text-slate-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
