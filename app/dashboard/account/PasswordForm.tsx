"use client";

import { useActionState } from "react";
import { KeyRound, LoaderCircle } from "lucide-react";
import { changePassword, type AccountState } from "./actions";

/* Two forms in one, chosen by `hasPassword`:

   true  → change it, current password required.
   false → a Google-only account adding a password, so there's no current one
           to ask for. This is what stops "signed up with Google" from meaning
           "locked out forever if Google access goes".

   `hasPassword` only picks the fields. The action re-checks it server-side
   before deciding which API to call, so a tampered form can't skip the
   current-password requirement on an account that has one. */

const field =
  "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition-shadow placeholder:text-slate-400 focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10";

export default function PasswordForm({ hasPassword }: { hasPassword: boolean }) {
  const [state, formAction, pending] = useActionState<AccountState, FormData>(
    changePassword,
    null,
  );

  return (
    <form action={formAction} className="mt-5 flex flex-col gap-4">
      {hasPassword && (
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-slate-700">Current password</span>
          <input
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            className={field}
          />
        </label>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-slate-700">
            {hasPassword ? "New password" : "Password"}
          </span>
          <input
            name="newPassword"
            type="password"
            minLength={8}
            autoComplete="new-password"
            className={field}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold text-slate-700">Confirm password</span>
          <input
            name="confirmPassword"
            type="password"
            minLength={8}
            autoComplete="new-password"
            className={field}
          />
        </label>
      </div>
      <p className="text-xs text-slate-500">At least 8 characters.</p>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40 disabled:opacity-60"
        >
          {pending ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <KeyRound className="h-4 w-4" />
          )}
          {pending ? "Saving…" : hasPassword ? "Change password" : "Set password"}
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
