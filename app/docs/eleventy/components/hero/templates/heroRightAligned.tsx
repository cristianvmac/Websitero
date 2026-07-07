import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesRightAligned";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotRightAligned.png";


export const heroRightAligned: Example = {
  title: "Right Aligned",
  description: "Responsive hero with text and imagery in equal focus, featuring accent-highlighted headlines and a streamlined call-to-action.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Basic Hero Right Aligned"
      width={1871}
      height={897}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
