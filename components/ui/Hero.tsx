"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Star, Zap, ShieldCheck, Wrench, CheckCircle2, BookOpen } from "lucide-react";
import { BiSupport } from "react-icons/bi";
import { FRAMEWORKS, FRAMEWORK_ORDER, type FrameworkKey } from "./frameworks-data";

// Two ways to launch: we build it from the owner's prompts, or they build it
// themselves from a kit. "forme" is the default — the primary audience is
// non-technical business owners.
type Mode = "forme" | "diy";

const MODES: { key: Mode; label: string; icon: typeof Sparkles }[] = [
  { key: "forme", label: "Build it for me", icon: Sparkles },
  { key: "diy", label: "I'll build it myself", icon: Wrench },
];

// Plain-English prompt typed in "build it for me" mode (same business as the
// HowItWorks demo). DIY mode types the framework's real start command instead.
const PROMPT = "A cozy bakery in Austin with a menu, photos, and online orders";

const trust = [
  { icon: Zap, label: "Live in hours" },
  { icon: ShieldCheck, label: "Real code you own" },
  { icon: BiSupport, label: "24/7 expert support" },
];

// Social-proof avatars. Drop real image paths into `src` when you have them;
// entries without a `src` render a soft gradient placeholder in the meantime.
const avatars: { src?: string; alt: string }[] = [
  { src: "", alt: "Jane"  },
  { src: "", alt: "Jane"  },
  { src: "", alt: "Jane"  },
  { src: "", alt: "Jane"  },
  { src: "", alt: "Jane"  },
];

const Hero = () => {
  const [mode, setMode] = useState<Mode>("forme");
  const [fw, setFw] = useState<FrameworkKey>("eleventy");
  const [typed, setTyped] = useState("");
  const active = FRAMEWORKS[fw];
  const line = mode === "diy" ? active.command : PROMPT;

  // Type the current line char by char. The first interval tick writes ""
  // (so no setState runs synchronously in the effect body), then it fills in.
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setTyped(line.slice(0, i));
      if (i >= line.length) {
        clearInterval(id);
      } else {
        i += 1;
      }
    }, 40);
    return () => clearInterval(id);
  }, [line]);

  return (
    <section id="hero" className="relative overflow-hidden bg-linear-to-b from-slate-50 to-white px-6 py-16 lg:py-24">
      {/* Slow-drifting aurora blobs (animated via globals keyframes). */}
      {/*<div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="v5-blob-a absolute -top-32 left-[8%] h-80 w-80 rounded-full bg-[#4588ba]/25 blur-3xl" />
        <div className="v5-blob-b absolute top-8 right-[4%] h-72 w-72 rounded-full bg-[#8b5cf6]/18 blur-3xl" />
        <div className="v5-blob-c absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-[#316994]/18 blur-3xl" />
      </div>
*/}
      {/* Subtle dotted-grid backdrop. */}
 {/*     <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(69,136,186,0.10) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />
*/}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-16 lg:flex-row lg:gap-20">
        {/* Left */}
        <div className="flex flex-col items-center gap-7 text-center lg:items-start lg:text-left">
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[4.25rem]">
            Launch your website in hours,{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10 bg-linear-to-r from-[#4588ba] to-[#316994] bg-clip-text text-transparent">not days</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
                <path d="M2 9C50 3 150 3 198 9" stroke="#4588ba" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
              </svg>
            </span>
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-slate-600">
            Real custom-coded websites built with Eleventy or Astro — Google Business
            Profile and SEO baked in, and 24/7 expert support at every step.
          </p>

          {/* Mode toggle: we build it, or you build it */}
          <div className="flex flex-col items-center gap-3 lg:items-start">
            <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
              {MODES.map(({ key, label, icon: Icon }) => {
                const isActive = key === mode;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setMode(key)}
                    aria-pressed={isActive}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-linear-to-br from-[#4588ba] to-[#316994] text-white shadow"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                );
              })}
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600">
              {mode === "forme"
                ? "Answer a few guided prompts — we hand-code your site, Google profile, and SEO for you."
                : "Start from a complete kit with step-by-step docs. Pick the stack you love:"}
            </p>
            {mode === "diy" && (
              <div className="inline-flex rounded-full border border-slate-200 bg-white shadow-sm">
                {FRAMEWORK_ORDER.map((key) => {
                  const f = FRAMEWORKS[key];
                  const isActive = key === fw;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFw(key)}
                      aria-pressed={isActive}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-linear-to-br from-[#4588ba] to-[#316994] text-white shadow"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <Image src={f.icon} alt="" width={16} height={16} className="h-4 w-4" />
                      {f.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-br from-[#4588ba] to-[#316994] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#4588ba]/30 transition-all hover:shadow-xl hover:shadow-[#4588ba]/40"
            >
              {mode === "forme" ? "Build it for me" : "Get Started"}
            </Link>
            {mode === "diy" ? (
              <Link
                href={active.docs}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
              >
                Read the {active.name} docs
              </Link>
            ) : (
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
              >
                See how it works
              </Link>
            )}
          </div>

          <div className="flex flex-col items-center gap-3 pt-1 sm:flex-row sm:gap-4">
            <div className="flex -space-x-3">
              {avatars.map((a, i) => (
                <span
                  key={i}
                  className="relative inline-block h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-linear-to-br from-[#4588ba]/70 to-[#8b5cf6]/70 shadow-sm ring-1 ring-black/5"
                  title={a.alt}
                >
                  {a.src && (
                    <Image src={a.src} alt={a.alt} fill sizes="36px" className="object-cover" />
                  )}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-slate-600">
              <span className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </span>
              <span className="font-medium">Loved by business owners</span>
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

        {/* Right — tilt browser + prompt/terminal mock */}
        <div className="relative w-full max-w-lg lg:w-1/2">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-linear-to-br from-[#4588ba]/25 to-[#8b5cf6]/15 blur-2xl" />
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-center text-xs text-slate-400 ring-1 ring-slate-200">
                  {mode === "diy" ? (fw === "astro" ? "localhost:4321" : "localhost:8080") : "yourbusiness.com"}
                </span>
              </div>

              <div className="space-y-4 p-5">
                <div className="h-24 rounded-xl bg-linear-to-br from-[#4588ba] to-[#316994] opacity-90" />
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
          </div>

          {/* Dark box: your prompt (build-for-me) or your start command (DIY) */}
          <div className="absolute -bottom-6 -left-4 right-8 rounded-xl bg-slate-900 p-4 text-xs text-slate-100 shadow-xl ring-1 ring-white/10">
            <div className={`flex items-center gap-2 text-slate-200 ${mode === "diy" ? "font-mono" : ""}`}>
              {mode === "diy" ? (
                <span style={{ color: active.accent }}>❯</span>
              ) : (
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-sky-400" />
              )}
              <span className="truncate">{typed}</span>
              <span className="inline-block h-3.5 w-1.5 animate-pulse bg-slate-300" />
            </div>
            <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-slate-400">
              {mode === "diy" ? "One command — your kit is ready" : "Your prompt — we handle the rest"}
            </p>
          </div>

          {/* Top-right float — what to expect from the chosen path */}
          {mode === "forme" ? (
            <div className="absolute -right-4 -top-4 hidden w-56 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:block">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Set up for you
              </p>
              <ul className="mt-2 space-y-1.5">
                {["Website", "Google Business Profile", "SEO"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="absolute -right-4 -top-4 hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:flex">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border-4 border-emerald-500 text-sm font-bold text-emerald-700">
                100
              </span>
              <div className="text-left">
                <p className="text-sm font-bold leading-none text-slate-900">Lighthouse</p>
                <p className="text-xs text-slate-500">across the board</p>
              </div>
            </div>
          )}

          {/* DIY only — the docs walk you through it */}
          {mode === "diy" && (
            <div className="absolute -left-4 top-24 hidden w-48 rounded-xl border border-slate-200 bg-white p-3 shadow-xl sm:block">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 shrink-0 text-[#4588ba]" />
                <p className="text-xs font-semibold text-slate-800">Docs guide you</p>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">Step 3 of 8 — Add your content</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[38%] rounded-full bg-linear-to-r from-[#4588ba] to-[#316994]" />
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Hero;
