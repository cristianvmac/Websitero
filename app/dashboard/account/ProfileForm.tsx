"use client";

import { useActionState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { updateProfile, type AccountState } from "./actions";

/* The name, which is the only thing on this page the owner can freely change.
   The email sits next to it read-only — see the note in actions.ts for why
   there's no change-email flow yet.

   The server action is passed straight to useActionState so the form still
   posts with JavaScript off, same as LinkSiteCard. */

export default function ProfileForm({ name, email }: { name: string; email: string }) {
  const [state, formAction, pending] = useActionState<AccountState, FormData>(
    updateProfile,
    null,
  );

  return (
    <form action={formAction} className="mt-5 flex flex-col gap-4">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-slate-700">Your name</span>
        <input
          name="name"
          type="text"
          defaultValue={name}
          maxLength={80}
          autoComplete="name"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-shadow placeholder:text-slate-400 focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10"
        />
        <span className="text-xs text-slate-500">
          This is what we call you here and in the emails we send you.
        </span>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-slate-700">Email</span>
        <input
          type="email"
          value={email}
          readOnly
          className="cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 outline-none"
        />
        <span className="text-xs text-slate-500">
          Your email is also how you sign in — write to us if you need it changed.
        </span>
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40 disabled:opacity-60"
        >
          {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          {pending ? "Saving…" : "Save changes"}
        </button>
        {!pending && state?.notice && (
          <span className="text-sm font-medium text-emerald-600">{state.notice}</span>
        )}
        {!pending && state?.error && (
          <span className="text-sm font-medium text-rose-600">{state.error}</span>
        )}
      </div>
    </form>
  );
}
