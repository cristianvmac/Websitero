import { Wrench } from "lucide-react";

/* The landing spot for a nav entry whose feature hasn't shipped.

   These routes are in the sidebar for everyone now, so they have to be honest
   about themselves: this says the page isn't built, and nothing else. It does
   NOT repeat the "create my free site" pitch — that lives once, on My Site,
   where the question belongs. Somebody who came here to read their messages is
   not helped by being sold to. */

export default function NotBuiltYet({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>

      <section className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
        <Wrench className="h-10 w-10 text-slate-300" />
        <p className="mt-5 font-medium text-slate-500">{title} isn&apos;t ready yet</p>
        <p className="mt-2 max-w-md text-sm text-slate-500">
          We&apos;re building it. It&apos;ll show up right here the moment it&apos;s done —
          nothing for you to switch on.
        </p>
      </section>
    </div>
  );
}
