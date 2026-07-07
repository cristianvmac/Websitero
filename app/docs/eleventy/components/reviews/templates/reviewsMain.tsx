import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesMain";
import Image from "next/image";
import screenshotSrc from "../images/EleventyReviews5.png";


export const reviewsMain: Example = {
  title: "Reviews",
  description: "A responsive testimonials section with review cards, featuring quotes, headings, and client names in a clean grid layout.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Reviews"
      width={900}
      height={500}
      style={{ width: "auto", height: "100%", display: "block" }}
    />
  ),
};