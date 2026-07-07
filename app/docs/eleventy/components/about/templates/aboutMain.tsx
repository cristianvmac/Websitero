import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesMain";
import Image from "next/image";
import screenshotSrc from "../images/EleventyAbout2.png";


export const aboutMain: Example = {
  title: "About Us Side By Side",
  description: "Two-column about section with a stacked image layout on the left and content on the right, featuring a topper, heading, body text, a highlighted quote block with attribution, and a CTA button.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Basic About Us sbs"
      width={900}
      height={500}
      style={{ width: "auto", height: "auto", display: "block" }}
    />
  ),
};
