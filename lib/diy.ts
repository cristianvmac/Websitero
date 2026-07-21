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

/* ---------------------------------------------------------------- git remotes

   Where a DIY owner's code lives. This is the link that lets us finish a build
   someone started on their own laptop: they push, we clone, we push a branch
   back, they pull. Hosts are allow-listed because the point of storing it is
   that a developer can `git clone` it — an arbitrary URL that happens to parse
   would sit in the admin queue looking actionable and not be. */

export const GIT_HOSTS = ["github.com", "gitlab.com", "bitbucket.org"] as const;

const REPO_HINT = "That doesn't look like a repository — try github.com/you/my-website.";

/* Accepts what people actually paste: a bare host path, an https URL, the
   `git@host:owner/repo.git` form from GitHub's SSH clone box, or a deep link
   to a file (only the first two path segments are kept, so /tree/main/... is
   discarded). Returns the canonical https URL — cloneable exactly as stored —
   or a message to show the owner. An empty input is not an error: it's the
   unlink case, and comes back as an empty url. */
export function normalizeRepoUrl(input: string): { url: string } | { error: string } {
  let raw = input.trim();
  if (!raw) return { url: "" };
  if (raw.length > 2048) return { error: "That address is too long." };

  const ssh = /^git@([^:/]+):(.+)$/.exec(raw);
  if (ssh) raw = `https://${ssh[1]}/${ssh[2]}`;
  else if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return { error: REPO_HINT };
  }

  const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
  if (!(GIT_HOSTS as readonly string[]).includes(host)) {
    return { error: `We can pick up code from ${GIT_HOSTS.join(", ")} — not ${host}.` };
  }

  const [owner, repo] = parsed.pathname.split("/").filter(Boolean);
  if (!owner || !repo) return { error: REPO_HINT };

  return { url: `https://${host}/${owner}/${repo.replace(/\.git$/i, "")}` };
}

/** "owner/repo" — the short form for labels, from an already-normalized URL. */
export function repoSlug(repoUrl: string): string {
  return repoUrl.split("/").slice(-2).join("/");
}
