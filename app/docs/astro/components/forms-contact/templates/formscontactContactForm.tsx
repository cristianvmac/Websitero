import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesContactForm";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotFormsContact.png";


export const formscontactContactForm: Example = {
  title: "Forms Contact",
  description: "A responsive contact section with a form, contact details, and social links in a clean, two-column layout.",
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
