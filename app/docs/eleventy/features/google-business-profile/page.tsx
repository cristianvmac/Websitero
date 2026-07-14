import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { MapPin, Star, TrendingUp, MessageSquare, Zap, Shield, Users, Clock, CheckCircle, ArrowRight, ExternalLink } from "lucide-react";

export default function GoogleBProfile() {
  const benefits = [
    {
      icon: MapPin,
      title: "Rank Locally",
      description: "We optimize your categories, attributes, and service areas to signal relevance to Google's local algorithm.",
      color: "blue"
    },
    {
      icon: Star,
      title: "Review Management",
      description: "We help you generate more 5-star reviews and respond to them professionally, building trust with future customers.",
      color: "yellow"
    },
    {
      icon: MessageSquare,
      title: "Post Updates & Offers",
      description: "Weekly posts keep your profile active and engaging, showing Google (and customers) that you're open for business.",
      color: "green"
    }
  ];

  const features = [
    {
      icon: TrendingUp,
      title: "Increased Visibility",
      stat: "3x",
      description: "more impressions in local search results"
    },
    {
      icon: Users,
      title: "More Customers",
      stat: "65%",
      description: "increase in direction requests and calls"
    },
    {
      icon: Star,
      title: "Better Reviews",
      stat: "4.8+",
      description: "average star rating with our management"
    },
    {
      icon: Shield,
      title: "Trust Signals",
      stat: "100%",
      description: "complete profile builds credibility"
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Free Profile Audit",
      description: "We analyze your current Google Business Profile and identify optimization opportunities",
      duration: "15 minutes"
    },
    {
      number: 2,
      title: "Strategic Optimization",
      description: "We optimize categories, descriptions, services, and attributes for maximum local visibility",
      duration: "2-3 days"
    },
    {
      number: 3,
      title: "Content & Reviews",
      description: "We help you generate reviews, add photos, and create engaging posts that attract customers",
      duration: "Ongoing"
    },
    {
      number: 4,
      title: "Monitor & Improve",
      description: "We track your rankings, respond to reviews, and continuously improve your profile performance",
      duration: "Monthly"
    }
  ];

  const colorClasses = {
    blue: { bg: "bg-blue-100", text: "text-blue-700", icon: "bg-blue-600" },
    yellow: { bg: "bg-yellow-100", text: "text-yellow-700", icon: "bg-yellow-600" },
    green: { bg: "bg-green-100", text: "text-green-700", icon: "bg-green-600" }
  };

  return (
    <div className="min-h-full p-12">
      <div className="max-w-3xl mx-auto">

      {/* Hero Section */}
      <div className="mb-16 text-center">
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
          <span aria-current="page">Google Business Profile</span>
        </nav>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Get Found on <span className="text-blue-600">Google Maps</span>
        </h1>
        
        <p className="text-2xl text-gray-600 leading-relaxed mb-4 max-w-4xl mx-auto">
          Your customers are searching for local businesses right now. If you&apos;re not in the top results, you&apos;re invisible.
        </p>
        
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          We optimize your profile to make you a top choice in your town.
        </p>

        {/* On This Page Summary */}
        <div className="max-w-4xl mx-auto mb-10 bg-linear-to-br from-gray-50 to-blue-50/50 rounded-3xl p-6 md:p-8 border-2 border-gray-200 shadow-sm text-left">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-8 bg-gray-300"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
              What&apos;s on this page
            </span>
            <div className="h-px w-8 bg-gray-300"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Why your profile matters", desc: "The local search opportunity", icon: MapPin, href: "#why" },
              { label: "How we optimize", desc: "Our 3-part approach", icon: Star, href: "#how-we-optimize" },
              { label: "Real results & stats", desc: "Proven outcomes", icon: TrendingUp, href: "#results" },
              { label: "Our process", desc: "From audit to ranking", icon: Clock, href: "#process" },
              { label: "Setup guide", desc: "Do it yourself in 30 min", icon: CheckCircle, href: "#setup-guide" },
              { label: "Get a free audit", desc: "See where you stand", icon: Zap, href: "#audit" }
            ].map((topic, index) => {
              const Icon = topic.icon;
              return (
                <Link
                  key={index}
                  href={topic.href}
                  className="group flex items-center gap-4 bg-white rounded-2xl p-4 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <div className="shrink-0 w-11 h-11 bg-linear-to-br from-blue-50 to-indigo-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {topic.label}
                    </div>
                    <div className="text-sm text-gray-500 truncate">{topic.desc}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 shrink-0 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Why It Matters */}
      <div id="why" className="mb-16 scroll-mt-24 bg-linear-to-br from-orange-50 to-red-50 rounded-3xl p-8 md:p-12 border-2 border-orange-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            Why Your Google Profile Matters More Than Your Website
          </h2>
          
          <div className="bg-white rounded-2xl p-8 mb-8 border-2 border-orange-200 shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0 w-16 h-16 bg-orange-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold">
                80%
              </div>
              <div>
                <p className="text-xl text-gray-800 leading-relaxed">
                  For local service businesses, <strong className="text-orange-600">80% of customer interactions</strong> happen directly on Google Search results pages.
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Customers look at your reviews, photos, and location <strong>without ever clicking through to your website</strong>.
            </p>
          </div>

          <div className="bg-linear-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white text-center">
            <p className="text-2xl font-bold mb-3">
              An unoptimized profile is a leaky bucket.
            </p>
            <p className="text-xl opacity-90">
              We fix the leaks and turn your Google Business Profile into a consistent lead generation source.
            </p>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div id="how-we-optimize" className="mb-16 scroll-mt-24">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          How We Optimize Your Profile
        </h2>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Our proven system gets you ranking higher and converting more local searches into customers
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const colors = colorClasses[benefit.color as keyof typeof colorClasses];
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all"
              >
                <div className={`w-16 h-16 ${colors.icon} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div id="results" className="mb-16 scroll-mt-24 bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Real Results for Local Businesses
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-5xl font-bold mb-2">{feature.stat}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-blue-100">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* How It Works */}
      <div id="process" className="mb-16 scroll-mt-24">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Our Optimization Process
        </h2>
        <p className="text-xl text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          From audit to ongoing optimization, we handle everything to keep you ranking #1 locally
        </p>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-6">
                <div className="shrink-0 w-16 h-16 bg-linear-to-br from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                  {step.number}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison */}
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Before vs. After Optimization
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Before */}
          <div className="bg-linear-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-red-200">
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-2 bg-red-600 text-white font-bold rounded-lg mb-4">
                ❌ Before
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Unoptimized Profile
              </h3>
            </div>
            <ul className="space-y-4">
              {[
                "Inconsistent business information",
                "Few or no customer reviews",
                "Incomplete service listings",
                "No regular posts or updates",
                "Poor photo quality or missing images",
                "Not showing in local search results",
                "Low customer engagement",
                "Missing important attributes"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <span className="text-red-600 font-bold shrink-0">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-2 bg-green-600 text-white font-bold rounded-lg mb-4">
                ✓ After
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Fully Optimized Profile
              </h3>
            </div>
            <ul className="space-y-4">
              {[
                "Complete, accurate business details",
                "50+ 5-star reviews with responses",
                "Detailed service descriptions",
                "Weekly engaging posts and offers",
                "Professional high-quality photos",
                "Ranking in top 3 local results",
                "Daily customer calls and messages",
                "All relevant attributes filled"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* DIY Quick Guide */}
      <div id="setup-guide" className="mb-16 scroll-mt-24 bg-white rounded-3xl p-8 md:p-12 border-2 border-gray-200 shadow-sm">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How to Set Up Your Google Business Profile
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Want to get started yourself? Follow these steps to claim and optimize your profile in under 30 minutes.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              title: "Create or claim your profile",
              description: "Sign in at business.google.com and search your business name. If it appears, claim it — otherwise add it as a new listing.",
              link: { href: "https://business.google.com/", label: "Open Google Business Profile" }
            },
            {
              title: "Choose the right category & enter your details",
              description: "Pick your most accurate primary category — it drives when you show up. Add your exact name, phone, and website to match your other listings.",
            },
            {
              title: "Set your location or service area",
              description: "Add your address and map pin if customers visit you, or define a service area (up to 20 cities or zip codes) if you travel to them.",
            },
            {
              title: "Verify your business",
              description: "Confirm you're the owner — usually a short verification video of your signage and location, or a code by postcard, phone, or email.",
            },
            {
              title: "Complete every field & add photos",
              description: "Fill in hours, services, and a clear description, then upload a logo, cover, and at least 5 quality photos. Complete profiles earn more trust.",
            },
            {
              title: "Collect & respond to reviews",
              description: "Share your review link with happy customers and reply to every review. Reviews are one of the strongest local ranking signals.",
            },
            {
              title: "Post regularly & keep it current",
              description: "Publish weekly updates and keep your info accurate. Google rewards fresh, active profiles — ongoing activity is what drives visibility.",
            }
          ].map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-5 p-6 bg-gray-50 rounded-2xl border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50/40 transition-all"
            >
              <div className="shrink-0 w-12 h-12 bg-linear-to-br from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-md">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  {step.description}
                </p>
                {step.link && (
                  <a
                    href={step.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-600 font-semibold hover:gap-2.5 transition-all"
                  >
                    {step.link.label}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-8 flex items-start gap-3 p-5 bg-blue-50 rounded-xl border-2 border-blue-200">
          <Zap className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-gray-700">
            <strong className="text-gray-900">Short on time?</strong> We handle all of this for you — from verification to ongoing posts and review management. Request a free audit below to get started.
          </p>
        </div>
      </div>

      {/* Free Audit CTA */}
      <div id="audit" className="scroll-mt-24 bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-4 md:p-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-4xl mb-4">🎯</div>
          <h2 className="text-3xl font-bold mb-3">
            Get Your Free Profile Audit
          </h2>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Find out exactly what&apos;s holding your Google Business Profile back — and how to fix it.
          </p>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-4 mb-6 text-left">
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "Complete profile health score",
                "Missing optimization opportunities",
                "Competitor comparison analysis",
                "Custom action plan for improvement"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2.5">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg hover:-translate-y-0.5"
          >
            <Zap className="w-5 h-5" />
            Request Your Free Audit
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      </div>
    </div>
  );
}