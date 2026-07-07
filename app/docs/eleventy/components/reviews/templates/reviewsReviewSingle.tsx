import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesReviewSingle";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotReviewSingle.png";


export const reviewsReviewSingle: Example = {
  title: "Review - Single",
  description: "A responsive single testimonial section with a featured quote, client details, and a supporting background image.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Review Single"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
