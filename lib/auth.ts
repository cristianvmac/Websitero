import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { dash } from "@better-auth/infra";
import { Pool } from "pg";
import { sendMail } from "./mailer";

/* Better Auth, replacing Supabase Auth (the database and storage stay on
   Supabase — lib/supabase.ts is untouched). Users, sessions, and accounts live
   in our own Postgres tables; see supabase/migrations/0002_better_auth.sql for
   the schema and the RLS that keeps PostgREST away from it.

   Two things auth gains by living here rather than in Supabase's service:
   Google's consent screen shows OUR domain (the OAuth callback is
   /api/auth/callback/google on this app, not <project>.supabase.co), and email
   sending is ours — no 2-per-hour built-in throttle, dev prints links to the
   terminal via lib/mailer.ts.

   No `server-only` guard in this file: the Better Auth CLI must load it outside
   Next to manage schema. The secret key surface (session minting) is guarded by
   placement — only lib/session.ts, lib/auth-actions.ts, and the /api/auth
   handler import it, and those are server modules. */

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? "https://websitero.vercel.app/",
  secret: process.env.BETTER_AUTH_SECRET,

  /* A direct Postgres connection — Better Auth speaks SQL, not PostgREST.
     DATABASE_URL should be Supabase's *transaction pooler* string (port 6543):
     serverless functions scale horizontally, so real pooling has to happen on
     Supabase's side; the small max here is per-instance. TLS is on for anything
     that isn't localhost — the pooler requires it, but Supabase terminates with
     certs node-postgres can't chain, hence rejectUnauthorized: false. */
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL?.includes("localhost")
      ? undefined
      : { rejectUnauthorized: false },
    max: 3,
  }),

  emailAndPassword: {
    enabled: true,
    // Matches the signup form's client-side check — keep the two in sync.
    minPasswordLength: 8,
    /* Signing up is the whole funnel for owners who are not technical, so it
       costs nothing but a password: no confirmation link, no waiting on an
       inbox, straight to the dashboard.

       What that gives up is proof of address ownership, which the dashboard
       used to lean on to decide whose brief is whose. That proof now comes from
       the signed claim cookie dropped at submission (lib/brief-claim.ts), so
       nothing here is load-bearing for it any more. The emailVerified guard in
       src/data/dashboard.ts still stands and must NOT be removed: it's what
       keeps the email-matching path (Google accounts, which self-verify) from
       handing a stranger someone else's business documents. */
    requireEmailVerification: false,
    // Password reset is the one flow still worth an email — it's a recovery
    // path, so the link IS the proof. RESEND_API_KEY only gates this now.
    sendResetPassword: async ({ user, url }) => {
      await sendMail({
        to: user.email,
        subject: "Reset your Websitero password",
        text:
          `Hi ${user.name || "there"},\n\n` +
          `Someone asked to reset the password for this address. If it was you, ` +
          `follow this link to choose a new one:\n\n${url}\n\n` +
          `If it wasn't you, ignore this email — nothing changes.\n\n— Websitero`,
      });
    },
  },

  /* No emailVerification block: nothing sends a confirmation link any more, and
     with requireEmailVerification off nothing would block on one. Password
     accounts therefore live permanently at emailVerified: false — that's the
     intended state, not a bug, and src/data/dashboard.ts reads it as "this
     address was never proven, don't match briefs on it". Google accounts land
     with emailVerified: true because Google has already done the checking. */

  socialProviders: {
    google: {
      // The same OAuth client that served Supabase Auth — only its redirect URI
      // list changes: add ${BETTER_AUTH_URL}/api/auth/callback/google.
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },

  /* Account linking is left at Better Auth's defaults, and the default that
     matters here is requireLocalEmailVerified: true. Consequence, now that
     password accounts never verify: an address that signed up with a password
     can NOT later attach Google — the callback bounces to
     /login?error=account_not_linked, which app/login/page.tsx explains and
     points back at the password.

     Do not "fix" that by setting requireLocalEmailVerified: false. It is the
     only thing standing between us and pre-registration account takeover:
     register victim@example.com with a password (nothing verifies it), wait for
     them to click "Continue with Google", and their Google identity lands on the
     account whose password you chose. Verification used to make this moot; the
     default now carries it alone. */

  plugins: [
    /* Better Auth's hosted dashboard (dash.better-auth.com) reading this app's
       users and sessions. Reads its credential from BETTER_AUTH_API_KEY unless
       an apiKey is passed here — leave it in the environment, it's a secret. */
    dash(),

    // Must stay LAST — anything after it doesn't get its cookies written. Lets
    // auth.api calls made inside server actions write through next/headers
    // instead of a Response object.
    nextCookies(),
  ],
});
