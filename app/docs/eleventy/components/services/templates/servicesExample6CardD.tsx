import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samples6CardDescription";
import Image from "next/image";
import screenshotSrc from "../images/ScreenshotServices6CardDescription.png";


export const servicesExample6CardD: Example = {
  title: "Services 6 Card Description",
  description: "A responsive “Services” section with a centered intro and six interactive cards, featuring hover effects, icons, and scalable layouts to showcase offerings in a visually engaging grid.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Services 6 Card Description"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
