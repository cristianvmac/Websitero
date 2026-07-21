import type { Metadata } from "next";
import { redirect } from "next/navigation";
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
  /* The admin has no dashboard — send them to the queue instead.

     Here rather than at the login form because the redirect target is picked
     before anyone is signed in: /login and GoogleButton bake "/dashboard" into
     a hidden field, and Google's callbackURL is fixed when the consent URL is
     minted. This runs once the session exists, so it catches every way in —
     password, Google, signup, a bookmark — and every page under /dashboard,
     including ones added later.

     Before getDashboardData(): that call redirects to /login for an account
     with no customer rows, which would fire first and send the admin somewhere
     wrong. isAdmin() also checks emailVerified, so someone who registered the
     admin address with a password (signup sends no confirmation email) gets an
     ordinary dashboard and never learns the queue is there. */
  if (await isAdmin()) redirect("/admin/briefs");

  const data = await getDashboardData();

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
      {children}
    </DashboardShell>
  );
}
