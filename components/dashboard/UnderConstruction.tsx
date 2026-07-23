import { HardHat } from "lucide-react";

/* The stand-in for a page that exists but isn't finished.

   Different from NotBuiltYet: that one is for a nav entry with nothing behind
   it at all. This one covers pages whose console is written and sitting in the
   file, just not good enough to put in front of an owner yet. The real
   component stays exported from the same file — flipping a page back on is one
   line, and nothing has to be rebuilt from memory. */

export default function UnderConstruction({ title, note }: { title: string; note: string }) {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>

      <section className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
        <HardHat className="h-10 w-10 text-slate-300" />
        <p className="mt-5 font-medium text-slate-500">Under construction</p>
        <p className="mt-2 max-w-md text-sm text-slate-500">{note}</p>
        <p className="mt-4 max-w-md text-sm text-slate-500">
          It&apos;ll show up right here the moment it&apos;s done — nothing for you to switch on.
        </p>
      </section>
    </div>
  );
}
