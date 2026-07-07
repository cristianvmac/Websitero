import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesComboCTA";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotFooterComboCTA.png";


export const footerComboCTA: Example = {
  title: "Footer Combo+CTA",
  description: "A combined contact and footer section featuring a clean contact form, business details, and a structured footer with navigation links and social icons. Designed for responsiveness and seamless user interaction, it provides an easy way for users to connect while reinforcing brand presence at the end of the page.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="FooterComboCTA"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
