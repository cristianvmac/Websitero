import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesTopCategories";
import Image from "next/image";
import screenshotSrc from "../images/AstroEcommerceTopCategories.png";


export const ecommerceTopCategories: Example = {
  title: "Ecommerce Top Categories",
  description: "A shop-by-collection category grid with image tile cards, frosted-glass labels, and zoom-fade hover effects — responsive 4-column CSS Grid, dark mode ready, no JavaScript.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Top Categories"
      width={900}
      height={500}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
