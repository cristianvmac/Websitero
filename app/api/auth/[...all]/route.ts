import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

/* Every Better Auth endpoint mounts here: OAuth callbacks
   (/api/auth/callback/google), email verification and password-reset links,
   session reads. Public by design — these are the doors people use to get a
   session in the first place; each endpoint does its own token/state checks. */

export const { GET, POST } = toNextJsHandler(auth);
