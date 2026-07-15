"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, LoaderCircle, Check, X } from "lucide-react";
import { VIBES, type Brief } from "@/app/forme/brief";

/* Inline editor for a stored brief — the team completes a materials brief
   (business name, type, location, look) here before hitting Build, since the
   build scripts key off those fields. PATCHes only the fields it owns
   (business, style, prompt, contact); the owner's uploads stay untouched. */

const inputCls =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-shadow focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10";

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="text-xs font-medium text-slate-500">{label}</span>
    <span className="mt-1 block">{children}</span>
  </label>
);

const EditBrief = ({ briefId, brief }: { briefId: string; brief: Brief }) => {
  const router = useRouter();
  const initial = () => ({
    name: brief.business.name,
    type: brief.business.type,
    location: brief.business.location,
    brandColor: brief.style.brandColor,
    vibe: brief.style.vibe,
    prompt: brief.prompt,
    email: brief.contact.email,
    phone: brief.contact.phone,
  });
  const [form, setForm] = useState(initial);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set =
    (key: keyof ReturnType<typeof initial>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      setError("");
    };

  const cancel = () => {
    setForm(initial());
    setError("");
    setOpen(false);
  };

  const save = async () => {
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      return setError("A valid email is required.");
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/briefs/${briefId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business: { name: form.name, type: form.type, location: form.location },
          style: { brandColor: form.brandColor, vibe: form.vibe },
          prompt: form.prompt,
          contact: { email: form.email, phone: form.phone },
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error ?? `Failed (${res.status})`);
      setOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-blue-700 underline-offset-2 hover:underline"
      >
        <Pencil className="h-3.5 w-3.5" />
        Edit brief
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Business name">
          <input value={form.name} onChange={set("name")} placeholder="Bella's Bakery" className={inputCls} />
        </Field>
        <Field label="Type">
          <input value={form.type} onChange={set("type")} placeholder="Bakery" className={inputCls} />
        </Field>
        <Field label="Location">
          <input value={form.location} onChange={set("location")} placeholder="Austin, TX" className={inputCls} />
        </Field>
        <Field label="Brand color">
          <span className="flex items-center gap-2">
            <input
              type="color"
              value={/^#[0-9a-fA-F]{6}$/.test(form.brandColor) ? form.brandColor : "#4588ba"}
              onChange={set("brandColor")}
              aria-label="Pick brand color"
              className="h-9 w-10 shrink-0 cursor-pointer rounded-lg border border-slate-200 bg-white p-1"
            />
            <input value={form.brandColor} onChange={set("brandColor")} placeholder="#4588ba" className={inputCls} />
          </span>
        </Field>
        <Field label="Vibe">
          <select value={form.vibe} onChange={set("vibe")} className={inputCls}>
            <option value="">Default — professional &amp; friendly</option>
            {VIBES.map((v) => (
              <option key={v.key} value={v.key}>
                {v.label}
              </option>
            ))}
            {form.vibe && !VIBES.some((v) => v.key === form.vibe) && (
              <option value={form.vibe}>{form.vibe}</option>
            )}
          </select>
        </Field>
        <Field label="Email">
          <input type="email" value={form.email} onChange={set("email")} placeholder="owner@example.com" className={inputCls} />
        </Field>
        <Field label="Phone">
          <input type="tel" value={form.phone} onChange={set("phone")} placeholder="(512) 555-0134" className={inputCls} />
        </Field>
        <div className="sm:col-span-3">
          <Field label="Notes / their info">
            <textarea value={form.prompt} onChange={set("prompt")} rows={4} className={`resize-none ${inputCls}`} />
          </Field>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2">
        {error && <p className="mr-auto text-xs font-medium text-rose-600">{error}</p>}
        <button
          type="button"
          onClick={cancel}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50"
        >
          <X className="h-3.5 w-3.5" />
          Cancel
        </button>
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-1.5 rounded-full bg-blue-500 hover:bg-blue-700 px-4 py-2 text-xs font-semibold text-white shadow shadow-blue-500/30 transition-all hover:shadow-md disabled:opacity-60"
        >
          {saving ? (
            <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Check className="h-3.5 w-3.5" />
          )}
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
};

export default EditBrief;
