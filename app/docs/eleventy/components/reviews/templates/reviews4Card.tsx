import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samples4Card";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotReviews4Card.png";


export const reviews4Card: Example = {
  title: "Reviews 4 Card",
  description: "A responsive testimonials section with four review cards, featuring quotes, headings, and client names in a clean grid layout.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Reviews 4Card"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
