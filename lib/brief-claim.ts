import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/* Proof that a brief belongs to the person now signing up.

   Briefs are submitted anonymously — that's the /builditforme pitch, no account
   before you see value. So when an account finally appears, something has to
   establish that this brief is theirs. That proof used to be email
   verification: the dashboard matched the contact email typed at submission,
   which was only sound because holding a session meant you'd clicked a link in
   that inbox.

   Signup no longer sends any email, so the proof moves here: submitting a brief
   drops a cookie naming it, and signing up in that same browser claims it. The
   claim is "same browser as the submission" rather than "owns that inbox".

   The id is HMAC'd because the cookie is attacker-writable. Brief ids are random
   uuids, but they also appear in admin URLs and storage paths — so a leaked id
   must not become a claim. The signature means only our server can mint one, and
   BETTER_AUTH_SECRET is already the app's signing root.

   What this deliberately does NOT cover: submitting on a phone and signing up on
   a laptop. That brief stays unclaimed and shows up only in the /admin queue.
   Verified-email matching still runs alongside this (see src/data/dashboard.ts)
   and catches that case for Google accounts, which arrive pre-verified. */

export const CLAIM_COOKIE = "brief_claim";

export const CLAIM_COOKIE_OPTIONS = {
  httpOnly: true,
  // lax, not strict: Google's OAuth callback is a top-level GET redirect from
  // accounts.google.com, and strict would withhold the cookie on exactly that
  // hop — the brief would go unclaimed for everyone who signs up with Google.
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
  // Long enough to survive "I'll finish this tonight", short enough that a
  // shared browser doesn't carry a stale claim forever.
  maxAge: 60 * 60 * 24 * 30,
} as const;

function sign(briefId: string): string {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret) {
    throw new Error("BETTER_AUTH_SECRET must be set — it signs brief claim cookies.");
  }
  return createHmac("sha256", secret).update(briefId).digest("base64url");
}

/** The cookie value handed out when a brief is submitted. */
export function claimToken(briefId: string): string {
  return `${briefId}.${sign(briefId)}`;
}

/** The brief id a cookie legitimately claims, or null if it proves nothing. */
export function readClaim(token: string | undefined): string | null {
  if (!token) return null;

  const dot = token.lastIndexOf(".");
  if (dot === -1) return null;
  const briefId = token.slice(0, dot);
  const given = Buffer.from(token.slice(dot + 1));
  const expected = Buffer.from(sign(briefId));

  // timingSafeEqual throws on a length mismatch rather than returning false.
  if (given.length !== expected.length) return null;
  return timingSafeEqual(given, expected) ? briefId : null;
}
