import "server-only";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

/* Reads about how the caller signs in. Deliberately NOT in actions.ts: every
   export of a "use server" file becomes a callable endpoint, and these are
   plain lookups the page does while rendering — there's no reason to publish
   them as RPC. */

/** Providers linked to the caller's account: "credential" for email+password,
    "google" for Google. Both, if they've linked both. */
export async function signInMethods(): Promise<string[]> {
  try {
    const accounts = await auth.api.listUserAccounts({ headers: await headers() });
    return (accounts ?? []).map((a) => a.providerId);
  } catch (err) {
    console.error("[account] could not list sign-in methods:", err);
    return [];
  }
}

/** Whether a password already exists, which decides both the form this page
    renders and which API the change action calls.

    Falls back to `true` when the lookup fails — that's the strict path, asking
    for the current password. Guessing wrong this way costs a confusing form;
    guessing the other way would offer a no-questions password reset to whoever
    happens to hold the session. */
export async function accountHasPassword(methods?: string[]): Promise<boolean> {
  const list = methods ?? (await signInMethods());
  return list.length === 0 ? true : list.includes("credential");
}
