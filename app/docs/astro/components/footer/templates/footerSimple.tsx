import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesSimple";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotFooterSimple.png";


export const footerSimple: Example = {
  title: "Footer Simple",
  description: "A simple and clean footer section featuring centered navigation links and a copyright notice. Designed with a minimalist layout, it remains fully responsive while providing clear site navigation and a polished finish to the page.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Basic Footer"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
