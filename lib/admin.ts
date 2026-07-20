/* Who the admin is.

   Exactly one address. There is no roles table and no admin flag on the user
   row — an account is the admin because its verified email matches this
   constant, and nothing in the app can grant that to anyone else. Adding a
   second admin means editing this file and deploying, which is deliberate:
   the admin queue holds every customer's contact details and uploaded
   documents, so the list of people who can read it should move at the speed
   of a code review, not a database write.

   Not a secret, and imported by client code (the header decides whether to
   show the Briefs link), so it lives in source rather than the environment —
   NEXT_PUBLIC_ vars are inlined into the bundle anyway. */

export const ADMIN_EMAIL = "info.websitero@gmail.com";

export function isAdminEmail(email: string | null | undefined) {
  return typeof email === "string" && email.trim().toLowerCase() === ADMIN_EMAIL;
}
