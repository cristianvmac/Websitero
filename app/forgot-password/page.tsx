"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Mail, Send, ArrowLeft, CheckCircle2, LoaderCircle } from "lucide-react";
import { requestPasswordReset, type AuthState } from "@/lib/auth-actions";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [state, formAction, pending] = useActionState<AuthState, FormData>(
        requestPasswordReset,
        {},
    );
    const submitted = Boolean(state.notice);

    return (
        <section className="flex min-h-screen items-center justify-center bg-base-100 px-4 py-16">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="text-3xl font-bold text-base-content">Reset password</h1>
                    <p className="mb-4 text-base-content/70">
                        Enter the email linked to your account and we&apos;ll send you a
                        link to reset your password.
                    </p>

                    {submitted ? (
                        <div className="flex flex-col gap-4">
                            <div role="alert" className="alert alert-success">
                                <CheckCircle2 className="h-5 w-5" />
                                <span>{state.notice}</span>
                            </div>
                            <Link href="/login" className="btn btn-primary">
                                <ArrowLeft className="h-4 w-4" />
                                Back to sign in
                            </Link>
                        </div>
                    ) : (
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="grow"
                                        autoComplete="email"
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
                                    <Send className="h-4 w-4" />
                                )}
                                {pending ? "Sending…" : "Send reset link"}
                            </button>

                            <Link
                                href="/login"
                                className="link link-primary mt-2 flex items-center justify-center gap-1 text-sm"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to sign in
                            </Link>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
