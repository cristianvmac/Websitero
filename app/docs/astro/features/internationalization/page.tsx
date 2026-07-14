"use client";

import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { Globe, Languages, Copy, Check, FolderTree, GitBranch, Compass, ArrowRight, Route, Workflow, Server } from "lucide-react";
import { useState } from "react";

export default function Internationalization() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="min-h-full p-12">
      <div className="max-w-3xl mx-auto">

      {/* Hero Section */}
      <div className="mb-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
          <Link href="/docs/astro" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Astro
          </Link>
          <span><LuChevronRight /></span>
          <Link href="/docs/astro/features" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Features
          </Link>
          <span><LuChevronRight /></span>
          <span aria-current="page">Internationalization</span>
        </nav>

        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Add Multi-Language Support
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Astro&apos;s built-in i18n routing lets you adapt your project for an international audience.
          Configure a default language, compute relative page URLs, accept the preferred languages from
          your visitor&apos;s browser, and set per-language fallbacks so visitors are always directed to
          existing content.
        </p>
      </div>

      {/* Setup Instructions */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Set Up i18n Routing
            </h2>
            <p className="text-lg text-gray-600">
              Configure your locales and start building localized pages
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Configure Your Locales
              </h3>
            </div>
            <p className="text-gray-600 mb-4 ml-11">
              Open <code className="bg-gray-100 px-2 py-1 rounded">astro.config.mjs</code> and add an
              {" "}<code className="bg-gray-100 px-2 py-0.5 rounded">i18n</code> object. List every
              supported language in <code className="bg-gray-100 px-2 py-0.5 rounded">locales</code> and
              pick one as your <code className="bg-gray-100 px-2 py-0.5 rounded">defaultLocale</code>:
            </p>
            <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`// astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
  i18n: {
    locales: ["es", "en", "pt-br"],
    defaultLocale: "en",
  },
});`}</code></pre>
              <button
                onClick={() => copyToClipboard(`// astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
  i18n: {
    locales: ["es", "en", "pt-br"],
    defaultLocale: "en",
  },
});`, 1)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 1 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            <div className="ml-11 mt-3 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Note:</strong> <code className="bg-blue-100 px-2 py-0.5 rounded">defaultLocale</code> must be one of the languages listed in <code className="bg-blue-100 px-2 py-0.5 rounded">locales</code>.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Create Localized Folders
              </h3>
            </div>
            <p className="text-gray-600 mb-4 ml-11">
              Organize content into <code className="bg-gray-100 px-2 py-0.5 rounded">/[locale]/</code> folders
              inside <code className="bg-gray-100 px-2 py-0.5 rounded">src/pages/</code>. Folder names must match
              your <code className="bg-gray-100 px-2 py-0.5 rounded">locales</code> exactly. With the default
              {" "}<code className="bg-gray-100 px-2 py-0.5 rounded">prefixDefaultLocale: false</code>, your
              default language lives at the root:
            </p>
            <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`src/
└── pages/
    ├── about.astro          → example.com/about/
    ├── index.astro          → example.com/
    ├── es/
    │   ├── about.astro      → example.com/es/about/
    │   └── index.astro      → example.com/es/
    └── pt-br/
        ├── about.astro      → example.com/pt-br/about/
        └── index.astro      → example.com/pt-br/`}</code></pre>
              <button
                onClick={() => copyToClipboard(`src/
└── pages/
    ├── about.astro          → example.com/about/
    ├── index.astro          → example.com/
    ├── es/
    │   ├── about.astro      → example.com/es/about/
    │   └── index.astro      → example.com/es/
    └── pt-br/
        ├── about.astro      → example.com/pt-br/about/
        └── index.astro      → example.com/pt-br/`, 2)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 2 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            <div className="ml-11 mt-3 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                ✨ The localized folders don&apos;t need to sit at the root of <code className="bg-green-100 px-2 py-0.5 rounded">/pages/</code> — they can be nested anywhere.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Create Localized Links
              </h3>
            </div>
            <p className="text-gray-600 mb-4 ml-11">
              Use the helper functions from the <code className="bg-gray-100 px-2 py-0.5 rounded">astro:i18n</code> module
              to compute correct, localized routes. <code className="bg-gray-100 px-2 py-0.5 rounded">getRelativeLocaleUrl()</code> always
              returns the right path for a given locale:
            </p>
            <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`---
// src/pages/es/index.astro
import { getRelativeLocaleUrl } from "astro:i18n";

const aboutURL = getRelativeLocaleUrl("es", "about");
---

<a href="/get-started/">¡Vamos!</a>
<a href={getRelativeLocaleUrl("es", "blog")}>Blog</a>
<a href={aboutURL}>Acerca</a>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`---
// src/pages/es/index.astro
import { getRelativeLocaleUrl } from "astro:i18n";

const aboutURL = getRelativeLocaleUrl("es", "about");
---

<a href="/get-started/">¡Vamos!</a>
<a href={getRelativeLocaleUrl("es", "blog")}>Blog</a>
<a href={aboutURL}>Acerca</a>`, 3)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 3 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Success */}
          <div className="ml-11 p-6 bg-green-50 border-2 border-green-200 rounded-lg">
            <p className="text-green-900 font-medium mb-2">
              🎉 You&apos;re Multi-Language!
            </p>
            <p className="text-sm text-green-800">
              Astro now generates localized routes from your folder structure and the i18n middleware
              verifies that every localized URL maps to a valid route.
            </p>
          </div>
        </div>
      </div>

      {/* prefixDefaultLocale */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <FolderTree className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Default Language URLs
            </h2>
            <p className="text-lg text-gray-600">
              Choose whether your default language gets a URL prefix
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-bold mb-3">
              Default
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              prefixDefaultLocale: false
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Your default language has no prefix. Its files live at the root of
              {" "}<code className="bg-gray-100 px-1.5 py-0.5 rounded">src/pages/</code>.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600">•</span>
                <span><code className="bg-gray-100 px-1.5 py-0.5 rounded">pages/about.astro</code> → <code className="bg-gray-100 px-1.5 py-0.5 rounded">/about/</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600">•</span>
                <span><code className="bg-gray-100 px-1.5 py-0.5 rounded">pages/fr/about.astro</code> → <code className="bg-gray-100 px-1.5 py-0.5 rounded">/fr/about/</code></span>
              </li>
            </ul>
          </div>

          <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-xs font-bold mb-3">
              Prefixed
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              prefixDefaultLocale: true
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Every language gets a prefix. All content files, including the default
              locale, live in their own folder.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600">•</span>
                <span><code className="bg-purple-100 px-1.5 py-0.5 rounded">pages/en/about.astro</code> → <code className="bg-purple-100 px-1.5 py-0.5 rounded">/en/about/</code></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600">•</span>
                <span>A root <code className="bg-purple-100 px-1.5 py-0.5 rounded">pages/index.astro</code> is always required</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group">
          <pre className="whitespace-pre-wrap"><code>{`// astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
  i18n: {
    locales: ["es", "en", "fr"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
      // Optional: also redirect "/" to "/en/"
      redirectToDefaultLocale: true,
    },
  },
});`}</code></pre>
          <button
            onClick={() => copyToClipboard(`// astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
  i18n: {
    locales: ["es", "en", "fr"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
      // Optional: also redirect "/" to "/en/"
      redirectToDefaultLocale: true,
    },
  },
});`, 4)}
            className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {copiedStep === 4 ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>

        <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            ⚠️ With <code className="bg-yellow-100 px-1.5 py-0.5 rounded">prefixDefaultLocale: true</code>, URLs
            without a locale prefix return a <strong>404</strong> unless you set a fallback. The home page
            {" "}<code className="bg-yellow-100 px-1.5 py-0.5 rounded">/</code> stays unprefixed by default — add
            {" "}<code className="bg-yellow-100 px-1.5 py-0.5 rounded">redirectToDefaultLocale: true</code> to
            redirect it to <code className="bg-yellow-100 px-1.5 py-0.5 rounded">/[defaultLocale]/</code>.
          </p>
        </div>
      </div>

      {/* Fallback */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <GitBranch className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Fallback Languages
            </h2>
            <p className="text-lg text-gray-600">
              Show existing content instead of a 404 for missing translations
            </p>
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          Map languages to a fallback locale with <code className="bg-gray-100 px-2 py-0.5 rounded">i18n.fallback</code>,
          then choose how the fallback is served with <code className="bg-gray-100 px-2 py-0.5 rounded">routing.fallbackType</code>:
          {" "}<code className="bg-gray-100 px-2 py-0.5 rounded">&quot;redirect&quot;</code> (default) sends the visitor to the
          fallback route, while <code className="bg-gray-100 px-2 py-0.5 rounded">&quot;rewrite&quot;</code> serves the fallback
          content without changing the URL.
        </p>

        <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group">
          <pre className="whitespace-pre-wrap"><code>{`// astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
  i18n: {
    locales: ["es", "en", "fr"],
    defaultLocale: "en",
    fallback: {
      fr: "es", // missing /fr/ pages fall back to /es/
    },
    routing: {
      fallbackType: "rewrite", // serve es content at the fr URL
    },
  },
});`}</code></pre>
          <button
            onClick={() => copyToClipboard(`// astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
  i18n: {
    locales: ["es", "en", "fr"],
    defaultLocale: "en",
    fallback: {
      fr: "es", // missing /fr/ pages fall back to /es/
    },
    routing: {
      fallbackType: "rewrite", // serve es content at the fr URL
    },
  },
});`, 5)}
            className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {copiedStep === 5 ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>

        <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            With this config, a visitor opening <code className="bg-green-100 px-1.5 py-0.5 rounded">example.com/fr/my-page/</code> sees
            the content from <code className="bg-green-100 px-1.5 py-0.5 rounded">/es/my-page/</code> — no 404 — even when
            {" "}<code className="bg-green-100 px-1.5 py-0.5 rounded">src/pages/fr/my-page.astro</code> doesn&apos;t exist yet.
          </p>
        </div>
      </div>

      {/* Custom locale paths */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-pink-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <Route className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Custom Locale Paths
            </h2>
            <p className="text-lg text-gray-600">
              Map several browser language codes onto a single, custom URL path
            </p>
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          Instead of a plain string, pass an object with a <code className="bg-gray-100 px-2 py-0.5 rounded">path</code> (the
          URL prefix and folder name) and <code className="bg-gray-100 px-2 py-0.5 rounded">codes</code> (the browser
          language codes it covers). Useful for grouping variants like <code className="bg-gray-100 px-2 py-0.5 rounded">fr</code>,
          {" "}<code className="bg-gray-100 px-2 py-0.5 rounded">fr-CA</code>, and <code className="bg-gray-100 px-2 py-0.5 rounded">fr-BR</code> under
          one <code className="bg-gray-100 px-2 py-0.5 rounded">/french/</code> URL:
        </p>

        <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group">
          <pre className="whitespace-pre-wrap"><code>{`// astro.config.mjs
export default defineConfig({
  i18n: {
    locales: [
      "es",
      "en",
      {
        path: "french", // folder name + URL prefix, no slashes
        codes: ["fr", "fr-BR", "fr-CA"],
      },
    ],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
    },
  },
});`}</code></pre>
          <button
            onClick={() => copyToClipboard(`// astro.config.mjs
export default defineConfig({
  i18n: {
    locales: [
      "es",
      "en",
      {
        path: "french", // folder name + URL prefix, no slashes
        codes: ["fr", "fr-BR", "fr-CA"],
      },
    ],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
    },
  },
});`, 6)}
            className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {copiedStep === 6 ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>

        <div className="mt-4 p-4 bg-pink-50 border-2 border-pink-200 rounded-lg">
          <p className="text-sm text-pink-800">
            📁 Your <code className="bg-pink-100 px-1.5 py-0.5 rounded">/[locale]/</code> folder must be named to match
            {" "}<code className="bg-pink-100 px-1.5 py-0.5 rounded">path</code> (here <code className="bg-pink-100 px-1.5 py-0.5 rounded">src/pages/french/</code>),
            and you pass <code className="bg-pink-100 px-1.5 py-0.5 rounded">path</code> — not a code — as the locale to helpers
            like <code className="bg-pink-100 px-1.5 py-0.5 rounded">getRelativeLocaleUrl(&quot;french&quot;, &quot;about&quot;)</code>.
          </p>
        </div>
      </div>

      {/* Routing logic & custom middleware */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <Workflow className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Routing Logic &amp; Custom Middleware
            </h2>
            <p className="text-lg text-gray-600">
              Extend or replace Astro&apos;s i18n routing for full control
            </p>
          </div>
        </div>

        <div className="p-4 bg-indigo-50 border-2 border-indigo-200 rounded-lg mb-8">
          <p className="text-sm text-indigo-900">
            🧭 Astro implements i18n as a <strong>middleware</strong> placed first in the chain. It awaits every
            response from your own middleware and page routes, <em>then</em> runs its logic — such as verifying
            that a localized URL maps to a valid route. You can add your own logic alongside or instead of it
            while still using the <code className="bg-indigo-100 px-1.5 py-0.5 rounded">astro:i18n</code> helpers.
          </p>
        </div>

        {/* manual routing */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <h3 className="text-xl font-bold text-gray-900">
              Manual Routing
            </h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold border border-gray-200">
              astro@4.6.0+
            </span>
          </div>
          <p className="text-gray-600 mb-4">
            Set <code className="bg-gray-100 px-2 py-0.5 rounded">routing: &quot;manual&quot;</code> to disable Astro&apos;s i18n
            middleware and write your own. No other routing options can be combined with it. Astro exposes
            {" "}<code className="bg-gray-100 px-2 py-0.5 rounded">redirectToDefaultLocale()</code>, <code className="bg-gray-100 px-2 py-0.5 rounded">notFound()</code>,
            and <code className="bg-gray-100 px-2 py-0.5 rounded">redirectToFallback()</code> for your middleware:
          </p>

          <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group">
            <pre className="whitespace-pre-wrap"><code>{`// src/middleware.js
import { defineMiddleware } from "astro:middleware";
import { redirectToDefaultLocale } from "astro:i18n"; // available with "manual" routing

export const onRequest = defineMiddleware(async (ctx, next) => {
  if (ctx.url.pathname.startsWith("/about")) {
    return next();
  }
  return redirectToDefaultLocale(302);
});`}</code></pre>
            <button
              onClick={() => copyToClipboard(`// src/middleware.js
import { defineMiddleware } from "astro:middleware";
import { redirectToDefaultLocale } from "astro:i18n"; // available with "manual" routing

export const onRequest = defineMiddleware(async (ctx, next) => {
  if (ctx.url.pathname.startsWith("/about")) {
    return next();
  }
  return redirectToDefaultLocale(302);
});`, 7)}
              className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copiedStep === 7 ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* middleware() */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            The <code className="bg-gray-100 px-2 py-1 rounded text-lg">middleware()</code> Function
          </h3>
          <p className="text-gray-600 mb-4">
            To <em>extend</em> rather than replace Astro&apos;s i18n routing, create its middleware manually with
            {" "}<code className="bg-gray-100 px-2 py-0.5 rounded">middleware()</code> and order it against your own using
            {" "}<code className="bg-gray-100 px-2 py-0.5 rounded">sequence()</code>:
          </p>

          <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group">
            <pre className="whitespace-pre-wrap"><code>{`// src/middleware.js
import { defineMiddleware, sequence } from "astro:middleware";
import { middleware } from "astro:i18n"; // Astro's own i18n routing

const userMiddleware = defineMiddleware(async (ctx, next) => {
  const response = await next();
  // render /about even if i18n would have 404'd it
  if (ctx.url.pathname.startsWith("/about")) {
    return new Response("About page", { status: 200 });
  }
  return response;
});

export const onRequest = sequence(
  userMiddleware,
  middleware({
    redirectToDefaultLocale: false,
    prefixDefaultLocale: true,
    fallbackType: "redirect",
  }),
);`}</code></pre>
            <button
              onClick={() => copyToClipboard(`// src/middleware.js
import { defineMiddleware, sequence } from "astro:middleware";
import { middleware } from "astro:i18n"; // Astro's own i18n routing

const userMiddleware = defineMiddleware(async (ctx, next) => {
  const response = await next();
  // render /about even if i18n would have 404'd it
  if (ctx.url.pathname.startsWith("/about")) {
    return new Response("About page", { status: 200 });
  }
  return response;
});

export const onRequest = sequence(
  userMiddleware,
  middleware({
    redirectToDefaultLocale: false,
    prefixDefaultLocale: true,
    fallbackType: "redirect",
  }),
);`, 8)}
              className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copiedStep === 8 ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Domains */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-cyan-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h2 className="text-3xl font-bold text-gray-900">
                Per-Language Domains
              </h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 text-xs font-semibold border border-gray-200">
                astro@4.9.0+
              </span>
            </div>
            <p className="text-lg text-gray-600">
              Serve specific locales from their own domains on server-rendered sites
            </p>
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          For server output (with the <code className="bg-gray-100 px-2 py-0.5 rounded">@astrojs/node</code> or
          {" "}<code className="bg-gray-100 px-2 py-0.5 rounded">@astrojs/vercel</code> adapter and a configured
          {" "}<code className="bg-gray-100 px-2 py-0.5 rounded">site</code>), map locales to custom domains with
          {" "}<code className="bg-gray-100 px-2 py-0.5 rounded">i18n.domains</code>. Unmapped locales keep your
          {" "}<code className="bg-gray-100 px-2 py-0.5 rounded">prefixDefaultLocale</code> behavior:
        </p>

        <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group">
          <pre className="whitespace-pre-wrap"><code>{`// astro.config.mjs
export default defineConfig({
  site: "https://example.com",
  output: "server", // required, with no prerendered pages
  adapter: node({ mode: "standalone" }),
  i18n: {
    locales: ["es", "en", "fr", "ja"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
    domains: {
      fr: "https://fr.example.com",
      es: "https://example.es",
    },
  },
});

// /fr/about.astro → https://fr.example.com/about
// /es/about.astro → https://example.es/about
// /ja/about.astro → https://example.com/ja/about
// /about.astro    → https://example.com/about`}</code></pre>
          <button
            onClick={() => copyToClipboard(`// astro.config.mjs
export default defineConfig({
  site: "https://example.com",
  output: "server", // required, with no prerendered pages
  adapter: node({ mode: "standalone" }),
  i18n: {
    locales: ["es", "en", "fr", "ja"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
    domains: {
      fr: "https://fr.example.com",
      es: "https://example.es",
    },
  },
});

// /fr/about.astro → https://fr.example.com/about
// /es/about.astro → https://example.es/about
// /ja/about.astro → https://example.com/ja/about
// /about.astro    → https://example.com/about`, 9)}
            className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {copiedStep === 9 ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>

        <div className="mt-4 p-4 bg-cyan-50 border-2 border-cyan-200 rounded-lg">
          <p className="text-sm text-cyan-900 font-medium mb-2">⚙️ Requirements &amp; limitations</p>
          <ul className="space-y-1.5 text-sm text-cyan-800">
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span><code className="bg-cyan-100 px-1.5 py-0.5 rounded">site</code> is mandatory and <code className="bg-cyan-100 px-1.5 py-0.5 rounded">output</code> must be <code className="bg-cyan-100 px-1.5 py-0.5 rounded">&quot;server&quot;</code> with no prerendered pages.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>Your proxy/host must forward <code className="bg-cyan-100 px-1.5 py-0.5 rounded">X-Forwarded-Host</code> (or <code className="bg-cyan-100 px-1.5 py-0.5 rounded">Host</code>) and <code className="bg-cyan-100 px-1.5 py-0.5 rounded">X-Forwarded-Proto</code>; missing headers cause a 404.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>These URLs are also returned by <code className="bg-cyan-100 px-1.5 py-0.5 rounded">getAbsoluteLocaleUrl()</code> and <code className="bg-cyan-100 px-1.5 py-0.5 rounded">getAbsoluteLocaleUrlList()</code>.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Browser language detection */}
      <div className="mb-12 bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Browser Language Detection
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
          On pages rendered on demand, Astro combines the browser&apos;s
          {" "}<code className="bg-white px-1.5 py-0.5 rounded border border-green-200">Accept-Language</code> header with
          your locales to detect a visitor&apos;s preferences.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 border-2 border-green-200">
            <h3 className="font-bold text-gray-900 mb-1 text-sm">
              Astro.preferredLocale
            </h3>
            <p className="text-sm text-gray-600">
              The best-matching locale for the visitor, or <code className="bg-gray-100 px-1 rounded">undefined</code> if none match.
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border-2 border-green-200">
            <h3 className="font-bold text-gray-900 mb-1 text-sm">
              Astro.preferredLocaleList
            </h3>
            <p className="text-sm text-gray-600">
              Every locale supported by both the site and the browser, as an array.
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border-2 border-green-200">
            <h3 className="font-bold text-gray-900 mb-1 text-sm">
              Astro.currentLocale
            </h3>
            <p className="text-sm text-gray-600">
              The locale from the current URL. Available on all pages, including static ones.
            </p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group">
          <pre className="whitespace-pre-wrap"><code>{`---
// Any on-demand rendered page
const locale = Astro.preferredLocale ?? Astro.currentLocale;
---

<p>Showing content for: {locale}</p>`}</code></pre>
          <button
            onClick={() => copyToClipboard(`---
// Any on-demand rendered page
const locale = Astro.preferredLocale ?? Astro.currentLocale;
---

<p>Showing content for: {locale}</p>`, 10)}
            className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {copiedStep === 10 ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-4 text-white text-center">
        <h2 className="text-xl font-bold mb-4">
          Ready to Go Global! 🌍
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Your site now speaks multiple languages with clean URLs and smart fallbacks.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="https://docs.astro.build/en/guides/internationalization/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
          >
            <Globe className="w-5 h-5" />
            Astro i18n Docs
          </Link>
          <Link
            href="/docs/astro/features"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-lg transition-colors"
          >
            Back to Features
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      </div>
    </div>
  );
}
