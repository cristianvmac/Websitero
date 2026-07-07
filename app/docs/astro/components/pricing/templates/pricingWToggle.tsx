import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesWToogle";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotPricingWToggle.png";


export const pricingWToggle: Example = {
  title: "Pricing - WToogle",
  description: "A responsive pricing section with a toggle switch to seamlessly switch between weekly and monthly plans, featuring tiered cards, highlighted popular options, and detailed feature comparisons for each package.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Pricing WToogle"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
