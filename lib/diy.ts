/* The DIY product's vocabulary: the two starter kits and everything the
   dashboard says about them. DIY is a product in its own right, not just a
   funnel into "Build it for me" — this module is its single source of truth,
   consumed by the data layer, the framework-choice action, the kit card, and
   the sidebar.

   The clone commands and repo URLs mirror what the public docs teach
   (app/docs/<framework>/get-started) — if a repo moves, change it here AND
   there. No `server-only` guard: client components render this. */

export const DIY_FRAMEWORKS = ["eleventy", "astro"] as const;

export type DiyFramework = (typeof DIY_FRAMEWORKS)[number];

export const FRAMEWORKS: Record<
  DiyFramework,
  {
    label: string;
    /** One line for the picker — why choose this one. */
    tagline: string;
    repoUrl: string;
    cloneCommand: string;
    docsHref: string;
  }
> = {
  // Eleventy first everywhere it's listed: it's the more complete kit and the
  // one the fulfillment pipeline itself builds on.
  eleventy: {
    label: "Eleventy",
    tagline: "HTML-first and simple — our most complete kit.",
    repoUrl: "https://github.com/cristianvmac/Eleventy-Starter",
    cloneCommand: "git clone https://github.com/cristianvmac/Eleventy-Starter my-website",
    docsHref: "/docs/eleventy",
  },
  astro: {
    label: "Astro",
    tagline: "Modern components, zero JS by default.",
    repoUrl: "https://github.com/cristianvmac/Astro-Starter",
    cloneCommand: "git clone https://github.com/cristianvmac/Astro-Starter my-website",
    docsHref: "/docs/astro",
  },
};

export function isDiyFramework(value: unknown): value is DiyFramework {
  return DIY_FRAMEWORKS.includes(value as DiyFramework);
}
