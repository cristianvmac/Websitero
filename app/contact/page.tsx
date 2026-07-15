"use client";

import { useState } from "react";
import { Mail, User, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        // TODO: wire up to your email service / API route.
        console.log("Contact form submitted:", form);
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
    }

    return (
        <section className="flex min-h-screen items-center justify-center bg-base-100 px-4 py-16">
            <div className="card w-full max-w-lg bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="text-3xl font-bold text-base-content">Get in touch</h1>
                    <p className="mb-4 text-base-content/70">
                        Have a question or want to work together? Send us a message and
                        we&apos;ll get back to you.
                    </p>

                    {submitted ? (
                        <div role="alert" className="alert alert-success">
                            <CheckCircle2 className="h-5 w-5" />
                            <span>Thanks! Your message has been sent.</span>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-control">
                                <label htmlFor="message" className="label">
                                    <span className="label-text">Message</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="How can we help?"
                                    className="textarea textarea-bordered w-full"
                                    rows={5}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary mt-2">
                                <Send className="h-4 w-4" />
                                Send message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
