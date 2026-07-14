"use client";

import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { Triangle, Copy, Check, Zap, ArrowRight, MousePointerClick, Gauge } from "lucide-react";
import { useState } from "react";

export default function VercelAnalytics() {
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
          <Link href="/docs/astro/analytics" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Analytics
          </Link>
          <span><LuChevronRight /></span>
          <span aria-current="page">Vercel Analytics</span>
        </nav>
        <h1 className="text-4xl font-bold text-gray-900 mt-10 mb-4">
          Privacy-Friendly Analytics, Zero Config
        </h1>

        <p className="text-xl text-gray-600 mb-2">
          Vercel Web Analytics is cookieless, GDPR-compliant out of the box, and
          built right into the platform.
        </p>
        <p className="text-xl text-gray-600 mb-8">
          If your Astro site is deployed on Vercel,
          you can turn it on in a couple of minutes.
        </p>
      </div>

      {/* Setup */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center shadow-lg">
            <Triangle className="w-6 h-6 fill-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Set Up Web Analytics
            </h2>
            <p className="text-lg text-gray-600">
              No tracking IDs, no extra scripts to wire up by hand
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Enable Analytics in Your Vercel Project
              </h3>
            </div>
            <ol className="space-y-2 text-gray-700 ml-11 list-decimal list-inside">
              <li>Make sure your Astro site is deployed on <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">Vercel</a></li>
              <li>Open your project in the Vercel dashboard and go to the <span className="font-semibold">Analytics</span> tab</li>
              <li>Click <span className="font-semibold">Enable</span> under Web Analytics</li>
            </ol>
          </div>

          {/* Step 2 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Install the Analytics Package
              </h3>
            </div>
            <p className="text-gray-600 mb-4 ml-11">
              Add the official package to your project. It ships an Astro component, so there&apos;s nothing to configure in <code className="bg-gray-100 px-2 py-0.5 rounded">astro.config.mjs</code>:
            </p>
            <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`npm install @vercel/analytics`}</code></pre>
              <button
                onClick={() => copyToClipboard(`npm install @vercel/analytics`, 1)}
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
              <div className="shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Add the Component to Your Layout
              </h3>
            </div>
            <p className="text-gray-600 mb-4 ml-11">
              Import the Astro component and drop <code className="bg-gray-100 px-2 py-0.5 rounded">&lt;Analytics /&gt;</code> into the layout that wraps every page (usually right before the closing <code className="bg-gray-100 px-2 py-0.5 rounded">&lt;/body&gt;</code>). That&apos;s all it takes to track every route:
            </p>
            <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`---
// src/layouts/BaseLayout.astro
import Analytics from "@vercel/analytics/astro";
---
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- rest of head -->
  </head>
  <body>
    <slot />

    <Analytics />
  </body>
</html>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`---
// src/layouts/BaseLayout.astro
import Analytics from "@vercel/analytics/astro";
---
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- rest of head -->
  </head>
  <body>
    <slot />

    <Analytics />
  </body>
</html>`, 2)}
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
              <div className="shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Deploy and Verify
              </h3>
            </div>
            <p className="text-gray-600 mb-4 ml-11">
              Commit your changes and push, or run a manual deploy:
            </p>
            <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`vercel deploy --prod`}</code></pre>
              <button
                onClick={() => copyToClipboard(`vercel deploy --prod`, 3)}
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

          <div className="ml-11 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
            <p className="text-green-900 font-medium mb-2">
              ✅ That&apos;s It!
            </p>
            <p className="text-sm text-green-800">
              Visit your live site, then open the <span className="font-semibold">Analytics</span> tab in Vercel — page views show up within about 30 seconds.
              Note that data is only collected on production deployments, so you won&apos;t see anything from <code className="bg-green-100 px-1.5 py-0.5 rounded">localhost</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Track Custom Events */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <MousePointerClick className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Track Custom Events
            </h2>
            <p className="text-lg text-gray-600">
              Measure signups, form submissions, and other conversions
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-gray-600 mb-4">
              Use the <code className="bg-gray-100 px-2 py-0.5 rounded">track</code> helper inside an Astro client <code className="bg-gray-100 px-2 py-0.5 rounded">&lt;script&gt;</code> tag. Astro bundles the import for you, so you can call it from any event handler:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`<button id="signup">Sign Up</button>

<script>
  import { track } from "@vercel/analytics";

  document.getElementById("signup")?.addEventListener("click", () => {
    track("Signup", { plan: "pro" });
  });
</script>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`<button id="signup">Sign Up</button>

<script>
  import { track } from "@vercel/analytics";

  document.getElementById("signup")?.addEventListener("click", () => {
    track("Signup", { plan: "pro" });
  });
</script>`, 4)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 4 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Custom events require a Vercel Pro or Enterprise plan. The event name is the first argument; the optional second argument holds custom properties.
            </p>
          </div>
        </div>
      </div>

      {/* Bonus: Speed Insights */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-purple-600 text-white rounded-xl flex items-center justify-center shadow-lg">
            <Gauge className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Bonus: Add Speed Insights
            </h2>
            <p className="text-lg text-gray-600">
              Track real-world Core Web Vitals from your actual visitors
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-gray-600">
            Speed Insights is a separate, equally simple add-on. Enable it under the <span className="font-semibold">Speed Insights</span> tab in your Vercel project, then install the package and add its component:
          </p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap"><code>{`npm install @vercel/speed-insights`}</code></pre>
            <button
              onClick={() => copyToClipboard(`npm install @vercel/speed-insights`, 5)}
              className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copiedStep === 5 ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap"><code>{`---
// src/layouts/BaseLayout.astro
import Analytics from "@vercel/analytics/astro";
import SpeedInsights from "@vercel/speed-insights/astro";
---
<body>
  <slot />

  <Analytics />
  <SpeedInsights />
</body>`}</code></pre>
            <button
              onClick={() => copyToClipboard(`---
// src/layouts/BaseLayout.astro
import Analytics from "@vercel/analytics/astro";
import SpeedInsights from "@vercel/speed-insights/astro";
---
<body>
  <slot />

  <Analytics />
  <SpeedInsights />
</body>`, 6)}
              className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copiedStep === 6 ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Note */}
      <div className="mb-12 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          📋 Privacy Considerations
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Vercel Web Analytics is cookieless — no cookies, no cross-site tracking</li>
          <li>• Compliant with GDPR, CCPA, and PECR by default, so a consent banner usually isn&apos;t required</li>
          <li>• Visitor data is anonymized and never used to build personal profiles</li>
          <li>• It&apos;s still good practice to mention analytics in your privacy policy</li>
        </ul>
      </div>

      {/* Next Steps */}
      <div className="p-4 text-gray-900 text-center">
        <h2 className="text-2xl font-bold mb-4">
          You&apos;re All Set! 🎉
        </h2>
        <p className="text-lg text-gray-900 mb-4">
          Check the Analytics tab to see real-time data.
        </p>
      </div>

      </div>
    </div>
  );
}
