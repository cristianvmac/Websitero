import { Zap, Rocket, type LucideIcon } from "lucide-react";

export type FrameworkKey = "eleventy" | "astro";

export interface Framework {
  key: FrameworkKey;
  name: string;
  icon: LucideIcon;
  tagline: string;
  command: string;
  docs: string;
  accent: string; // hex
  highlights: string[];
  bestFor: string;
}

export const FRAMEWORKS: Record<FrameworkKey, Framework> = {
  eleventy: {
    key: "eleventy",
    name: "Eleventy",
    icon: Zap,
    tagline: "Simple, fast, zero-JS by default",
    command: "npx degit websitero/eleventy my-site",
    docs: "/docs/eleventy",
    accent: "#0ea5e9",
    bestFor: "Best for business & marketing sites",
    highlights: [
      "Ships zero JavaScript by default",
      "Plain HTML/CSS/JS you fully own",
      "SEO & Google Business Profile ready",
      "Deploys free to Netlify in minutes",
    ],
  },
  astro: {
    key: "astro",
    name: "Astro",
    icon: Rocket,
    tagline: "Modern islands with a CMS-powered blog",
    command: "npm create websitero@latest",
    docs: "/docs/astro",
    accent: "#8b5cf6",
    bestFor: "Best for content-rich & interactive sites",
    highlights: [
      "Component islands, bring your own framework",
      "CMS-powered blog with Decap out of the box",
      "Type-safe content collections",
      "Auto-optimized images & assets",
    ],
  },
};

export const FRAMEWORK_ORDER: FrameworkKey[] = ["eleventy", "astro"];
