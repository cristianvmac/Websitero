





import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { Search, MapPin, Globe, MessageCircle, ArrowRight, Zap, CheckCircle } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Built-in SEO helpers with meta tags, Open Graph, structured data, and automatic sitemap generation.",
      href: "/docs/astro/features/seo",
      color: "green",
      highlights: ["Meta tags & Open Graph", "Sitemap generation", "Schema markup", "Per-page customization"]
    },
    {
      icon: MapPin,
      title: "Google Business Profile",
      description: "Optimize your local presence and rank higher in Google Maps search results.",
      href: "/docs/astro/features/google-business-profile",
      color: "blue",
      highlights: ["Local SEO optimization", "Review management", "Weekly posts & updates", "Get found on Maps"]
    },
    {
      icon: Globe,
      title: "Internationalization",
      description: "Add multi-language support with Astro's built-in i18n routing, localized URLs, and translation fallbacks.",
      href: "/docs/astro/features/internationalization",
      color: "purple",
      highlights: ["Localized URLs", "Locale-aware links", "Default language config", "Translation fallback"]
    },
    {
      icon: MessageCircle,
      title: "Customer Support",
      description: "Crisp live chat integration with automatic email fallback for instant customer support.",
      href: "/docs/astro/features/customer-support",
      color: "orange",
      highlights: ["Crisp live chat", "Mobile apps included", "Email fallback", "Support button component"]
    }
  ];

  const colorClasses: Record<string, { bg: string; icon: string; border: string; hover: string }> = {
    green: { bg: "bg-blue-50", icon: "bg-blue-50", border: "border-blue-200", hover: "hover:border-blue-400" },
    blue: { bg: "bg-blue-50", icon: "bg-blue-50", border: "border-blue-200", hover: "hover:border-blue-400" },
    purple: { bg: "bg-blue-50", icon: "bg-blue-50", border: "border-blue-200", hover: "hover:border-blue-400" },
    orange: { bg: "bg-blue-50", icon: "bg-blue-50", border: "border-blue-200", hover: "hover:border-blue-400" },
    red: { bg: "bg-blue-50", icon: "bg-blue-50", border: "border-blue-200", hover: "hover:border-blue-400" }
  };

  return (
    <div className="min-h-full p-12">
      <div className="max-w-3xl ml-6">

      {/* Hero Section */}
      <div className="mb-12 text-center">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-1 text-base font-normal text-slate-900">
          <Link href="/docs/astro" className="rounded-full py-1 hover:text-slate-600 hover:underline">
            Astro
          </Link>
          <span><LuChevronRight /></span>
          <span aria-current="page">Features</span>
        </nav>
        
        <h1 className="text-5xl font-bold text-slate-900 mb-4">
          Everything You Need to Launch Fast
        </h1>
        
        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
          Websitero comes with powerful features to help you build, optimize, and grow your business.
          No complex setup—just powerful tools that work out of the box.
        </p>
      </div>

      {/* Features Grid */}
      <div className="space-y-6 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const colors = colorClasses[feature.color];
          
          return (
            <Link
              key={index}
              href={feature.href}
              className={`block bg-white rounded-2xl p-6 md:p-8 border ${colors.border} ${colors.hover} hover:shadow-xl transition-all group`}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Icon */}
                <div className={`shrink-0 w-16 h-16 ${colors.icon} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-slate-700" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-2xl font-bold text-slate-900 group-hover:text-slate-600 transition-colors">
                      {feature.title}
                    </h2>
                    <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                  
                  <p className="text-slate-600 mb-4">
                    {feature.description}
                  </p>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-2">
                    {feature.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle className={`w-4 h-4 ${colors.icon.replace('bg-', 'text-')} shrink-0`} />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 text-center">
          <div className="text-4xl font-bold text-slate-600 mb-2">4</div>
          <div className="text-slate-700 font-medium">Core Features</div>
          <div className="text-sm text-slate-600">Everything you need</div>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 text-center">
          <div className="text-4xl font-bold text-slate-600 mb-2">5min</div>
          <div className="text-slate-700 font-medium">Setup Time</div>
          <div className="text-sm text-slate-600">Quick & easy</div>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 text-center">
          <div className="text-4xl font-bold text-slate-600 mb-2">0</div>
          <div className="text-slate-700 font-medium">Complex Config</div>
          <div className="text-sm text-slate-600">Just works</div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-700 text-center">
        <h2 className="text-xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-base text-slate-600 mb-8">
          All features are ready to use. Just follow the quick setup guides.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/docs/astro/get-started"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-50 hover:bg-blue-100 text-slate-700 font-bold rounded-lg transition-colors text-lg shadow-lg"
          >
            <Zap className="w-5 h-5" />
            Get Started Now
          </Link>
          <Link
            href="/docs/astro/build-in-5-minutes"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 font-bold rounded-lg transition-colors text-lg"
          >
            Build in 5 Minutes
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      </div>
    </div>
  );
}