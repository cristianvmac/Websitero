"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";

/* The DIY product's front door, at the bottom of the docs sidebar. The docs
   are deliberately public and the kits are public repos, so this card is the
   only place a reader learns an account exists at all — without it,
   diy_profiles never fills up.

   The docs pages stay static: session state is fetched client-side from
   Better Auth's endpoint instead of reading cookies during render, which
   would have made every docs page dynamic. The signed-out card is the
   server-rendered default — most docs readers are signed out, and the swap
   for signed-in visitors is a progressive touch, not load-bearing.

   Signing up lands on /dashboard, which greets them with the framework fork —
   picking a kit there is what actually creates the DIY profile. */

export default function AccountNudge({ framework }: { framework: "eleventy" | "astro" }) {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/get-session")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.user) setSignedIn(true);
      })
      .catch(() => {
        /* offline or blocked — keep the signed-out default */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const kitName = framework === "eleventy" ? "Eleventy" : "Astro";

  if (signedIn) {
    return (
      <div className="mr-3 mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-bold text-slate-900">Your kit dashboard</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          Your {kitName} kit, docs shortcuts and hand-off option live there.
        </p>
        <Link
          href="/dashboard"
          className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-xs font-semibold text-white shadow shadow-blue-500/25 transition-colors hover:bg-blue-700"
        >
          <LayoutDashboard className="h-3.5 w-3.5" />
          Open my dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mr-3 mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-bold text-slate-900">Building along?</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-500">
        A free account keeps your {kitName} kit, your docs path and a
        we&apos;ll-take-over option in one dashboard.
      </p>
      <Link
        href="/signup"
        className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-3 py-2 text-xs font-semibold text-white shadow shadow-blue-500/25 transition-colors hover:bg-blue-700"
      >
        Create my account
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
      <Link
        href="/login?next=/dashboard"
        className="mt-2 block text-center text-xs font-semibold text-slate-500 underline-offset-2 transition-colors hover:text-blue-700 hover:underline"
      >
        I already have one
      </Link>
    </div>
  );
}
