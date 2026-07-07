import React from "react";
import type { Example } from "../types/codePreview";
import { LandingHeader } from "../blocks/LandingHeader";
import { LandingHeaderMenuItem } from "../blocks/LandingHeaderMenuItem";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesFloating";
import Image from "next/image";
import screenshotSrc from "../images/floating/ScreenshotGif3.gif";

export const headerFloatingHeader: Example = {
  title: "Floating Header + Dropdown",
  description: "A floating navbar with logo, centered nav links, a dropdown, phone number, and social icons — shrinks to full-width on scroll.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    /*<LandingHeader withBackground>
      <LandingHeaderMenuItem href="#" label="Product" subItems={productSubItems} />
      <LandingHeaderMenuItem href="#" label="Pricing" />
      <LandingHeaderMenuItem href="#" label="Company" />
    </LandingHeader>*/
    <Image
          src={screenshotSrc}
          alt="Floating Header preview"
          width={600}
          height={100}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
  ),
};
