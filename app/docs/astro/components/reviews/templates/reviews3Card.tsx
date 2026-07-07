import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samples3Card";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotReviews3Card.png";


export const reviews3Card: Example = {
  title: "Reviews 3 Card",
  description: "A responsive testimonials section with three client review cards showcasing feedback, quotes, and user profiles in a clean layout.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Reviews 3Card"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
