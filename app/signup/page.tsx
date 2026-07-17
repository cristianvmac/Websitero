"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff, UserPlus, LoaderCircle } from "lucide-react";
import { signUp, type AuthState } from "@/lib/auth-actions";
import GoogleButton from "@/components/auth/GoogleButton";

export default function Signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction, pending] = useActionState<AuthState, FormData>(signUp, {});

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const passwordsMismatch =
        form.confirmPassword.length > 0 && form.password !== form.confirmPassword;

    // No "check your inbox" state here: signing up grants the session outright
    // and the action redirects to /dashboard, so success never re-renders this
    // page. Only errors come back.

    return (
        <section className="flex min-h-screen items-center justify-center bg-base-100 px-4 py-16">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="text-3xl font-bold text-base-content">
                        Create your account
                    </h1>
                    <p className="mb-4 text-base-content/70">
                        Get started in less than a minute.
                    </p>

                    <GoogleButton label="Sign up with Google" />

                    <form action={formAction} className="flex flex-col gap-4">
                        <div className="form-control">
                            <label htmlFor="name" className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <div className="input input-bordered flex items-center gap-2">
                                <User className="h-4 w-4 opacity-60" />
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="grow"
                                    autoComplete="name"
                                    required
                                />
                            </div>
                        </div>

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
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="form-control">
                            <label htmlFor="confirmPassword" className="label">
                                <span className="label-text">Confirm password</span>
                            </label>
                            <div
                                className={`input input-bordered flex items-center gap-2 ${
                                    passwordsMismatch ? "input-error" : ""
                                }`}
                            >
                                <Lock className="h-4 w-4 opacity-60" />
                                <input
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="grow"
                                    autoComplete="new-password"
                                    required
                                />
                            </div>
                            {passwordsMismatch && (
                                <span className="mt-1 text-sm text-error">
                                    Passwords do not match.
                                </span>
                            )}
                        </div>

                        {state.error && (
                            <p role="alert" className="text-sm font-medium text-error">
                                {state.error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary mt-2"
                            disabled={passwordsMismatch || pending}
                        >
                            {pending ? (
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                            ) : (
                                <UserPlus className="h-4 w-4" />
                            )}
                            {pending ? "Creating account…" : "Create account"}
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm text-base-content/70">
                        Already have an account?{" "}
                        <Link href="/login" className="link link-primary">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
