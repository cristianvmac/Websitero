"use client";

import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { Globe, Copy, Check, FolderTree, Link2, GitBranch, ArrowRight, Server, BookOpen } from "lucide-react";
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
      <div className="max-w-3xl ml-6">

      {/* Hero Section */}
      <div className="mb-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
          <Link href="/docs/eleventy" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Eleventy
          </Link>
          <span><LuChevronRight /></span>
          <Link href="/docs/eleventy/features" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Features
          </Link>
          <span><LuChevronRight /></span>
          <span aria-current="page">Internationalization</span>
        </nav>

        <h1 className="text-5xl font-bold text-slate-900 mb-4">
          Add Multi-Language Support
        </h1>

        <p className="text-xl text-slate-600 mb-8">
          Eleventy&apos;s bundled I18n plugin adapts this starter for an international audience. Because the
          kit runs Eleventy 3 with a CommonJS <code className="bg-slate-100 px-1.5 py-0.5 rounded text-lg">.eleventy.js</code>,
          you load the plugin with a dynamic import, keep English at the site root, and add each new language in
          its own folder with locale-prefixed permalinks. The <code className="bg-slate-100 px-1.5 py-0.5 rounded text-lg">locale_url</code> and
          {" "}<code className="bg-slate-100 px-1.5 py-0.5 rounded text-lg">locale_links</code> filters then keep every link pointing at the right language.
        </p>
      </div>

      {/* Setup Instructions */}
      <div className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-slate-700 rounded-xl flex items-center justify-center shadow-lg">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Set Up the I18n Plugin
            </h2>
            <p className="text-lg text-slate-600">
              Register the plugin and start building localized pages
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-slate-700 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Register the Plugin
              </h3>
            </div>
            <p className="text-slate-600 mb-4 ml-11">
              The I18n plugin is bundled with Eleventy &mdash; nothing to install. This starter runs Eleventy 3,
              which ships as ESM, so you can&apos;t <code className="bg-slate-100 px-2 py-0.5 rounded">require()</code> it
              from the CommonJS <code className="bg-slate-100 px-2 py-0.5 rounded">.eleventy.js</code>. Make the config
              function <code className="bg-slate-100 px-2 py-0.5 rounded">async</code> and pull the plugin in with a
              dynamic <code className="bg-slate-100 px-2 py-0.5 rounded">import()</code>:
            </p>
            <div className="ml-11 bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`// .eleventy.js  (CommonJS — this starter has no "type": "module")
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = async function (eleventyConfig) {
  // Eleventy 3 is ESM-only, so load the bundled I18n plugin dynamically.
  const { I18nPlugin } = await import("@11ty/eleventy");

  eleventyConfig.addPlugin(I18nPlugin, {
    // A BCP 47 tag — the language you serve at the site root
    defaultLanguage: "en",
  });

  // ...the starter's existing plugins (navigation, sitemap, images, minify)
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  return {
    dir: { input: "src", includes: "_includes", output: "public" },
    htmlTemplateEngine: "njk",
  };
};`}</code></pre>
              <button
                onClick={() => copyToClipboard(`// .eleventy.js  (CommonJS — this starter has no "type": "module")
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = async function (eleventyConfig) {
  // Eleventy 3 is ESM-only, so load the bundled I18n plugin dynamically.
  const { I18nPlugin } = await import("@11ty/eleventy");

  eleventyConfig.addPlugin(I18nPlugin, {
    // A BCP 47 tag — the language you serve at the site root
    defaultLanguage: "en",
  });

  // ...the starter's existing plugins (navigation, sitemap, images, minify)
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  return {
    dir: { input: "src", includes: "_includes", output: "public" },
    htmlTemplateEngine: "njk",
  };
};`, 1)}
                className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedStep === 1 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
            <div className="ml-11 mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-slate-800">
                💡 <strong>Note:</strong> <code className="bg-blue-100 px-2 py-0.5 rounded">defaultLanguage</code> should be the language you publish at the root. In this starter that&apos;s English &mdash; the page files already carry <code className="bg-blue-100 px-2 py-0.5 rounded">lang: en</code>.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-slate-700 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Organize Content Into Language Folders
              </h3>
            </div>
            <p className="text-slate-600 mb-4 ml-11">
              Keep English where it already lives under <code className="bg-slate-100 px-2 py-0.5 rounded">src/content/</code>,
              and give each new language its own folder. This starter builds every URL from each page&apos;s
              {" "}<code className="bg-slate-100 px-2 py-0.5 rounded">permalink</code>, so add the locale prefix there:
            </p>
            <div className="ml-11 bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`src/
└── content/
    ├── content.json        # { "tags": "sitemap" } — shared by all content
    ├── pages/              # English = default, served at the site root
    │   ├── about.html      → /about/      (permalink: "/about/", lang: en)
    │   └── contact.html    → /contact/
    └── es/                 # Spanish lives under its own /es/ prefix
        ├── es.json         # { "lang": "es" } — sets lang for the folder
        ├── about.html      → /es/about/   (permalink: "/es/about/")
        └── contact.html    → /es/contact/`}</code></pre>
              <button
                onClick={() => copyToClipboard(`src/
└── content/
    ├── content.json        # { "tags": "sitemap" } — shared by all content
    ├── pages/              # English = default, served at the site root
    │   ├── about.html      → /about/      (permalink: "/about/", lang: en)
    │   └── contact.html    → /contact/
    └── es/                 # Spanish lives under its own /es/ prefix
        ├── es.json         # { "lang": "es" } — sets lang for the folder
        ├── about.html      → /es/about/   (permalink: "/es/about/")
        └── contact.html    → /es/contact/`, 2)}
                className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedStep === 2 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
            <p className="text-slate-600 mb-3 mt-5 ml-11">
              Add a directory data file so every page in the folder shares one <code className="bg-slate-100 px-2 py-0.5 rounded">lang</code> &mdash;
              no need to repeat it on each page:
            </p>
            <div className="ml-11 bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`// src/content/es/es.json
{
  "lang": "es"
}`}</code></pre>
              <button
                onClick={() => copyToClipboard(`// src/content/es/es.json
{
  "lang": "es"
}`, 3)}
                className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedStep === 3 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
            <div className="ml-11 mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-slate-800">
                ✨ Folders aren&apos;t URL segments in this kit &mdash; <code className="bg-blue-100 px-1.5 py-0.5 rounded">permalink</code> is. Serving English at the root and prefixing the rest is exactly the official guide&apos;s <strong>&ldquo;implied default language&rdquo;</strong> layout. Keep page slugs aligned across languages so the locale filters can map between them.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-slate-700 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Add a Localized Page
              </h3>
            </div>
            <p className="text-slate-600 mb-4 ml-11">
              Localized pages follow the same convention as the English ones &mdash; an explicit
              {" "}<code className="bg-slate-100 px-2 py-0.5 rounded">permalink</code> plus
              {" "}<code className="bg-slate-100 px-2 py-0.5 rounded">{`{% extends %}`}</code>. There&apos;s no
              {" "}<code className="bg-slate-100 px-2 py-0.5 rounded">lang</code> here because
              {" "}<code className="bg-slate-100 px-2 py-0.5 rounded">es.json</code> already set it for the folder:
            </p>
            <div className="ml-11 bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`---
title: "Acerca de | Eleventy Starter"
permalink: "/es/about/"
---
{% extends "layouts/base.html" %}

{# Your Spanish markup goes in the same blocks as the English pages #}`}</code></pre>
              <button
                onClick={() => copyToClipboard(`---
title: "Acerca de | Eleventy Starter"
permalink: "/es/about/"
---
{% extends "layouts/base.html" %}

{# Your Spanish markup goes in the same blocks as the English pages #}`, 4)}
                className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedStep === 4 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Step 4 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-slate-700 rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Link Between Locales
              </h3>
            </div>
            <p className="text-slate-600 mb-4 ml-11">
              Use the <code className="bg-slate-100 px-2 py-0.5 rounded">locale_url</code> filter to rewrite any path to
              the current page&apos;s language. Pass a second argument to force a specific locale &mdash; it also
              swaps an existing language code in the path:
            </p>
            <div className="ml-11 bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`{# On any /es/ page, locale_url prefixes paths with /es/ #}
<a href="{{ "/about/" | locale_url }}">Acerca</a>
<a href="{{ "/blog/" | locale_url }}">Blog</a>

{# Pass a language to target it explicitly (swaps an existing code too) #}
<a href="{{ "/es/about/" | locale_url("en") }}">About (English)</a>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`{# On any /es/ page, locale_url prefixes paths with /es/ #}
<a href="{{ "/about/" | locale_url }}">Acerca</a>
<a href="{{ "/blog/" | locale_url }}">Blog</a>

{# Pass a language to target it explicitly (swaps an existing code too) #}
<a href="{{ "/es/about/" | locale_url("en") }}">About (English)</a>`, 5)}
                className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedStep === 5 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Success */}
          <div className="ml-11 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-slate-900 font-medium mb-2">
              🎉 You&apos;re Multi-Language!
            </p>
            <p className="text-sm text-slate-800">
              Eleventy now builds localized routes from your folders and permalinks, and
              {" "}<code className="bg-blue-100 px-1.5 py-0.5 rounded">locale_url</code> keeps every link pointing at the right language.
            </p>
          </div>
        </div>
      </div>

      {/* Setting the html lang */}
      <div className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-slate-700 rounded-xl flex items-center justify-center shadow-lg">
            <FolderTree className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Output the Correct <code className="text-2xl bg-blue-100 text-slate-800 px-2 py-0.5 rounded">&lt;html lang&gt;</code>
            </h2>
            <p className="text-lg text-slate-600">
              Let the plugin set the language attribute for you
            </p>
          </div>
        </div>

        <p className="text-slate-600 mb-4">
          The plugin adds <code className="bg-slate-100 px-2 py-0.5 rounded">page.lang</code> to every template &mdash;
          read from the URL&apos;s language code, falling back to your
          {" "}<code className="bg-slate-100 px-2 py-0.5 rounded">defaultLanguage</code>. This starter&apos;s base layout
          currently hardcodes <code className="bg-slate-100 px-2 py-0.5 rounded">lang=&quot;en&quot;</code>; wire it to
          {" "}<code className="bg-slate-100 px-2 py-0.5 rounded">page.lang</code> so it&apos;s right on every locale:
        </p>

        <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 relative group">
          <pre className="whitespace-pre-wrap"><code>{`<!-- src/_includes/layouts/base.html -->
<!-- before: <html lang="en"> (hardcoded) -->
<html lang="{{ page.lang or "en" }}">
  <head>
    <!-- ... -->
  </head>
</html>`}</code></pre>
          <button
            onClick={() => copyToClipboard(`<!-- src/_includes/layouts/base.html -->
<!-- before: <html lang="en"> (hardcoded) -->
<html lang="{{ page.lang or "en" }}">
  <head>
    <!-- ... -->
  </head>
</html>`, 6)}
            className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {copiedStep === 6 ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-slate-800">
            ✨ <code className="bg-blue-100 px-1.5 py-0.5 rounded">page.lang</code> is always available once the plugin is registered, so you get a correct
            {" "}<code className="bg-blue-100 px-1.5 py-0.5 rounded">&lt;html lang&gt;</code> for accessibility and SEO with no per-page wiring. The <code className="bg-blue-100 px-1.5 py-0.5 rounded">lang</code> you set in <code className="bg-blue-100 px-1.5 py-0.5 rounded">es.json</code> stays available too, for your own translation logic.
          </p>
        </div>
      </div>

      {/* Fallback / errorMode */}
      <div className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-slate-700 rounded-xl flex items-center justify-center shadow-lg">
            <GitBranch className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Fallbacks for Missing Translations
            </h2>
            <p className="text-lg text-slate-600">
              Decide what happens when a localized page doesn&apos;t exist yet
            </p>
          </div>
        </div>

        <p className="text-slate-600 mb-4">
          The <code className="bg-slate-100 px-2 py-0.5 rounded">errorMode</code> option controls how
          {" "}<code className="bg-slate-100 px-2 py-0.5 rounded">locale_url</code> behaves when a translation is missing.
          Use <code className="bg-slate-100 px-2 py-0.5 rounded">&quot;allow-fallback&quot;</code> to serve the default
          language instead of throwing a build error:
        </p>

        <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 relative group">
          <pre className="whitespace-pre-wrap"><code>{`// inside addPlugin(I18nPlugin, { ... }) in .eleventy.js
eleventyConfig.addPlugin(I18nPlugin, {
  defaultLanguage: "en",

  // "strict"         → throw if /es/page/ has no localized content (default)
  // "allow-fallback" → only throw if missing at BOTH /es/page/ and /page/
  // "never"          → never throw; return the URL untouched
  errorMode: "allow-fallback",
});`}</code></pre>
          <button
            onClick={() => copyToClipboard(`// inside addPlugin(I18nPlugin, { ... }) in .eleventy.js
eleventyConfig.addPlugin(I18nPlugin, {
  defaultLanguage: "en",

  // "strict"         → throw if /es/page/ has no localized content (default)
  // "allow-fallback" → only throw if missing at BOTH /es/page/ and /page/
  // "never"          → never throw; return the URL untouched
  errorMode: "allow-fallback",
});`, 7)}
            className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {copiedStep === 7 ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1 text-sm">strict</h3>
            <p className="text-sm text-slate-600">
              The default. Throws a build error when the localized content is missing, so gaps surface early.
            </p>
          </div>
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
            <h3 className="font-bold text-slate-900 mb-1 text-sm">allow-fallback</h3>
            <p className="text-sm text-slate-600">
              Only errors when content is missing in <em>both</em> the locale and the default language.
            </p>
          </div>
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1 text-sm">never</h3>
            <p className="text-sm text-slate-600">
              Returns the URL as-is and never throws &mdash; you handle missing pages yourself.
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-slate-800">
            With <code className="bg-blue-100 px-1.5 py-0.5 rounded">allow-fallback</code>, a link built with
            {" "}<code className="bg-blue-100 px-1.5 py-0.5 rounded">locale_url</code> on an <code className="bg-blue-100 px-1.5 py-0.5 rounded">/es/</code> page
            falls back to the English version when
            {" "}<code className="bg-blue-100 px-1.5 py-0.5 rounded">src/content/es/my-page.html</code> doesn&apos;t exist yet &mdash; no broken link.
          </p>
        </div>
      </div>

      {/* Language switcher with locale_links */}
      <div className="mb-12 bg-blue-50 rounded-2xl p-8 border border-blue-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
          Build a Language Switcher
        </h2>
        <p className="text-slate-600 mb-6 text-center max-w-2xl mx-auto">
          The <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200">locale_links</code> filter returns
          every <em>other</em> localized version of the current page (the current page is excluded) &mdash; perfect for a dropdown or
          {" "}<code className="bg-white px-1.5 py-0.5 rounded border border-blue-200">hreflang</code> tags.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 border border-blue-200">
            <h3 className="font-bold text-slate-900 mb-1 text-sm">link.url</h3>
            <p className="text-sm text-slate-600">
              The localized URL for that translation of the current page.
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-blue-200">
            <h3 className="font-bold text-slate-900 mb-1 text-sm">link.lang</h3>
            <p className="text-sm text-slate-600">
              The BCP 47 language code, e.g. <code className="bg-slate-100 px-1 rounded">es</code> or <code className="bg-slate-100 px-1 rounded">pt-br</code>.
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-blue-200">
            <h3 className="font-bold text-slate-900 mb-1 text-sm">link.label</h3>
            <p className="text-sm text-slate-600">
              A human-friendly language name when one is available for that code.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 relative group">
          <pre className="whitespace-pre-wrap"><code>{`{# A language switcher listing every translation of this page #}
<ul>
{%- for link in page.url | locale_links %}
  <li>
    <a href="{{ link.url }}" lang="{{ link.lang }}" hreflang="{{ link.lang }}">
      {{ link.label }}
    </a>
  </li>
{%- endfor %}
</ul>`}</code></pre>
          <button
            onClick={() => copyToClipboard(`{# A language switcher listing every translation of this page #}
<ul>
{%- for link in page.url | locale_links %}
  <li>
    <a href="{{ link.url }}" lang="{{ link.lang }}" hreflang="{{ link.lang }}">
      {{ link.label }}
    </a>
  </li>
{%- endfor %}
</ul>`, 8)}
            className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {copiedStep === 8 ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>

        <div className="mt-4 p-4 bg-white border border-blue-200 rounded-lg">
          <p className="text-sm text-slate-700">
            💡 Eleventy builds static HTML, so there&apos;s no runtime browser detection. Pair this switcher with
            {" "}<code className="bg-slate-100 px-1.5 py-0.5 rounded">hreflang</code> tags so search engines route each visitor to the right language.
          </p>
        </div>
      </div>

      {/* Localized blog navigation */}
      <div className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-slate-700 rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Localized Blog Navigation
            </h2>
            <p className="text-lg text-slate-600">
              Prev/next links that stay in the reader&apos;s language
            </p>
          </div>
        </div>

        <p className="text-slate-600 mb-4">
          The collection filters &mdash; <code className="bg-slate-100 px-2 py-0.5 rounded">getNextCollectionItem</code>,
          {" "}<code className="bg-slate-100 px-2 py-0.5 rounded">getPreviousCollectionItem</code>, and
          {" "}<code className="bg-slate-100 px-2 py-0.5 rounded">getCollectionItem</code> &mdash; automatically prefer
          the localized item in the current page&apos;s language, with no extra config. This starter tags blog posts
          with <code className="bg-slate-100 px-2 py-0.5 rounded">post</code>, so in
          {" "}<code className="bg-slate-100 px-2 py-0.5 rounded">layouts/post.html</code>:
        </p>

        <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 relative group">
          <pre className="whitespace-pre-wrap"><code>{`{# layouts/post.html — keep prev/next in the reader's language #}
{%- set nextPost = collections.post | getNextCollectionItem %}
{%- if nextPost %}
  <a href="{{ nextPost.url | locale_url }}">{{ nextPost.data.title }} →</a>
{%- endif %}`}</code></pre>
          <button
            onClick={() => copyToClipboard(`{# layouts/post.html — keep prev/next in the reader's language #}
{%- set nextPost = collections.post | getNextCollectionItem %}
{%- if nextPost %}
  <a href="{{ nextPost.url | locale_url }}">{{ nextPost.data.title }} →</a>
{%- endif %}`, 9)}
            className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {copiedStep === 9 ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-8 text-slate-700 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Go Global! 🌍
        </h2>
        <p className="text-xl text-slate-600 mb-8">
          Your site now speaks multiple languages with clean URLs and smart fallbacks.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="https://www.11ty.dev/docs/plugins/i18n/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 hover:bg-blue-100 text-slate-700 font-bold rounded-lg transition-colors"
          >
            <Globe className="w-5 h-5" />
            Eleventy I18n Docs
          </Link>
          <Link
            href="/docs/eleventy/features"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 font-bold rounded-lg transition-colors"
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
