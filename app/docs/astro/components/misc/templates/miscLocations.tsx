import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesLocations";
import Image from "next/image";
import screenshotSrc from "../images/AstroMiscLocations2.png";


export const miscLocations: Example = {
  title: "MISC - Locations",
  description: "A responsive locations section showcasing multiple office branches with contact details and background visuals. Designed for clarity, accessibility, and seamless navigation across devices.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Misc Locations"
      width={900}
      height={500}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
