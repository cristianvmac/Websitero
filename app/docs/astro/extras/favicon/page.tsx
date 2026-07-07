"use client";

import { useState } from "react";
import { Sparkles, Wand2, FolderInput, Link2, Copy, Check, Info, RotateCcw } from "lucide-react";

// ─────────────────────────────────────────────────────────
// Reusable code block with window chrome + copy-to-clipboard.
// Mirrors the CodeBlock used on the Logo (SVG) extras page so
// every "Extras" doc shares the same look & feel.
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
    <div className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-lg shadow-gray-900/10">
      {/* Window header */}
      <div className="flex items-center justify-between border-b border-gray-700/60 bg-gray-800/50 px-4 py-2.5">
        <div className="flex items-center gap-2">
          {filename && (
            <span className="ml-3 font-mono text-xs text-gray-400">{filename}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-400 transition-colors hover:bg-gray-700/60 hover:text-gray-100"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-400" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="overflow-x-auto p-4 text-sm leading-relaxed text-gray-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function Favicon() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-20">
     {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-orange-50 to-yellow-50 text-orange-700 rounded-full text-sm font-bold border-2 border-orange-200">
            Astro
          </div>
          <span className="text-3xl font-semibold text-gray-400">/</span>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-bold border-2 border-blue-200">
            Extras
          </div>
          <span className="text-3xl font-semibold text-gray-400">/</span>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-bold border-2 border-blue-200">
            Favicon
          </div>
        </div>
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-xl -translate-x-1/2 rounded-full bg-linear-to-br from-amber-200/40 to-orange-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6">
        {/* ── Header ── */}

        <h1 className="mt-5 bg-linear-to-br from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
          Adding a Favicon
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
          A favicon is the small icon that appears in browser tabs, bookmarks, and
          home-screen shortcuts. In Astro you simply drop the files into{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-base text-gray-800">
            public/
          </code>{" "}
          and link them in your layout&apos;s{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-base text-gray-800">
            {"<head>"}
          </code>
          {" "}— no passthrough or copy config required.
        </p>

        {/* ── Step 1 ── */}
        <div className="mt-12 rounded-2xl border border-amber-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-amber-500 to-orange-600 text-white shadow-sm">
              <Wand2 className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                Step 1
              </span>
              <h2 className="text-xl font-semibold text-gray-900">
                Generate a full favicon set
              </h2>
            </div>
            <span className="ml-auto rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
              Best practice
            </span>
          </div>

          <p className="mt-5 text-gray-700">
            Start from a square source image (512×512 or larger, or an SVG) and run it
            through a generator like{" "}
            <a
              href="https://realfavicongenerator.net"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-amber-700 underline decoration-amber-300 underline-offset-2 hover:text-amber-800"
            >
              realfavicongenerator.net
            </a>{" "}
            or{" "}
            <a
              href="https://favicon.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-amber-700 underline decoration-amber-300 underline-offset-2 hover:text-amber-800"
            >
              favicon.io
            </a>
            . It outputs every size and format you need for modern browsers, iOS, and
            installable web apps.
          </p>
        </div>

        {/* ── Step 2 ── */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-sm">
              <FolderInput className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Step 2
              </span>
              <h2 className="text-xl font-semibold text-gray-900">
                Drop the files into <span className="font-mono">public/</span>
              </h2>
            </div>
          </div>

          <p className="mt-5 text-gray-700">
            Place the generated files at the root of your{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">
              public/
            </code>{" "}
            folder:
          </p>

          <div className="mt-4">
            <CodeBlock
              filename="project structure"
              code={`public/
└─ assets/
   └─ favicons/
      ├─ apple-touch-icon.png
      ├─ favicon-16x16.png
      ├─ favicon-32x32.png
      ├─ favicon-96x96.png
      ├─ favicon.ico
      ├─ favicon.svg
      ├─ mstile-150x150.png
      ├─ site.webmanifest
      ├─ web-app-manifest-192x192.png
      └─ web-app-manifest-512x512.png`}
            />
          </div>

          {/* Info callout — the key Astro vs. Eleventy difference */}
          <div className="mt-5 flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
            <p className="text-sm leading-relaxed text-blue-900">
              Astro serves everything in{" "}
              <code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-xs">
                public/
              </code>{" "}
              at the site root as-is — so{" "}
              <code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-xs">
                public/assets/favicons/favicon.svg
              </code>{" "}
              becomes{" "}
              <code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-xs">
                /assets/favicons/favicon.svg
              </code>
              . Unlike Eleventy, there is no{" "}
              <code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-xs">
                addPassthroughCopy
              </code>{" "}
              step to configure.
            </p>
          </div>
        </div>

        {/* ── Step 3 ── */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-purple-500 to-fuchsia-600 text-white shadow-sm">
              <Link2 className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-600">
                Step 3
              </span>
              <h2 className="text-xl font-semibold text-gray-900">
                Link them in your layout&apos;s <span className="font-mono">{"<head>"}</span>
              </h2>
            </div>
          </div>

          <p className="mt-5 text-gray-700">
            Add the links inside the{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">
              {"<head>"}
            </code>{" "}
            of your shared layout so every page picks them up:
          </p>

          <div className="mt-4">
            <CodeBlock
              filename="src/layouts/BaseLayout.astro"
              code={`<head>
  <!-- Modern browsers: crisp, scalable SVG -->
  <link rel="icon" type="image/svg+xml" href="/assets/favicons/favicon.svg" />

  <!-- Fallback for older browsers -->
  <link rel="icon" type="image/x-icon" href="/assets/favicons/favicon.ico" sizes="any" />

  <!-- iOS home-screen icon -->
  <link rel="apple-touch-icon" href="/assets/favicons/apple-touch-icon.png" />

  <!-- PWA / Android install metadata -->
  <link rel="manifest" href="/assets/favicons/site.webmanifest" />
</head>`}
            />
          </div>

        </div>

        {/* ── Troubleshooting ── */}
        <div className="mt-8 flex gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-5">
          <RotateCcw className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />
          <div>
            <h3 className="font-semibold text-orange-900">Not showing up?</h3>
            <p className="mt-1 text-sm leading-relaxed text-orange-800">
              Favicons are aggressively cached. After changing one, do a hard refresh
              (<span className="font-mono">Ctrl/Cmd + Shift + R</span>), open the page in
              a private window, or append a cache-buster like{" "}
              <code className="rounded bg-orange-100 px-1.5 py-0.5 font-mono text-xs">
                /assets/favicons/favicon.svg?v=2
              </code>
              . Also confirm the file really exists in{" "}
              <code className="rounded bg-orange-100 px-1.5 py-0.5 font-mono text-xs">
                public/
              </code>{" "}
              and that the path starts with a leading{" "}
              <code className="rounded bg-orange-100 px-1.5 py-0.5 font-mono text-xs">
                /
              </code>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
