import React from "react";
import type { Example } from "../types/codePreview";
import { sampleRoot, sampleHtml, sampleCss, sampleJs } from "../samples/samplesLocationButton";
import Image from "next/image";
import screenshotSrc from "../images/AstroButtonLocation.png";


export const buttonsLocationButton: Example = {
  title: "Button Location",
  description: "A stylish location contact button with a 3D flip animation on hover. It combines an icon and text in a clean horizontal layout, using subtle motion and depth to create an engaging, modern way to display address or contact information.",
  code: { root: sampleRoot, html: sampleHtml, css: sampleCss, js: sampleJs },
  preview: (
    <Image
      src={screenshotSrc}
      alt="Location Button"
      width={600}
      height={100}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  ),
};
