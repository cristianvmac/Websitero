"use client";

import Link from "next/link";
import {
  Shield,
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
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

export default function Security() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-orange-50 to-yellow-50 text-orange-700 rounded-full text-sm font-bold border-2 border-orange-200">
          <Link href="/docs/eleventy">Eleventy</Link>
        </div>
        <span className="text-3xl font-semibold text-gray-400">/</span>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-green-50 to-emerald-50 text-green-700 rounded-full text-sm font-bold border-2 border-green-200">
          <Shield className="w-4 h-4" />
          Security
        </div>
      </div>

      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Security in Eleventy
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Eleventy is a pure static site generator: every page is rendered to plain HTML at
          build time, so a finished site has no server runtime, no database, and almost nothing
          to attack. On top of that, sensible template defaults &mdash; automatic HTML escaping
          in Nunjucks and build-time-only secrets &mdash; keep the few dynamic parts you add safe
          too.
        </p>
      </div>

      {/* Quick Benefits */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200">
          <div className="text-4xl mb-3">🛡️</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Purely Static</h3>
          <p className="text-gray-700">
            Eleventy only ever outputs HTML, CSS, and JS &mdash; no server, no database, nothing
            running at request time. Just files on a CDN.
          </p>
        </div>

        <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-blue-200">
          <div className="text-4xl mb-3">🧼</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Escaped by Default</h3>
          <p className="text-gray-700">
            Output in <code className="bg-blue-100 px-1.5 py-0.5 rounded text-sm">.html</code> templates is HTML-escaped automatically, blocking most XSS.
          </p>
        </div>

        <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-2 border-purple-200">
          <div className="text-4xl mb-3">🔑</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Secrets Stay at Build Time</h3>
          <p className="text-gray-700">
            <code className="bg-purple-100 px-1.5 py-0.5 rounded text-sm">process.env</code> is read only during the Node build. Nothing reaches the browser unless you print it.
          </p>
        </div>
      </div>

      {/* Minimal attack surface */}
      <div className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">A Minimal Attack Surface</h2>
            <p className="text-lg text-gray-600">
              Because the output is just files, the whole class of server-side attacks simply
              does not apply.
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-6">
          A traditional CMS exposes a database, an admin login, and a stack of plugins that all
          run on every request &mdash; each one a potential entry point for SQL injection, remote
          code execution, or privilege escalation. An Eleventy site has none of that at runtime.
          Visitors receive pre-built files from a CDN, so there is no live application server to
          compromise.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
            <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-600" />
              Removed by static output
            </p>
            <ul className="text-sm text-gray-700 space-y-1.5">
              <li>• SQL injection &mdash; no database queries</li>
              <li>• Server RCE &mdash; no production runtime to execute on</li>
              <li>• Vulnerable CMS plugins &mdash; none installed</li>
              <li>• Admin-panel brute forcing &mdash; the Decap login is delegated off-site</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
            <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Globe className="w-5 h-5 text-gray-600" />
              Handled by Netlify
            </p>
            <ul className="text-sm text-gray-700 space-y-1.5">
              <li>• Automatic HTTPS / TLS certificates</li>
              <li>• DDoS protection at the edge</li>
              <li>• Distributed, cached delivery (no single server to take down)</li>
              <li>• Instant rollbacks to a previous deploy</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <p className="text-sm text-gray-800">
            <strong>Your build is the runtime.</strong> The one place code actually executes is
            the build &mdash; on your machine or in CI. Treat that environment as production: keep
            build secrets in CI, review every plugin, and never run a build from an untrusted
            source.
          </p>
        </div>
      </div>

      {/* XSS / auto-escaping */}
      <div className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">XSS Protection &amp; the <code className="text-2xl bg-gray-100 px-2 py-1 rounded">safe</code> filter</h2>
            <p className="text-lg text-gray-600">
              Nunjucks escapes template output for you. The only common way to open an XSS hole
              is to opt out.
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">
          Any value you render with <code className="bg-gray-100 px-2 py-1 rounded">{"{{ }}"}</code> in a
          Nunjucks template is HTML-escaped, so a string like <code className="bg-gray-100 px-2 py-1 rounded">{"<script>"}</code> is
          shown as text instead of executed. The escape hatch is the{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">safe</code> filter &mdash; it outputs
          raw HTML, so only ever pass it content you trust or have sanitized.
        </p>

        <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group overflow-x-auto">
          <pre className="whitespace-pre-wrap"><code>{`{# userBio comes from a CMS or user-generated content — untrusted #}

{# ✅ Safe: Nunjucks HTML-escapes automatically #}
<p>{{ userBio }}</p>

{# ❌ Dangerous: \`safe\` outputs raw HTML, bypassing escaping #}
<p>{{ userBio | safe }}</p>`}</code></pre>
          <button
            onClick={() =>
              copyToClipboard(
                `{# userBio comes from a CMS or user-generated content — untrusted #}

{# Safe: Nunjucks HTML-escapes automatically #}
<p>{{ userBio }}</p>

{# Dangerous: safe outputs raw HTML, bypassing escaping #}
<p>{{ userBio | safe }}</p>`,
                1
              )
            }
            className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {copiedStep === 1 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
        </div>

        <p className="text-gray-700 mt-6 mb-4">
          When you genuinely need to render user-supplied HTML (a rich-text bio, Markdown from an
          untrusted source), sanitize it first. Add a filter in your config backed by a library
          like <code className="bg-gray-100 px-2 py-1 rounded">sanitize-html</code>, then pipe
          through it before <code className="bg-gray-100 px-2 py-1 rounded">safe</code>.
        </p>

        <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group overflow-x-auto">
          <pre className="whitespace-pre-wrap"><code>{`// .eleventy.js
const sanitizeHtml = require("sanitize-html");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("sanitize", (html) => sanitizeHtml(html));
};`}</code></pre>
          <button
            onClick={() =>
              copyToClipboard(
                `// .eleventy.js
const sanitizeHtml = require("sanitize-html");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("sanitize", (html) => sanitizeHtml(html));
};`,
                2
              )
            }
            className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {copiedStep === 2 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
        </div>

        <p className="text-gray-700 mt-4">
          Now <code className="bg-gray-100 px-2 py-1 rounded">{"<p>{{ userBio | sanitize | safe }}</p>"}</code> renders
          the HTML raw, but stripped of scripts and event handlers first.
        </p>
      </div>

      {/* Environment variables & secrets */}
      <div className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Environment Variables &amp; Secrets</h2>
            <p className="text-lg text-gray-600">
              Eleventy runs in Node at build time, so <code className="bg-gray-100 px-2 py-1 rounded">process.env</code> is
              available where you build &mdash; never in the browser.
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">
          You can read <code className="bg-gray-100 px-2 py-1 rounded">process.env</code> in your
          config, in global data files, and in JavaScript templates &mdash; all of which run only
          during the build. None of it ships to visitors unless you explicitly print it into a
          page. The starter already relies on this pattern: it reads{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">ELEVENTY_ENV</code> (set to{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">PROD</code> on Netlify builds) to toggle
          minification. Use <code className="bg-gray-100 px-2 py-1 rounded">dotenv</code> for local
          values and keep your <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file out of git.
        </p>

        <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group overflow-x-auto mb-6">
          <pre className="whitespace-pre-wrap"><code>{`# .env  (add to .gitignore — never commit secrets)
API_TOKEN=secret_xxxxx          # used at build time to fetch data
ANALYTICS_ID=G-XXXXXXX          # safe to print into the page`}</code></pre>
          <button
            onClick={() =>
              copyToClipboard(
                `# .env  (add to .gitignore — never commit secrets)
API_TOKEN=secret_xxxxx          # used at build time to fetch data
ANALYTICS_ID=G-XXXXXXX          # safe to print into the page`,
                3
              )
            }
            className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {copiedStep === 3 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
        </div>

        <p className="text-gray-700 mb-4">
          A global data file in <code className="bg-gray-100 px-2 py-1 rounded">src/_data/</code> &mdash;
          alongside the kit&apos;s own <code className="bg-gray-100 px-2 py-1 rounded">client.js</code> &mdash; can use
          a secret to fetch from an API while only the returned data &mdash; never the token &mdash;
          ends up in your pages:
        </p>

        <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group overflow-x-auto">
          <pre className="whitespace-pre-wrap"><code>{`// src/_data/products.js  — runs at build time only
module.exports = async function () {
  const res = await fetch("https://api.example.com/products", {
    headers: { Authorization: \`Bearer \${process.env.API_TOKEN}\` },
  });
  // Only this returned data is rendered — the token never reaches the page
  return res.json();
};`}</code></pre>
          <button
            onClick={() =>
              copyToClipboard(
                `// src/_data/products.js  — runs at build time only
module.exports = async function () {
  const res = await fetch("https://api.example.com/products", {
    headers: { Authorization: \`Bearer \${process.env.API_TOKEN}\` },
  });
  // Only this returned data is rendered — the token never reaches the page
  return res.json();
};`,
                4
              )
            }
            className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {copiedStep === 4 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
        </div>

        <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">
            <strong>Never</strong> print a secret into a template &mdash; even in a comment or a{" "}
            <code className="bg-red-100 px-1.5 py-0.5 rounded">data-</code> attribute. Anything you
            output ends up in the public HTML. Build-time secrets must stay in build-time code
            (config, <code className="bg-red-100 px-1.5 py-0.5 rounded">_data</code>, filters),
            never in the rendered page.
          </p>
        </div>
      </div>

      {/* Forms & dynamic features */}
      <div className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Forms &amp; Dynamic Features Live Off-Site</h2>
            <p className="text-lg text-gray-600">
              With no server of your own, there is nothing to receive a form POST &mdash; so whole
              classes of attack are never yours to defend.
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">
          Because a finished Eleventy site is just files, dynamic work like contact forms,
          payments, or search is delegated to specialized providers &mdash; Netlify Forms,
          Formspree, Stripe, and the like. They handle spam filtering, validation, and CSRF on
          their own hardened infrastructure, keeping sensitive operations off your public site
          entirely.
        </p>

        <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group overflow-x-auto">
          <pre className="whitespace-pre-wrap"><code>{`<!-- A Netlify form — submissions are processed by Netlify, not by you -->
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <label>Email <input type="email" name="email" required /></label>
  <label>Message <textarea name="message" required></textarea></label>
  <button type="submit">Send</button>
</form>`}</code></pre>
          <button
            onClick={() =>
              copyToClipboard(
                `<!-- A Netlify form — submissions are processed by Netlify, not by you -->
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <label>Email <input type="email" name="email" required /></label>
  <label>Message <textarea name="message" required></textarea></label>
  <button type="submit">Send</button>
</form>`,
                5
              )
            }
            className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {copiedStep === 5 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
        </div>

        <div className="mt-6 p-4 bg-indigo-50 border-2 border-indigo-200 rounded-lg flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <p className="text-sm text-indigo-900">
            Pick a reputable provider and let it do the hard part. By keeping submissions, payment
            details, and authentication on a maintained third-party platform, your site keeps a
            strong security posture without ever exposing a server.
          </p>
        </div>
      </div>

      {/* Decap CMS admin */}
      <div className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-sky-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">The Decap CMS Admin</h2>
            <p className="text-lg text-gray-600">
              The one login in this kit lives at{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">/admin/</code> &mdash; but the
              authentication never runs on your site.
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">
          The starter bundles Decap CMS so a client can edit blog posts. It looks like an admin
          panel, but it is just static HTML and JavaScript: it has no server, no database, and no
          password store of its own. Logins are delegated to{" "}
          <strong>DecapBridge</strong>, and approved edits are committed straight to your Git
          repository &mdash; which then triggers a fresh Netlify build. There is nothing on your
          public site to brute-force.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-sky-50 border-2 border-sky-200 rounded-lg">
            <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-600" />
              Why it stays safe
            </p>
            <ul className="text-sm text-gray-700 space-y-1.5">
              <li>• Auth handled by DecapBridge, not your site</li>
              <li>• Edits land as Git commits, gated by repo access</li>
              <li>• No CMS database or runtime to exploit</li>
              <li>• Content is re-validated on the next build</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
            <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Lock className="w-5 h-5 text-gray-600" />
              Your responsibilities
            </p>
            <ul className="text-sm text-gray-700 space-y-1.5">
              <li>• Limit who has write access to the repo</li>
              <li>• Treat editor accounts like deploy keys</li>
              <li>• Sanitize CMS-authored HTML before <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">safe</code></li>
              <li>• Run <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">npm run remove-decap</code> if unused</li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-sky-50 border-2 border-sky-200 rounded-lg flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
          <p className="text-sm text-sky-900">
            Because content authored in Decap is &ldquo;trusted-ish&rdquo; user input, the same
            escaping rules apply: render Markdown bodies normally, and if you ever pipe CMS HTML
            through <code className="bg-sky-100 px-1.5 py-0.5 rounded">safe</code>, sanitize it first.
            Not building a blog? The kit&apos;s{" "}
            <code className="bg-sky-100 px-1.5 py-0.5 rounded">remove-decap</code> script strips the
            admin entirely, shrinking the attack surface to nothing but static files.
          </p>
        </div>
      </div>

      {/* Security headers & CSP */}
      <div className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-teal-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Security Headers &amp; CSP</h2>
            <p className="text-lg text-gray-600">
              A handful of HTTP headers hardens any static site &mdash; and you set them at your host.
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">
          Since Eleventy ships only files, response headers are configured where you deploy. This
          starter deploys to Netlify, which reads a{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">_headers</code> file from your output folder
          (drop it in <code className="bg-gray-100 px-2 py-1 rounded">src/</code> so it copies into{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">public/</code>, next to the kit&apos;s existing{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">_redirects</code>).
        </p>

        <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group overflow-x-auto mb-6">
          <pre className="whitespace-pre-wrap"><code>{`# src/_headers  (copied into public/ — served by Netlify)
/*
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Permissions-Policy: geolocation=(), microphone=(), camera=()`}</code></pre>
          <button
            onClick={() =>
              copyToClipboard(
                `# src/_headers  (copied into public/ — served by Netlify)
/*
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Permissions-Policy: geolocation=(), microphone=(), camera=()`,
                6
              )
            }
            className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {copiedStep === 6 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
        </div>

        <p className="text-gray-700 mb-4">
          Prefer config over a copied file? The starter already ships a{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">netlify.toml</code> at the repo root &mdash;
          add a headers block to it:
        </p>

        <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group overflow-x-auto mb-6">
          <pre className="whitespace-pre-wrap"><code>{`# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    X-Frame-Options = "DENY"`}</code></pre>
          <button
            onClick={() =>
              copyToClipboard(
                `# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    X-Frame-Options = "DENY"`,
                7
              )
            }
            className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {copiedStep === 7 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
        </div>

        <div className="p-4 bg-teal-50 border-2 border-teal-200 rounded-lg">
          <p className="text-teal-900 font-medium mb-2">🔒 Content Security Policy</p>
          <p className="text-sm text-teal-800">
            Eleventy does not generate CSP hashes for you, so the cleanest path is to avoid inline
            scripts and styles &mdash; then you can ship a strict{" "}
            <code className="bg-teal-100 px-1.5 py-0.5 rounded">Content-Security-Policy</code> header
            (alongside the others above) without <code className="bg-teal-100 px-1.5 py-0.5 rounded">unsafe-inline</code>.
            If you must use inline code, generate a hash or nonce and add it to the policy. A CSP is
            your strongest defense-in-depth layer against XSS, blocking unauthorized scripts even if
            one slips through.
          </p>
        </div>
      </div>

      {/* Input validation */}
      <div className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-rose-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Validate Data at Build Time</h2>
            <p className="text-lg text-gray-600">
              Wherever you pull in outside data &mdash; APIs, <code className="bg-gray-100 px-2 py-1 rounded">src/_data</code> files,
              front matter &mdash; validate it before you trust it.
            </p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">
          Eleventy assembles data from many sources at build time. Validating anything from an
          external source means a bad upstream response fails the build instead of shipping broken
          or unsafe markup. A schema library like <code className="bg-gray-100 px-2 py-1 rounded">zod</code> works
          well inside a data file:
        </p>

        <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group overflow-x-auto">
          <pre className="whitespace-pre-wrap"><code>{`// src/_data/posts.js  — validate external data before it's rendered
const { z } = require("zod");

const PostSchema = z.array(
  z.object({
    title: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    body: z.string(),
  })
);

module.exports = async function () {
  const res = await fetch("https://cms.example.com/posts");
  // Throws and fails the build if the shape is wrong
  return PostSchema.parse(await res.json());
};`}</code></pre>
          <button
            onClick={() =>
              copyToClipboard(
                `// src/_data/posts.js  — validate external data before it's rendered
const { z } = require("zod");

const PostSchema = z.array(
  z.object({
    title: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    body: z.string(),
  })
);

module.exports = async function () {
  const res = await fetch("https://cms.example.com/posts");
  // Throws and fails the build if the shape is wrong
  return PostSchema.parse(await res.json());
};`,
                8
              )
            }
            className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {copiedStep === 8 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
        </div>
      </div>

      {/* Dependencies */}
      <div className="mb-16 bg-linear-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-200">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-amber-600 text-white rounded-xl flex items-center justify-center shadow-lg">
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
          Eleventy and its plugins are your supply chain &mdash; each one runs with full access
          during the build. Audit them regularly, keep a committed lockfile so builds are
          reproducible, and be deliberate about which plugins you add.
        </p>

        <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group overflow-x-auto">
          <pre className="whitespace-pre-wrap"><code>{`npm audit                          # report known vulnerabilities
npm audit fix                      # apply safe, compatible fixes
npm outdated                       # see which packages have newer versions
npm install @11ty/eleventy@latest  # update Eleventy itself`}</code></pre>
          <button
            onClick={() =>
              copyToClipboard(
                `npm audit                          # report known vulnerabilities
npm audit fix                      # apply safe, compatible fixes
npm outdated                       # see which packages have newer versions
npm install @11ty/eleventy@latest  # update Eleventy itself`,
                9
              )
            }
            className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {copiedStep === 9 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
        </div>
      </div>
    </div>
  );
}
