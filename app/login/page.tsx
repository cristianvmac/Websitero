"use client";

import { Suspense, useActionState, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, LogIn, LoaderCircle } from "lucide-react";
import { signIn, type AuthState } from "@/lib/auth-actions";
import GoogleButton from "@/components/auth/GoogleButton";
import { FaCode } from "react-icons/fa";

/* Why anyone got sent back here. Google failures return to /login with Better
   Auth's own ?error=<code> appended (access_denied is someone declining the
   consent screen; the rest are handshake faults), and dead reset links carry
   invalid_token/token_expired. Unknown codes still get a sentence — a bare
   form after a failed sign-in leaves people guessing. */
const REDIRECT_REASONS: Record<string, string> = {
    access_denied: "Sign-in cancelled — no harm done. Try again whenever you're ready.",
    provider: "Google sign-in isn't working right now. Use your email and password below, or try again shortly.",
    invalid_token: "That link has expired or was already used. Request a new one and it'll work.",
    token_expired: "That link has expired or was already used. Request a new one and it'll work.",
    /* This address already has a password account, and Better Auth won't attach
       Google to it. That's deliberate on its part, not a fault: signup no longer
       verifies email, so a password account is no proof of owning the address —
       auto-linking would let someone register your email, wait for you to click
       "Continue with Google", and inherit your account with a password they
       chose. Retrying can't help, so the message must send them somewhere real:
       their password, which does work. */
    account_not_linked:
        "This email already has a password account — sign in with your password below instead. Forgot it? Reset it underneath.",
};

export default function LoginPage() {
    // useSearchParams needs a Suspense boundary — without one this page can't be
    // prerendered at build time.
    return (
        <Suspense fallback={null}>
            <Login />
        </Suspense>
    );
}

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction, pending] = useActionState<AuthState, FormData>(signIn, {});
    const errorCode = useSearchParams().get("error");
    const redirectReason = errorCode
        ? (REDIRECT_REASONS[errorCode] ?? "Sign-in didn't complete — please try again.")
        : undefined;

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <section className="flex min-h-screen items-center justify-center bg-base-100 px-4 py-16">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    {/*<h1 className="text-3xl font-bold text-base-content">Welcome back</h1>
                    <p className="mb-4 text-base-content/70">
                        Sign in to your account to continue.
                    </p>*/}
                    <div className="group flex items-center gap-2.5 mb-6">
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500 text-white shadow-sm shadow-blue-500/30 transition-transform group-hover:scale-105">
                            <FaCode className="h-6 w-5" />
                        </span>
                        <span className="text-xl font-bold tracking-tight text-slate-900">Websitero</span>
                    </div>
                    {redirectReason && (
                        <div role="alert" className="alert alert-warning mb-4 text-sm">
                            <span>{redirectReason}</span>
                        </div>
                    )}

                    <GoogleButton label="Sign in with Google" />

                    <form action={formAction} className="flex flex-col gap-4">
                        <div className="form-control">
                            <label htmlFor="email" className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <div className="input input-bordered flex items-center gap-2">
                                <Mail className="h-4 w-4 opacity-60" />
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="grow"
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label htmlFor="password" className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="input input-bordered flex items-center gap-2">
                                <Lock className="h-4 w-4 opacity-60" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="grow"
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="opacity-60 hover:opacity-100"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="label cursor-pointer gap-2">
                                <input type="checkbox" className="checkbox checkbox-sm" />
                                <span className="label-text">Remember me</span>
                            </label>
                            <Link
                                href="/forgot-password"
                                className="link link-primary text-sm"
                            >
                                Forgot password?
                            </Link>
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
                                <LogIn className="h-4 w-4" />
                            )}
                            {pending ? "Signing in…" : "Sign in"}
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm text-base-content/70">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="link link-primary">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
