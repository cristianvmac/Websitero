import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesReverse";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotCTAReverse.png";


export const ctaReverse: Example = {
  title: "CTA Reverse",
  description: "A responsive call-to-action section with a reverse layout, combining engaging text, a strong headline, and a prominent CTA button alongside a supporting image. Designed to adapt across screen sizes with a clean, modern layout and subtle hover interactions.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Reverse CTA"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
