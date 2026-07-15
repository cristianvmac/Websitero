"use client";

import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { BarChart3, Copy, Check, Zap, ArrowRight, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function Analytics() {
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
          <Link href="/docs/eleventy/analytics" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Analytics
          </Link>
          <span><LuChevronRight /></span>
          <span aria-current="page">Google Analytics</span>
        </nav>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Track Your Site Performance
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Add Google Analytics 4 to understand your audience and track conversions.
          Because Eleventy generates static HTML, setup is just dropping the gtag snippet into your base layout &mdash; loaded only on production builds so local visits aren&apos;t counted.
        </p>
      </div>

      {/* Google Analytics Setup */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Setup Google Analytics 4
            </h2>
            <p className="text-lg text-gray-600">
              Free analytics wired into your base layout, loaded only on production builds
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-gray-700 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Get Your Measurement ID
              </h3>
            </div>
            <ol className="space-y-2 text-gray-700 ml-11 list-decimal list-inside">
              <li>Go to <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 underline font-semibold">Google Analytics</a> and click <span className="font-semibold">Start measuring</span></li>
              <li>Create a property (name, timezone, currency) and fill in your business details</li>
              <li>Choose <span className="font-semibold">Web</span> as the platform and add a data stream with your site URL</li>
              <li>Copy your Measurement ID (starts with <code className="bg-gray-100 px-2 py-0.5 rounded">G-</code>)</li>
            </ol>
          </div>

          {/* Step 2 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-gray-700 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Add the ID to client.js
              </h3>
            </div>
            <p className="text-gray-600 mb-4 ml-11">
              Keep your Measurement ID with the rest of your site config in <code className="bg-gray-100 px-2 py-0.5 rounded">src/_data/client.js</code>. Because it lives in <code className="bg-gray-100 px-2 py-0.5 rounded">_data</code>, it&apos;s available in every template as <code className="bg-gray-100 px-2 py-0.5 rounded">client.gaId</code>:
            </p>
            <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`// src/_data/client.js
module.exports = {
  name: "Eleventy Starter Template",
  // ...your existing config

  // Google Analytics 4 Measurement ID (leave empty to disable)
  gaId: "G-XXXXXXXXXX",

  // Available in templates as client.isProduction
  isProduction: process.env.ELEVENTY_ENV === "PROD",
};`}</code></pre>
              <button
                onClick={() => copyToClipboard(`// src/_data/client.js
module.exports = {
  name: "Eleventy Starter Template",
  // ...your existing config

  // Google Analytics 4 Measurement ID (leave empty to disable)
  gaId: "G-XXXXXXXXXX",

  // Available in templates as client.isProduction
  isProduction: process.env.ELEVENTY_ENV === "PROD",
};`, 1)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 1 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-gray-700 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Add the Google Tag to base.html
              </h3>
            </div>
            <p className="text-gray-600 mb-4 ml-11">
              Drop the gtag snippet into the <code className="bg-gray-100 px-2 py-0.5 rounded">&lt;head&gt;</code> of <code className="bg-gray-100 px-2 py-0.5 rounded">src/_includes/layouts/base.html</code> so every page that extends it is tracked. The <code className="bg-gray-100 px-2 py-0.5 rounded">{`{% if client.isProduction and client.gaId %}`}</code> guard keeps it out of local dev builds:
            </p>
            <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`<!-- src/_includes/layouts/base.html -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  {% if client.isProduction and client.gaId %}
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id={{ client.gaId }}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', '{{ client.gaId }}');
  </script>
  {% endif %}

  {% block head %}{% endblock %}

  <title>{{ title }}</title>
</head>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`<!-- src/_includes/layouts/base.html -->
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  {% if client.isProduction and client.gaId %}
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id={{ client.gaId }}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', '{{ client.gaId }}');
  </script>
  {% endif %}

  {% block head %}{% endblock %}

  <title>{{ title }}</title>
</head>`, 2)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 2 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Step 4 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-gray-700 rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Build, Deploy &amp; Verify
              </h3>
            </div>
            <p className="text-gray-600 mb-4 ml-11">
              Build for production so the guard passes and the tag is included, then deploy:
            </p>
            <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`# Production build (includes the GA tag)
ELEVENTY_ENV=PROD npx @11ty/eleventy

# Local dev — tag is NOT rendered
npx @11ty/eleventy --serve`}</code></pre>
              <button
                onClick={() => copyToClipboard(`ELEVENTY_ENV=PROD npx @11ty/eleventy`, 4)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 4 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            <ul className="space-y-2 text-gray-700 ml-11 mt-4 list-disc list-inside">
              <li><span className="font-semibold">Realtime report:</span> open Google Analytics → <span className="font-semibold">Reports → Realtime</span>, visit your live site, and you should appear within a minute or two</li>
              <li><span className="font-semibold">Tag Assistant:</span> install the <a href="https://chromewebstore.google.com/detail/tag-assistant-companion/jmekfmbnaedfebfnmakmokmlfpblbfdm" target="_blank" rel="noopener noreferrer" className="text-gray-600 underline font-semibold">Google Tag Assistant</a> extension to confirm the GA4 tag is firing correctly</li>
            </ul>
          </div>

          <div className="ml-11 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-gray-900 font-medium mb-2">
              ✅ That&apos;s It!
            </p>
            <p className="text-sm text-gray-800">
              Once you see yourself in the Realtime report, tracking is live. Full reports can take 24&ndash;48 hours to populate. If you run a strict Content Security Policy, allow <code className="bg-blue-100 px-1.5 py-0.5 rounded">googletagmanager.com</code> and <code className="bg-blue-100 px-1.5 py-0.5 rounded">google-analytics.com</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Track Custom Events */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Track Custom Events
            </h2>
            <p className="text-lg text-gray-600">
              Measure button clicks, form submissions, and conversions
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              Google Analytics Events
            </h3>
            <p className="text-gray-600 mb-4">
              The snippet in <code className="bg-gray-100 px-2 py-0.5 rounded">base.html</code> defines a global <code className="bg-gray-100 px-2 py-0.5 rounded">gtag</code> function on production builds. Guard your calls with <code className="bg-gray-100 px-2 py-0.5 rounded">window.gtag</code> so nothing throws in local dev, then fire an event on any interaction:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`<!-- gtag is defined by base.html on production builds -->

<!-- Track button click -->
<button onclick="window.gtag && gtag('event', 'signup_click')">
  Sign Up
</button>

<!-- Track form submission -->
<form onsubmit="window.gtag && gtag('event', 'contact_submit')">
  <!-- form fields -->
</form>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`<!-- gtag is defined by base.html on production builds -->

<!-- Track button click -->
<button onclick="window.gtag && gtag('event', 'signup_click')">
  Sign Up
</button>

<!-- Track form submission -->
<form onsubmit="window.gtag && gtag('event', 'contact_submit')">
  <!-- form fields -->
</form>`, 3)}
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
        </div>
      </div>

      {/* Privacy Note */}
      <div className="mb-12 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          📋 Privacy &amp; Cookie Consent
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li>• If your visitors are in the EU, GDPR requires consent before loading Analytics cookies</li>
          <li>• A common approach: show a cookie consent banner, then load Analytics only after consent is granted</li>
          <li>• For compliant tracking, use <a href="https://developers.google.com/tag-platform/security/guides/consent" target="_blank" rel="noopener noreferrer" className="text-gray-700 underline font-semibold">Google Consent Mode</a></li>
          <li>• Update your privacy policy to mention analytics tracking, and never track personally identifiable information (PII)</li>
        </ul>
      </div>

      {/* Next Steps */}
      <div className="bg-white border-2 border-gray-200 shadow-sm rounded-2xl p-8 text-gray-700 text-center">
        <h2 className="text-3xl font-bold mb-4">
          You&apos;re All Set! 🎉
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Analytics is now tracking your visitors. Check your dashboard to see real-time data.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/docs/eleventy/deployment"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 hover:bg-blue-100 text-gray-700 font-bold rounded-lg transition-colors"
          >
            <Zap className="w-5 h-5" />
            Deploy Your Site
          </Link>
          <Link
            href="/docs/eleventy/features/seo"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 font-bold rounded-lg transition-colors"
          >
            Optimize SEO
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      </div>
    </div>
  );
}
