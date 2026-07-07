"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Star, Zap, ShieldCheck } from "lucide-react";
import { BRAND_GRADIENT, BRAND_TEXT, AnimatedAurora, GridBackdrop } from "./_ui";
import { CountUp, Magnetic, Tilt } from "./motion";
import { FRAMEWORKS, FRAMEWORK_ORDER, type FrameworkKey } from "./frameworks-data";

const trust = [
  { icon: Zap, label: "Live in hours" },
  { icon: ShieldCheck, label: "No subscriptions" },
  { icon: Star, label: "SEO included" },
];

const Hero = () => {
  const [fw, setFw] = useState<FrameworkKey>("eleventy");
  const [typed, setTyped] = useState("");
  const active = FRAMEWORKS[fw];

  useEffect(() => {
    setTyped("");
    let i = 0;
    const cmd = active.command;
    const id = setInterval(() => {
      i += 1;
      setTyped(cmd.slice(0, i));
      if (i >= cmd.length) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [active.command]);

  return (
    <section id="hero" className="relative overflow-hidden bg-linear-to-b from-slate-50 to-white px-6 py-16 lg:py-24">
      <AnimatedAurora />
      <GridBackdrop />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-16 lg:flex-row lg:gap-20">
        {/* Left */}
        <div className="flex flex-col items-center gap-7 text-center lg:items-start lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#4588ba]/20 bg-white/70 px-3.5 py-1.5 text-sm font-semibold text-[#316994] shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Boilerplates for Eleventy &amp; Astro
          </span>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[4.25rem]">
            Launch your website in hours,{" "}
            <span className="relative whitespace-nowrap">
              <span className={`relative z-10 ${BRAND_TEXT}`}>not days</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                <path d="M2 9C50 3 150 3 198 9" stroke="#4588ba" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
              </svg>
            </span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-slate-600">
            Everything you need to build, deploy, and rank your business website —
            with Google Business Profile and SEO baked in. Pick the stack you love.
          </p>

          <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            {FRAMEWORK_ORDER.map((key) => {
              const f = FRAMEWORKS[key];
              const Icon = f.icon;
              const isActive = key === fw;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFw(key)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    isActive ? `${BRAND_GRADIENT} text-white shadow` : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {f.name}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Magnetic>
              <Link
                href="#cta"
                className={`inline-flex items-center gap-2 rounded-full ${BRAND_GRADIENT} px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#4588ba]/30 transition-all hover:shadow-xl hover:shadow-[#4588ba]/40`}
              >
                Get Websitero
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Magnetic>
            <Link
              href={active.docs}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
            >
              Read the {active.name} docs
            </Link>
          </div>

          <div className="flex flex-col items-center gap-3 pt-1 sm:flex-row sm:gap-4">
            <div className="flex -space-x-2">
              {["#4588ba", "#316994", "#0ea5e9", "#8b5cf6", "#14b8a6"].map((c) => (
                <span key={c} className="h-8 w-8 rounded-full border-2 border-white shadow-sm" style={{ background: c }} />
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-slate-600">
              <span className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </span>
              <span className="font-medium">Loved by founders &amp; freelancers</span>
            </div>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start">
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <Icon className="h-4 w-4 text-emerald-600" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — tilt browser + terminal mock */}
        <div className="relative w-full max-w-lg lg:w-1/2">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-linear-to-br from-[#4588ba]/25 to-[#8b5cf6]/15 blur-2xl" />

          <Tilt className="relative">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-center text-xs text-slate-400 ring-1 ring-slate-200">
                  yourbusiness.com
                </span>
              </div>

              <div className="space-y-4 p-5">
                <div className={`h-24 rounded-xl ${BRAND_GRADIENT} opacity-90`} />
                <div className="h-3 w-2/3 rounded-full bg-slate-200" />
                <div className="h-3 w-5/6 rounded-full bg-slate-100" />
                <div className="grid grid-cols-3 gap-3 pt-1">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="space-y-2 rounded-lg border border-slate-100 p-3">
                      <div className="h-6 w-6 rounded-md bg-[#4588ba]/15" />
                      <div className="h-2 w-full rounded-full bg-slate-100" />
                      <div className="h-2 w-3/4 rounded-full bg-slate-100" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Tilt>

          <div className="absolute -bottom-6 -left-4 right-8 rounded-xl bg-slate-900 p-4 font-mono text-xs text-slate-100 shadow-xl ring-1 ring-white/10">
            <div className="flex items-center gap-2 text-slate-200">
              <span style={{ color: active.accent }}>❯</span>
              <span className="truncate">{typed}</span>
              <span className="inline-block h-3.5 w-1.5 animate-pulse bg-slate-300" />
            </div>
          </div>

          <div className="absolute -right-4 -top-4 hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:flex">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-emerald-500 text-sm font-bold text-emerald-700">
              <CountUp to={100} />
            </span>
            <div className="text-left">
              <p className="text-sm font-bold leading-none text-slate-900">Lighthouse</p>
              <p className="text-xs text-slate-500">across the board</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
