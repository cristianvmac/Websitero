"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

/* The one way to log out. Every caller passes its own className and children,
   so the three places this appears keep the styling they had.

   Why this is a client call and not the server action it replaced: the header
   reads the session through useSession(), whose store is a module-level cache
   in the browser, filled once from /api/auth/get-session. A server action can
   clear the cookie and redirect, but it cannot reach into that store — so the
   nav went on rendering the signed-out user's name until a full reload
   refetched it. authClient.signOut() clears the cookie AND the store, which is
   the whole reason for routing through it.

   router.refresh() after the push is not redundant: it drops the RSC cache, so
   any server component still holding a rendered-for-that-user payload is
   re-fetched rather than replayed. */

export default function LogOutButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logOut() {
    if (busy) return; // a second click mid-flight would race the navigation
    setBusy(true);
    try {
      await authClient.signOut();
    } catch {
      // Revoking failed (offline, server down). Leaving them on the page with a
      // dropdown that says "Log Out" reads as "nothing happened", so still send
      // them to /login — the cookie may survive, but the next authoritative
      // check (lib/session.ts) is what decides anything that matters.
    }
    router.push("/login");
    router.refresh();
  }

  return (
    <button type="button" onClick={logOut} disabled={busy} className={className}>
      {children}
    </button>
  );
}
