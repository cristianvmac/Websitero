"use client";

import { MessageCircle } from "lucide-react";

/* The stand-in for a page whose feature is deliberately unbuilt.

   Different from UnderConstruction and NotBuiltYet: those two promise the thing
   is coming. This one doesn't promise anything — it asks. Analytics, SEO & GEO,
   the Google listing and the blog are all expensive to build properly, and a
   first attempt at analytics was already thrown away twice. Rather than guess
   again, these pages ask the owner to say out loud that they want it, and the
   chat is the cheapest place for them to say it.

   The button is written against Crisp but doesn't need it: until the widget is
   loaded, window.$crisp is undefined and the click falls through to email, so
   the page is never a dead end. */

const SUPPORT_EMAIL = "team@websitero.dev";

declare global {
  interface Window {
    $crisp?: { push: (cmd: unknown[]) => void };
  }
}

export default function TellUsYouWantIt({
  title,
  feature,
  note,
}: {
  title: string;
  /* Lowercase, reads inside a sentence: "…tell us you want analytics". */
  feature: string;
  note: string;
}) {
  function openChat() {
    const crisp = typeof window !== "undefined" ? window.$crisp : undefined;

    if (crisp) {
      crisp.push(["do", "chat:open"]);
      crisp.push(["do", "message:send", ["text", `I'd like ${feature} in Websitero.`]]);
      return;
    }

    const subject = encodeURIComponent(`I'd like ${feature}`);
    const body = encodeURIComponent(
      `Hi — I'd use ${feature} in Websitero. Here's what I'd want from it:\n\n`,
    );
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>

      <section className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
        <MessageCircle className="h-10 w-10 text-slate-300" />
        <p className="mt-5 font-medium text-slate-500">Not built yet — on purpose</p>
        <p className="mt-2 max-w-md text-sm text-slate-500">{note}</p>
        <p className="mt-4 max-w-md text-sm text-slate-500">
          We build what people actually ask for. If you&apos;d use {feature}, tell us in the chat —
          one line is enough, and it&apos;s what decides whether this gets built next.
        </p>

        <button
          type="button"
          onClick={openChat}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <MessageCircle className="h-4 w-4" />
          Tell us you want {feature}
        </button>
      </section>
    </div>
  );
}
