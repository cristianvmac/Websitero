import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesMultiCollection";
import Image from "next/image";
import screenshotSrc from "../images/AstroEcommerceMultiCollection.png";


export const ecommerceMultiCollection: Example = {
  title: "Ecommerce Multi Collection",
  description: "A filterable product collection gallery with animated category tabs, sale badges, star ratings, and dark mode — built with vanilla JS, CSS Grid, and 3D flip transitions.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Multi Collection"
      width={900}
      height={500}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
