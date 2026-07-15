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
          <span aria-current="page">Vercel Analytics</span>
        </nav>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Privacy-Friendly Analytics, Zero Config
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Vercel Web Analytics is cookieless, GDPR-compliant out of the box, and
          built right into the platform. If your Eleventy site is deployed on Vercel,
          you can turn it on in a couple of minutes.
        </p>
      </div>

      {/* Setup */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
            <Triangle className="w-6 h-6 fill-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Set Up Web Analytics
            </h2>
            <p className="text-lg text-gray-600">
              No tracking IDs, no build tooling — just a small script in your layout
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
                Enable Analytics in Your Vercel Project
              </h3>
            </div>
            <ol className="space-y-2 text-gray-700 ml-11 list-decimal list-inside">
              <li>Make sure your Eleventy site is deployed on <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 underline font-semibold">Vercel</a></li>
              <li>Open your project in the Vercel dashboard and go to the <span className="font-semibold">Analytics</span> tab</li>
              <li>Click <span className="font-semibold">Enable</span> under Web Analytics</li>
            </ol>
          </div>

          {/* Step 2 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="shrink-0 w-8 h-8 bg-blue-50 text-gray-700 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Add the Tracking Script to base.html
              </h3>
            </div>
            <p className="text-gray-600 mb-4 ml-11">
              Eleventy outputs plain HTML, so you use Vercel&apos;s framework-agnostic snippet instead of a package. Add it right before <code className="bg-gray-100 px-2 py-0.5 rounded">&lt;/body&gt;</code> in <code className="bg-gray-100 px-2 py-0.5 rounded">src/_includes/layouts/base.html</code>. The <code className="bg-gray-100 px-2 py-0.5 rounded">{`{% if client.isProduction %}`}</code> guard skips it in local dev, where <code className="bg-gray-100 px-2 py-0.5 rounded">/_vercel/insights/script.js</code> isn&apos;t served:
            </p>
            <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap"><code>{`<!-- src/_includes/layouts/base.html -->
<body>
  {% block body %}{% endblock %}

  {% if client.isProduction %}
  <!-- Vercel Web Analytics -->
  <script>
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  </script>
  <script defer src="/_vercel/insights/script.js"></script>
  {% endif %}
</body>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`<!-- src/_includes/layouts/base.html -->
<body>
  {% block body %}{% endblock %}

  {% if client.isProduction %}
  <!-- Vercel Web Analytics -->
  <script>
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  </script>
  <script defer src="/_vercel/insights/script.js"></script>
  {% endif %}
</body>`, 1)}
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
                Deploy and Verify
              </h3>
            </div>
            <p className="text-gray-600 mb-4 ml-11">
              Commit your changes and push, or run a manual deploy:
            </p>
            <div className="ml-11 bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`vercel deploy --prod`}</code></pre>
              <button
                onClick={() => copyToClipboard(`vercel deploy --prod`, 2)}
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

          <div className="ml-11 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <p className="text-gray-900 font-medium mb-2">
              ✅ That&apos;s It!
            </p>
            <p className="text-sm text-gray-800">
              Visit your live site, then open the <span className="font-semibold">Analytics</span> tab in Vercel — page views show up within about 30 seconds.
              Note that data is only collected on production deployments, so you won&apos;t see anything from <code className="bg-blue-100 px-1.5 py-0.5 rounded">localhost</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Track Custom Events */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
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
              The script registers a global <code className="bg-gray-100 px-2 py-0.5 rounded">window.va</code> queue. Call it from any event handler — guard with <code className="bg-gray-100 px-2 py-0.5 rounded">window.va</code> so nothing throws in local dev where the script isn&apos;t loaded:
            </p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group">
              <pre className="whitespace-pre-wrap"><code>{`<button id="signup">Sign Up</button>

<script>
  document.getElementById("signup")?.addEventListener("click", () => {
    window.va && window.va("event", { name: "Signup", data: { plan: "pro" } });
  });
</script>`}</code></pre>
              <button
                onClick={() => copyToClipboard(`<button id="signup">Sign Up</button>

<script>
  document.getElementById("signup")?.addEventListener("click", () => {
    window.va && window.va("event", { name: "Signup", data: { plan: "pro" } });
  });
</script>`, 3)}
                className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                {copiedStep === 3 ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              Custom events require a Vercel Pro or Enterprise plan. The first argument is always <code className="bg-gray-100 px-1.5 py-0.5 rounded">&quot;event&quot;</code>; the object holds the event <code className="bg-gray-100 px-1.5 py-0.5 rounded">name</code> and optional <code className="bg-gray-100 px-1.5 py-0.5 rounded">data</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Bonus: Speed Insights */}
      <div className="mb-12 bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-blue-50 text-gray-700 rounded-xl flex items-center justify-center shadow-lg">
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
            Speed Insights is a separate, equally simple add-on. Enable it under the <span className="font-semibold">Speed Insights</span> tab in your Vercel project, then add its script alongside the analytics snippet in <code className="bg-gray-100 px-2 py-0.5 rounded">base.html</code>:
          </p>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-xs text-gray-100 relative group max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap"><code>{`<!-- src/_includes/layouts/base.html — before </body> -->
{% if client.isProduction %}
<!-- Vercel Web Analytics -->
<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>

<!-- Vercel Speed Insights -->
<script>
  window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
</script>
<script defer src="/_vercel/speed-insights/script.js"></script>
{% endif %}`}</code></pre>
            <button
              onClick={() => copyToClipboard(`<!-- src/_includes/layouts/base.html — before </body> -->
{% if client.isProduction %}
<!-- Vercel Web Analytics -->
<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>

<!-- Vercel Speed Insights -->
<script>
  window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
</script>
<script defer src="/_vercel/speed-insights/script.js"></script>
{% endif %}`, 4)}
              className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {copiedStep === 4 ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Note */}
      <div className="mb-12 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
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
      <div className="bg-white border-2 border-gray-200 shadow-sm rounded-2xl p-8 text-gray-700 text-center">
        <h2 className="text-3xl font-bold mb-4">
          You&apos;re All Set! 🎉
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Vercel Analytics is now tracking your visitors. Check the Analytics tab to see real-time data.
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
