import { notFound } from "next/navigation";
import { isAdmin } from "@/lib/session";

/* The real gate on everything under /admin.

   proxy.ts only established that the visitor is signed in as somebody; this is
   where "somebody" has to be the one admin account (lib/admin.ts). A layout
   rather than a check inside each page, so a new admin route is protected the
   moment it exists instead of the moment someone remembers to guard it.

   notFound() rather than redirect(): a signed-in customer who wanders here
   learns that /admin/briefs is not a page for them, not that it is a page
   they're missing the rights for. Nothing on the site links there for anyone
   else — components/ui/Header.tsx shows the Briefs link only to the admin. */

export const dynamic = "force-dynamic"; // never cache a page whose gate is per-user

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) notFound();
  return <>{children}</>;
}
