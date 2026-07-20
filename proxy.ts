import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/* One mechanism now — a Better Auth session cookie — gating two populations at
   two different depths.

   Every check here is deliberately shallow: does a session cookie exist at all?
   No database in the hot path. It is UX, not the security boundary — anonymous
   visitors bounce immediately instead of loading a page that would redirect
   them anyway. A forged or stale cookie sails through this file and dies one
   layer down, where the session table is.

   /dashboard — customers. The authoritative lookup lives in the data layer;
   src/data/dashboard.ts redirects to /login when the cookie isn't a live
   session.

   /admin, /api/admin, /api/briefs — the admin, and there is exactly one (see
   lib/admin.ts). This used to be a shared password over HTTP Basic; it is now
   a role check on the same session customers hold, which is what that comment
   said should happen once the team had real accounts. The authoritative half —
   is this session the admin's, and is that address actually verified? — is
   isAdmin() in lib/session.ts, enforced by app/admin/layout.tsx for pages and
   at the top of each handler in app/api/briefs/[id]/route.ts. Getting past
   this file only proves someone is signed in as *somebody*.

   Everything else is public — /, /forme, /builditforme, /api/forme,
   /api/uploads/sign (owners submit without an account), /login, /signup,
   /forgot-password, /reset-password, and /api/auth/* (the doors people use to
   GET a session — Better Auth's own token and state checks live there). */

export function proxy(req: NextRequest) {
  if (getSessionCookie(req)) return NextResponse.next();

  // API callers get a status they can act on; people get sent somewhere useful.
  if (req.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  }

  const login = new URL("/login", req.url);
  login.searchParams.set("next", req.nextUrl.pathname);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/api/admin/:path*", "/api/briefs/:path*"],
};
