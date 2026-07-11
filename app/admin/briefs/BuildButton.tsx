"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Hammer, LoaderCircle, Code2 } from "lucide-react";

/* One-click (re)build for a brief — POSTs to the build API, then refreshes
   the server-rendered list so status + preview link update in place.

   Two flavours:
   - default   regenerate the site from the brief (overwrites the workspace's
               generated pages, copy, and branding)
   - codeOnly  recompile the workspace exactly as the developer left it, so
               hand edits under workspaces/<slug>/ survive */

const BuildButton = ({
  briefId,
  rebuild,
  codeOnly = false,
}: {
  briefId: string;
  rebuild: boolean;
  codeOnly?: boolean;
}) => {
  const router = useRouter();
  const [building, setBuilding] = useState(false);
  const [error, setError] = useState("");

  const build = async () => {
    setBuilding(true);
    setError("");
    try {
      const res = await fetch(`/api/briefs/${briefId}/build`, {
        method: "POST",
        ...(codeOnly && {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ codeOnly: true }),
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error ?? `Failed (${res.status})`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Build failed");
    } finally {
      setBuilding(false);
    }
  };

  const Icon = codeOnly ? Code2 : Hammer;
  const label = codeOnly ? "Rebuild code" : rebuild ? "Rebuild" : "Build preview";

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={build}
        disabled={building}
        title={
          codeOnly
            ? "Recompile your edited workspace — keeps your code changes"
            : "Regenerate the site from the brief — overwrites code changes"
        }
        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all disabled:opacity-60 ${
          codeOnly || rebuild
            ? "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
            : "bg-linear-to-br from-[#4588ba] to-[#316994] text-white shadow shadow-[#4588ba]/30 hover:shadow-md"
        }`}
      >
        {building ? (
          <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Icon className="h-3.5 w-3.5" />
        )}
        {building ? (codeOnly ? "Compiling…" : "Building…") : label}
      </button>
      {error && <p className="max-w-48 text-right text-[11px] text-rose-600">{error}</p>}
    </div>
  );
};

export default BuildButton;
