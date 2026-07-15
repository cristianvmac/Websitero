"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Wand2,
  Sparkles,
  Loader2,
  CheckCircle2,
  Code2,
  Blocks,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import {
  type Brief,
  EMPTY_BRIEF,
  BUSINESS_TYPES,
  FEATURES,
  VIBES,
  BRAND_COLORS,
} from "@/app/forme/brief";

/* The prompt does the talking: the owner writes a sentence, we read the pages
   and sections out of it, and they confirm a handful of essentials the build
   needs (name, type, city, email — scripts/build-site.mjs keys off those).
   Submitting posts the same Brief to /api/forme, which composes the site from
   the docs-library variants + CodeStitch components and drops a static build
   in previews/<slug>/. We poll that URL and open it when it's up. */

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-shadow focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10";

// Same rule as scripts/build-site.mjs, so we can predict the preview URL.
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

// What the prompt asks for, in the words owners actually use. Whatever we
// read out of the sentence comes back as pre-checked chips they can correct.
const FEATURE_HINTS: Record<string, string[]> = {
  services: ["service", "menu", "pricing", "price", "what we do", "repair"],
  gallery: ["gallery", "photo", "portfolio", "gallery of work", "before and after"],
  booking: ["booking", "book", "appointment", "schedule", "reservation"],
  orders: ["order", "shop", "store", "checkout", "buy", "ecommerce"],
  reviews: ["review", "testimonial", "rating", "star"],
  contact: ["contact", "quote", "estimate", "get in touch", "form", "call"],
  faq: ["faq", "question"],
  blog: ["blog", "news", "article", "post"],
};

const readFeatures = (prompt: string) => {
  const text = prompt.toLowerCase();
  const found = Object.entries(FEATURE_HINTS)
    .filter(([, hints]) => hints.some((h) => text.includes(h)))
    .map(([key]) => key);
  // Every local business site needs a way to be reached.
  return found.includes("contact") ? found : [...found, "contact"];
};

// City is what the build's copy uses ("serving Denver"), so pull the town out
// of "... in Denver — services and reviews" when the owner wrote it that way.
const readLocation = (prompt: string) => {
  const match = prompt.match(/\bin ([A-Z][A-Za-z.'-]+(?: [A-Z][A-Za-z.'-]+)*(?:, ?[A-Z]{2})?)/);
  return match ? match[1].replace(/\s+(with|that|and)$/i, "") : "";
};

const readType = (prompt: string) => {
  const text = prompt.toLowerCase();
  return (
    BUSINESS_TYPES.find((t) => t !== "Other" && text.includes(t.toLowerCase().split(" /")[0])) ?? ""
  );
};

const STEPS = [
  { icon: BookOpen, label: "Reading your prompt and picking your pages" },
  { icon: Blocks, label: "Composing sections from the CodeStitch component library" },
  { icon: Code2, label: "Writing your copy into pure HTML, CSS and JS" },
  { icon: Sparkles, label: "Branding, images and SEO" },
];

const GenerateClient = ({ initialPrompt }: { initialPrompt: string }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [name, setName] = useState("");
  const [type, setType] = useState(() => readType(initialPrompt));
  const [location, setLocation] = useState(() => readLocation(initialPrompt));
  const [email, setEmail] = useState("");
  const [features, setFeatures] = useState<string[]>(() => readFeatures(initialPrompt));
  const [vibe, setVibe] = useState<string>("modern");
  const [brandColor, setBrandColor] = useState<string>(BRAND_COLORS[0]);

  const [error, setError] = useState("");
  const [building, setBuilding] = useState(false);
  const [step, setStep] = useState(0);
  const [preview, setPreview] = useState("");
  const [slow, setSlow] = useState(false); // build is taking longer than we poll for
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const toggleFeature = (key: string) =>
    setFeatures((prev) => (prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]));

  // The preview appears at /previews/<slug>/ once the build worker finishes.
  const waitForPreview = async (url: string) => {
    for (let i = 0; i < 60; i += 1) {
      await new Promise((r) => {
        timers.current.push(setTimeout(r, 3000));
      });
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (res.ok) {
          setPreview(url);
          return;
        }
      } catch {
        // build still running (or the dev server blinked) — keep waiting
      }
    }
    setSlow(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return setError("Tell us what your website is for.");
    if (!name.trim()) return setError("Add your business name — it goes on the site.");
    if (!type) return setError("Pick what kind of business you run.");
    if (!location.trim()) return setError("Add the town or city you serve.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Add a valid email so we can send your site.");

    setError("");
    setBuilding(true);

    // Walk the step list while the worker builds — each step is a real stage
    // of scripts/build-site.mjs, so the pacing is honest enough.
    STEPS.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStep(i), i * 2500));
    });

    const brief: Brief = {
      ...EMPTY_BRIEF,
      business: { name: name.trim(), type, location: location.trim() },
      features,
      style: { brandColor, vibe },
      prompt: prompt.trim(),
      images: { mode: "stock" },
      contact: { email: email.trim(), phone: "" },
    };

    try {
      const res = await fetch("/api/forme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brief),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong");
      await waitForPreview(`/previews/${slugify(brief.business.name)}/`);
    } catch (err) {
      timers.current.forEach(clearTimeout);
      setBuilding(false);
      setError(err instanceof Error ? err.message : "Something went wrong. Try again?");
    }
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-white px-6 py-20">

      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-sm font-medium text-blue-700">
            <Wand2 className="h-4 w-4" />
            Build it from a prompt
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Describe your business.{" "}
            <span className="text-blue-700">
              We&apos;ll build the site.
            </span>
          </h1>
          <p className="max-w-xl text-slate-600">
            Your pages are assembled from our component library — pure HTML, CSS and JS
            you own and can edit. No page builder, no lock-in.
          </p>
        </div>

        {building ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-300/40">
            {preview ? (
              <div className="flex flex-col items-center gap-4 text-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-500" />
                <h2 className="text-xl font-semibold text-slate-900">Your website is live</h2>
                <p className="max-w-md text-sm text-slate-600">
                  Here&apos;s your preview. We also sent the link to {email} — reply to it with
                  anything you want changed and we&apos;ll adjust the code.
                </p>
                <Link
                  href={preview}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-500 hover:bg-blue-700 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40"
                >
                  Open my website
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <h2 className="text-center text-lg font-semibold text-slate-900">
                  {slow ? "Still building…" : "Building your website"}
                </h2>
                {STEPS.map(({ icon: Icon, label }, i) => {
                  const done = i < step;
                  const current = i === step;
                  return (
                    <div
                      key={label}
                      className={`flex items-center gap-3 text-sm transition-colors ${
                        done || current ? "text-slate-800" : "text-slate-400"
                      }`}
                    >
                      {done ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                      ) : current ? (
                        <Loader2 className="h-5 w-5 shrink-0 animate-spin text-blue-500" />
                      ) : (
                        <Icon className="h-5 w-5 shrink-0" />
                      )}
                      {label}
                    </div>
                  );
                })}
                <p className="text-center text-xs text-slate-500">
                  {slow
                    ? "This one's taking a while. You can close the page — we'll email your preview link when it's ready."
                    : "This takes a couple of minutes. Keep this page open."}
                </p>
              </div>
            )}
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-300/40 sm:p-8"
          >
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-800">Your website, in a sentence</span>
              <textarea
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  setError("");
                }}
                onBlur={() => {
                  // Re-read the sentence for anything the owner hasn't set yet.
                  if (!type) setType(readType(prompt));
                  if (!location) setLocation(readLocation(prompt));
                  setFeatures((prev) => (prev.length > 1 ? prev : readFeatures(prompt)));
                }}
                rows={3}
                placeholder="A plumbing company in Denver — services, reviews, and a quote form"
                className={`${inputCls} resize-none text-base`}
              />
            </label>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-slate-800">Pages we read from that</span>
              <div className="flex flex-wrap gap-2">
                {FEATURES.map((f) => {
                  const on = features.includes(f.key);
                  return (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => toggleFeature(f.key)}
                      aria-pressed={on}
                      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                        on
                          ? "border-blue-500 bg-blue-500/10 text-blue-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-slate-800">Business name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Mile High Plumbing"
                  className={inputCls}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-slate-800">Type</span>
                <select value={type} onChange={(e) => setType(e.target.value)} className={inputCls}>
                  <option value="">Choose one…</option>
                  {BUSINESS_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-slate-800">Town or city</span>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Denver, CO"
                  className={inputCls}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-slate-800">Your email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                  className={inputCls}
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-slate-800">Brand color</span>
                <div className="flex gap-2">
                  {BRAND_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setBrandColor(c)}
                      aria-label={`Brand color ${c}`}
                      aria-pressed={brandColor === c}
                      style={{ backgroundColor: c }}
                      className={`h-8 w-8 rounded-full transition-transform ${
                        brandColor === c ? "scale-110 ring-2 ring-slate-900 ring-offset-2" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-slate-800">Feel</span>
                <select value={vibe} onChange={(e) => setVibe(e.target.value)} className={inputCls}>
                  {VIBES.map((v) => (
                    <option key={v.key} value={v.key}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500 hover:bg-blue-700 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40"
            >
              Generate my website
              <ArrowRight className="h-4 w-4" />
            </button>

            <p className="text-center text-xs text-slate-500">
              Want us to work from your own document and photos instead?{" "}
              <Link href="/builditforme" className="font-medium text-blue-700 underline">
                Send us your info
              </Link>{" "}
              — or{" "}
              <Link href="/docs" className="font-medium text-blue-700 underline">
                build it yourself
              </Link>{" "}
              from the docs.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default GenerateClient;
