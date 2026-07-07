import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesPromotions";
import Image from "next/image";
import screenshotSrc from "../images/AstroPromotions.png";


export const ecommercePromotions: Example = {
  title: "Ecommerce Promotions",
  description: "A two-card promotional banner section with full-bleed background images, dark overlays, zoom-on-hover effects, and CTA buttons — responsive CSS Grid, no JavaScript required.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Promotions"
      width={900}
      height={500}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
