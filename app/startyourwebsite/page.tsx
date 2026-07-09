
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Star, Zap, ShieldCheck, Rocket, Wrench } from "lucide-react";
import { BiSupport } from "react-icons/bi";
import { FRAMEWORKS, FRAMEWORK_ORDER, type FrameworkKey } from "@/components/ui/frameworks-data";

// Two ways to launch: we build it from the owner's prompts, or they build it
// themselves from a kit. "forme" is the default — the primary audience is
// non-technical business owners.
type Mode = "forme" | "diy";

const MODES: { key: Mode; label: string; icon: typeof Sparkles;}[] = [
  { key: "forme", label: "Build it for me", icon: Rocket },
  { key: "diy", label: "I'll build it myself", icon: Wrench},
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
  { src: "", alt: "Marcus"  },
  { src: "", alt: "Aisha"  },
  { src: "", alt: "Diego"  },
  { src: "", alt: "Priya"  },
];

const Startyourwebsite = () => {
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
    <section
      id="hero"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-slate-50 to-white px-6 py-24"
    >
      {/* Soft decorative glows */}
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-144 w-xl -translate-x-1/2 rounded-full bg-[#4588ba]/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 right-0 -z-10 h-96 w-96 translate-x-1/3 rounded-full bg-[#316994]/10 blur-3xl" />

      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-2 rounded-full border border-[#4588ba]/20 bg-[#4588ba]/5 px-4 py-1.5 text-sm font-medium text-[#316994]">
          <Sparkles className="h-4 w-4" />
          Your website, live in hours
        </span>

        {/* Title */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Start your website,{" "}
            <span className="bg-linear-to-br from-[#4588ba] to-[#316994] bg-clip-text text-transparent">
              built your way
            </span>
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-slate-600">
            Answer a few simple questions and we&apos;ll build it for you — or start from a
            complete kit and build it yourself. Either way, you own real, fast code.
          </p>
        </div>

        {/* Mode toggle: we build it, or you build it */}
        <div className="flex flex-col items-center gap-3">
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
            <div className="inline-flex flex-wrap justify-center rounded-full border border-slate-200 bg-white shadow-sm">
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

        {/* Prompt / terminal mock — reflects the active mode and types itself out */}
        <div className="w-full max-w-xl">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-300/40">
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-2 text-xs font-medium text-slate-400">
                {mode === "forme" ? "Describe your business" : `${active.name} · terminal`}
              </span>
            </div>
            <div className="flex items-start gap-3 px-5 py-6 text-left">
              {mode === "forme" ? (
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#4588ba]" />
              ) : (
                <span className="mt-px font-mono text-[#4588ba]">$</span>
              )}
              <p className={`leading-relaxed text-slate-700 ${mode === "diy" ? "font-mono text-sm" : "text-base"}`}>
                {typed}
                <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-[#4588ba] align-middle" />
              </p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href={mode === "diy" ? active.docs : "/forme"}
            className="inline-flex items-center gap-2 rounded-full bg-linear-to-br from-[#4588ba] to-[#316994] px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#4588ba]/30 transition-all hover:shadow-xl hover:shadow-[#4588ba]/40"
          >
            {mode === "forme" ? "Build it for me" : "Get Started"}
          </Link>
          {mode === "diy" ?  (
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

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {trust.map(({ icon: Icon, label }) => (
            <div key={label} className="inline-flex items-center gap-2 text-sm font-medium text-slate-600">
              <Icon className="h-4 w-4 text-[#4588ba]" />
              {label}
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {avatars.map((a, i) => (
              <span
                key={i}
                className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-linear-to-br from-[#4588ba] to-[#316994] text-[10px] font-semibold text-white shadow-sm"
              >
                {a.src ? (
                  <Image src={a.src} alt={a.alt} width={36} height={36} className="h-full w-full object-cover" />
                ) : (
                  a.alt.charAt(0)
                )}
              </span>
            ))}
          </div>
          <div className="flex flex-col items-start">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-slate-500">Trusted by 100+ local businesses</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Startyourwebsite;
