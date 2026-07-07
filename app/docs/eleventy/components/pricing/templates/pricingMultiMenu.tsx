import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesMultiMenu";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotPricingMultiMenu.png";


export const pricingMultiMenu: Example = {
  title: "Pricing MultiMenu",
  description: "An interactive, category-based menu section that lets users switch between meal types like brunch, lunch, and dinner. Displays dishes with images, descriptions, and prices in a clean, responsive layout, with dynamic filtering and a clear call-to-action for reservations.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Pricing MultiMenu"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
