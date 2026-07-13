export type DashboardSite = {
  name: string;
  slug: string;
  /** Public URL of the live/preview site. */
  url: string;
  /** Where the owner edits the site (visual editor / studio). */
  editUrl: string;
  status: "trial" | "active";
};

export type ChecklistStep = {
  id: string;
  label: string;
  done: boolean;
  /** Shown as the row action when the step is not done yet. */
  action?: { label: string; href: string };
};

export type DashboardUser = {
  id: string;
  name: string;
  email: string;
  locale: string;
};

export type DashboardData = {
  user: DashboardUser;
  site: DashboardSite;
  /** null once the site is bought. */
  trialEndsAt: string | null;
  plan: { monthly: number; yearly: number; currency: string };
  credits: { available: number; freePerMonth: number };
  seo: { articlesPublished: number; lastArticleAt: string | null; autopilot: boolean };
  checklist: ChecklistStep[];
};

/**
 * TODO: replace with the real session lookup once auth lands — read the user
 * from the session cookie, then load their site/plan/credits from the DB.
 * Everything the dashboard renders comes through here, so the UI needs no
 * changes when this becomes a real query.
 */
export async function getDashboardData(): Promise<DashboardData> {
  const trialEndsAt = new Date(Date.now() + 5 * 24 * 3600_000 + 2 * 3600_000).toISOString();

  return {
    user: {
      id: "demo-user",
      name: "Gigi",
      email: "owner@example.com",
      locale: "English",
    },
    site: {
      name: "Gigi Bakery",
      slug: "gigi-bakery",
      url: "/previews/gigi-bakery",
      editUrl: "/previews/gigi-bakery",
      status: "trial",
    },
    trialEndsAt,
    plan: { monthly: 17, yearly: 150, currency: "€" },
    credits: { available: 15, freePerMonth: 15 },
    seo: { articlesPublished: 0, lastArticleAt: null, autopilot: false },
    checklist: [
      { id: "created", label: "Site created", done: true },
      {
        id: "logo",
        label: "Logo added",
        done: false,
        action: { label: "Add my logo", href: "/dashboard/appearance" },
      },
      { id: "photos", label: "Personal photos", done: true },
      {
        id: "seo",
        label: "SEO — write your first blog article",
        done: false,
        action: { label: "Write an article", href: "/dashboard/content" },
      },
      {
        id: "domain",
        label: "Connect your domain",
        done: false,
        action: { label: "Connect domain", href: "/dashboard/settings" },
      },
      {
        id: "contact",
        label: "Contact details filled in",
        done: false,
        action: { label: "Add details", href: "/dashboard/settings" },
      },
    ],
  };
}

/** Yearly discount vs. paying monthly, e.g. -26%. */
export function yearlyDiscount(plan: DashboardData["plan"]): number {
  return Math.round((1 - plan.yearly / (plan.monthly * 12)) * 100);
}

/** "5d 2h" — remaining trial time, or null when the trial is over/absent. */
export function trialRemaining(trialEndsAt: string | null): string | null {
  if (!trialEndsAt) return null;
  const ms = new Date(trialEndsAt).getTime() - Date.now();
  if (ms <= 0) return null;
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  return days > 0 ? `${days}d ${hours}h` : `${hours}h`;
}
