import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesContentLeft";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotContentLeft.png";


export const heroContentLeft: Example = {
  title: "Content Left",
  description: "Responsive hero with balanced content and imagery, enhanced by rounded corners and a decorative wave divider for smooth section transitions.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Basic Hero ContentLeft"
      width={1832}
      height={897}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
