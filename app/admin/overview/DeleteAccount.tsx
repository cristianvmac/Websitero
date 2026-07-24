"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, LoaderCircle } from "lucide-react";
import Link from "next/link";

/* Deletes an account after a confirm, then refreshes the server-rendered list
   so the card disappears.

   The confirm text spells out both halves of what happens, because the second
   half is the surprising one: the person is gone, signed out everywhere, but
   their briefs are NOT — they drop back to unclaimed and stay in the queue (see
   the route for why). An admin who expects "delete account" to mean "delete
   everything about them" should find out here, not afterwards.

   The trigger is a next/link Link rather than a <button>, by request. Two
   things a <button> gave for free have to be done by hand as a result, and
   both matter for something irreversible:

   · An anchor has no `disabled`. The re-entry guard therefore lives inside
     remove() — without it, a second click during an in-flight request fires a
     second DELETE. aria-disabled carries the same state to screen readers.
   · An anchor navigates. preventDefault() stops the href being followed, which
     also keeps the "#" out of the URL bar.

   The admin's own account is not in this list at all — app/admin/overview/page.tsx
   filters it out of the query — so there's no self-delete case to disable here.
   The route refuses one regardless. */

const DeleteAccount = ({
  userId,
  email,
  briefCount,
}: {
  userId: string;
  email: string;
  /** Shown in the confirm, so the consequence is counted rather than described. */
  briefCount: number;
}) => {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const remove = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (deleting) return; // an anchor can't be disabled — see above

    const briefs =
      briefCount > 0
        ? `Their ${briefCount} brief${briefCount === 1 ? "" : "s"} will NOT be deleted — ` +
          `${briefCount === 1 ? "it goes" : "they go"} back to unclaimed and stay${briefCount === 1 ? "s" : ""} in the queue.`
        : "They have no briefs.";

    if (
      !window.confirm(
        `Delete the account ${email}?\n\n` +
          `Their password, any linked Google sign-in, every session, and their DIY kit ` +
          `choice (framework, linked site and repo) go. They're signed out everywhere ` +
          `immediately.\n\n${briefs}\n\nThis can't be undone.`,
      )
    )
      return;

    setDeleting(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
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
      <Link
        href="#"
        role="button"
        onClick={remove}
        aria-disabled={deleting}
        aria-label={`Delete the account ${email}`}
        title={`Delete ${email}`}
        className={`inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-400 transition-colors ${
          deleting
            ? "cursor-not-allowed opacity-40"
            : "hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
        }`}
      >
        {deleting ? (
          <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Trash2 className="h-3.5 w-3.5" />
        )}
      </Link>
      {error && <p className="max-w-48 text-right text-[11px] text-rose-600">{error}</p>}
    </div>
  );
};

export default DeleteAccount;
