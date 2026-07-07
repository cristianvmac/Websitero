import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesContactFormMap";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotFormsContactMap.png";


export const formscontactContactFormMap: Example = {
  title: "Forms Contact",
  description: "A responsive contact section with a form, embedded map, location details, and working hours in a modern layout.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Forms Contact map"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
