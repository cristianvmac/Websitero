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

          <h1 className="text-slate-900 text-2xl sm:text-5xl font-extrabold mb-5 tracking-tight">
            Deploy your Astro site to Vercel
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Vercel hosts websites for free and updates them automatically every
            time you push to Git. Any Astro site works on Vercel — this guide
            walks you through it step by step.
          </p>
        </div>
      </div>

      <div className="max-w-3xl ml-6">
        {/* Build settings at a glance */}
        <div className="mb-16 mt-10">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-slate-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
                Good to know
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl mt-4 font-bold text-slate-800 tracking-tight">
              Build settings
            </h2>
          </div>
          <p className="text-slate-600 mb-6 max-w-2xl">
            Vercel fills these in automatically when you import an Astro
            project, so you usually don&apos;t have to touch them:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Build command */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md hover:-translate-y-0.5">
              <span className="absolute inset-x-0 top-0 h-1 bg-blue-50" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-slate-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Build command
                    </p>
                    <p className="text-sm text-slate-700">Compiles your site</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-lg bg-slate-900 px-4 py-3">
                  <code className="flex items-center gap-2 font-mono text-sm text-slate-100 overflow-x-auto">
                    <span className="text-slate-400 select-none">$</span>
                    npm run build
                  </code>
                  <button
                    onClick={() => copyToClipboard(`npm run build`, 2)}
                    className="group relative shrink-0 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {copiedStep === 2 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                    <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-slate-100 opacity-0 transition-opacity group-hover:opacity-100">
                      {copiedStep === 2 ? "Copied!" : "Copy"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Output directory */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md hover:-translate-y-0.5">
              <span className="absolute inset-x-0 top-0 h-1 bg-blue-50" />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-slate-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Output directory
                    </p>
                    <p className="text-sm text-slate-700">Where the site lands</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-lg bg-slate-900 px-4 py-3">
                  <code className="flex items-center gap-2 font-mono text-sm text-slate-100 overflow-x-auto">
                    <svg className="w-4 h-4 text-yellow-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                    dist
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two ways to deploy */}
        <div className="mb-16">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className=" bg-slate-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
                Pick one
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl mt-4 font-bold text-slate-800 tracking-tight">
              Two ways to deploy
            </h2>
          </div>
          <p className="text-slate-600 mb-6 max-w-2xl">
            Both get your site live. If you&apos;re new, start with the website —
            it&apos;s all clicks, no terminal.
          </p>

          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            {/* Method A — Git / UI */}
            <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-100 text-slate-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v12m0 0a3 3 0 103 3m-3-3a3 3 0 013 3m6-15a3 3 0 11-3 3m3-3a3 3 0 00-3 3m0 0v6a6 6 0 01-6 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    From the website
                  </h3>
                  <span className="text-xs font-semibold text-slate-600">
                    Recommended for beginners
                  </span>
                </div>
              </div>

              <p className="text-slate-600 mb-5 text-sm leading-relaxed">
                Connect a repo from GitHub, GitLab, or BitBucket. Vercel
                recognizes Astro and fills in the settings for you.
              </p>

              <ol className="space-y-3 mt-auto">
                {[
                  <>Click <strong>Add New… → Project</strong> in your Vercel dashboard.</>,
                  <>Import the Git repository you want to deploy.</>,
                  <>Vercel detects <strong>Astro</strong> and fills in the build settings.</>,
                  <>Click <strong>Deploy</strong> — that&apos;s it.</>,
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                    <span className="flex items-center justify-center w-6 h-6 shrink-0 rounded-full bg-blue-100 text-slate-700 text-xs font-bold">
                      {i + 1}
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ol>

              <p className="mt-5 text-xs text-slate-500 leading-relaxed">
                After this, every <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono">git push</code> rebuilds your site automatically.
              </p>
            </div>

            {/* Method B — CLI */}
            <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 text-slate-700">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">
                    From the terminal
                  </h3>
                  <span className="text-xs font-semibold text-slate-500">
                    If you prefer the command line
                  </span>
                </div>
              </div>

              <p className="text-slate-600 mb-5 text-sm leading-relaxed">
                Run these three commands. <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono text-xs">vercel</code>{" "}
                detects your Astro settings and walks you through the rest.
              </p>

              <div className="mt-auto">
                <div className="rounded-xl overflow-hidden border border-slate-800/80 shadow-lg shadow-slate-900/10 ring-1 ring-black/5">
                  <div className="flex items-center gap-2 bg-slate-800 px-4 py-2.5">
                    <span className="ml-2 text-xs font-mono text-slate-400">terminal</span>
                    <button
                      onClick={() => copyToClipboard(`npm install --global vercel
vercel login
vercel`, 3)}
                      className="group relative ml-auto shrink-0 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      {copiedStep === 3 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-slate-100 opacity-0 transition-opacity group-hover:opacity-100">
                        {copiedStep === 3 ? "Copied!" : "Copy"}
                      </span>
                    </button>
                  </div>
                  <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm leading-relaxed font-mono">
{`npm install --global vercel
vercel login
vercel`}
                  </pre>
                </div>
                <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                  When Vercel asks{" "}
                  <span className="font-semibold">&quot;Want to override the settings?&quot;</span>,
                  choose <strong>No</strong> — it already detected Astro.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Optional: vercel.json */}
        <div className="mb-16">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className=" bg-slate-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
                Optional
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl mt-4 font-bold text-slate-800 tracking-tight">
              Set the build in a file
            </h2>
          </div>
          <p className="text-slate-600 mb-6 max-w-2xl">
            Want extra settings saved in your repo instead of the dashboard —
            like custom response headers? Add a{" "}
            <code className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-mono text-sm">
              vercel.json
            </code>{" "}
            file to the root of your project. Vercel reads it on every deploy.
          </p>
          <div className="rounded-xl overflow-hidden border border-slate-800/80 shadow-lg shadow-slate-900/10 ring-1 ring-black/5">
            <div className="flex items-center gap-2 bg-slate-800 px-4 py-2.5">
              <span className="ml-2 text-xs font-mono text-slate-400">vercel.json</span>
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
}`, 4)}
                className="group relative ml-auto shrink-0 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedStep === 4 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-slate-100 opacity-0 transition-opacity group-hover:opacity-100">
                  {copiedStep === 4 ? "Copied!" : "Copy"}
                </span>
              </button>
            </div>
            <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm leading-relaxed font-mono">
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
              <span className=" bg-slate-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
                Going further
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl mt-4 font-bold text-slate-800 tracking-tight">
              Need a server? Add the adapter
            </h2>
          </div>
          <p className="text-slate-600 mb-6 max-w-2xl">
            By default your Astro site is fully static — perfect for most
            projects, and nothing extra to set up. Only add the Vercel adapter
            if you need server features like API routes or pages that render on
            each request. One command installs and configures it:
          </p>

          <div className="rounded-xl overflow-hidden border border-slate-800/80 shadow-lg shadow-slate-900/10 ring-1 ring-black/5">
            <div className="flex items-center gap-2 bg-slate-800 px-4 py-2.5">
              <span className="ml-2 text-xs font-mono text-slate-400">terminal</span>
              <button
                onClick={() => copyToClipboard(`npx astro add vercel`, 5)}
                className="group relative ml-auto shrink-0 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedStep === 5 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-slate-100 opacity-0 transition-opacity group-hover:opacity-100">
                  {copiedStep === 5 ? "Copied!" : "Copy"}
                </span>
              </button>
            </div>
            <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm leading-relaxed font-mono">
              npx astro add vercel
            </pre>
          </div>

          <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm text-slate-800 max-w-2xl">
            Once it&apos;s installed, your server routes and API endpoints deploy
            automatically as <span className="font-semibold">Vercel Functions</span> —
            no extra setup. Make a single page render on the server by adding{" "}
            <code className="bg-blue-100 text-slate-900 px-1.5 py-0.5 rounded font-mono text-xs">
              export const prerender = false
            </code>{" "}
            to it.
          </div>
        </div>

        {/* Node version note */}
        <div className="flex items-start gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-6 mb-16">
          <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-blue-50 text-slate-700 shadow-sm">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008M10.34 3.94l-7.5 12.99A1.5 1.5 0 004.14 19.5h15.72a1.5 1.5 0 001.3-2.25l-7.5-12.99a1.5 1.5 0 00-2.6 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-1">
              Build failing? Check your Node version
            </h2>
            <p className="text-slate-800/90">
              Astro needs Node <strong>22.12.0</strong> or newer. If your build
              fails, set the version in{" "}
              <span className="font-semibold">
                Project Settings → General → Node.js Version
              </span>{" "}
              on Vercel, or pin it with an{" "}
              <code className="bg-blue-100 text-slate-900 px-2 py-0.5 rounded font-mono text-sm">
                engines
              </code>{" "}
              field in your{" "}
              <code className="bg-blue-100 text-slate-900 px-2 py-0.5 rounded font-mono text-sm">
                package.json
              </code>{" "}
              (for example{" "}
              <code className="bg-blue-100 text-slate-900 px-2 py-0.5 rounded font-mono text-sm">
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
              <span className=" bg-slate-300" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-600">
                Keep going
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl mt-4 font-bold text-slate-800 tracking-tight">
              Learn more
            </h2>
          </div>
          <p className="text-slate-600 mb-6 max-w-2xl">
            The official docs go deeper if you need them.
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
                className="group flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:-translate-y-0.5 hover:border-blue-200"
              >
                <div>
                  <h3 className="font-bold text-slate-800 group-hover:text-slate-600 transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {res.desc}
                  </p>
                </div>
                <svg className="w-5 h-5 shrink-0 text-slate-300 transition-colors group-hover:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
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
