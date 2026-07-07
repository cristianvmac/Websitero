import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesPriceMenu";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotPricingPriceMenu.png";


export const pricingPriceMenu: Example = {
  title: "Pricing - Price Menu",
  description: "A clean and responsive pricing section that presents services with clear titles, descriptions, and prices in a structured two-column layout for easy scanning.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Pricing PriceMenu"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
