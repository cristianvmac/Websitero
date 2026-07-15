import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import {
  BarChart3,
  Triangle,
  ArrowUpRight,
  LineChart,
  ShieldCheck,
  Cookie,
  Sparkles,
} from "lucide-react";

const providers = [
  {
    title: "Google Analytics",
    description:
      "Free, industry-standard GA4 wired into your base layout and loaded only on production builds. Best for deep reporting, audiences, and conversion funnels.",
    href: "/docs/eleventy/analytics/google-analytics",
    cta: "Set up Google Analytics",
    icon: BarChart3,
    accent: {
      card: "hover:border-blue-300 hover:shadow-blue-100",
      iconWrap: "bg-blue-50 text-gray-600 border-blue-200",
      link: "text-gray-600 group-hover:text-gray-700",
    },
  },
  {
    title: "Vercel Analytics",
    description:
      "Cookieless and GDPR-compliant out of the box, built right into the platform. If your site is deployed on Vercel, you can turn it on in a couple of minutes — no tracking IDs required.",
    href: "/docs/eleventy/analytics/vercel-analytics",
    cta: "Set up Vercel Analytics",
    icon: Triangle,
    accent: {
      card: "hover:border-gray-400 hover:shadow-gray-100",
      iconWrap: "bg-gray-100 text-gray-900 border-gray-300",
      link: "text-gray-900 group-hover:text-gray-700",
    },
  },
];

const comparison = [
  {
    label: "Google Analytics",
    icon: LineChart,
    color: "bg-blue-50",
    text: "Most powerful reporting. Requires a cookie consent banner in the EU.",
  },
  {
    label: "Vercel Analytics",
    icon: ShieldCheck,
    color: "bg-gray-900",
    text: "Cookieless and privacy-friendly. Zero config when hosted on Vercel.",
  },
  {
    label: "Use both?",
    icon: Cookie,
    color: "bg-blue-50",
    text: "You can run them side by side — GA for depth, Vercel for privacy.",
  },
];

export default function Analytics() {
  return (
    <div className="min-h-full p-12">
      <div className="max-w-3xl ml-6">
      {/* Hero */}
      <div className="mb-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
          <Link href="/docs/eleventy" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Eleventy
          </Link>
          <span><LuChevronRight /></span>
          <span aria-current="page">Analytics</span>
        </nav>

        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Add Analytics to Your Site
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Track visitors, page views, and conversions to learn what&apos;s
          working. The Eleventy Starter Template supports two great options — pick
          the one that fits your needs, or run both together.
        </p>
      </div>

      {/* Provider cards */}
      <div className="grid gap-6 sm:grid-cols-2 mb-12">
        {providers.map((provider) => {
          const Icon = provider.icon;
          return (
            <Link
              key={provider.title}
              href={provider.href}
              className={`group flex flex-col bg-white rounded-2xl p-6 border border-gray-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg ${provider.accent.card}`}
            >
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${provider.accent.iconWrap}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {provider.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">
                {provider.description}
              </p>
              <span
                className={`inline-flex items-center gap-1 text-sm font-semibold ${provider.accent.link}`}
              >
                {provider.cta}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          );
        })}
      </div>

      {/* Quick comparison */}
      <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-gray-600" />
          Which Should You Choose?
        </h2>

        <div className="grid gap-4 sm:grid-cols-3 mb-6">
          {comparison.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="bg-white rounded-xl p-5 border border-gray-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`w-7 h-7 rounded-lg ${item.color} text-gray-700 flex items-center justify-center`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="font-bold text-gray-900">{item.label}</span>
                </div>
                <p className="text-sm text-gray-600">{item.text}</p>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-900">
            Not sure? Start with <span className="font-semibold">Vercel Analytics</span> if
            your site is on Vercel — it&apos;s the fastest, most private setup.
            Reach for <span className="font-semibold">Google Analytics</span> when you need
            detailed reports, audience segments, or conversion funnels.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}