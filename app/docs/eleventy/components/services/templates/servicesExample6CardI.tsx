import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samples6CardImages";
import Image from "next/image";
import screenshotSrc from "../images/Screenshot Services6CardImages.png";


export const servicesExample6CardI: Example = {
  title: "Services 6 Card Images",
  description: "A centered title above a 3×2 grid of full-bleed image cards with a dark overlay, white centered title text, and an orange overlay zoom effect on hover.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Services 6 Card Images"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
