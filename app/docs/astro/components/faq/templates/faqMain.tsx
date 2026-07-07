import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesMain";
import Image from "next/image";
import screenshotSrc from "../images/AstroFAQ.png";


export const faqMain: Example = {
  title: "FAQ",
  description: "Responsive FAQ section with expandable accordion items, organized questions and answers, and a contact call-to-action for additional support.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Faq Main"
      width={900}
      height={500}
      style={{ width: "auto", height: "auto", display: "block" }}
    />
  ),
};