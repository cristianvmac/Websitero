import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesMain";
import Image from "next/image";
import screenshotSrc from "../images/EleventyFooter2.png";


export const footerMain: Example = {
  title: "Footer",
  description: "Professional footer featuring logo branding, navigation menus, contact details, and social media links in a responsive multi-column layout.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Footer"
      width={900}
      height={500}
      style={{ width: "auto", height: "100%", display: "block" }}
    />
  ),
};