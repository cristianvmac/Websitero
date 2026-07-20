import "server-only";
import { headers } from "next/headers";
import { auth } from "./auth";
import { isAdminEmail } from "./admin";

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

/* "Is the admin asking?" — the gate on the brief queue and its mutations.

   Two conditions, and the second one is not optional. Signup sends no
   confirmation email (see lib/auth.ts), so *anyone* can register
   info.websitero@gmail.com with a password of their choosing; that account
   lands at emailVerified: false and must never count as the admin. Only Google
   sets emailVerified: true, because only Google has actually checked. So the
   admin signs in with Google, and the verified flag is what separates the real
   inbox owner from someone who merely typed its address into a form.

   Same reasoning as the emailVerified guard in src/data/dashboard.ts — do not
   drop it here either. */

export async function isAdmin() {
  const user = await currentUser();
  return Boolean(user?.emailVerified) && isAdminEmail(user?.email);
}
