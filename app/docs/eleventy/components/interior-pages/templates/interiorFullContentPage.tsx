import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesFullContentPage";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotFullContentPage.png";


export const interiorFullContentPage: Example = {
  title: "Interior Pages - Full Content Pages",
  description: "A full-width interior page combining a hero banner with breadcrumbs and a rich content section, featuring text, images, and highlight cards. Designed for storytelling, it presents company information in a clean, engaging layout with responsive design and subtle visual elements for a polished user experience.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Interior Pages - FullContentPage"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
