"use client";

import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { BarChart3, Copy, Check, Shield, Zap, ArrowRight, TrendingUp } from "lucide-react";
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
      <div className="mb-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
          <Link href="/docs/astro" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Astro
          </Link>
          <span><LuChevronRight /></span>
          <Link href="/docs/astro/analytics" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Analytics
          </Link>
          <span><LuChevronRight /></span>
          <span aria-current="page">Google Analytics</span>
        </nav>
        <h1 className="text-5xl font-bold text-slate-900 mt-8 mb-4">
          Track Your Site Performance
        </h1>
        
        <p className="text-xl text-slate-600 mb-2">
          Add analytics to understand your audience and track conversions.
        </p>
      </div>

      {/* Google Analytics Setup */}
      <div className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-slate-700 rounded-xl flex items-center justify-center shadow-lg">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Setup Google Analytics 4
            </h2>
            <p className="text-lg text-slate-600">
              Free analytics loaded off the main thread with Partytown
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
                Get Your Measurement ID
              </h3>
            </div>
            <ol className="space-y-2 text-slate-700 ml-11 list-decimal list-inside">
              <li>Go to <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 underline font-semibold">Google Analytics</a> and click <span className="font-semibold">Start measuring</span></li>
              <li>Create a property (name, timezone, currency) and fill in your business details</li>
              <li>Choose <span className="font-semibold">Web</span> as the platform and add a data stream with your site URL</li>
              <li>Copy your Measurement ID (starts with <code className="bg-slate-100 px-2 py-0.5 rounded">G-</code>)</li>
            </ol>
          </div>

          {/* Step 2 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-slate-700 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Install Partytown
              </h3>
            </div>
            <p className="text-slate-600 mb-4 ml-11">
              Partytown runs the Google Analytics script in a web worker, keeping it off the main thread so it never slows down your page. Add the official Astro integration:
            </p>
            <div className="ml-11 bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`npm install @astrojs/partytown`}</code></pre>
              <button
                onClick={() => copyToClipboard(`npm install @astrojs/partytown`, 3)}
                className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedStep === 3 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-slate-700 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Configure astro.config.mjs
              </h3>
            </div>
            <p className="text-slate-600 mb-4 ml-11">
              Register the integration and forward <code className="bg-slate-100 px-2 py-0.5 rounded">dataLayer.push</code> so events reach Google Analytics from the worker:
            </p>
            <div className="ml-11 bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`// astro.config.mjs
import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";

export default defineConfig({
  site: "https://your-site.com",
  integrations: [
    // ...your existing integrations
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});`}</code></pre>
              <button
                onClick={() => copyToClipboard(`// astro.config.mjs
import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";

export default defineConfig({
  site: "https://your-site.com",
  integrations: [
    // ...your existing integrations
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
});`, 1)}
                className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedStep === 1 ? (
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
                Add the Google Tag to Your Layout
              </h3>
            </div>
            <p className="text-slate-600 mb-4 ml-11">
              Add the gtag snippet to the <code className="bg-slate-100 px-2 py-0.5 rounded">&lt;head&gt;</code> of <code className="bg-slate-100 px-2 py-1 rounded">src/layouts/BaseLayout.astro</code> so every page is tracked. Note the <code className="bg-slate-100 px-2 py-0.5 rounded">type=&quot;text/partytown&quot;</code> on both tags and replace <code className="bg-slate-100 px-2 py-0.5 rounded">G-XXXXXXXXXX</code> with your ID:
            </p>
            <div className="ml-11 bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`---
// src/layouts/BaseLayout.astro
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
---
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  {/* Google tag (gtag.js) */}
  <script type="text/partytown" async src={\`https://www.googletagmanager.com/gtag/js?id=\${GA_MEASUREMENT_ID}\`}></script>
  <script type="text/partytown" define:vars={{ GA_MEASUREMENT_ID }}>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  </script>

  <!-- rest of head -->
</head>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`---
// src/layouts/BaseLayout.astro
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
---
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  {/* Google tag (gtag.js) */}
  <script type="text/partytown" async src={\`https://www.googletagmanager.com/gtag/js?id=\${GA_MEASUREMENT_ID}\`}></script>
  <script type="text/partytown" define:vars={{ GA_MEASUREMENT_ID }}>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  </script>

  <!-- rest of head -->
</head>`, 2)}
                className="absolute right-3 top-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                {copiedStep === 2 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          <div className="ml-11 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-slate-900 font-medium mb-2">
              ✅ That&apos;s It!
            </p>
            <p className="text-sm text-slate-800">
              Run <code className="bg-blue-100 px-1.5 py-0.5 rounded">npm run build</code>, deploy, then check Google Analytics → Realtime to confirm tracking works.
              Full reports can take up to 24-48 hours to populate.
            </p>
          </div>
        </div>
      </div>

      {/* Track Custom Events */}
      <div className="mb-12 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-slate-700 rounded-xl flex items-center justify-center shadow-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Track Custom Events
            </h2>
            <p className="text-lg text-slate-600">
              Measure button clicks, form submissions, and conversions
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              Google Analytics Events
            </h3>
            <p className="text-slate-600 mb-4">
              Because you forwarded <code className="bg-slate-100 px-2 py-0.5 rounded">dataLayer.push</code> in Step 3, events fired on the main thread are relayed to the Partytown worker. Define a small <code className="bg-slate-100 px-2 py-0.5 rounded">gtag</code> helper, then call it on any interaction:
            </p>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`<!-- Define gtag on the main thread (events are forwarded to Partytown) -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
</script>

<!-- Track button click -->
<button onclick="gtag('event', 'signup_click')">
  Sign Up
</button>

<!-- Track form submission -->
<form onsubmit="gtag('event', 'contact_submit')">
  <!-- form fields -->
</form>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`<!-- Define gtag on the main thread (events are forwarded to Partytown) -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
</script>

<!-- Track button click -->
<button onclick="gtag('event', 'signup_click')">
  Sign Up
</button>

<!-- Track form submission -->
<form onsubmit="gtag('event', 'contact_submit')">
  <!-- form fields -->
</form>`, 4)}
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

          
        </div>
      </div>

      {/* Privacy Note */}
      <div className="mb-12 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          📋 Privacy Considerations
        </h3>
        <ul className="space-y-2 text-slate-700">
          <li>• Google Analytics requires a cookie consent banner in the EU (GDPR)</li>
          <li>• Update your privacy policy to mention analytics tracking</li>
          <li>• Plausible doesn&apos;t use cookies and is GDPR-compliant by default</li>
          <li>• Never track personally identifiable information (PII)</li>
        </ul>
      </div>

      {/* Next Steps */}
      <div className="rounded-2xl p-4 text-slate-900 text-center">
        <h2 className="text-xl font-bold mb-2">
          You&apos;re All Set! 🎉
        </h2>
        <p className="text-base text-slate-900 mb-2">
          Analytics is now tracking your visitors. Check your dashboard to see real-time data.
        </p>
       
      </div>

      </div>
    </div>
  );
}