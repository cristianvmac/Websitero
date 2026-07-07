import React from "react";
import type { Example } from "../types/codePreview";
import { LandingHeader } from "../blocks/LandingHeader";
import { LandingHeaderMenuItem } from "../blocks/LandingHeaderMenuItem";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesStandard";
import Image from "next/image";
import screenshotSrc from "../images/standard/ScreenshotGif.gif";


export const headerStandardHeader: Example = {
  title: "Standard Header + Dropdown",
  description: "A simple header with logo, nav links, a dropdown, and a CTA button.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
   /* <LandingHeader>
      <LandingHeaderMenuItem href="/" label="Product" subItems={productSubItems} />
      <LandingHeaderMenuItem href="/" label="Pricing" />
      <LandingHeaderMenuItem href="/" label="Company" />
    </LandingHeader>
    */
    <Image
      src={screenshotSrc}
      alt="Basic Header preview"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};



// Add GIF instead of IMGs