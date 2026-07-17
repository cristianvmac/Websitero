"use client";

import { Suspense, useActionState, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  LoaderCircle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { resetPassword, type AuthState } from "@/lib/auth-actions";

/* Where the password-reset email lands. Better Auth verifies the link's token
   first and forwards here with ?token=… on success or ?error=… when the link is
   dead — so by the time this form submits, a bad token is the rare case, not
   the expected one. Completes the flow /forgot-password starts; until this page
   existed, reset emails had nowhere to go. */

export default function ResetPasswordPage() {
  // useSearchParams needs a Suspense boundary to keep the page prerenderable.
  return (
    <Suspense fallback={null}>
      <ResetPassword />
    </Suspense>
  );
}

function ResetPassword() {
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const linkDead = Boolean(params.get("error")) || !token;

  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, pending] = useActionState<AuthState, FormData>(resetPassword, {});

  return (
    <section className="flex min-h-screen items-center justify-center bg-base-100 px-4 py-16">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          {state.notice ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15">
                <CheckCircle2 className="h-7 w-7 text-success" />
              </span>
              <h1 className="text-2xl font-bold text-base-content">Password updated</h1>
              <p className="text-base-content/70">{state.notice}</p>
              <Link href="/login" className="btn btn-primary">
                <ArrowLeft className="h-4 w-4" />
                Back to sign in
              </Link>
            </div>
          ) : linkDead ? (
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-base-content">Link expired</h1>
              <p className="text-base-content/70">
                That reset link has expired or was already used. Request a fresh one and
                it&apos;ll work.
              </p>
              <Link href="/forgot-password" className="btn btn-primary">
                Request a new link
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-base-content">Choose a new password</h1>
              <p className="mb-4 text-base-content/70">
                Make it at least 8 characters — a short sentence works well.
              </p>

              <form action={formAction} className="flex flex-col gap-4">
                <input type="hidden" name="token" value={token} />

                <div className="form-control">
                  <label htmlFor="password" className="label">
                    <span className="label-text">New password</span>
                  </label>
                  <div className="input input-bordered flex items-center gap-2">
                    <Lock className="h-4 w-4 opacity-60" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      className="grow"
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="opacity-60 hover:opacity-100"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="form-control">
                  <label htmlFor="confirmPassword" className="label">
                    <span className="label-text">Confirm new password</span>
                  </label>
                  <div className="input input-bordered flex items-center gap-2">
                    <Lock className="h-4 w-4 opacity-60" />
                    <input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="••••••••"
                      className="grow"
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                  </div>
                </div>

                {state.error && (
                  <p role="alert" className="text-sm font-medium text-error">
                    {state.error}
                  </p>
                )}

                <button type="submit" disabled={pending} className="btn btn-primary mt-2">
                  {pending ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <KeyRound className="h-4 w-4" />
                  )}
                  {pending ? "Updating…" : "Update password"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
