import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesBeforeAfter";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotSbsBeforeAfter.png";


export const sbsBeforeAfter: Example = {
  title: "Before and After",
  description: "desc. must be changed from template",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Before and After"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};