import React from "react";
import type { Example } from "../types/codePreview";
import { LandingHeader } from "../blocks/LandingHeader";
import { LandingHeaderMenuItem } from "../blocks/LandingHeaderMenuItem";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesTBDropdownInv";
import Image from "next/image";
import screenshotSrc from "../images/dropdownInvetex/ScreenshotGif7.gif";

export const headerTopBarInv: Example = {
  title: "Top Bar Header + Dropdown",
  description: "A two-row header with a white top bar holding the logo, email, address, and a CTA button, and a dark bottom bar with nav links, a dropdown, and a phone number.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    /*<LandingHeader withBackground>
      <LandingHeaderMenuItem href="#" label="Product" subItems={productSubItems} />
      <LandingHeaderMenuItem href="#" label="Pricing" />
      <LandingHeaderMenuItem href="#" label="Company" />
    </LandingHeader>*/
    <Image
        src={screenshotSrc}
        alt="Top Bar Header + Dropdown"
        width={600}
        height={100}
        style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};