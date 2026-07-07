import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesInteractive";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotPricingInteractive.png";


export const pricingInteractive: Example = {
  title: "Pricing - Interactive",
  description: "Selectable pricing plans with a dynamic feature list that updates as users switch between tiers, each showing its price and included services.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Pricing interactive"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
