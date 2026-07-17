import "server-only";
import { headers } from "next/headers";
import { auth } from "./auth";

/* "Who is asking?" for server components and actions.

   This is the authoritative check: it reads the session cookie AND looks the
   session up in the database. proxy.ts deliberately does less (cookie presence
   only, no DB in the hot path), so anything security-relevant must gate on THIS
   answer, not on having gotten past the proxy. A forged or stale cookie gets
   through the proxy and dies here. */

export async function currentUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
}
