import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesMain";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotServicesMain.png";


export const servicesMain: Example = {
  title: "Services",
  description: "A responsive three-card Services section (mobile-first, with dark mode support).",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Services Main"
      width={900}
      height={500}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};