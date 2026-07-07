import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesContactFormPic";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotFormsContactPic.png";


export const formscontactContactFormPic: Example = {
  title: "Forms Contact",
  description: "A responsive contact section with contact info cards, an image, and a booking form in a clean, modern layout.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Forms Contact"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
