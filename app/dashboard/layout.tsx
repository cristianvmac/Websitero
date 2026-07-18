import type { Metadata } from "next";
import { getDashboardData, toShellSite } from "@/src/data/dashboard";
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
