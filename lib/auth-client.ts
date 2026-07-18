"use client";

import { createAuthClient } from "better-auth/react";

/* The ONE piece of auth that runs in the browser, and it exists for exactly one
   reason: the marketing header.

   Everything else stays server-side on purpose (lib/auth-actions.ts) — no
   password ever touches a client bundle. But the header lives in the root
   layout, above every page on the site. Reading the session there on the server
   means calling cookies() in the root layout, which opts the entire marketing
   site out of static rendering — the whole landing page re-rendered per request
   so a nav item can say "Ana" instead of "Login". Not worth it.

   So the header asks /api/auth/get-session from the browser instead. That
   endpoint is already public (the [...all] route handler serves it), it returns
   only the caller's own session, and no credential passes through here. Static
   pages stay static; the nav fills in a moment after hydration.

   Nothing security-relevant may gate on this. It is a display name. Every
   actual decision — who owns which brief, who may see what — goes through
   lib/session.ts, which verifies against the session table. */

export const authClient = createAuthClient();

export const { useSession } = authClient;
