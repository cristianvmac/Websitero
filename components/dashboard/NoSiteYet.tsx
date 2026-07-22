import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";

/* The "My Site" page with nothing to show yet.

   This is the ONLY place the pitch appears inside the dashboard. The rest of
   the nav is visible to everyone, site or not, but an empty Analytics page has
   no business selling a website — the question "where is my site?" belongs on
   the page named after it, once, with the one action that answers it. */

export default function NoSiteYet() {
  return (
    <section className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
      <Globe className="h-12 w-12 text-slate-300" />
      <p className="mt-5 text-lg font-medium text-slate-500">You don&apos;t have a site yet</p>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        Send us your business and we&apos;ll hand-code your site. It&apos;s free to build — you
        only pay when you&apos;ve seen it and want it live.
      </p>
      <Link
        href="/builditforme"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/40"
      >
        Create my free site
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
