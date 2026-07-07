import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesMain";
import Image from "next/image";
import screenshotSrc from "../images/EleventyContactForm2.png";


export const formscontactMain: Example = {
  title: "Forms Contact",
  description: "Responsive contact form and a contact-info panel (email, phone, address), including dark mode support.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="FormsContact Subscriu"
      width={900}
      height={500}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  ),
};