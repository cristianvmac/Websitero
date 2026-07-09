"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Store,
  ListChecks,
  Paintbrush,
  MessageSquareText,
  Send,
  CheckCircle2,
  ChevronLeft,
  Pencil,
} from "lucide-react";
import {
  type Brief,
  EMPTY_BRIEF,
  BUSINESS_TYPES,
  FEATURES,
  VIBES,
  BRAND_COLORS,
} from "./brief";

/* Websitero "Build it for me" — the guided wizard that turns an owner's
   answers into a structured brief. Mirrors the "Quick setup" demo in
   HowItWorks so the marketing mock matches the real flow. */

const STEPS = [
  { icon: Store, title: "Your business", blurb: "The basics — who you are and where." },
  { icon: ListChecks, title: "What you need", blurb: "Pick everything your website should do." },
  { icon: Paintbrush, title: "Your style", blurb: "Colors and the feel you're going for." },
  { icon: MessageSquareText, title: "Tell us more", blurb: "Describe it in your own words — no tech talk needed." },
  { icon: Send, title: "Review & send", blurb: "Check everything, add your contact, and we get building." },
];

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-shadow focus:border-[#4588ba]/40 focus:ring-2 focus:ring-[#4588ba]/10";

const Forme = () => {
  const [step, setStep] = useState(0);
  const [brief, setBrief] = useState<Brief>(EMPTY_BRIEF);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const patch = (updates: Partial<Brief>) => {
    setBrief((prev) => ({ ...prev, ...updates }));
    setError("");
  };

  const toggleFeature = (key: string) =>
    patch({
      features: brief.features.includes(key)
        ? brief.features.filter((f) => f !== key)
        : [...brief.features, key],
    });

  // Only hard-require what fulfillment can't work without.
  const validate = (s: number): string => {
    if (s === 0) {
      if (!brief.business.name.trim()) return "What's your business called?";
      if (!brief.business.type) return "Pick the closest business type.";
      if (!brief.business.location.trim()) return "Where are you located? City and state is perfect.";
    }
    if (s === 4 && !/^\S+@\S+\.\S+$/.test(brief.contact.email))
      return "We need a valid email to send your preview link.";
    return "";
  };

  const next = () => {
    const msg = validate(step);
    if (msg) return setError(msg);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const submit = async () => {
    const msg = validate(4);
    if (msg) return setError(msg);
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/forme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brief),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setDone(true);
    } catch {
      setError("Something went wrong sending your brief. Please try again.");
    } finally {
      setSending(false);
    }
  };

  // Selection pill shared by type / vibe pickers.
  const pill = (isActive: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
      isActive
        ? "border-transparent bg-linear-to-br from-[#4588ba] to-[#316994] text-white shadow"
        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
    }`;

  if (done) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-linear-to-b from-slate-50 to-white px-6 py-24">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            We&apos;re on it, {brief.business.name}!
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-slate-600">
            Websitero is building your website right now. You&apos;ll get a preview link at{" "}
            <span className="font-semibold text-slate-800">{brief.contact.email}</span> within
            hours.
          </p>
          {/* Same promise as the Hero's "Set up for you" float */}
          <ul className="w-full max-w-xs space-y-2 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm">
            {["Website", "Google Business Profile", "SEO"].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                {item} — set up for you
              </li>
            ))}
          </ul>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
          >
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  const StepIcon = STEPS[step].icon;

  return (
    <section className="min-h-screen bg-linear-to-b from-slate-50 to-white px-6 pb-24 pt-28">
      <div className="mx-auto w-full max-w-2xl">
        {/* Eyebrow */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#4588ba]/20 bg-[#4588ba]/5 px-4 py-1.5 text-sm font-medium text-[#316994]">
            <Sparkles className="h-4 w-4" />
            Build it for me
          </span>
        </div>

        <h1 className="mt-4 text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {STEPS[step].title}
        </h1>
        <p className="mt-2 text-center text-slate-600">{STEPS[step].blurb}</p>

        {/* Progress */}
        <div className="mt-6 flex items-center justify-center gap-2" aria-hidden>
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === step ? "w-8 bg-[#4588ba]" : i < step ? "w-4 bg-[#4588ba]/40" : "w-4 bg-slate-200"
              }`}
            />
          ))}
        </div>
        <p className="mt-2 text-center text-xs font-medium uppercase tracking-wider text-slate-400">
          Step {step + 1} of {STEPS.length}
        </p>

        {/* Card */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/30 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#4588ba] to-[#316994] text-white shadow-lg shadow-[#4588ba]/30">
              <StepIcon className="h-5 w-5" />
            </span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          {/* Step 1 — business basics */}
          {step === 0 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="biz-name" className="text-sm font-medium text-slate-700">
                  Business name
                </label>
                <input
                  id="biz-name"
                  type="text"
                  value={brief.business.name}
                  onChange={(e) => patch({ business: { ...brief.business, name: e.target.value } })}
                  placeholder="Bella's Bakery"
                  className={`mt-1.5 ${inputCls}`}
                />
              </div>
              <div>
                <span className="text-sm font-medium text-slate-700">What kind of business?</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {BUSINESS_TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => patch({ business: { ...brief.business, type: t } })}
                      aria-pressed={t === brief.business.type}
                      className={pill(t === brief.business.type)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="biz-location" className="text-sm font-medium text-slate-700">
                  Location
                </label>
                <input
                  id="biz-location"
                  type="text"
                  value={brief.business.location}
                  onChange={(e) =>
                    patch({ business: { ...brief.business, location: e.target.value } })
                  }
                  placeholder="Austin, TX"
                  className={`mt-1.5 ${inputCls}`}
                />
              </div>
            </div>
          )}

          {/* Step 2 — features (all optional) */}
          {step === 1 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {FEATURES.map(({ key, label }) => {
                const isActive = brief.features.includes(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleFeature(key)}
                    aria-pressed={isActive}
                    className={`flex items-center gap-3 rounded-xl border p-4 text-left text-sm font-semibold transition-all ${
                      isActive
                        ? "border-[#4588ba]/40 bg-[#4588ba]/[0.06] text-slate-900 shadow-sm"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <CheckCircle2
                      className={`h-5 w-5 shrink-0 ${isActive ? "text-emerald-600" : "text-slate-300"}`}
                    />
                    {label}
                  </button>
                );
              })}
              <p className="text-xs text-slate-400 sm:col-span-2">
                Not sure? Skip anything — we&apos;ll suggest what fits your business.
              </p>
            </div>
          )}

          {/* Step 3 — style */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-sm font-medium text-slate-700">Brand color</span>
                <div className="mt-3 flex items-center gap-3">
                  {BRAND_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => patch({ style: { ...brief.style, brandColor: c } })}
                      aria-label={`Brand color ${c}`}
                      aria-pressed={c === brief.style.brandColor}
                      className={`h-9 w-9 rounded-full transition-transform hover:scale-110 ${
                        c === brief.style.brandColor ? "ring-2 ring-slate-900 ring-offset-2" : ""
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-700">The feel you want</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {VIBES.map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => patch({ style: { ...brief.style, vibe: key } })}
                      aria-pressed={key === brief.style.vibe}
                      className={pill(key === brief.style.vibe)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4 — the plain-English prompt */}
          {step === 3 && (
            <div>
              <label htmlFor="prompt" className="text-sm font-medium text-slate-700">
                Describe your dream website
              </label>
              <textarea
                id="prompt"
                value={brief.prompt}
                onChange={(e) => patch({ prompt: e.target.value })}
                rows={5}
                placeholder="A cozy bakery in Austin with a menu, photos, and online orders…"
                className={`mt-1.5 resize-none ${inputCls}`}
              />
              <p className="mt-2 text-xs text-slate-400">
                Anything goes: pages you want, sites you like, what makes you different.
              </p>
            </div>
          )}

          {/* Step 5 — contact + review */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={brief.contact.email}
                    onChange={(e) =>
                      patch({ contact: { ...brief.contact, email: e.target.value } })
                    }
                    placeholder="you@example.com"
                    className={`mt-1.5 ${inputCls}`}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                    Phone <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={brief.contact.phone}
                    onChange={(e) =>
                      patch({ contact: { ...brief.contact, phone: e.target.value } })
                    }
                    placeholder="(512) 555-0134"
                    className={`mt-1.5 ${inputCls}`}
                  />
                </div>
              </div>

              {/* Compact review — each row jumps back to its step */}
              <div className="divide-y divide-slate-100 rounded-xl border border-slate-200">
                {[
                  {
                    label: "Business",
                    value: `${brief.business.name} · ${brief.business.type} · ${brief.business.location}`,
                    target: 0,
                  },
                  {
                    label: "Features",
                    value:
                      brief.features
                        .map((k) => FEATURES.find((f) => f.key === k)?.label)
                        .filter(Boolean)
                        .join(", ") || "We'll suggest what fits",
                    target: 1,
                  },
                  {
                    label: "Style",
                    value: `${VIBES.find((v) => v.key === brief.style.vibe)?.label ?? "Your call"} · ${brief.style.brandColor}`,
                    target: 2,
                  },
                  { label: "Your words", value: brief.prompt || "—", target: 3 },
                ].map(({ label, value, target }) => (
                  <div key={label} className="flex items-start gap-3 p-3.5">
                    <span className="w-24 shrink-0 text-xs font-bold uppercase tracking-wider text-slate-400">
                      {label}
                    </span>
                    <span className="flex-1 text-sm text-slate-700">{value}</span>
                    <button
                      type="button"
                      onClick={() => setStep(target)}
                      aria-label={`Edit ${label}`}
                      className="text-slate-400 transition-colors hover:text-[#4588ba]"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <p role="alert" className="mt-4 text-sm font-medium text-rose-600">
              {error}
            </p>
          )}

          {/* Nav */}
          <div className="mt-8 flex items-center justify-between">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-800"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>
            ) : (
              <span />
            )}
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={next}
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-br from-[#4588ba] to-[#316994] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4588ba]/30 transition-all hover:shadow-xl hover:shadow-[#4588ba]/40"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-br from-[#4588ba] to-[#316994] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4588ba]/30 transition-all hover:shadow-xl hover:shadow-[#4588ba]/40 disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {sending ? "Sending…" : "Build it for me"}
              </button>
            )}
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          No payment now — you&apos;ll see a preview of your website first.
        </p>
      </div>
    </section>
  );
};

export default Forme;
