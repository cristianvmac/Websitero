"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, LoaderCircle } from "lucide-react";
import { SITE_STAGES, STAGE_LABELS, type SiteStage } from "@/lib/site-stage";
import { TIER_KEYS, TIERS, CURRENCY, type Tier } from "@/lib/pricing";

/* The ops lever: moves a brief through the customer-facing lifecycle and
   publishes the two links the dashboard shows. This is the whole "admin drives
   the tracker" contract — finish a build locally, set preview_ready and paste
   the preview link here, and the customer's next page load shows it. Nothing
   deploys, nothing touches the database by hand.

   preview_ready + a preview link is what unlocks Approve / Request changes on
   the customer side; live + a live link is what flips their dashboard into the
   launched state. */

const inputCls =
  "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-shadow focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10";

type StatusControlsProps = {
  briefId: string;
  status: SiteStage;
  previewUrl: string;
  liveUrl: string;
  /** "" when the brief hasn't been scoped to a package yet. */
  tier: Tier | "";
};

export default function StatusControls({
  briefId,
  status,
  previewUrl,
  liveUrl,
  tier,
}: StatusControlsProps) {
  const router = useRouter();
  const [form, setForm] = useState({ status, previewUrl, liveUrl, tier });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  const dirty =
    form.status !== status ||
    form.previewUrl !== previewUrl ||
    form.liveUrl !== liveUrl ||
    form.tier !== tier;

  const save = async () => {
    setSaving(true);
    setError("");
    setWarning("");
    try {
      const res = await fetch(`/api/briefs/${briefId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error ?? `Failed (${res.status})`);
      // The save succeeded; a warning means the notification email didn't go
      // (or there was no URL to send) — the status still changed. Show it, but
      // refresh so the new status is reflected.
      if (data.warning) setWarning(data.warning);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-100">
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={form.status}
          onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as SiteStage }))}
          aria-label="Build status"
          className={inputCls}
        >
          {SITE_STAGES.map((stage) => (
            <option key={stage} value={stage}>
              {STAGE_LABELS[stage]}
            </option>
          ))}
        </select>
        <select
          value={form.tier}
          onChange={(e) => setForm((f) => ({ ...f, tier: e.target.value as Tier | "" }))}
          aria-label="Package"
          className={inputCls}
        >
          <option value="">No package yet</option>
          {TIER_KEYS.map((key) => (
            <option key={key} value={key}>
              {TIERS[key].label} · {CURRENCY}
              {TIERS[key].price}
            </option>
          ))}
        </select>
        <input
          value={form.previewUrl}
          onChange={(e) => setForm((f) => ({ ...f, previewUrl: e.target.value }))}
          placeholder="Preview URL (https://…)"
          aria-label="Preview URL"
          className={`${inputCls} min-w-0 flex-1 basis-52`}
        />
        <input
          value={form.liveUrl}
          onChange={(e) => setForm((f) => ({ ...f, liveUrl: e.target.value }))}
          placeholder="Live URL (https://…)"
          aria-label="Live URL"
          className={`${inputCls} min-w-0 flex-1 basis-52`}
        />
        <button
          type="button"
          onClick={save}
          disabled={saving || !dirty}
          className="inline-flex items-center gap-1.5 rounded-full bg-blue-500 hover:bg-blue-700 px-4 py-2 text-xs font-semibold text-white shadow shadow-blue-500/30 transition-all hover:shadow-md disabled:opacity-50"
        >
          {saving ? (
            <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Check className="h-3.5 w-3.5" />
          )}
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
      <p className="mt-2 text-[11px] text-slate-400">
        The owner&apos;s tracker follows this. &quot;Preview ready&quot; + a preview link is what
        offers them Approve / Request changes — and the package is the price they see and pay
        when they approve, so scope it before you send the preview.
      </p>
      {warning && <p className="mt-1 text-xs font-medium text-amber-600">{warning}</p>}
      {error && <p className="mt-1 text-xs font-medium text-rose-600">{error}</p>}
    </div>
  );
}
