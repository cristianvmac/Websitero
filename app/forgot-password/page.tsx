"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Send, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        // TODO: wire up to your auth provider / API route.
        console.log("Password reset requested for:", email);
        setSubmitted(true);
    }

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
                                <span>
                                    If an account exists for {email}, a reset link is on its
                                    way.
                                </span>
                            </div>
                            <Link href="/login" className="btn btn-primary">
                                <ArrowLeft className="h-4 w-4" />
                                Back to sign in
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

                            <button type="submit" className="btn btn-primary mt-2">
                                <Send className="h-4 w-4" />
                                Send reset link
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
