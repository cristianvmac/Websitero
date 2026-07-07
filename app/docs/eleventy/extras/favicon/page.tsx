"use client";

import { useState } from "react";
import {
  Sparkles,
  Wand2,
  FolderInput,
  Link2,
  Copy,
  Check,
  Info,
  X,
  Lock,
  RotateCcw,
  Moon,
  Sun,

} from "lucide-react";

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

// ─────────────────────────────────────────────────────────
// Interactive browser-tab preview. Toggling light/dark shows
// how a single favicon.svg can adapt via prefers-color-scheme.
// ─────────────────────────────────────────────────────────
function TabPreview() {
  const [dark, setDark] = useState(false);

  return (
    <div>
      {/* Light / dark toggle */}
      <div className="mb-3 inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
        <button
          onClick={() => setDark(false)}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            !dark ? "bg-amber-100 text-amber-800" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Sun className="h-3.5 w-3.5" />
          Light
        </button>
        <button
          onClick={() => setDark(true)}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            dark ? "bg-gray-800 text-white" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Moon className="h-3.5 w-3.5" />
          Dark
        </button>
      </div>

      {/* Mock browser chrome */}
      <div
        className={`overflow-hidden rounded-xl border shadow-sm transition-colors ${
          dark ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-100"
        }`}
      >
        {/* Tab strip */}
        <div className="flex items-end gap-1 px-3 pt-3">
          <div
            className={`flex max-w-56 items-center gap-2 rounded-t-lg border border-b-0 px-3 py-2 shadow-sm transition-colors ${
              dark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
            }`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="shrink-0"
            >
              <rect width="100" height="100" rx="22" fill="#f59e0b" />
              {/* Inner mark flips color to stay legible on either chrome */}
              <circle cx="50" cy="50" r="26" fill={dark ? "#1f2937" : "#ffffff"} />
            </svg>
            <span
              className={`truncate text-xs font-medium transition-colors ${
                dark ? "text-gray-200" : "text-gray-700"
              }`}
            >
              My CodeStitch Site
            </span>
            <X
              className={`ml-1 h-3.5 w-3.5 shrink-0 ${
                dark ? "text-gray-500" : "text-gray-400"
              }`}
            />
          </div>
        </div>

        {/* Address bar */}
        <div
          className={`flex items-center gap-2 border-t px-3 py-2 transition-colors ${
            dark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
          }`}
        >
          <Lock
            className={`h-3 w-3 ${dark ? "text-gray-500" : "text-gray-400"}`}
          />
          <span
            className={`font-mono text-xs ${
              dark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            mycodestitchsite.com
          </span>
        </div>
      </div>

      <p className="mt-2 text-xs text-gray-500">
        One <code className="font-mono">favicon.svg</code> can recolor itself for each
        theme — try the toggle.
      </p>
    </div>
  );
}


export default function Favicon() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-20">
      {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-orange-50 to-yellow-50 text-orange-700 rounded-full text-sm font-bold border-2 border-orange-200">
            Eleventy
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
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-xl -translate-x-1/2 rounded-full bg-linear-to-br from-amber-200/40 to-orange-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6">

        <h1 className="mt-5 bg-linear-to-br from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
          Adding a Favicon
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
          A favicon is the small icon that appears in browser tabs, bookmarks, and
          home-screen shortcuts. This starter already ships with a favicon set in{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-base text-gray-800">
            src/assets/favicons/
          </code>{" "}
          — and because the whole{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-base text-gray-800">
            src/assets
          </code>{" "}
          folder is already passthrough-copied in{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-base text-gray-800">
            .eleventy.js
          </code>
          , swapping in your own brand is just two steps: replace the files and the
          icons are served automatically. They&apos;re already linked in{" "}
          <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-base text-gray-800">
            base.html
          </code>
          .
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
                Drop the files into src/assets/favicons/
              </h2>
            </div>
          </div>

          <p className="mt-5 text-gray-700">
            Replace the placeholder icons in{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">
              src/assets/favicons/
            </code>{" "}
            with the files your generator produced (keep the same filenames so the
            existing{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">
              {"<head>"}
            </code>{" "}
            links keep working):
          </p>

          <div className="mt-4">
            <CodeBlock
              filename="project structure"
              code={`my-codestitch-site/
├─ .eleventy.js
└─ src/
   ├─ _includes/
   │  └─ layouts/
   │     └─ base.html
   └─ assets/
      └─ favicons/
         ├─ favicon.svg
         ├─ favicon.ico
         ├─ favicon-96x96.png
         ├─ apple-touch-icon.png
         └─ site.webmanifest`}
            />
          </div>

          <p className="mt-5 text-gray-700">
            You don&apos;t need to touch{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">
              .eleventy.js
            </code>{" "}
            — the kit already passthrough-copies the entire{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">
              src/assets
            </code>{" "}
            folder, so anything inside it is served as-is:
          </p>

          <div className="mt-4">
            <CodeBlock
              filename=".eleventy.js"
              code={`module.exports = function (eleventyConfig) {
  // The whole assets folder is copied to the output, so
  // src/assets/favicons/* is served at /assets/favicons/*
  eleventyConfig.addPassthroughCopy("./src/assets");

  return {
    dir: { input: "src", output: "public", includes: "_includes" },
  };
};`}
            />
          </div>

          {/* Info callout — the key Eleventy passthrough detail */}
          <div className="mt-5 flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
            <p className="text-sm leading-relaxed text-blue-900">
              Eleventy only copies files you opt in with{" "}
              <code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-xs">
                addPassthroughCopy
              </code>
              . Because this kit copies{" "}
              <code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-xs">
                ./src/assets
              </code>{" "}
              with its path preserved,{" "}
              <code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-xs">
                src/assets/favicons/favicon.svg
              </code>{" "}
              becomes{" "}
              <code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-xs">
                /assets/favicons/favicon.svg
              </code>{" "}
              inside the{" "}
              <code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-xs">
                public
              </code>{" "}
              output — note the icons keep the{" "}
              <code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-xs">
                /assets/favicons/
              </code>{" "}
              prefix, not the site root.
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
                They&apos;re already linked in <span className="font-mono">base.html</span>
              </h2>
            </div>
          </div>

          <p className="mt-5 text-gray-700">
            The shared layout (
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">
              src/_includes/layouts/base.html
            </code>
            ) already declares the links inside its{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">
              {"<head>"}
            </code>{" "}
            so every page picks them up. If you renamed any files, update these paths to
            match:
          </p>

          <div className="mt-4">
            <CodeBlock
              filename="src/_includes/layouts/base.html"
              code={`<head>
  {% comment %} Older browsers / fallback PNG {% endcomment %}
  <link rel="icon" type="image/png" href="/assets/favicons/favicon-96x96.png" sizes="96x96" />

  {% comment %} Modern browsers: crisp, scalable SVG {% endcomment %}
  <link rel="icon" type="image/svg+xml" href="/assets/favicons/favicon.svg" />

  {% comment %} Legacy ICO fallback {% endcomment %}
  <link rel="shortcut icon" href="/assets/favicons/favicon.ico" />

  {% comment %} iOS home-screen icon {% endcomment %}
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png" />

  {% comment %} PWA / Android install metadata {% endcomment %}
  <link rel="manifest" href="/assets/favicons/site.webmanifest" />
</head>`}
            />
          </div>

          {/* Live, interactive tab preview */}
          <p className="mt-6 mb-3 text-gray-700">
            The result is the little icon next to your page title:
          </p>
          <TabPreview />
        </div>

        {/* ── Troubleshooting ── */}
        <div className="mt-8 flex gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-5">
          <RotateCcw className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />
          <div>
            <h3 className="font-semibold text-orange-900">Not showing up?</h3>
            <p className="mt-1 text-sm leading-relaxed text-orange-800">
              First confirm the files actually landed in{" "}
              <code className="rounded bg-orange-100 px-1.5 py-0.5 font-mono text-xs">
                public/assets/favicons/
              </code>{" "}
              after a rebuild — if not, double-check the{" "}
              <code className="rounded bg-orange-100 px-1.5 py-0.5 font-mono text-xs">
                addPassthroughCopy
              </code>{" "}
              line in{" "}
              <code className="rounded bg-orange-100 px-1.5 py-0.5 font-mono text-xs">
                .eleventy.js
              </code>
              . Favicons are also aggressively cached, so do a hard refresh
              (<span className="font-mono">Ctrl/Cmd + Shift + R</span>), open the page in
              a private window, or append a cache-buster like{" "}
              <code className="rounded bg-orange-100 px-1.5 py-0.5 font-mono text-xs">
                /assets/favicons/favicon.svg?v=2
              </code>
              . And make sure each path starts with a leading{" "}
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
