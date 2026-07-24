import type { Metadata } from "next";
import Link from "next/link";
import { Inbox, ShieldCheck, Users } from "lucide-react";
import { getDashboardData, toShellSite } from "@/src/data/dashboard";
import { isAdmin } from "@/lib/session";
import DashboardShell from "@/components/dashboard/DashboardShell";

export const metadata: Metadata = {
  title: "My Dashboard | Websitero",
  description: "Manage your site, follow your messages and stats in one place.",
};

// Per-user data (session lookup later) + live trial countdown: never prerender.
export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /* The admin gets the dashboard like anyone else.

     This used to redirect them straight to /admin/briefs, on the reasoning that
     the admin has no site and therefore no dashboard. That's the wrong trade:
     it also made the customer's own view unreachable for the one person who
     needs to see what it looks like — every stage badge, every empty state,
     every button a customer is about to email about. The queue is now one click
     away in the banner below instead of a wall.

     What's kept from that redirect: it's still isAdmin(), not isAdminEmail(),
     that decides. isAdmin() checks emailVerified too, so someone who registered
     the admin address with a password (signup sends no confirmation email) gets
     an ordinary dashboard with no banner, and never learns the queue is there.

     Nothing here is a security boundary. /admin has its own gate in
     app/admin/layout.tsx, which re-checks against the database — this only
     decides whether to draw a link. */
  const [admin, data] = await Promise.all([isAdmin(), getDashboardData()]);

  return (
    <DashboardShell
      // Narrowed deliberately — the shell is a client component, so anything
      // passed here lands in every dashboard page's payload. `user` is the two
      // fields the sidebar prints; the id stays server-side, it has no business
      // in a bundle that renders a name.
      user={{ name: data.user.name, email: data.user.email }}
      site={toShellSite(data.site)}
      diy={data.diy}
      credits={data.credits}
      locale={data.user.locale}
    >
      {/* Signed in as the admin, on a page that looks like a customer's. Says
          so plainly, because this view is deliberately indistinguishable from
          what an owner sees — and carries the way back to the team side, which
          the header can't: it hides itself under /dashboard. */}
      {admin && (
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 sm:flex-row sm:items-center">
          <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <ShieldCheck className="h-4 w-4 shrink-0 text-blue-500" />
            You&apos;re the admin — this is the customer view of your own account.
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
            <Link
              href="/admin/overview"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-500/40 hover:text-blue-700"
            >
              <Users className="h-3.5 w-3.5 text-blue-500" />
              Overview
            </Link>
            <Link
              href="/admin/briefs"
              className="inline-flex items-center gap-1.5 rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <Inbox className="h-3.5 w-3.5" />
              Brief queue
            </Link>
          </div>
        </div>
      )}
      {children}
    </DashboardShell>
  );
}
