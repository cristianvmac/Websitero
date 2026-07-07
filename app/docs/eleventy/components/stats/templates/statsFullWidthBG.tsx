import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesFullWidthBG";
import Image from "next/image";
import screenshotSrc from "../images/EleventyStatsFullWidthBG3.png";


export const statsFullWidthBG: Example = {
  title: "Stats FullWidthBG",
  description: "A full-width stats section with a background image and key metrics.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="StatsFullWidthBG"
      width={900}
      height={500}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
