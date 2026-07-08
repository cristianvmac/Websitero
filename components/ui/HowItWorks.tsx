"use client";

import { useEffect, useState } from "react";
import {
  MessageSquareText,
  Wand2,
  Rocket,
  Star,
  MapPin,
  Package,
  Paintbrush,
  Sparkles,
  Wrench,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";
import { FRAMEWORKS } from "./frameworks-data";

// Two ways to launch: we build it from the owner's prompts ("forme", default)
// or they build it themselves from a kit ("diy"). Mirrors the Hero toggle.
type Mode = "forme" | "diy";

interface Step {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const STEPS: Record<Mode, Step[]> = {
  forme: [
    {
      icon: MessageSquareText,
      title: "Tell us about your business",
      desc: "Answer a few guided prompts — your name, what you do, the style you like. No tech skills needed.",
    },
    {
      icon: Wand2,
      title: "We build it for you",
      desc: "We hand-code your website and set up your Google Business Profile and SEO — done for you.",
    },
    {
      icon: Rocket,
      title: "You're live",
      desc: "Go live in hours and start showing up when local customers search on Google.",
    },
  ],
  diy: [
    {
      icon: Package,
      title: "Start with a complete kit",
      desc: "Pick Eleventy or Astro and get a full, hand-coded website from the first minute — no blank page.",
    },
    {
      icon: Paintbrush,
      title: "Make it yours",
      desc: "Swap copy, colors, and images with step-by-step docs — and 24/7 experts one message away.",
    },
    {
      icon: Rocket,
      title: "You're live",
      desc: "Deploy for free, connect your domain, and rank with SEO and your Google Business Profile ready.",
    },
  ],
};

const MODES: { key: Mode; label: string; icon: LucideIcon }[] = [
  { key: "forme", label: "We build it for you", icon: Sparkles },
  { key: "diy", label: "I'll build it myself", icon: Wrench },
];

// The demo is a self-playing "screen capture" built in code: it loops through
// the three steps of the selected mode, so it needs no real product footage.
// Drop in a real muted screen recording later by replacing the demo frame
// with a <video>. Both modes share the same final "live" screen on purpose:
// either path ends at the same result.
const PHASE_MS = 3200;
const BUSINESS = "Bella's Bakery";
const DIY_COMMAND = FRAMEWORKS.eleventy.command;

const HowItWorks = () => {
  const [mode, setMode] = useState<Mode>("forme");
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState("");
  const steps = STEPS[mode];

  const switchMode = (m: Mode) => {
    if (m === mode) return;
    setMode(m);
    setPhase(0); // restart the story from step 1
  };

  // Advance through the three phases on a loop (restarts on mode switch).
  // Respect reduced-motion by parking on the finished "live" state instead.
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const t = setTimeout(() => setPhase(2), 0);
      return () => clearTimeout(t);
    }
    const id = setInterval(() => setPhase((p) => (p + 1) % 3), PHASE_MS);
    return () => clearInterval(id);
  }, [mode]);

  // Phase 0 typing: the business name (forme) or the start command (diy).
  // The first interval tick writes "" (so there's no in-body setState), then
  // it fills in char by char. Later phases hide the input, so the last value
  // can safely stay in place.
  useEffect(() => {
    if (phase !== 0) return;
    const target = mode === "forme" ? BUSINESS : DIY_COMMAND;
    const speed = mode === "forme" ? 90 : 40;
    let i = 0;
    const id = setInterval(() => {
      setTyped(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(id);
      } else {
        i += 1;
      }
    }, speed);
    return () => clearInterval(id);
  }, [phase, mode]);

  // Cross-fade helper for the absolutely-stacked demo screens.
  const vis = (on: boolean) =>
    `absolute inset-0 transition-opacity duration-500 ${
      on ? "opacity-100" : "pointer-events-none opacity-0"
    }`;

  return (
    <section id="how-it-works" className="relative overflow-hidden bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#4588ba]/20 bg-[#4588ba]/10 px-3.5 py-1.5 text-sm font-semibold text-[#316994]">
            How it works
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Two ways to get your website live
          </h2>
          <p className="mx-auto mt-4 text-lg leading-relaxed text-slate-600">
            Answer a few prompts and we build it for you — or start from a complete kit and do it
            yourself. Either way, you get a real hand-coded website with Google Business Profile,
            SEO, and 24/7 expert support.
          </p>
        </div>

        {/* Mode toggle */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            {MODES.map(({ key, label, icon: Icon }) => {
              const isActive = key === mode;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => switchMode(key)}
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
        </div>

        {/* Steps (highlight in sync with the demo) + self-playing demo */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Steps */}
          <ol className="space-y-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = idx === phase;
              return (
                <li
                  key={`${mode}-${step.title}`}
                  className={`flex gap-4 rounded-2xl border p-5 transition-all duration-500 ${
                    isActive
                      ? "border-[#4588ba]/30 bg-[#4588ba]/[0.06] shadow-sm"
                      : "border-transparent"
                  }`}
                >
                  <span
                    className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-500 ${
                      isActive
                        ? "bg-linear-to-br from-[#4588ba] to-[#316994] text-white shadow-lg shadow-[#4588ba]/30"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-xs font-bold text-white">
                      {idx + 1}
                    </span>
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Self-playing demo */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-linear-to-br from-[#4588ba]/20 to-[#8b5cf6]/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-center text-xs text-slate-400 ring-1 ring-slate-200">
                  {phase === 2
                    ? "bellasbakery.com"
                    : mode === "forme"
                      ? "get.websitero.com"
                      : "preview.websitero.com"}
                </span>
              </div>

              {/* Stage — fixed height so phases cross-fade cleanly */}
              <div className="relative h-[320px] bg-slate-50/40">
                {/* forme phase 0 — guided prompts */}
                <div className={`${vis(mode === "forme" && phase === 0)} p-6`}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Quick setup
                  </p>
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="text-xs font-medium text-slate-500">Business name</label>
                      <div className="mt-1 flex items-center rounded-lg border border-[#4588ba]/40 bg-white px-3 py-2.5 text-sm text-slate-800 ring-2 ring-[#4588ba]/10">
                        {mode === "forme" ? typed : BUSINESS}
                        <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-[#4588ba]" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-slate-500">Type</label>
                        <div className="mt-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-500">
                          Bakery
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-500">Location</label>
                        <div className="mt-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-500">
                          Austin, TX
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-hidden
                      className="mt-1 w-full rounded-lg bg-linear-to-br from-[#4588ba] to-[#316994] py-2.5 text-sm font-semibold text-white shadow"
                    >
                      Build it for me
                    </button>
                  </div>
                </div>

                {/* diy phase 0 — your kit, one command */}
                <div className={`${vis(mode === "diy" && phase === 0)} p-6`}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Your kit, one command
                  </p>
                  <div className="mt-4 rounded-xl bg-slate-900 p-4 font-mono text-[11px] text-slate-100 shadow-inner">
                    <div className="flex items-center gap-2">
                      <span className="text-sky-400">❯</span>
                      <span className="truncate">{mode === "diy" ? typed : DIY_COMMAND}</span>
                      <span className="inline-block h-3 w-1 animate-pulse bg-slate-300" />
                    </div>
                    <p className="mt-3 text-emerald-400">✓ Complete website copied</p>
                    <p className="mt-1 text-slate-400">✓ SEO and Google Profile included</p>
                  </div>
                  <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold text-slate-800">Step-by-step docs</p>
                    <div className="mt-2.5 space-y-2">
                      <div className="h-2 w-5/6 rounded-full bg-slate-100" />
                      <div className="h-2 w-2/3 rounded-full bg-slate-100" />
                    </div>
                  </div>
                </div>

                {/* forme phase 1 — we build it */}
                <div
                  className={`${vis(mode === "forme" && phase === 1)} flex flex-col items-center justify-center gap-4 p-6`}
                >
                  <span className="h-11 w-11 animate-spin rounded-full border-[3px] border-slate-200 border-t-[#4588ba]" />
                  <p className="text-sm font-semibold text-slate-700">Building your website…</p>
                  <div className="w-full max-w-xs space-y-2">
                    <div className="h-2.5 w-5/6 animate-pulse rounded-full bg-slate-200" />
                    <div className="h-2.5 w-full animate-pulse rounded-full bg-slate-200" />
                    <div className="h-2.5 w-2/3 animate-pulse rounded-full bg-slate-200" />
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 pt-1">
                    {["Pages", "Google Profile", "SEO"].map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-[#4588ba]/20 bg-[#4588ba]/10 px-2.5 py-1 text-[11px] font-medium text-[#316994]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                {/* diy phase 1 — make it yours, with support on standby */}
                <div className={`${vis(mode === "diy" && phase === 1)} p-6`}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Make it yours
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="flex h-16 items-center justify-center rounded-xl bg-linear-to-br from-[#4588ba] to-[#316994] text-sm font-bold text-white">
                      {BUSINESS}
                    </div>
                    <div className="h-2.5 w-2/3 rounded-full bg-slate-200" />
                    <div className="h-2.5 w-5/6 rounded-full bg-slate-100" />
                    <div className="flex items-center gap-2.5 pt-1">
                      <span className="text-[11px] font-medium text-slate-500">Brand color</span>
                      {["#4588ba", "#e11d48", "#059669", "#f59e0b"].map((c, i) => (
                        <span
                          key={c}
                          className={`h-5 w-5 rounded-full ${
                            i === 0 ? "ring-2 ring-[#4588ba] ring-offset-2" : ""
                          }`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 w-52 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                    <div className="flex items-center gap-2">
                      <MessagesSquare className="h-4 w-4 text-[#4588ba]" />
                      <p className="text-xs font-semibold text-slate-800">Expert support</p>
                      <span className="ml-auto h-2 w-2 rounded-full bg-emerald-500" />
                    </div>
                    <p className="mt-1.5 text-[11px] leading-snug text-slate-500">
                      Stuck on a step? Real experts answer 24/7.
                    </p>
                  </div>
                </div>

                {/* phase 2 (both modes) — live site + Google Business Profile */}
                <div className={`${vis(phase === 2)} p-5`}>
                  {/* Live badge */}
                  <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                    Live
                  </div>

                  {/* Site mock */}
                  <div className="space-y-3">
                    <div className="flex h-20 items-center justify-center rounded-xl bg-linear-to-br from-[#4588ba] to-[#316994] text-base font-bold text-white shadow-inner">
                      {BUSINESS}
                    </div>
                    <div className="h-2.5 w-2/3 rounded-full bg-slate-200" />
                    <div className="h-2.5 w-5/6 rounded-full bg-slate-100" />
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="space-y-1.5 rounded-lg border border-slate-100 p-2.5">
                          <div className="h-5 w-5 rounded-md bg-[#4588ba]/15" />
                          <div className="h-1.5 w-full rounded-full bg-slate-100" />
                          <div className="h-1.5 w-3/4 rounded-full bg-slate-100" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Google Business Profile card */}
                  <div className="absolute bottom-4 right-4 w-48 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full text-[12px] font-bold ring-1 ring-slate-200">
                        <span className="bg-linear-to-br from-[#4588ba] to-[#316994] bg-clip-text text-transparent">
                          G
                        </span>
                      </span>
                      <span className="truncate text-xs font-semibold text-slate-800">{BUSINESS}</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-1">
                      <span className="flex">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                        ))}
                      </span>
                      <span className="text-[10px] text-slate-500">128 reviews</span>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-500">
                      <MapPin className="h-3 w-3" />
                      Austin, TX · Open now
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase indicator — signals the demo auto-plays */}
            <div aria-hidden className="mt-5 flex justify-center gap-2">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === phase ? "w-6 bg-[#4588ba]" : "w-1.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
