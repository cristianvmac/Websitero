"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";
import { auth } from "@/lib/auth";
import { currentUser } from "@/lib/session";
import { accountHasPassword } from "./account-info";

/* The profile's three writes. Same shape as lib/auth-actions.ts — outcomes come
   back as values for useActionState, not thrown — but these run against an
   already-signed-in caller, so each one starts by asking lib/session.ts who that
   is rather than trusting anything in the form.

   Note what is NOT here: changing the email address. Better Auth would want to
   verify the new one, and this app deliberately sends no verification mail
   (see lib/auth.ts). Shipping an unverified email change would let someone
   retype their address into a stranger's and then claim briefs by email match —
   the exact hole the emailVerified guard in src/data/dashboard.ts exists to
   close. Until there's a verification flow, the address is read-only and the
   page says so. */

export type AccountState = { error?: string; notice?: string } | null;

/** Every action revalidates: the name shows up in the sidebar and the topbar,
    which are rendered by the dashboard layout, not by this page. */
function refresh() {
  revalidatePath("/dashboard", "layout");
}

export async function updateProfile(
  _prev: AccountState,
  formData: FormData,
): Promise<AccountState> {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "What should we call you?" };
  if (name.length > 80) return { error: "That name is a little long — 80 characters max." };

  const user = await currentUser();
  if (!user) return { error: "You're signed out — reload the page and try again." };

  try {
    await auth.api.updateUser({ body: { name }, headers: await headers() });
  } catch (err) {
    if (err instanceof APIError) return { error: "We couldn't save that — please try again." };
    throw err;
  }

  refresh();
  return { notice: "Saved." };
}

/* Password, in two flavours depending on how the account signs in today.

   Has a password  → changePassword, which requires the current one. That check
                     is the point: it's what stops a borrowed open session from
                     locking the real owner out of their own account.
   Google only     → setPassword, no current password to prove because there
                     isn't one. Safe here and ONLY here: this runs behind a
                     verified session on the caller's own account, so the person
                     setting it has already proven they are the owner. It adds a
                     second way in for accounts that would otherwise be locked
                     out the day Google access is lost.

   Both revoke other sessions. A password change is what someone does when they
   think a session isn't theirs, and leaving those alive would make the gesture
   meaningless. */

export async function changePassword(
  _prev: AccountState,
  formData: FormData,
): Promise<AccountState> {
  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  // Mirrors minPasswordLength in lib/auth.ts and the signup form — keep in sync.
  if (newPassword.length < 8) return { error: "Use at least 8 characters for your password." };
  if (newPassword !== confirmPassword) return { error: "Those passwords don't match." };

  const user = await currentUser();
  if (!user) return { error: "You're signed out — reload the page and try again." };

  const hasPassword = await accountHasPassword();

  try {
    if (hasPassword) {
      if (!currentPassword) return { error: "Enter your current password." };
      await auth.api.changePassword({
        body: { currentPassword, newPassword, revokeOtherSessions: true },
        headers: await headers(),
      });
    } else {
      await auth.api.setPassword({ body: { newPassword }, headers: await headers() });
    }
  } catch (err) {
    if (err instanceof APIError) {
      // The one failure worth naming: they mistyped the current password.
      // Everything else collapses into a generic line rather than narrating
      // internals back to the browser.
      return hasPassword
        ? { error: "That current password isn't right." }
        : { error: "We couldn't set your password — please try again." };
    }
    throw err;
  }

  refresh();
  return {
    notice: hasPassword
      ? "Password updated. Any other devices were signed out."
      : "Password set — you can now sign in with your email too.",
  };
}
