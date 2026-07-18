/* The build lifecycle a "Build it for me" site moves through, from the brief
   landing in the queue to the site being live on its own address:

     received → in_build → preview_ready ⇄ changes_requested → approved → live

   This mirrors the check constraint on public.briefs.status (see
   supabase/migrations/0003_build_lifecycle.sql) and is the vocabulary shared by
   the customer dashboard (tracker, approve/request-changes), the admin queue
   (status controls), and the PATCH route that moves briefs between stages.

   No `server-only` guard: client components (the admin status select) need the
   list to render options. Nothing here is secret — it's the same lifecycle the
   customer watches. */

export const SITE_STAGES = [
  "received",
  "in_build",
  "preview_ready",
  "changes_requested",
  "approved",
  "live",
] as const;

export type SiteStage = (typeof SITE_STAGES)[number];

/** Short labels for admin controls and badges; the tracker has its own copy. */
export const STAGE_LABELS: Record<SiteStage, string> = {
  received: "Received",
  in_build: "In build",
  preview_ready: "Preview ready",
  changes_requested: "Changes requested",
  approved: "Approved",
  live: "Live",
};

/* Normalizes whatever the status column holds into a SiteStage. The legacy
   values ('new'…'delivered', from migration 0001) map to their successors so a
   dashboard deployed ahead of the 0003 migration degrades to a sane stage
   instead of crashing; anything unrecognizable reads as freshly received,
   which is the only stage that promises nothing. */
export function asSiteStage(value: unknown): SiteStage {
  if (SITE_STAGES.includes(value as SiteStage)) return value as SiteStage;
  switch (value) {
    case "building":
    case "built": // built locally ≠ a preview the customer can see
      return "in_build";
    case "delivered":
      return "live";
    default:
      return "received";
  }
}
