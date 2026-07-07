import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesLinks";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotGalleryLinks.png";


export const galleryLinks: Example = {
  title: "Gallery +Links",
  description: "Browse a selection of our completed projects — hover over each image to learn more, or view the full gallery for an in-depth look at our work.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Gallery +Links"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
