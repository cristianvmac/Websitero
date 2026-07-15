"use client";

import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { Rocket, Search, Copy, Check, FileCode, Sparkles, Settings, ArrowRight, BookOpen, ChevronRight, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

export default function SEOtags() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = (text: string, stepIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const seoTags = [
    { tag: "title", description: "Page title (defaults to SITE.title from client.ts)", importance: "Critical" },
    { tag: "description", description: "Meta description (defaults to SITE.description)", importance: "Critical" },
    { tag: "og:title", description: "Open Graph title for social sharing", importance: "Important" },
    { tag: "og:description", description: "Open Graph description", importance: "Important" },
    { tag: "og:image", description: "Social preview image (optimized 1200x600 webp)", importance: "Important" },
    { tag: "og:locale", description: "Locale for Open Graph", importance: "Optional" },
    { tag: "og:site_name", description: "Site name pulled from client.ts", importance: "Optional" },
    { tag: "twitter:card", description: "Twitter card type (summary_large_image)", importance: "Important" },
    { tag: "JSON-LD", description: "LocalBusiness on all pages, BlogPosting on posts", importance: "Important" },
    { tag: "heroImage", description: "Optional per-page social image prop", importance: "Optional" }
  ];

  return (
    <div className="min-h-full p-12">
      <div className="max-w-3xl ml-6">
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
        <span aria-current="page">SEO</span>
      </nav>

      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
          SEO &amp; Metadata
        </h1>

        <p className="text-xl text-gray-600 leading-relaxed mb-6">
          SEO data is centralized in <code className="bg-gray-100 px-2 py-1 rounded text-lg">src/data/client.ts</code>,
          a single source of truth for all metadata, structured data, and social sharing settings across your site.
          A dedicated Meta component handles comprehensive SEO coverage automatically inside BaseLayout.
        </p>
      </div>

      {/* Meta Component Section */}
      <div id="setup" className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <FileCode className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              The Meta Component
            </h2>
            <p className="text-lg text-gray-600">
              <code className="bg-gray-100 px-2 py-1 rounded">src/components/Meta/Meta.astro</code> provides comprehensive SEO coverage, automatically included in BaseLayout
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Features */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gray-600" />
              Features
            </h3>
            <ul className="space-y-3">
              {[
                "Open Graph tags (title, description, image, locale, site name)",
                "Twitter Cards (summary_large_image)",
                "JSON-LD structured data (LocalBusiness on all pages)",
                "Automatic social image handling with fallback",
                "Enhanced meta tags for articles (author, published/modified dates)"
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-gray-700">
                  <Check className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Image Strategy */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-gray-600" />
              Social Image Strategy
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Pages with heroImage", value: "Uses the provided image, optimized to 1200×600 webp" },
                { label: "Pages without heroImage", value: "Falls back to /assets/social.jpg" },
                { label: "Blog posts", value: "Automatically use the post's featured image" }
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-2.5 text-gray-700">
                  <ChevronRight className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                  <span>
                    <span className="font-semibold text-gray-900">{item.label}:</span> {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* BaseLayout Props */}
      <div className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              BaseLayout Props
            </h2>
            <p className="text-lg text-gray-600">
              BaseLayout accepts simple props with sensible defaults from <code className="bg-gray-100 px-2 py-1 rounded">client.ts</code>
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Props interface */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-gray-700 rounded-full flex items-center justify-center font-bold">1</div>
              <h3 className="text-xl font-bold text-gray-900">Props Interface</h3>
            </div>
            <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group overflow-x-auto">
              <pre className="whitespace-pre-wrap"><code>{`interface Props {
  title?: string;        // Page title (defaults to SITE.title)
  description?: string;   // Meta description (defaults to SITE.description)
  heroImage?: HeroImage;  // Optional social sharing image
}`}</code></pre>
              <button
                onClick={() => copyToClipboard(`interface Props {
  title?: string;        // Page title (defaults to SITE.title)
  description?: string;   // Meta description (defaults to SITE.description)
  heroImage?: HeroImage;  // Optional social sharing image
}`, 1)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 1 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          {/* Basic page */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-gray-700 rounded-full flex items-center justify-center font-bold">2</div>
              <h3 className="text-xl font-bold text-gray-900">Basic Page (uses defaults)</h3>
            </div>
            <p className="text-gray-600 mb-4 ml-11">
              Pass just a title and description &mdash; everything else falls back to <code className="bg-gray-100 px-2 py-1 rounded">client.ts</code>.
            </p>
            <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group overflow-x-auto">
              <pre className="whitespace-pre-wrap"><code>{`<BaseLayout
  title="About Us"
  description="Learn about our company"
>
  <!-- Page content -->
</BaseLayout>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`<BaseLayout
  title="About Us"
  description="Learn about our company"
>
  <!-- Page content -->
</BaseLayout>`, 2)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 2 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          {/* Page with social image */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-gray-700 rounded-full flex items-center justify-center font-bold">3</div>
              <h3 className="text-xl font-bold text-gray-900">Page With Social Image</h3>
            </div>
            <p className="text-gray-600 mb-4 ml-11">
              Optimize an image with <code className="bg-gray-100 px-2 py-1 rounded">getImage</code> and pass it as <code className="bg-gray-100 px-2 py-1 rounded">heroImage</code>.
            </p>
            <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group overflow-x-auto">
              <pre className="whitespace-pre-wrap"><code>{`---
import heroImage from "@assets/images/hero.jpg";
import { getImage } from "astro:assets";
const optimizedImage = await getImage({ src: heroImage, format: "webp" });
---

<BaseLayout
  title="Projects"
  description="Our portfolio"
  heroImage={optimizedImage}
>
  <!-- Page content -->
</BaseLayout>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`---
import heroImage from "@assets/images/hero.jpg";
import { getImage } from "astro:assets";
const optimizedImage = await getImage({ src: heroImage, format: "webp" });
---

<BaseLayout
  title="Projects"
  description="Our portfolio"
  heroImage={optimizedImage}
>
  <!-- Page content -->
</BaseLayout>`, 3)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 3 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="ml-11 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-gray-900 font-medium mb-2">💡 Sensible Defaults</p>
            <p className="text-sm text-gray-800">
              Omit any prop and the Meta component pulls the value from <code className="bg-blue-100 px-1.5 py-0.5 rounded">client.ts</code>.
              You only override what&apos;s different on a given page.
            </p>
          </div>
        </div>
      </div>

      {/* Extending SEO Metadata */}
      <div className="mb-16 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Extending SEO Metadata
            </h2>
            <p className="text-lg text-gray-600">
              Add custom Open Graph tags or JSON-LD structured data without touching the Meta component
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
            <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-gray-600" />
              Custom Open Graph Tags
            </p>
            <p className="text-sm text-gray-700">
              Edit <code className="bg-gray-200 px-1.5 py-0.5 rounded">src/components/Meta/Meta.astro</code> to add properties like
              article publish dates, Twitter-specific metadata, or additional schema.org types.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Custom JSON-LD &mdash; Approach 1: Inline Schema
            </h3>
            <p className="text-gray-600 mb-4">
              The template auto-generates LocalBusiness (all pages) and BlogPosting (blog posts). To add custom JSON-LD on a
              specific page, use the <code className="bg-gray-100 px-2 py-1 rounded">schema</code> slot &mdash; no component changes needed.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`<BaseLayout title="FAQ" description="Frequently asked questions">
  <script slot="schema" is:inline type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "What services do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer consulting and development services."
        }
      }]
    }
  </script>

  <!-- Page content -->
</BaseLayout>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`<BaseLayout title="FAQ" description="Frequently asked questions">
  <script slot="schema" is:inline type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "What services do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer consulting and development services."
        }
      }]
    }
  </script>

  <!-- Page content -->
</BaseLayout>`, 4)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 4 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Custom JSON-LD &mdash; Approach 2: Reusable Schema Functions
            </h3>
            <p className="text-gray-600 mb-4">
              For schemas used across multiple pages, create a helper following the existing pattern
              (<code className="bg-gray-100 px-2 py-1 rounded">localBusinessSchema.js</code>, <code className="bg-gray-100 px-2 py-1 rounded">blogPostingSchema.js</code>).
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`// src/js/faqSchema.js
import { SITE } from "@data/client";

export function getFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}`}</code></pre>
              <button
                onClick={() => copyToClipboard(`// src/js/faqSchema.js
import { SITE } from "@data/client";

export function getFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}`, 5)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 5 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Usage in a Page</h3>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`---
import { getFAQSchema } from "@js/faqSchema";
const faqSchema = getFAQSchema(faqData);
---

<BaseLayout title="FAQ" description="Frequently asked questions">
  <script
    slot="schema"
    is:inline
    type="application/ld+json"
    set:html={JSON.stringify(faqSchema)}
  />

  <!-- Page content -->
</BaseLayout>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`---
import { getFAQSchema } from "@js/faqSchema";
const faqSchema = getFAQSchema(faqData);
---

<BaseLayout title="FAQ" description="Frequently asked questions">
  <script
    slot="schema"
    is:inline
    type="application/ld+json"
    set:html={JSON.stringify(faqSchema)}
  />

  <!-- Page content -->
</BaseLayout>`, 6)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 6 ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-gray-900 font-medium mb-2">🎯 Multiple Schemas</p>
            <p className="text-sm text-gray-800">
              You can add multiple <code className="bg-blue-100 px-1.5 py-0.5 rounded">&lt;script slot=&quot;schema&quot;&gt;</code> tags &mdash;
              each one renders in the <code className="bg-blue-100 px-1.5 py-0.5 rounded">&lt;head&gt;</code>. Validate output with{" "}
              <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                Google&apos;s Rich Results Test
              </a>.
            </p>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}
