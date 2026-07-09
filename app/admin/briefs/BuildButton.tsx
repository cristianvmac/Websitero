"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Hammer, LoaderCircle } from "lucide-react";

/* One-click (re)build for a brief — POSTs to the build API, then refreshes
   the server-rendered list so status + preview link update in place. */

const BuildButton = ({ briefId, rebuild }: { briefId: string; rebuild: boolean }) => {
  const router = useRouter();
  const [building, setBuilding] = useState(false);
  const [error, setError] = useState("");

  const build = async () => {
    setBuilding(true);
    setError("");
    try {
      const res = await fetch(`/api/briefs/${briefId}/build`, { method: "POST" });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error ?? `Failed (${res.status})`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Build failed");
    } finally {
      setBuilding(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={build}
        disabled={building}
        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all disabled:opacity-60 ${
          rebuild
            ? "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
            : "bg-linear-to-br from-[#4588ba] to-[#316994] text-white shadow shadow-[#4588ba]/30 hover:shadow-md"
        }`}
      >
        {building ? (
          <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Hammer className="h-3.5 w-3.5" />
        )}
        {building ? "Building…" : rebuild ? "Rebuild" : "Build preview"}
      </button>
      {error && <p className="max-w-48 text-right text-[11px] text-rose-600">{error}</p>}
    </div>
  );
};

export default BuildButton;
