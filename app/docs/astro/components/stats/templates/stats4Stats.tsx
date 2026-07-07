import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samples4Stats";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotStats4Stats.png";


export const stats4Stats: Example = {
  title: "Stats - 4 Stats",
  description: "A stats section highlighting key metrics with supporting content and visuals.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Stats 4Stats"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
