"use client";

import { useState } from "react";
import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { Copy, Check } from "lucide-react";



export default function VercelDeployment() {
      const [copiedStep, setCopiedStep] = useState<number | null>(null);

    const copyToClipboard = (text: string, stepIndex: number) => {
      navigator.clipboard.writeText(text);
      setCopiedStep(stepIndex);
      setTimeout(() => setCopiedStep(null), 2000);
    };


  return (
    <section className="min-h-full p-12">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="relative max-w-3xl ml-6">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
            <Link href="/docs/astro" className="rounded-full py-1 hover:text-slate-600 hover:underline">
              Astro
            </Link>
            <span><LuChevronRight /></span>
            <Link href="/docs/astro/deployment" className="rounded-full py-1 hover:text-slate-600 hover:underline">
              Deployment
            </Link>
            <span><LuChevronRight /></span>
            <span aria-current="page">Vercel</span>
          </nav>

          <h1 className="text-gray-900 text-4xl sm:text-5xl font-extrabold mb-5 tracking-tight">
            Deploying an Astro Site to Vercel
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Vercel is a platform for static sites and frontend frameworks, built
            to integrate with your headless content, commerce, or database. Astro
            deploys to Vercel with zero configuration — whether your site is fully
            static or uses on-demand server rendering.
          </p>


        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        {/* Build settings at a glance */}
        <div className="mb-16">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-8 bg-blue-50" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
                At a glance
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
              Build settings
            </h2>
          </div>
          <p className="text-gray-600 mb-6 max-w-2xl">
            Astro outputs your production site to a{" "}
            <code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-mono text-sm">
              dist
            </code>{" "}
            folder. Vercel auto-detects these values when you import an Astro
            project — you usually don&apos;t need to change anything:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:-translate-y-0.5">
              <div className="flex items-center gap-2 mb-3 text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <p className="text-xs font-bold uppercase tracking-wider">
                  Build command
                </p>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-lg bg-gray-900 px-4 py-3">
                <code className="flex items-center gap-2 font-mono text-sm text-gray-100 overflow-x-auto">
                  <span className="text-gray-400 select-none">$</span>
                  npm run build
                </code>
                <button
                  onClick={() => copyToClipboard(`npm run build`, 1)}
                  className="group relative shrink-0 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {copiedStep === 1 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                  <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-700 px-2 py-1 text-xs font-medium text-gray-100 opacity-0 transition-opacity group-hover:opacity-100">
                    {copiedStep === 1 ? "Copied!" : "Copy"}
                  </span>
                </button>
              </div>
            </div>
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:-translate-y-0.5">
              <div className="flex items-center gap-2 mb-3 text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
                <p className="text-xs font-bold uppercase tracking-wider">
                  Output directory
                </p>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-lg bg-gray-900 px-4 py-3">
                <code className="flex items-center gap-2 font-mono text-sm text-gray-100 overflow-x-auto">
                  <svg className="w-4 h-4 text-yellow-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                  </svg>
                  dist
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Choose how to deploy */}
        <div className="mb-16">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-8 bg-blue-50" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
                Pick one
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
              Choose how to deploy
            </h2>
          </div>
          <p className="text-gray-600 mb-6 max-w-2xl">
            Pick whichever workflow fits you — both produce the same result.
          </p>

          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            {/* Method A — Git / UI */}
            <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-100 text-gray-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v12m0 0a3 3 0 103 3m-3-3a3 3 0 013 3m6-15a3 3 0 11-3 3m3-3a3 3 0 00-3 3m0 0v6a6 6 0 01-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Deploy from Git
                  </h3>
                  <span className="text-xs font-semibold text-gray-600">
                    Easiest · auto-deploys on push
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                Connect a repo from GitHub, GitLab, or BitBucket. Vercel detects
                Astro and pre-fills the build settings, then ships a preview for
                every push.
              </p>

              <ol className="space-y-3">
                {[
                  <>Click <strong>Add New… → Project</strong> in your Vercel dashboard.</>,
                  <>Import the Git repository you want to deploy.</>,
                  <>Vercel detects <strong>Astro</strong> and fills in the build settings.</>,
                  <>Click <strong>Deploy</strong> — your site goes live in seconds.</>,
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                    <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-blue-100 text-gray-700 text-xs font-bold">
                      {i + 1}
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ol>

              <p className="mt-5 text-xs text-gray-500 leading-relaxed">
                After this, every push gets a <strong>preview deployment</strong>,
                and pushes to your production branch (usually{" "}
                <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-mono">main</code>)
                go live automatically.
              </p>
            </div>

            {/* Method B — CLI */}
            <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 text-gray-700">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Deploy with the CLI
                  </h3>
                  <span className="text-xs font-semibold text-gray-500">
                    For terminal-first workflows
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                Install the Vercel CLI, then run{" "}
                <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono text-xs">
                  vercel
                </code>{" "}
                from your project root. Add{" "}
                <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono text-xs">
                  --prod
                </code>{" "}
                to push straight to production.
              </p>

              <div className="mt-auto">
                <div className="rounded-xl overflow-hidden border border-gray-800/80 shadow-lg shadow-gray-900/10 ring-1 ring-black/5">
                  <div className="flex items-center gap-2 bg-gray-800 px-4 py-2.5">
                  
                    <span className="ml-2 text-xs font-mono text-gray-400">terminal</span>
                    <button
                      onClick={() => copyToClipboard(`npm install --global vercel
vercel login
vercel`, 2)}
                      className="group relative ml-auto shrink-0 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {copiedStep === 2 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-700 px-2 py-1 text-xs font-medium text-gray-100 opacity-0 transition-opacity group-hover:opacity-100">
                        {copiedStep === 2 ? "Copied!" : "Copy"}
                      </span>
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed font-mono">
{`npm install --global vercel
vercel login
vercel`}
                  </pre>
                </div>
                <p className="mt-4 text-xs text-gray-500 leading-relaxed">
                  Vercel auto-detects Astro — when it asks{" "}
                  <span className="font-semibold">&quot;Want to override the settings?&quot;</span>,
                  choose <strong>No</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Optional: vercel.json */}
        <div className="mb-16">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-8 bg-blue-50" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
                Optional
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
              Fine-tune with vercel.json
            </h2>
          </div>
          <p className="text-gray-600 mb-6 max-w-2xl">
            Vercel auto-detects your build, so you rarely need extra config. To
            override defaults or add settings — like custom response headers — add
            a{" "}
            <code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-mono text-sm">
              vercel.json
            </code>{" "}
            file to your project root.
          </p>
          <div className="rounded-xl overflow-hidden border border-gray-800/80 shadow-lg shadow-gray-900/10 ring-1 ring-black/5">
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2.5">
              
              <span className="ml-2 text-xs font-mono text-gray-400">vercel.json</span>
              <button
                onClick={() => copyToClipboard(`{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}`, 3)}
                className="group relative ml-auto shrink-0 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 3 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-700 px-2 py-1 text-xs font-medium text-gray-100 opacity-0 transition-opacity group-hover:opacity-100">
                  {copiedStep === 3 ? "Copied!" : "Copy"}
                </span>
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed font-mono">
{`{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}`}
            </pre>
          </div>
        </div>

        {/* On-demand rendering */}
        <div className="mb-16">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-8 bg-blue-50" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
                Going further
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
              Need a server? Add the adapter
            </h2>
          </div>
          <p className="text-gray-600 mb-6 max-w-2xl">
            Astro sites are fully static by default — nothing extra to configure.
            Only add the Vercel adapter if you need server features like API
            routes or pages that render on each request. One command installs{" "}
            <code className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-mono text-sm">
              @astrojs/vercel
            </code>{" "}
            and wires up your config:
          </p>

          <div className="rounded-xl overflow-hidden border border-gray-800/80 shadow-lg shadow-gray-900/10 ring-1 ring-black/5">
            <div className="flex items-center gap-2 bg-gray-800 px-4 py-2.5">
              
              <span className="ml-2 text-xs font-mono text-gray-400">terminal</span>
              <button
                onClick={() => copyToClipboard(`npx astro add vercel`, 4)}
                className="group relative ml-auto shrink-0 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 4 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-700 px-2 py-1 text-xs font-medium text-gray-100 opacity-0 transition-opacity group-hover:opacity-100">
                  {copiedStep === 4 ? "Copied!" : "Copy"}
                </span>
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed font-mono">
              npx astro add vercel
            </pre>
          </div>

          <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm text-gray-800 max-w-2xl">
            Once it&apos;s installed, your server routes and API endpoints deploy
            automatically as{" "}
            <span className="font-semibold">Vercel Functions</span> — no extra
            setup. Opt a single page into on-demand rendering by adding{" "}
            <code className="bg-blue-100 text-gray-900 px-1.5 py-0.5 rounded font-mono text-xs">
              export const prerender = false
            </code>{" "}
            to it.
          </div>
        </div>

        {/* Node version note */}
        <div className="flex items-start gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-6 mb-16">
          <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-blue-50 text-gray-700 shadow-sm">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008M10.34 3.94l-7.5 12.99A1.5 1.5 0 004.14 19.5h15.72a1.5 1.5 0 001.3-2.25l-7.5-12.99a1.5 1.5 0 00-2.6 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              A note on Node.js versions
            </h2>
            <p className="text-gray-800/90">
              If your build needs a specific Node version, set it in{" "}
              <span className="font-semibold">
                Project Settings → General → Node.js Version
              </span>{" "}
              on Vercel, or pin it with an{" "}
              <code className="bg-blue-100 text-gray-900 px-2 py-0.5 rounded font-mono text-sm">
                engines
              </code>{" "}
              field in your{" "}
              <code className="bg-blue-100 text-gray-900 px-2 py-0.5 rounded font-mono text-sm">
                package.json
              </code>{" "}
              (for example{" "}
              <code className="bg-blue-100 text-gray-900 px-2 py-0.5 rounded font-mono text-sm">
                &quot;node&quot;: &quot;22.x&quot;
              </code>
              ).
            </p>
          </div>
        </div>

        {/* Resources / Learn more */}
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-px w-8 bg-blue-50" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
                Keep going
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
              Resources & next steps
            </h2>
          </div>
          <p className="text-gray-600 mb-6 max-w-2xl">
            Dive deeper with the official documentation from Astro and Vercel.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: "Astro on Vercel",
                desc: "The official Astro deployment guide for Vercel.",
                href: "https://docs.astro.build/en/guides/deploy/vercel/",
              },
              {
                title: "@astrojs/vercel adapter",
                desc: "Full adapter reference, options, and edge config.",
                href: "https://docs.astro.build/en/guides/integrations-guide/vercel/",
              },
              {
                title: "Server-side rendering",
                desc: "Learn how on-demand rendering works in Astro.",
                href: "https://docs.astro.build/en/guides/on-demand-rendering/",
              },
              {
                title: "Vercel docs",
                desc: "Functions, redirects, environment variables, and more.",
                href: "https://vercel.com/docs",
              },
            ].map((res) => (
              <a
                key={res.href}
                href={res.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5 hover:border-blue-200"
              >
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-gray-600 transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {res.desc}
                  </p>
                </div>
                <svg className="w-5 h-5 shrink-0 text-gray-300 transition-colors group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
