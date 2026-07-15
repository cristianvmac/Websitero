"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        // TODO: wire up to your auth provider / API route.
        console.log("Login form submitted:", form);
    }

    return (
        <section className="flex min-h-screen items-center justify-center bg-base-100 px-4 py-16">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="text-3xl font-bold text-base-content">Welcome back</h1>
                    <p className="mb-4 text-base-content/70">
                        Sign in to your account to continue.
                    </p>

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

                        <button type="submit" className="btn btn-primary mt-2">
                            <LogIn className="h-4 w-4" />
                            Sign in
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
