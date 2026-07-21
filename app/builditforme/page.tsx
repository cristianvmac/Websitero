"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Upload,
  FileText,
  ImagePlus,
  X,
  Send,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Code2,
  LifeBuoy,
  ArrowRight,
} from "lucide-react";
import type { Brief } from "@/app/forme/brief";
import { submitBrief } from "@/lib/submit-brief";

/* Websitero "Build it for me" — no questions, no wizard. The owner uploads a
   document about their business (or pastes a few lines) plus their photos,
   leaves an email, and a developer hand-codes the site from that material.
   Same Brief contract and /api/forme endpoint: the doc + photos ride along
   as multipart files; readable text goes in `prompt`. Briefs without the
   structured business fields wait for team triage instead of the auto-build. */

const MAX_PHOTOS = 8;
const MAX_PHOTO_MB = 8;
const MAX_DOC_MB = 10;
const DOC_ACCEPT = ".txt,.md,.pdf,.doc,.docx,.rtf,.odt";
const DOC_EXTS = [".txt", ".md", ".pdf", ".doc", ".docx", ".rtf", ".odt"];

const isDocFile = (f: File) =>
  f.type.startsWith("text/") || DOC_EXTS.some((ext) => f.name.toLowerCase().endsWith(ext));

const fmtSize = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

const TRUST = [
  { icon: Zap, label: "Live in hours" },
  { icon: Code2, label: "Custom-coded, no templates" },
  { icon: ShieldCheck, label: "Code you own" },
  { icon: LifeBuoy, label: "24/7 expert support" },
];

const NEXT_STEPS = [
  {
    title: "A developer reads your materials",
    blurb: "A real person reads your doc and looks through your photos — no forms, no templates.",
  },
  {
    title: "We hand-code your website",
    blurb: "Custom code, written for your business. A preview link lands in your inbox within hours.",
  },
  {
    title: "You approve, we launch",
    blurb: "Google Business Profile and SEO set up for you — and the code is yours to keep.",
  },
];

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-shadow focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10";

const ctaCls =
  "inline-flex items-center gap-2 rounded-full bg-blue-500 hover:bg-blue-700 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-60";

const zoneCls = (active: boolean) =>
  `flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors ${
    active
      ? "border-blue-500 bg-blue-500/10"
      : "border-slate-200 bg-slate-50/50 hover:border-blue-500/40 hover:bg-blue-500/5"
  }`;

const BuildItForMe = () => {
  const [doc, setDoc] = useState<File | null>(null);
  const [pasteOpen, setPasteOpen] = useState(false);
  const [pasted, setPasted] = useState("");
  const [photos, setPhotos] = useState<{ file: File; url: string }[]>([]);
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dragging, setDragging] = useState<"doc" | "photos" | null>(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const docInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // Thumbnails are object URLs — release them when the page unmounts.
  const photosRef = useRef(photos);
  photosRef.current = photos;
  useEffect(
    () => () => {
      photosRef.current.forEach((p) => URL.revokeObjectURL(p.url));
    },
    [],
  );

  const pickDoc = (f: File) => {
    if (!isDocFile(f))
      return setError("That file type didn't work — Word, PDF, or plain text is perfect.");
    if (f.size > MAX_DOC_MB * 1024 * 1024)
      return setError(`That document is over ${MAX_DOC_MB} MB — a lighter version works better.`);
    setDoc(f);
    setError("");
  };

  const addPhotos = (incoming: FileList | File[]) => {
    const room = MAX_PHOTOS - photos.length;
    const accepted = Array.from(incoming)
      .filter((f) => f.type.startsWith("image/") && f.size <= MAX_PHOTO_MB * 1024 * 1024)
      .slice(0, Math.max(0, room));
    if (accepted.length === 0) return;
    setPhotos((prev) => [
      ...prev,
      ...accepted.map((file) => ({ file, url: URL.createObjectURL(file) })),
    ]);
    setError("");
  };

  const removePhoto = (i: number) => {
    URL.revokeObjectURL(photos[i].url);
    setPhotos((prev) => prev.filter((_, idx) => idx !== i));
  };

  const submit = async () => {
    const pastedText = pasted.trim();
    if (!doc && !pastedText)
      return setError(
        "Send us something to build from — upload a document, or paste a few lines about your business.",
      );
    if (!/^\S+@\S+\.\S+$/.test(email))
      return setError("We need a valid email to send your preview link.");
    setSending(true);
    setError("");
    try {
      // Plain-text docs are readable right here — their content rides in
      // `prompt` for the team and the build worker. Everything else (PDF,
      // Word) travels as the attached file.
      let docText = "";
      if (doc && (doc.type.startsWith("text/") || /\.(txt|md)$/i.test(doc.name))) {
        docText = (await doc.text()).trim();
      }
      const brief: Brief = {
        business: { name: businessName.trim(), type: "", location: "" },
        features: [],
        style: { brandColor: "#4588ba", vibe: "" },
        prompt: [pastedText, docText].filter(Boolean).join("\n\n").slice(0, 20000),
        images: { mode: photos.length > 0 ? "upload" : "stock" },
        contact: { email: email.trim(), phone: phone.trim() },
      };
      await submitBrief(brief, { doc, photos: photos.map((p) => p.file) });
      setDone(true);
    } catch {
      setError("Something went wrong sending your files. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-white px-6 py-24">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            We&apos;re on it{businessName.trim() ? `, ${businessName.trim()}` : ""}!
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-slate-600">
            A real developer is reading your info and hand-coding your website right now.
            You&apos;ll get a preview link at{" "}
            <span className="font-semibold text-slate-800">{email}</span> within hours.
          </p>
          <ul className="w-full max-w-xs space-y-2 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm">
            {[
              "Website — hand-coded for you",
              "Google Business Profile — set up for you",
              "Local SEO — set up for you",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-500">No templates. The code is yours to keep.</p>

          {/* Reaching this page means they were signed in to submit, so the
              brief is already theirs — no "create an account" nudge, no claim
              to wait on. The tracker is live on the dashboard right now. */}
          <div className="w-full max-w-sm rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5">
            <p className="font-bold text-slate-900">Follow your build live</p>
            <p className="mt-1 text-sm text-slate-600">
              Your dashboard tracks every step, shows your preview the moment it&apos;s ready,
              and lets you approve it in one click.
            </p>
            <Link
              href="/dashboard"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/40"
            >
              Go to my dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <Link
            href="/"
            className="text-sm font-semibold text-slate-500 underline-offset-2 transition-colors hover:text-slate-700 hover:underline"
          >
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white px-6 pb-24 pt-28">
      <div className="mx-auto w-full max-w-2xl">
        {/* Eyebrow */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-sm font-medium text-blue-700">
            <Sparkles className="h-4 w-4" />
            Build it for me
          </span>
        </div>

        <h1 className="mt-4 text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Send us what you have.
          <br />
          We hand-code the rest.
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-center text-slate-600">
          No questions, no forms. Upload a document about your business — your story,
          services, prices, hours — plus your photos. Our developers custom-code your
          website from it and set up your Google Business Profile and SEO for you.
        </p>

        {/* Trust chips */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {TRUST.map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <Icon className="h-3.5 w-3.5 text-blue-500" />
              {label}
            </span>
          ))}
        </div>

        {/* The drop-off — document, photos, delivery */}
        <div className="mt-10 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-300/30">
          {/* Document */}
          <div className="p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              1 · Your business info
            </p>
            {doc ? (
              <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <FileText className="h-5 w-5 shrink-0 text-blue-500" />
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800">
                  {doc.name}
                </span>
                <span className="shrink-0 text-xs text-slate-400">{fmtSize(doc.size)}</span>
                <button
                  type="button"
                  onClick={() => setDoc(null)}
                  aria-label="Remove document"
                  className="shrink-0 text-slate-400 transition-colors hover:text-rose-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                role="button"
                tabIndex={0}
                onClick={() => docInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    docInputRef.current?.click();
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging("doc");
                }}
                onDragLeave={() => setDragging(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(null);
                  const f = Array.from(e.dataTransfer.files).find(isDocFile);
                  if (f) pickDoc(f);
                  else setError("That file type didn't work — Word, PDF, or plain text is perfect.");
                }}
                className={`mt-3 ${zoneCls(dragging === "doc")}`}
              >
                <Upload className="h-6 w-6 text-blue-500" />
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-blue-700">Upload your document</span> — or
                  drag it here
                </p>
                <p className="text-xs text-slate-400">
                  Word, PDF, or plain text. Your story, services, prices, hours — whatever you
                  already have.
                </p>
              </div>
            )}
            <input
              ref={docInputRef}
              type="file"
              accept={DOC_ACCEPT}
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) pickDoc(f);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => setPasteOpen((v) => !v)}
              className="mt-3 text-xs font-semibold text-blue-700 underline-offset-2 hover:underline"
            >
              {pasteOpen ? "Hide the text box" : "No document handy? Paste or type your info instead"}
            </button>
            {pasteOpen && (
              <textarea
                value={pasted}
                onChange={(e) => {
                  setPasted(e.target.value);
                  setError("");
                }}
                rows={5}
                autoFocus
                placeholder="We're Bella's Bakery in Austin — sourdough, custom cakes, and good coffee. Open Tue–Sun. Customers always ask about wedding cakes…"
                className={`mt-3 resize-none ${inputCls}`}
              />
            )}
          </div>

          {/* Photos */}
          <div className="p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              2 · Your photos
            </p>
            {photos.length < MAX_PHOTOS && (
              <div
                role="button"
                tabIndex={0}
                onClick={() => photoInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    photoInputRef.current?.click();
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging("photos");
                }}
                onDragLeave={() => setDragging(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(null);
                  addPhotos(e.dataTransfer.files);
                }}
                className={`mt-3 ${zoneCls(dragging === "photos")}`}
              >
                <ImagePlus className="h-6 w-6 text-blue-500" />
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-blue-700">Upload your photos</span> — or
                  drag them here
                </p>
                <p className="text-xs text-slate-400">
                  Storefront, your work, your team — up to {MAX_PHOTOS}. Skip it and we&apos;ll use
                  professional stock imagery.
                </p>
              </div>
            )}
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) addPhotos(e.target.files);
                e.target.value = "";
              }}
            />
            {photos.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {photos.map((p, i) => (
                  <div
                    key={p.url}
                    className="relative aspect-square overflow-hidden rounded-lg border border-slate-200"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.url} alt={p.file.name} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      aria-label={`Remove ${p.file.name}`}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow transition-colors hover:text-rose-500"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Delivery */}
          <div className="p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              3 · Where we send your preview
            </p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@example.com"
                  className={`mt-1.5 ${inputCls}`}
                />
              </div>
              <div>
                <label htmlFor="business-name" className="text-sm font-medium text-slate-700">
                  Business name <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  id="business-name"
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Bella's Bakery"
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(512) 555-0134"
                  className={`mt-1.5 ${inputCls}`}
                />
              </div>
            </div>
            {error && (
              <p role="alert" className="mt-3 text-sm font-medium text-rose-600">
                {error}
              </p>
            )}
            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-xs text-slate-400">
                Your doc and photos go straight to a developer — you&apos;ll hear from a real
                person.
              </p>
              <button type="button" onClick={submit} disabled={sending} className={ctaCls}>
                <Send className="h-4 w-4" />
                {sending ? "Sending…" : "Send to the team"}
              </button>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          No payment now — you&apos;ll see a preview of your website first.
        </p>

        {/* What happens after you hit send */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {NEXT_STEPS.map(({ title, blurb }, i) => (
            <div key={title} className="flex flex-col gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/10 text-xs font-bold text-blue-700">
                {i + 1}
              </span>
              <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
              <p className="text-sm leading-relaxed text-slate-500">{blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuildItForMe;
