"use client";

import { useEffect, useRef, useState } from "react";
import {
  Code2, Search, MapPin, Server, Globe, Smartphone, Headphones,
  ArrowUpRight, Check, Gauge, Layers, Wallet, Activity, type LucideIcon,
} from "lucide-react";

interface Highlight {
  icon: LucideIcon;
  variant: "brand" | "dark";
  title: string;
  desc: string;
  points: string[];
  tool?: string;
}

interface Cell {
  icon: LucideIcon;
  title: string;
  desc: string;
  tool?: string;
}

interface Stat {
  icon: LucideIcon;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const highlights: Highlight[] = [
  {
    icon: Code2,
    variant: "brand",
    title: "Custom-coded development",
    desc: "Hand-written, responsive sites — no page-builder bloat, no template lock-in. Just clean code that loads fast and ranks well.",
    points: ["Code you fully own", "Lightning-fast performance", "Built to your exact brand"],
    tool: "HTML · CSS · JS",
  },
  {
    icon: Headphones,
    variant: "dark",
    title: "Ongoing support",
    desc: "You're never on your own after launch. We keep your site fresh, monitor performance, and are one message away when you need us.",
    points: ["Active Discord community", "Analytics & reporting", "Continuous improvements"],
    tool: "Discord",
  },
];

const cells: Cell[] = [
  { icon: Search, title: "SEO services", desc: "On-page tuning so customers find you." },
  { icon: MapPin, title: "Google Business Profile", desc: "Own the local map pack.", tool: "Google" },
  { icon: Server, title: "Hosting", desc: "SSL and 99.9% uptime.", tool: "Netlify" },
  { icon: Globe, title: "Domains", desc: "Registration and DNS setup.", tool: "Namecheap" },
  { icon: Smartphone, title: "Mobile first", desc: "Fast on every screen." },
];

const stats: Stat[] = [
  { icon: Gauge, value: 100, suffix: "/100", label: "Lighthouse score" },
  { icon: Layers, value: 2, label: "Frameworks included" },
  { icon: Wallet, value: 0, prefix: "$", suffix: "/mo", label: "Subscription fees" },
  { icon: Activity, value: 99.9, decimals: 1, suffix: "%", label: "Hosting uptime" },
];

// Counts a stat up from 0 the first time it scrolls into view (once).
// Falls back to the final value immediately when reduced motion is preferred.
function useCountUp(target: number, duration = 1600) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Defer setting state to avoid synchronous setState inside effect
      const id = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(id);
    }

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
          setValue(target * eased);
          if (progress < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return { value, ref };
}

const StatItem = ({ stat }: { stat: Stat }) => {
  const Icon = stat.icon;
  const { value, ref } = useCountUp(stat.value);

  return (
    <div
      ref={ref}
      className="group flex flex-col items-center text-center lg:border-l lg:border-white/10 lg:first:border-l-0"
    >
      <span className="mb-3.5 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#7cb5db] ring-1 ring-white/10 backdrop-blur transition-colors group-hover:bg-[#4588ba]/25 group-hover:text-white">
        <Icon className="h-5 w-5" />
      </span>
      <dt className="bg-linear-to-r from-white to-slate-300 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent tabular-nums sm:text-4xl">
        {stat.prefix}
        {value.toFixed(stat.decimals ?? 0)}
        {stat.suffix}
      </dt>
      <dd className="mt-1.5 text-xs font-medium text-slate-400 sm:text-sm">{stat.label}</dd>
    </div>
  );
};

const HighlightCard = ({ item }: { item: Highlight }) => {
  const Icon = item.icon;
  const isBrand = item.variant === "brand";

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 text-white shadow-lg ${
        isBrand
          ? "bg-linear-to-br from-[#4588ba] to-[#316994] shadow-[#4588ba]/25"
          : "bg-linear-to-br from-slate-900 to-slate-800 shadow-slate-900/25"
      }`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl ${
          isBrand ? "bg-white/10" : "bg-[#4588ba]/25"
        }`}
      />
      <div className="relative">
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl backdrop-blur ${isBrand ? "bg-white/15" : "bg-white/10 ring-1 ring-white/10"}`}>
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
        <p className={`mt-2 max-w-md text-sm leading-relaxed ${isBrand ? "text-white/85" : "text-slate-300"}`}>
          {item.desc}
        </p>
      </div>

      <ul className="relative mt-5 space-y-2">
        {item.points.map((point) => (
          <li key={point} className="flex items-center gap-2.5 text-sm">
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${isBrand ? "bg-white/20" : "bg-[#4588ba]/25 text-[#7cb5db]"}`}>
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className={isBrand ? "text-white/90" : "text-slate-200"}>{point}</span>
          </li>
        ))}
      </ul>

      {item.tool && (
        <span className="relative mt-6 inline-block w-fit rounded-lg bg-white/15 px-3 py-1 font-mono text-xs backdrop-blur">
          {item.tool}
        </span>
      )}
    </article>
  );
};

const FeatureCard = ({ cell }: { cell: Cell }) => {
  const Icon = cell.icon;

  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#4588ba]/40 hover:shadow-lg hover:shadow-[#4588ba]/10">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-linear-to-r from-transparent via-[#4588ba] to-transparent transition-transform duration-300 group-hover:scale-x-100" />
      <div className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4588ba]/10 text-[#316994] transition-colors group-hover:bg-[#4588ba] group-hover:text-white">
          <Icon className="h-5 w-5" />
        </span>
        <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#4588ba]" />
      </div>
      <h3 className="mt-4 text-sm font-bold text-slate-900">{cell.title}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{cell.desc}</p>
      {cell.tool && (
        <span className="mt-3 inline-block w-fit rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600">
          {cell.tool}
        </span>
      )}
    </div>
  );
};

const Features = () => {
  return (
    <section id="features" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#4588ba]/20 bg-[#4588ba]/10 px-3.5 py-1.5 text-sm font-semibold text-[#316994]">
            Everything included
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Custom-coded and fully supported — launch faster, earn sooner
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Two things set us apart: sites built by hand, and a team that stays with you after
            launch. Everything else you need comes bundled in.
          </p>
        </div>

        {/* Two hero pillars: what we're really selling */}
        <div className="mt-12 grid gap-3.5 lg:grid-cols-2">
          {highlights.map((item) => (
            <HighlightCard key={item.title} item={item} />
          ))}
        </div>

        {/* Supporting essentials */}
        <div className="mt-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
          {cells.map((cell) => (
            <FeatureCard key={cell.title} cell={cell} />
          ))}
        </div>

        {/* Stats band — the numbers that back up the features above */}
        <div className="relative mt-3.5 overflow-hidden rounded-2xl bg-linear-to-br from-slate-900 to-slate-800 px-6 py-10 shadow-lg sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#4588ba]/60 to-transparent" />
          <div aria-hidden className="pointer-events-none absolute -left-20 top-0 h-60 w-60 rounded-full bg-[#4588ba]/30 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -right-16 bottom-0 h-52 w-52 rounded-full bg-[#316994]/20 blur-3xl" />

          <dl className="relative grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4">
            {stats.map((s) => (
              <StatItem key={s.label} stat={s} />
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Features;
