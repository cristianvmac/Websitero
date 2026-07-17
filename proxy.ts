import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/* Two gates on two different populations, so two mechanisms.

   /dashboard — customers, holding a Better Auth session cookie. The check here
   is deliberately shallow: does a session cookie exist at all? No database in
   the hot path. The authoritative lookup (is that cookie a live session?)
   happens in the data layer — src/data/dashboard.ts redirects to /login when
   the answer is no. So this gate is UX (anonymous visitors bounce immediately);
   the security boundary is one layer down, where the session table is.

   /admin, /api/admin, /api/briefs — the team, holding one shared password over
   HTTP Basic. No users, no audit trail, no logout; it exists so the app can be
   deployed without exposing customer materials (contact details, uploaded docs)
   and an open DELETE that also wipes a customer's workspace. Once the team has
   real accounts this collapses into a role check on the session above.

   Everything else is public — /, /forme, /builditforme, /api/forme,
   /api/uploads/sign (owners submit without an account), /login, /signup,
   /forgot-password, /reset-password, and /api/auth/* (the doors people use to
   GET a session — Better Auth's own token and state checks live there). */

// ---------------------------------------------------------------- customers

function guardDashboard(req: NextRequest) {
  if (!getSessionCookie(req)) {
    const login = new URL("/login", req.url);
    login.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}

// -------------------------------------------------------------------- team

const CHALLENGE = 'Basic realm="Websitero admin", charset="UTF-8"';

// No early exit on mismatch, so a wrong guess takes the same time to reject
// however much of the password it got right.
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// "Basic base64(user:pass)" — the user half is ignored, and the password may
// itself contain colons, so split on the first one only.
function passwordFrom(header: string | null) {
  if (!header?.startsWith("Basic ")) return null;
  try {
    const bytes = Uint8Array.from(atob(header.slice(6)), (c) => c.charCodeAt(0));
    const decoded = new TextDecoder().decode(bytes);
    const sep = decoded.indexOf(":");
    return sep === -1 ? null : decoded.slice(sep + 1);
  } catch {
    return null; // malformed base64
  }
}

function guardAdmin(req: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD;
  // Fail closed: a missing password locks the queue rather than opening it.
  if (!expected) {
    return new NextResponse("Admin is not configured.", { status: 503 });
  }

  const given = passwordFrom(req.headers.get("authorization"));
  if (given !== null && safeEqual(given, expected)) {
    return NextResponse.next();
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": CHALLENGE },
  });
}

// --------------------------------------------------------------------------

export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/dashboard")) return guardDashboard(req);
  return guardAdmin(req);
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/api/admin/:path*", "/api/briefs/:path*"],
};
