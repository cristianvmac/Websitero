"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";
import { auth } from "./auth";

/* Sign-in / sign-up / Google / reset, as server actions so the forms in
   app/login, app/signup, app/forgot-password and app/reset-password keep their
   markup and only swap what happens on submit. Running them server-side also
   keeps every auth client out of the browser.

   Errors come back as a value rather than a thrown exception: these forms render
   the message inline via useActionState, and a failed password is an ordinary
   outcome, not an exception. Better Auth signals outcomes with APIError; the
   codes worth distinguishing are mapped below, everything else collapses into a
   safe generic line.

   NOTE for every action here: redirect() works by throwing, so it must stay
   OUTSIDE the try blocks — inside, the catch would eat the redirect itself. */

export interface AuthState {
  error?: string;
  /** Set when the next step is in the person's inbox, not on the page. */
  notice?: string;
  /* Where to go after a successful sign-in or sign-up — returned for the CLIENT
     to navigate to, rather than redirect()ing from here.

     redirect() from a server action is a soft RSC navigation: the browser keeps
     its JS heap, and with it useSession()'s module-level store, still holding
     "signed out" from before the form was submitted. The header would go on
     showing "Login" until a manual reload. The pages below send the browser
     with window.location, a full document load, which rebuilds that store from
     the cookie the action just set. (Google sign-in never had this problem —
     it comes back from Google's domain as a document load already.)

     One reload at sign-in only; every navigation after it stays client-side. */
  redirectTo?: string;
}

const EMAIL_RE = /^\S+@\S+\.\S+$/;

/** Only ever send people to our own paths — `next` and `token` round-trip
    through URLs the visitor can edit. */
function internal(path: string, fallback = "/dashboard") {
  return path.startsWith("/") && !path.startsWith("//") ? path : fallback;
}

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!EMAIL_RE.test(email) || !password) {
    return { error: "Enter your email and password." };
  }

  try {
    await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    });
  } catch (err) {
    if (err instanceof APIError) {
      // Deliberately vague, and deliberately identical for "no such account" and
      // "wrong password", so this form can't be used to enumerate who's
      // registered. Nothing to distinguish beyond that now that unverified
      // accounts sign in like any other.
      return { error: "That email and password don't match." };
    }
    throw err;
  }

  // Honours ?next= — proxy.ts puts the page someone was bounced from there, so
  // an admin sent to /login from /admin/briefs lands back on the queue rather
  // than on a customer dashboard. internal() keeps it to our own paths.
  return { redirectTo: internal(String(formData.get("next") ?? "/dashboard")) };
}

export async function signUp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!name) return { error: "What should we call you?" };
  if (!EMAIL_RE.test(email)) return { error: "That email doesn't look right." };
  if (password.length < 8) return { error: "Use at least 8 characters for your password." };
  if (password !== confirmPassword) return { error: "Those passwords don't match." };

  try {
    await auth.api.signUpEmail({
      body: { name, email, password },
      headers: await headers(),
    });
  } catch (err) {
    if (err instanceof APIError) {
      if (err.body?.code === "USER_ALREADY_EXISTS") {
        return { error: "An account with this email already exists — sign in instead." };
      }
      return { error: err.body?.message ?? "Could not create the account — try again." };
    }
    throw err;
  }

  // No verification step, so signing up already minted the session (nextCookies()
  // wrote it) — there's nothing left in an inbox to wait for. If they submitted a
  // brief in this browser first, the claim cookie rides along and the dashboard
  // redeems it on this very first read.
  return { redirectTo: "/dashboard" };
}

/* "Continue with Google". Nothing here signs anyone in — it asks Better Auth
   for Google's consent-screen URL and sends the browser there. Google returns
   to /api/auth/callback/google on OUR domain (which is also why the consent
   screen names our site, not a vendor's), the handler validates state, creates
   the session, and lands on `next`.

   Google has already verified the address, so these accounts arrive with
   emailVerified set and no email is ever sent. */
export async function signInWithGoogle(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const next = internal(String(formData.get("next") ?? "/dashboard"));

  let url: string | undefined;
  try {
    const res = await auth.api.signInSocial({
      body: {
        provider: "google",
        callbackURL: next,
        // Failures land back on the login page; Better Auth appends its own
        // ?error=<code>, which the page maps to a human sentence.
        errorCallbackURL: "/login",
      },
      headers: await headers(),
    });
    url = res.url ?? undefined;
  } catch {
    url = undefined;
  }

  if (!url) {
    return { error: "Couldn't reach Google just now — try again, or use your email below." };
  }
  redirect(url);
}

export async function requestPasswordReset(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!EMAIL_RE.test(email)) return { error: "That email doesn't look right." };

  try {
    await auth.api.requestPasswordReset({
      // The emailed link verifies its token, then forwards to
      // /reset-password?token=… where the new password is chosen.
      body: { email, redirectTo: "/reset-password" },
    });
  } catch {
    // Deliberately swallowed: the reply must be identical whether or not the
    // address has an account, or this form reveals who's registered.
  }

  return { notice: "If that email has an account, a reset link is on its way." };
}

export async function resetPassword(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!token) {
    return { error: "This reset link looks incomplete — request a new one." };
  }
  if (password.length < 8) return { error: "Use at least 8 characters for your password." };
  if (password !== confirmPassword) return { error: "Those passwords don't match." };

  try {
    await auth.api.resetPassword({ body: { newPassword: password, token } });
  } catch (err) {
    if (err instanceof APIError) {
      return { error: "That reset link has expired or was already used — request a new one." };
    }
    throw err;
  }

  return { notice: "Password updated. Sign in with the new one." };
}

/* No signOut action here on purpose. Ending a session from the server clears
   the cookie but cannot clear the useSession() store in the browser, so the
   header kept rendering the signed-out user until a full reload. Logging out
   goes through components/auth/LogOutButton.tsx instead, which clears both. */
