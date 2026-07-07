import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesLandingServices";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotLandingServices.png";


export const heroLandingServices: Example = {
  title: "Landing + Services",
  description: "Centered hero with dramatic angled shapes, a strong CTA, parallax background on desktop, and feature cards that seamlessly bridge into the next section.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Basic Hero Landing Services"
      width={1891}
      height={806}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
