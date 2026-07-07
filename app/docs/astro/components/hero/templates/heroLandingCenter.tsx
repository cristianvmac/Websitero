import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesLandingCenter";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotLandingCenter.png";


export const heroLandingCenter: Example = {
  title: "Landing Center",
  description: "Full-width hero with bold centered content, action-focused buttons, and a dramatic background image enhanced by subtle decorative side lines.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Landing Center"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
