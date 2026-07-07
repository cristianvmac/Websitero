import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesQuoteWSlider";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotQuoteWSlider.png";


export const quotesQuoteWSlider: Example = {
  title: "Quote with Slider",
  description: "A testimonial section with quote, author details, and an interactive before/after image slider to showcase real results.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="QuoteWSlider"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
