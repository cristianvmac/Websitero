"use client";

import Link from "next/link";
import { Rocket, Copy, Check, FileCode, Globe, Sparkles, Settings, ArrowRight, BookOpen, ChevronRight, Image as ImageIcon } from "lucide-react";
import { useState } from "react";




export default function SEOtags() {
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
          Eleventy
        </div>
        <span className="text-3xl font-semibold text-gray-400">/</span>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-orange-50 to-yellow-50 text-orange-700 rounded-full text-sm font-bold border-2 border-orange-200">
          <Link href="/docs/eleventy/features">Features</Link>
        </div>
        <span className="text-3xl font-semibold text-gray-400">/</span>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-bold border-2 border-blue-200">
          <Link href="#seo">SEO</Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SEO &amp; Metadata
        </h1>

        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          SEO data is centralized in <code className="bg-gray-100 px-2 py-1 rounded text-lg">src/_data/client.js</code>,
          a single source of truth for your business details, domain, and social links. The base layout&apos;s
          <code className="bg-gray-100 px-2 py-1 rounded text-lg"> &lt;head&gt;</code> builds a complete set of meta and Open Graph tags
          automatically from <code className="bg-gray-100 px-2 py-1 rounded text-lg">client.js</code> and each page&apos;s front matter.
        </p>
      </div>

      {/* The base layout head Section */}
      <div id="setup" className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-green-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <FileCode className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              The Base Layout <code className="text-2xl bg-gray-100 px-2 py-1 rounded">&lt;head&gt;</code>
            </h2>
            <p className="text-lg text-gray-600">
              <code className="bg-gray-100 px-2 py-1 rounded">src/_includes/layouts/base.html</code> builds your SEO tags dynamically from <code className="bg-gray-100 px-2 py-1 rounded">client.js</code> and page front matter
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Step 1: client.js */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <h3 className="text-xl font-bold text-gray-900">Configure Your Site Data</h3>
            </div>
            <p className="text-gray-600 mb-4 ml-11">
              Open <code className="bg-gray-100 px-2 py-1 rounded">src/_data/client.js</code> and fill in your business details. Because it lives in
              <code className="bg-gray-100 px-2 py-1 rounded"> _data</code>, the <code className="bg-gray-100 px-2 py-1 rounded">client</code> object is available in every template.
            </p>
            <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-125 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`// src/_data/client.js
module.exports = {
  name: "Eleventy Starter Template",
  email: "help@eleventystarter.app",
  phoneForTel: "555-557-6614",
  phoneFormatted: "(555) 557-6614",
  address: {
    lineOne: "First Address Line",
    lineTwo: "Second Address Line",
    city: "Springfield",
    state: "OH",
    zip: "12345",
    country: "US",
    mapLink: "https://maps.app.goo.gl/TEdS5KoLC9ZcULuQ6",
  },
  socials: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
  //! Include the protocol (https://) and NO trailing slash
  domain: "https://www.example.com",
  // Available in templates as client.isProduction
  isProduction: process.env.ELEVENTY_ENV === "PROD",
};`}</code></pre>
              <button
                onClick={() => copyToClipboard(`// src/_data/client.js
module.exports = {
  name: "Eleventy Starter Template",
  email: "help@eleventystarter.app",
  phoneForTel: "555-557-6614",
  phoneFormatted: "(555) 557-6614",
  address: {
    lineOne: "First Address Line",
    lineTwo: "Second Address Line",
    city: "Springfield",
    state: "OH",
    zip: "12345",
    country: "US",
    mapLink: "https://maps.app.goo.gl/TEdS5KoLC9ZcULuQ6",
  },
  socials: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
  //! Include the protocol (https://) and NO trailing slash
  domain: "https://www.example.com",
  // Available in templates as client.isProduction
  isProduction: process.env.ELEVENTY_ENV === "PROD",
};`, 1)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 1 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          {/* Step 2: base.html head */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <h3 className="text-xl font-bold text-gray-900">How the <code className="text-lg bg-gray-100 px-2 py-1 rounded">&lt;head&gt;</code> Uses It</h3>
            </div>
            <p className="text-gray-600 mb-4 ml-11">
              <code className="bg-gray-100 px-2 py-1 rounded">base.html</code> already wires up description, canonical, and Open Graph tags. Page values
              (<code className="bg-gray-100 px-2 py-1 rounded">title</code>, <code className="bg-gray-100 px-2 py-1 rounded">description</code>, <code className="bg-gray-100 px-2 py-1 rounded">image</code>) come from front matter;
              site values come from <code className="bg-gray-100 px-2 py-1 rounded">client</code>.
            </p>
            <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-150 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`<!-- src/_includes/layouts/base.html -->
<head>
  <!-- Standard meta tags -->
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{{ description }}">
  <link rel="canonical" href="{{ client.domain }}{{ page.url }}">
  <meta name="generator" content="{{ eleventy.generator }}">

  <!-- Social Media Display -->
  <meta property="og:title" content="{{ title }}"/>
  <meta property="og:description" content="{{ description }}"/>
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="{{ client.domain }}{{ page.url }}"/>
  <meta property="og:image" content="{{ image or "/assets/images/logo-small.png" }}"/>
  <meta property="og:image:secure_url" content="{{ image or "/assets/images/logo-small.png" }}"/>

  <!-- Favicons (https://realfavicongenerator.net/) -->
  <link rel="icon" type="image/png" href="/assets/favicons/favicon-96x96.png" sizes="96x96"/>
  <link rel="icon" type="image/svg+xml" href="/assets/favicons/favicon.svg"/>
  <link rel="shortcut icon" href="/assets/favicons/favicon.ico"/>
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png"/>
  <meta name="apple-mobile-web-app-title" content="Starter Kit"/>
  <link rel="manifest" href="/assets/favicons/site.webmanifest"/>

  <!-- Preloads -->
  <link rel="preload" as="image" href="/assets/svgs/logo-black.svg">
  <link rel="preload" as="font" type="font/woff2" href="/assets/fonts/roboto-v29-latin-regular.woff2" crossorigin>
  <link rel="preload" as="font" type="font/woff2" href="/assets/fonts/roboto-v29-latin-700.woff2" crossorigin>

  <!-- Sitewide Stylesheets and Scripts -->
  <link rel="stylesheet" href="/assets/css/root.css">
  <script defer src="/assets/js/dark.js"></script>
  <script defer src="/assets/js/nav.js"></script>

  {% block head %}{% endblock %}

  <title>{{ title }}</title>
</head>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`<!-- src/_includes/layouts/base.html -->
<head>
  <!-- Standard meta tags -->
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{{ description }}">
  <link rel="canonical" href="{{ client.domain }}{{ page.url }}">
  <meta name="generator" content="{{ eleventy.generator }}">

  <!-- Social Media Display -->
  <meta property="og:title" content="{{ title }}"/>
  <meta property="og:description" content="{{ description }}"/>
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="{{ client.domain }}{{ page.url }}"/>
  <meta property="og:image" content="{{ image or "/assets/images/logo-small.png" }}"/>
  <meta property="og:image:secure_url" content="{{ image or "/assets/images/logo-small.png" }}"/>

  <!-- Favicons (https://realfavicongenerator.net/) -->
  <link rel="icon" type="image/png" href="/assets/favicons/favicon-96x96.png" sizes="96x96"/>
  <link rel="icon" type="image/svg+xml" href="/assets/favicons/favicon.svg"/>
  <link rel="shortcut icon" href="/assets/favicons/favicon.ico"/>
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png"/>
  <meta name="apple-mobile-web-app-title" content="Starter Kit"/>
  <link rel="manifest" href="/assets/favicons/site.webmanifest"/>

  <!-- Preloads -->
  <link rel="preload" as="image" href="/assets/svgs/logo-black.svg">
  <link rel="preload" as="font" type="font/woff2" href="/assets/fonts/roboto-v29-latin-regular.woff2" crossorigin>
  <link rel="preload" as="font" type="font/woff2" href="/assets/fonts/roboto-v29-latin-700.woff2" crossorigin>

  <!-- Sitewide Stylesheets and Scripts -->
  <link rel="stylesheet" href="/assets/css/root.css">
  <script defer src="/assets/js/dark.js"></script>
  <script defer src="/assets/js/nav.js"></script>

  {% block head %}{% endblock %}

  <title>{{ title }}</title>
</head>`, 2)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 2 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="ml-11 grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
              <p className="font-bold text-gray-900 mb-2">Built-in Automatically</p>
              <ul className="text-sm text-gray-700 space-y-1.5">
                <li>• Meta description &amp; canonical URL</li>
                <li>• Open Graph (title, description, type, url, image)</li>
                <li>• Favicons &amp; web manifest</li>
                <li>• A <code className="bg-gray-200 px-1.5 py-0.5 rounded">{`{% block head %}`}</code> slot for per-page tags</li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
              <p className="font-bold text-gray-900 mb-2">Social Image Strategy</p>
              <ul className="text-sm text-gray-700 space-y-1.5">
                <li>• <strong>With <code className="bg-gray-200 px-1.5 py-0.5 rounded">image</code>:</strong> uses that path for <code className="bg-gray-200 px-1.5 py-0.5 rounded">og:image</code></li>
                <li>• <strong>Without:</strong> falls back to <code className="bg-gray-200 px-1.5 py-0.5 rounded">/assets/images/logo-small.png</code></li>
                <li>• <strong>Blog posts:</strong> reuse the post&apos;s <code className="bg-gray-200 px-1.5 py-0.5 rounded">image</code> automatically</li>
              </ul>
            </div>
          </div>

          <div className="ml-11 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
            <p className="text-green-900 font-medium mb-2">✅ No Per-Page Wiring Needed</p>
            <p className="text-sm text-green-800">
              Every page that extends <code className="bg-green-100 px-1.5 py-0.5 rounded">base.html</code> inherits these tags. You only set
              <code className="bg-green-100 px-1.5 py-0.5 rounded"> title</code>, <code className="bg-green-100 px-1.5 py-0.5 rounded">description</code>, and an optional
              <code className="bg-green-100 px-1.5 py-0.5 rounded"> image</code> in front matter.
            </p>
          </div>
        </div>
      </div>

      {/* Per-page SEO via front matter */}
      <div className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Per-Page SEO with Front Matter
            </h2>
            <p className="text-lg text-gray-600">
              Set a page&apos;s title, description, and social image right in its front matter
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Basic page */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <h3 className="text-xl font-bold text-gray-900">Basic Page</h3>
            </div>
            <p className="text-gray-600 mb-4 ml-11">
              Set <code className="bg-gray-100 px-2 py-1 rounded">title</code> and <code className="bg-gray-100 px-2 py-1 rounded">description</code>, extend the base layout,
              and add any page-specific tags in <code className="bg-gray-100 px-2 py-1 rounded">{`{% block head %}`}</code>.
            </p>
            <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`---
title: "About Us | Eleventy Starter Template"
description: "Learn more about us: our mission, values and team."
permalink: "/about/"
---

{% extends "layouts/base.html" %}

{% block head %}
  <link rel="stylesheet" href="/assets/css/about.css">
{% endblock %}

{% block body %}
  <!-- Page content -->
{% endblock %}`}</code></pre>
              <button
                onClick={() => copyToClipboard(`---
title: "About Us | Eleventy Starter Template"
description: "Learn more about us: our mission, values and team."
permalink: "/about/"
---

{% extends "layouts/base.html" %}

{% block head %}
  <link rel="stylesheet" href="/assets/css/about.css">
{% endblock %}

{% block body %}
  <!-- Page content -->
{% endblock %}`, 3)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 3 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          {/* Page with social image */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <h3 className="text-xl font-bold text-gray-900">Page With a Social Image</h3>
            </div>
            <p className="text-gray-600 mb-4 ml-11">
              Add an <code className="bg-gray-100 px-2 py-1 rounded">image</code> key (an absolute path under <code className="bg-gray-100 px-2 py-1 rounded">/assets</code>) and the
              base layout uses it for <code className="bg-gray-100 px-2 py-1 rounded">og:image</code> instead of the fallback.
            </p>
            <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`---
title: "Our Work | Eleventy Starter Template"
description: "Browse recent projects and case studies."
permalink: "/portfolio/"
# Used for og:image and og:image:secure_url (1200x630 recommended)
image: "/assets/images/portfolio/port1.jpg"
---

{% extends "layouts/base.html" %}

{% block body %}
  <!-- Page content -->
{% endblock %}`}</code></pre>
              <button
                onClick={() => copyToClipboard(`---
title: "Our Work | Eleventy Starter Template"
description: "Browse recent projects and case studies."
permalink: "/portfolio/"
# Used for og:image and og:image:secure_url (1200x630 recommended)
image: "/assets/images/portfolio/port1.jpg"
---

{% extends "layouts/base.html" %}

{% block body %}
  <!-- Page content -->
{% endblock %}`, 4)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 4 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="ml-11 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-blue-900 font-medium mb-2">💡 Recommended for Every Page</p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <code className="bg-blue-100 px-2 py-0.5 rounded">title</code> — unique page title (50–60 chars)</li>
              <li>• <code className="bg-blue-100 px-2 py-0.5 rounded">description</code> — page description (150–160 chars)</li>
              <li>• <code className="bg-blue-100 px-2 py-0.5 rounded">permalink</code> — clean URL path, e.g. <code className="bg-blue-100 px-2 py-0.5 rounded">/about/</code></li>
              <li>• <code className="bg-blue-100 px-2 py-0.5 rounded">image</code> — custom social preview (1200×630px)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <div className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Structured Data (JSON-LD)
            </h2>
            <p className="text-lg text-gray-600">
              Two ready-made schemas ship with the starter as <strong>opt-in</strong> includes
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-lg">
            <p className="text-amber-900 font-medium mb-2 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-600" />
              Schemas Are Opt-In
            </p>
            <p className="text-sm text-amber-800">
              To keep validation clean, the schema includes are commented out by default in <code className="bg-amber-100 px-1.5 py-0.5 rounded">index.html</code> and
              <code className="bg-amber-100 px-1.5 py-0.5 rounded"> layouts/post.html</code>. Uncomment them once you&apos;ve filled in your details, then verify the output.
            </p>
          </div>

          {/* Enable home schema */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              1. Enable the LocalBusiness Schema (Home)
            </h3>
            <p className="text-gray-600 mb-4">
              <code className="bg-gray-100 px-2 py-1 rounded">src/_includes/components/home-schema.html</code> builds a LocalBusiness object from
              <code className="bg-gray-100 px-2 py-1 rounded"> client.js</code> (name, phone, email, address, socials). Uncomment its include in <code className="bg-gray-100 px-2 py-1 rounded">index.html</code>:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`{# src/index.html — inside {% block head %} #}

<!-- Uncomment to enable Structured Data, then validate after you deploy:
     https://developers.google.com/search/docs/appearance/structured-data -->
<!-- {% include "components/home-schema.html" %} -->`}</code></pre>
              <button
                onClick={() => copyToClipboard(`{# src/index.html — inside {% block head %} #}

<!-- Uncomment to enable Structured Data, then validate after you deploy:
     https://developers.google.com/search/docs/appearance/structured-data -->
<!-- {% include "components/home-schema.html" %} -->`, 5)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 5 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          {/* home schema source */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              What the LocalBusiness Schema Emits
            </h3>
            <p className="text-gray-600 mb-4">
              Everything is pulled from <code className="bg-gray-100 px-2 py-1 rounded">client</code> — edit your business details once and the schema follows:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`<!-- src/_includes/components/home-schema.html -->
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "LocalBusiness",
  "name": "{{ client.name }}",
  {% if preloadImg %}"image": "{{ client.domain }}{{ preloadImg }}",{% endif %}
  {% if client.phoneFormatted %}"telephone": "{{ client.phoneFormatted }}",{% endif %}
  {% if client.email %}"email": "{{ client.email }}",{% endif %}
  {% if client.address %}
  "address": {
    "@type": "PostalAddress"
    {%- if client.address.lineOne -%},
      "streetAddress": "{{ client.address.lineOne }}{% if client.address.lineTwo %}, {{ client.address.lineTwo }}{% endif %}"
    {%- endif -%}
    {%- if client.address.city -%},
      "addressLocality": "{{ client.address.city }}"
    {%- endif -%}
    {%- if client.address.state -%},
      "addressRegion": "{{ client.address.state }}"
    {%- endif -%}
    {%- if client.address.zip -%},
      "postalCode": "{{ client.address.zip }}"
    {%- endif -%}
    {%- if client.address.country -%},
      "addressCountry": "{{ client.address.country }}"
    {%- endif -%}
  },
  {% endif %}
  {% if client.domain and page.url %}"url": "{{ client.domain }}{{ page.url }}",{% endif %}
  {% if client.socials %}
  "sameAs": [{%- for platform, url in client.socials -%}{% if not loop.first %},{% endif %}"{{ url }}"{%- endfor -%}]
  {% endif %}
}
</script>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`<!-- src/_includes/components/home-schema.html -->
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "LocalBusiness",
  "name": "{{ client.name }}",
  {% if preloadImg %}"image": "{{ client.domain }}{{ preloadImg }}",{% endif %}
  {% if client.phoneFormatted %}"telephone": "{{ client.phoneFormatted }}",{% endif %}
  {% if client.email %}"email": "{{ client.email }}",{% endif %}
  {% if client.address %}
  "address": {
    "@type": "PostalAddress"
    {%- if client.address.lineOne -%},
      "streetAddress": "{{ client.address.lineOne }}{% if client.address.lineTwo %}, {{ client.address.lineTwo }}{% endif %}"
    {%- endif -%}
    {%- if client.address.city -%},
      "addressLocality": "{{ client.address.city }}"
    {%- endif -%}
    {%- if client.address.state -%},
      "addressRegion": "{{ client.address.state }}"
    {%- endif -%}
    {%- if client.address.zip -%},
      "postalCode": "{{ client.address.zip }}"
    {%- endif -%}
    {%- if client.address.country -%},
      "addressCountry": "{{ client.address.country }}"
    {%- endif -%}
  },
  {% endif %}
  {% if client.domain and page.url %}"url": "{{ client.domain }}{{ page.url }}",{% endif %}
  {% if client.socials %}
  "sameAs": [{%- for platform, url in client.socials -%}{% if not loop.first %},{% endif %}"{{ url }}"{%- endfor -%}]
  {% endif %}
}
</script>`, 6)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 6 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          {/* Article schema */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              2. Enable the Article Schema (Blog Posts)
            </h3>
            <p className="text-gray-600 mb-4">
              <code className="bg-gray-100 px-2 py-1 rounded">components/post-schema.html</code> builds an Article object from the post&apos;s front matter
              (<code className="bg-gray-100 px-2 py-1 rounded">title</code>, <code className="bg-gray-100 px-2 py-1 rounded">description</code>, <code className="bg-gray-100 px-2 py-1 rounded">image</code>,
              <code className="bg-gray-100 px-2 py-1 rounded"> date</code>, <code className="bg-gray-100 px-2 py-1 rounded">author</code>). Uncomment its include in <code className="bg-gray-100 px-2 py-1 rounded">layouts/post.html</code>:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`{# src/_includes/layouts/post.html — inside {% block head %} #}

<!-- Uncomment to enable Article Structured Data, then validate after you deploy -->
<!-- {% include "components/post-schema.html" %} -->`}</code></pre>
              <button
                onClick={() => copyToClipboard(`{# src/_includes/layouts/post.html — inside {% block head %} #}

<!-- Uncomment to enable Article Structured Data, then validate after you deploy -->
<!-- {% include "components/post-schema.html" %} -->`, 7)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 7 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          {/* post schema source */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              What the Article Schema Emits
            </h3>
            <p className="text-gray-600 mb-4">
              The include builds a full <code className="bg-gray-100 px-2 py-1 rounded">Article</code> object — headline, description, a
              <code className="bg-gray-100 px-2 py-1 rounded"> 1200×630</code> image, published/modified dates (via the <code className="bg-gray-100 px-2 py-1 rounded">isoDate</code> filter),
              the author, and a publisher <code className="bg-gray-100 px-2 py-1 rounded">Organization</code> built from <code className="bg-gray-100 px-2 py-1 rounded">client</code>:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-150 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`<!-- src/_includes/components/post-schema.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{ client.domain }}{{ page.url }}"
  },
  {% if title %}"headline": "{{ title | escape }}",{% endif %}
  {% if description %}"description": "{{ description | escape }}",{% endif %}
  {% if image %}
  "image": {
    "@type": "ImageObject",
    "url": "{{ client.domain }}{{ image }}",
    "width": 1200,
    "height": 630
  },
  {% endif %}
  {% if date %}"datePublished": "{{ date | isoDate }}",{% endif %}
  {% if date %}"dateModified": "{{ date | isoDate }}",{% endif %}
  {% if author %}
  "author": {
    "@type": "Person",
    "name": "{{ author | escape }}"
  },
  {% endif %}
  {% if client.name %}
  "publisher": {
    "@type": "Organization",
    "name": "{{ client.name | escape }}",
    "logo": {
      "@type": "ImageObject",
      "url": "{{ client.domain }}/assets/svgs/logo-black.svg",
      "width": 210,
      "height": 28
    }
  }
  {% endif %}
}
</script>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`<!-- src/_includes/components/post-schema.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "{{ client.domain }}{{ page.url }}"
  },
  {% if title %}"headline": "{{ title | escape }}",{% endif %}
  {% if description %}"description": "{{ description | escape }}",{% endif %}
  {% if image %}
  "image": {
    "@type": "ImageObject",
    "url": "{{ client.domain }}{{ image }}",
    "width": 1200,
    "height": 630
  },
  {% endif %}
  {% if date %}"datePublished": "{{ date | isoDate }}",{% endif %}
  {% if date %}"dateModified": "{{ date | isoDate }}",{% endif %}
  {% if author %}
  "author": {
    "@type": "Person",
    "name": "{{ author | escape }}"
  },
  {% endif %}
  {% if client.name %}
  "publisher": {
    "@type": "Organization",
    "name": "{{ client.name | escape }}",
    "logo": {
      "@type": "ImageObject",
      "url": "{{ client.domain }}/assets/svgs/logo-black.svg",
      "width": 210,
      "height": 28
    }
  }
  {% endif %}
}
</script>`, 11)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 11 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
            <p className="text-purple-900 font-medium mb-2">🎯 Rich Snippets Benefits</p>
            <p className="text-sm text-purple-800">
              Structured data can surface enhanced features in search results. After enabling a schema and deploying, validate the output with{" "}
              <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                Google&apos;s Rich Results Test
              </a>.
            </p>
          </div>
        </div>
      </div>

      {/* Sitemap & Robots */}
      <div className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-orange-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Sitemap &amp; Robots.txt
            </h2>
            <p className="text-lg text-gray-600">
              Both are generated for you from <code className="bg-gray-100 px-2 py-1 rounded">client.domain</code>
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Sitemap Plugin (already configured)
            </h3>
            <p className="text-gray-600 mb-4">
              The starter uses <code className="bg-gray-100 px-2 py-1 rounded">@quasibit/eleventy-plugin-sitemap</code>, registered in <code className="bg-gray-100 px-2 py-1 rounded">.eleventy.js</code>.
              Its hostname comes from <code className="bg-gray-100 px-2 py-1 rounded">src/config/plugins/sitemap.js</code>:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`// src/config/plugins/sitemap.js
const client = require("../../_data/client");

module.exports = {
  sitemap: {
    hostname: client.domain,
  },
};`}</code></pre>
              <button
                onClick={() => copyToClipboard(`// src/config/plugins/sitemap.js
const client = require("../../_data/client");

module.exports = {
  sitemap: {
    hostname: client.domain,
  },
};`, 8)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 8 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Sitemap Template
            </h3>
            <p className="text-gray-600 mb-4">
              <code className="bg-gray-100 px-2 py-1 rounded">src/sitemap.html</code> outputs <code className="bg-gray-100 px-2 py-1 rounded">/sitemap.xml</code> from every page tagged
              <code className="bg-gray-100 px-2 py-1 rounded"> sitemap</code> (a page opts in with <code className="bg-gray-100 px-2 py-1 rounded">tags: &quot;sitemap&quot;</code> in its front matter, like the homepage):
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`---
permalink: /sitemap.xml
layout: null
eleventyExcludeFromCollections: true
---
{% sitemap collections.sitemap %}`}</code></pre>
              <button
                onClick={() => copyToClipboard(`---
permalink: /sitemap.xml
layout: null
eleventyExcludeFromCollections: true
---
{% sitemap collections.sitemap %}`, 9)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 9 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Robots.txt
            </h3>
            <p className="text-gray-600 mb-4">
              <code className="bg-gray-100 px-2 py-1 rounded">src/robots.html</code> renders <code className="bg-gray-100 px-2 py-1 rounded">/robots.txt</code> and points crawlers at your sitemap:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`---
permalink: /robots.txt
layout: null
eleventyExcludeFromCollections: true
---
User-agent: *
Disallow: /admin/
Allow: /

Sitemap: {{ client.domain }}/sitemap.xml`}</code></pre>
              <button
                onClick={() => copyToClipboard(`---
permalink: /robots.txt
layout: null
eleventyExcludeFromCollections: true
---
User-agent: *
Disallow: /admin/
Allow: /

Sitemap: {{ client.domain }}/sitemap.xml`, 10)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 10 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
            <p className="text-orange-900 font-medium mb-2">📍 Submit Your Sitemap</p>
            <p className="text-sm text-orange-800 mb-3">
              After deploying, submit <code className="bg-orange-100 px-1.5 py-0.5 rounded">/sitemap.xml</code> to search engines:
            </p>
            <ul className="text-sm text-orange-800 space-y-1">
              <li>• <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Google Search Console</a></li>
              <li>• <a href="https://www.bing.com/webmasters" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Bing Webmaster Tools</a></li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
