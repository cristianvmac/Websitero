import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesStats";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotGalleryStats.png";


export const galleryStats: Example = {
  title: "Gallery + Stats",
  description: "A project gallery with supporting experience and results data.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Gallery Stats"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
