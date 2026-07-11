"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, LoaderCircle } from "lucide-react";

/* Deletes a brief — its JSON, uploads, and built preview — after a confirm,
   then refreshes the server-rendered list so the card disappears. */

const DeleteButton = ({ briefId }: { briefId: string }) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const remove = async () => {
    if (!window.confirm("Delete this brief, its uploads, and its preview? This can't be undone."))
      return;
    setDeleting(true);
    setError("");
    try {
      const res = await fetch(`/api/briefs/${briefId}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error ?? `Failed (${res.status})`);
      router.refresh(); // keep the spinner until the refreshed list drops the card
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={remove}
        disabled={deleting}
        aria-label="Delete brief"
        title="Delete brief"
        className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-400 transition-colors hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-60"
      >
        {deleting ? (
          <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Trash2 className="h-3.5 w-3.5" />
        )}
      </button>
      {error && <p className="max-w-48 text-right text-[11px] text-rose-600">{error}</p>}
    </div>
  );
};

export default DeleteButton;
