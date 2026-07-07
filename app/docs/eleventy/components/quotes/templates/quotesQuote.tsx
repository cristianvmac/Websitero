import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesQuote";
import Image from "next/image";
import screenshotSrc from "../images/EleventyQuote.png";


export const quotesQuote: Example = {
  title: "Simple Quote",
  description: "A full-width quote/testimonial section with background image, highlighted message, and author details, designed to add credibility and visual impact.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Simple Quote"
      width={900}
      height={500}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
