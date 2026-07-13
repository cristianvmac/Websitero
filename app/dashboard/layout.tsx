import type { Metadata } from "next";
import { getDashboardData } from "@/src/data/dashboard";
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
    <DashboardShell site={data.site} credits={data.credits} locale={data.user.locale}>
      {children}
    </DashboardShell>
  );
}
