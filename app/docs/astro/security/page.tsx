"use client";

import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  Code2,
  AlertTriangle,
  Server,
  RefreshCw,
  FileCheck,
  Globe,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group overflow-x-auto">
      <pre className="whitespace-pre-wrap"><code>{code}</code></pre>
      <button
        onClick={copy}
        className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
      </button>
    </div>
  );
}

export default function Security() {
  return (
    <div className="min-h-full p-12">
      <div className="max-w-3xl ml-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
        <Link href="/docs/astro" className="rounded-full py-1 hover:text-slate-600 hover:underline">
          Astro
        </Link>
        <span><LuChevronRight /></span>
        <span aria-current="page">Security</span>
      </nav>

      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Security in Astro
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Astro is static-first: pages are pre-rendered to plain HTML at build time, so a
          finished site has no server runtime, no database, and almost nothing to attack.
        </p>
      </div>

      {/* Quick Benefits */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <div className="text-4xl mb-3">🛡️</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Static by Default</h3>
          <p className="text-gray-700">
            No server, no database, no plugins running at request time &mdash; just HTML on a CDN.
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <div className="text-4xl mb-3">🧼</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Escaped by Default</h3>
          <p className="text-gray-700">
            Expressions in <code className="bg-blue-100 px-1.5 py-0.5 rounded text-sm">.astro</code> templates are HTML-escaped automatically, blocking most XSS.
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
          <div className="text-4xl mb-3">🔑</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Secrets Stay Server-Side</h3>
          <p className="text-gray-700">
            Only <code className="bg-blue-100 px-1.5 py-0.5 rounded text-sm">PUBLIC_</code> variables reach the browser. Everything else never leaves the server.
          </p>
        </div>
      </div>

      {/* Minimal attack surface */}
      <div className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">A Minimal Attack Surface</h2>
            <p className="text-lg text-gray-600">
              When you build for static output, the whole class of server-side attacks simply
              does not apply.
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-6">
          A traditional CMS exposes a database, an admin login, and a stack of plugins that all
          run on every request &mdash; each one a potential entry point for SQL injection, remote
          code execution, or privilege escalation. An Astro site built to static HTML has none of
          that at runtime. Visitors receive pre-built files from a CDN, so there is no live
          application server to compromise.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gray-600" />
              Removed by static output
            </p>
            <ul className="text-sm text-gray-700 space-y-1.5">
              <li>• SQL injection &mdash; no database queries</li>
              <li>• Server RCE &mdash; no runtime to execute on</li>
              <li>• Vulnerable CMS plugins &mdash; none installed</li>
              <li>• Admin-panel brute forcing &mdash; no login to attack</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
            <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Globe className="w-5 h-5 text-gray-600" />
              Handled by your CDN host
            </p>
            <ul className="text-sm text-gray-700 space-y-1.5">
              <li>• Automatic HTTPS / TLS certificates</li>
              <li>• DDoS protection at the edge</li>
              <li>• Distributed, cached delivery (no single server to take down)</li>
              <li>• Instant rollbacks to a previous build</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-800">
            <strong>Using on-demand rendering (SSR)?</strong> If you add a server adapter for
            API routes, actions, or server-rendered pages, the sections below become essential
            &mdash; you reintroduce a runtime, so input validation and headers matter again.
          </p>
        </div>
      </div>

      {/* XSS / auto-escaping */}
      <div className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">XSS Protection &amp; <code className="text-2xl bg-gray-100 px-2 py-1 rounded">set:html</code></h2>
            <p className="text-lg text-gray-600">
              Astro escapes template expressions for you. The only common way to open an XSS hole
              is to opt out.
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">
          Any value you render with <code className="bg-gray-100 px-2 py-1 rounded">{"{ }"}</code> is
          HTML-escaped, so a string like <code className="bg-gray-100 px-2 py-1 rounded">{"<script>"}</code> is
          shown as text instead of executed. The escape hatch is the{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">set:html</code> directive &mdash; it injects
          raw HTML, so only ever pass it content you trust or have sanitized.
        </p>

        <CodeBlock
          code={`---
const userBio = await getUserBio(); // untrusted input
---

{/* ✅ Safe: automatically HTML-escaped */}
<p>{userBio}</p>

{/* ❌ Dangerous: set:html renders raw HTML, bypassing escaping */}
<p set:html={userBio} />`}
        />

        <p className="text-gray-700 mt-6 mb-4">
          When you genuinely need to render user-supplied HTML (a rich-text bio, Markdown from an
          untrusted source), sanitize it first with a library like{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">sanitize-html</code> or{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">isomorphic-dompurify</code>.
        </p>

        <CodeBlock
          code={`---
import sanitizeHtml from "sanitize-html";
const clean = sanitizeHtml(userBio);
---

{/* ✅ Safe: rendered raw, but stripped of scripts and event handlers first */}
<p set:html={clean} />`}
        />
      </div>

      {/* Environment variables & secrets */}
      <div className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Environment Variables &amp; Secrets</h2>
            <p className="text-lg text-gray-600">
              Astro uses the <code className="bg-gray-100 px-2 py-1 rounded">PUBLIC_</code> prefix to
              draw a hard line between what ships to the browser and what stays on the server.
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">
          Only variables prefixed with <code className="bg-gray-100 px-2 py-1 rounded">PUBLIC_</code> are
          inlined into the client bundle. Anything else is available on the server and at build time,
          but is never shipped to visitors. Keep your <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file
          out of git.
        </p>

        <div className="mb-6">
          <CodeBlock
            code={`# .env  (add to .gitignore — never commit secrets)
PUBLIC_ANALYTICS_ID=G-XXXXXXX     # shipped to the browser
STRIPE_SECRET_KEY=sk_live_xxxxx   # server-only, never sent to the client`}
          />
        </div>

        <p className="text-gray-700 mb-4">
          For type-safe variables with validation, use <code className="bg-gray-100 px-2 py-1 rounded">astro:env</code>.
          Declaring a variable as <code className="bg-gray-100 px-2 py-1 rounded">access: &quot;secret&quot;</code> guarantees
          it can never be imported into client code &mdash; the build fails if you try.
        </p>

        <CodeBlock
          code={`// astro.config.mjs
import { defineConfig, envField } from "astro/config";

export default defineConfig({
  env: {
    schema: {
      STRIPE_SECRET_KEY: envField.string({ context: "server", access: "secret" }),
      PUBLIC_ANALYTICS_ID: envField.string({ context: "client", access: "public" }),
    },
  },
});`}
        />

        <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-800">
            <strong>Never</strong> put an API secret behind a <code className="bg-blue-100 px-1.5 py-0.5 rounded">PUBLIC_</code> prefix.
            Anything public is fully readable in the browser&apos;s bundled JavaScript &mdash; treat it as
            published the moment you deploy.
          </p>
        </div>
      </div>

      {/* CSRF protection */}
      <div className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Built-in CSRF Protection</h2>
            <p className="text-lg text-gray-600">
              For on-demand routes, Astro can reject cross-origin form submissions out of the box.
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">
          When you handle form <code className="bg-gray-100 px-2 py-1 rounded">POST</code> requests on the
          server, the <code className="bg-gray-100 px-2 py-1 rounded">security.checkOrigin</code> option
          verifies that the request&apos;s <code className="bg-gray-100 px-2 py-1 rounded">Origin</code> header
          matches your site before your handler runs &mdash; a simple, effective guard against CSRF.
          It is enabled by default for on-demand rendered pages, and you can set it explicitly:
        </p>

        <CodeBlock
          code={`// astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "server",
  security: {
    checkOrigin: true, // reject cross-origin form POST/PUT/PATCH/DELETE requests
  },
});`}
        />
      </div>

      {/* Security headers & CSP */}
      <div className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Security Headers &amp; CSP</h2>
            <p className="text-lg text-gray-600">
              A handful of HTTP headers hardens any site &mdash; static or server-rendered.
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">
          On a static deploy, set response headers at your host. Netlify and Cloudflare Pages read a{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">public/_headers</code> file; Vercel uses{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">vercel.json</code>.
        </p>

        <div className="mb-6">
          <CodeBlock
            code={`# public/_headers  (Netlify / Cloudflare Pages)
/*
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Permissions-Policy: geolocation=(), microphone=(), camera=()`}
          />
        </div>

        <p className="text-gray-700 mb-4">
          For on-demand routes, set headers in middleware so they apply to every response:
        </p>

        <div className="mb-6">
          <CodeBlock
            code={`// src/middleware.ts
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Frame-Options", "DENY");
  return response;
});`}
          />
        </div>

        <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <p className="text-gray-900 font-medium mb-2">🔒 Content Security Policy</p>
          <p className="text-sm text-gray-800">
            Astro has built-in CSP support that automatically generates hashes for your inline
            scripts and styles &mdash; enable it in <code className="bg-blue-100 px-1.5 py-0.5 rounded">astro.config.mjs</code> (via
            the <code className="bg-blue-100 px-1.5 py-0.5 rounded">csp</code> option; check whether it
            is experimental in your Astro version). A CSP is your strongest defense-in-depth layer
            against XSS, since it blocks unauthorized scripts even if one slips through.
          </p>
        </div>
      </div>

      {/* Input validation */}
      <div className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Validate Every Input</h2>
            <p className="text-lg text-gray-600">
              Wherever you accept data &mdash; forms, API routes, content &mdash; validate it with a schema
              before you trust it.
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">
          Astro Actions validate input with Zod before your handler ever runs, so the data you
          receive is already typed and checked. The same Zod-powered schemas back Content Collections,
          giving your Markdown and data files validation at build time too.
        </p>

        <CodeBlock
          code={`// src/actions/index.ts
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  contact: defineAction({
    accept: "form",
    input: z.object({
      email: z.string().email(),
      message: z.string().min(1).max(2000),
    }),
    handler: async ({ email, message }) => {
      // input is already validated and typed before it reaches here
      await sendEmail(email, message);
      return { ok: true };
    },
  }),
};`}
        />
      </div>

      {/* Dependencies */}
      <div className="mb-16 bg-blue-50 rounded-2xl p-8 border-2 border-blue-200">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Keep Dependencies Current</h2>
            <p className="text-lg text-gray-700">
              The biggest remaining risk for a static site is the npm packages it is built from.
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-6">
          Astro and its integrations are your supply chain. Audit them regularly, keep a committed
          lockfile so builds are reproducible, and be deliberate about which third-party integrations
          you add &mdash; each one runs with full access during the build.
        </p>

        <CodeBlock
          code={`npm audit            # report known vulnerabilities
npm audit fix        # apply safe, compatible fixes
npx @astrojs/upgrade # bump Astro + official integrations together`}
        />
      </div>
      </div>
    </div>
  );
}
