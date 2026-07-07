"use client";

import { useState } from "react";
import {
  Code2, Globe, Server, Smartphone, Search, MapPin, Plus, Check,
  type LucideIcon,
} from "lucide-react";

type FeatureKey =
  | "development" | "domains" | "hosting" | "mobile" | "seo" | "google" | "more";

interface FeatureContent {
  title: string;
  icon: LucideIcon;
  label: string;
  blurb: string;
  items: string[];
  tools?: string;
}

const features: Record<FeatureKey, FeatureContent> = {
  development: {
    title: "Development",
    icon: Code2,
    label: "Development",
    blurb: "Hand-crafted, future-proof code — no bloat, no lock-in.",
    items: [
      "Custom-coded websites tailored to your needs",
      "Modern, responsive design that works everywhere",
      "Clean, maintainable code built to last",
    ],
    tools: "HTML + CSS + JS",
  },
  domains: {
    title: "Domains",
    icon: Globe,
    label: "Domains",
    blurb: "From idea to registered domain without the guesswork.",
    items: [
      "Help finding the perfect domain name",
      "Domain registration and setup",
      "DNS configuration and management",
    ],
    tools: "Namecheap",
  },
  hosting: {
    title: "Hosting",
    icon: Server,
    label: "Hosting",
    blurb: "Fast, secure hosting with zero maintenance overhead.",
    items: [
      "Fast, reliable hosting solutions",
      "SSL certificates included",
      "99.9% uptime guarantee",
    ],
    tools: "Netlify",
  },
  mobile: {
    title: "Mobile First",
    icon: Smartphone,
    label: "Mobile",
    blurb: "Designed for thumbs first, desktops second.",
    items: [
      "Optimized for mobile devices",
      "Touch-friendly interfaces",
      "Fast loading on all connections",
    ],
  },
  seo: {
    title: "SEO Services",
    icon: Search,
    label: "SEO",
    blurb: "Get found by the customers already searching for you.",
    items: [
      "Search engine optimization",
      "Keyword research and strategy",
      "Performance optimization",
    ],
  },
  google: {
    title: "Google Business Profile",
    icon: MapPin,
    label: "Google",
    blurb: "Own the local map pack and turn searches into visits.",
    items: [
      "Profile setup and optimization",
      "Review management",
      "Local SEO enhancement",
    ],
    tools: "Google Business Profile",
  },
  more: {
    title: "More",
    icon: Plus,
    label: "More",
    blurb: "Ongoing support so your site keeps getting better.",
    items: [
      "Ongoing maintenance and support via our Discord group",
      "Analytics and reporting",
      "Content updates and improvements",
    ],
    tools: "Discord",
  },
};

const order: FeatureKey[] = [
  "development", "domains", "hosting", "mobile", "seo", "google", "more",
];

const Features = () => {
  const [activeTab, setActiveTab] = useState<FeatureKey>("development");
  const active = features[activeTab];
  const ActiveIcon = active.icon;

  return (
    <section id="features" className="bg-slate-50 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#4588ba]/10 px-3.5 py-1.5 text-sm font-semibold text-[#316994]">
            Everything included
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Boost your business instantly — launch faster, earn sooner
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Custom websites that convert, delivered without the headaches. Skip the
            DIY builders and generic templates — we handle the code, design, and
            technical complexity so you can launch with confidence.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {order.map((key) => {
            const tab = features[key];
            const TabIcon = tab.icon;
            const isActive = key === activeTab;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-linear-to-br from-[#4588ba] to-[#316994] text-white shadow-md shadow-[#4588ba]/25"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
                }`}
              >
                <TabIcon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div key={activeTab} className="flex flex-col gap-8 md:flex-row md:items-start">
            <div className="flex items-start gap-4 md:w-1/3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[#4588ba] to-[#316994] text-white shadow-sm">
                <ActiveIcon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{active.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">{active.blurb}</p>
                {active.tools && (
                  <span className="mt-3 inline-block rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-xs text-slate-600">
                    {active.tools}
                  </span>
                )}
              </div>
            </div>

            <ul className="grid flex-1 gap-3 sm:grid-cols-1">
              {active.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
