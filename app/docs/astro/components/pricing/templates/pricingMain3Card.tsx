import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesMain3Card";
import Image from "next/image";
import screenshotSrc from "../images/AstroPricing6.png";


export const pricingMain3Card: Example = {
  title: "Pricing 3Card",
  description: "A responsive three-tier pricing component featuring plan cards (Starter, Growth, Premium) with a highlighted 'Popular' plan, included-feature checklists with enabled/disabled states, dark mode support, and animated CTA buttons.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Pricing 3Card"
      width={850}
      height={530}
      style={{ width: "auto", height: "100%", display: "block" }}
    />
  ),
};
