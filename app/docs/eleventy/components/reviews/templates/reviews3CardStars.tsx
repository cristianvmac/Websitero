import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samples3CardStars";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotReviews3CardStars.png";


export const reviews3CardStars: Example = {
  title: "Reviews 3Card",
  description: "A responsive reviews section with customer cards, star ratings, and a call-to-action button in a clean, modern layout.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Reviews 3cardStars"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
