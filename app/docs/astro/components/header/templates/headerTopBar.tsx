import React from "react";
import type { Example } from "../types/codePreview";
import { LandingHeader } from "../blocks/LandingHeader";
import { LandingHeaderMenuItem } from "../blocks/LandingHeaderMenuItem";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesTBDropdownBuild";
import Image from "next/image";
import ScreenshotSrc from "../images/dropdownBuildStitch/ScreenshotGif5.gif";

export const headerTopBar: Example = {
  title: "Top Bar Header + Dropdown",
  description: "A two-row header with a top bar showing social icons and location info, and a bottom bar with logo, nav links, a dropdown, and a phone CTA — collapses to a dark side-drawer on mobile.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    /*<LandingHeader withBackground variant="secondary">
      <LandingHeaderMenuItem href="#" label="Product" subItems={productSubItems} />
      <LandingHeaderMenuItem href="#" label="Pricing" />
      <LandingHeaderMenuItem href="#" label="Company" />
    </LandingHeader>*/
    <Image
        src={ScreenshotSrc}
        alt="Top Bar Header + Dropdown"
        width={600}
        height={100}
        style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
