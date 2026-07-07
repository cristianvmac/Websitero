export const sampleRoot = `
:root {
    /* Add these styles to your global stylesheet, which is used across all site pages. You only need to do this once. All elements in the library derive their variables and base styles from this central sheet, simplifying site-wide edits. For instance, if you want to modify how your h2's appear across the site, you just update it once in the global styles, and the changes apply everywhere. */
    --primary: #ff6a3e;
    --primaryLight: #ffba43;
    --secondary: #ffba43;
    --secondaryLight: #ffba43;
    --headerColor: #1a1a1a;
    --bodyTextColor: #4e4b66;
    --bodyTextColorWhite: #fafbfc;
    /* 13px - 16px */
    --topperFontSize: clamp(0.8125rem, 1.6vw, 1rem);
    /* 31px - 49px */
    --headerFontSize: clamp(1.9375rem, 3.9vw, 3.0625rem);
    --bodyFontSize: 1rem;
    /* 60px - 100px top and bottom */
    --sectionPadding: clamp(3.75rem, 7.82vw, 6.25rem) 1rem;
}

body {
    margin: 0;
    padding: 0;
}

*, *:before, *:after {
    /* prevents padding from affecting height and width */
    box-sizing: border-box;
}
.cs-topper {
    font-size: var(--topperFontSize);
    line-height: 1.2em;
    text-transform: uppercase;
    text-align: inherit;
    letter-spacing: .1em;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 0.25rem;
    display: block;
}

.cs-title {
    font-size: var(--headerFontSize);
    font-weight: 900;
    line-height: 1.2em;
    text-align: inherit;
    max-width: 43.75rem;
    margin: 0 0 1rem 0;
    color: var(--headerColor);
    position: relative;
}

.cs-text {
    font-size: var(--bodyFontSize);
    line-height: 1.5em;
    text-align: inherit;
    width: 100%;
    max-width: 40.625rem;
    margin: 0;
    color: var(--bodyTextColor);
}
        
`;

export const sampleHtml = `
    <!-- ============================================ -->
<!--                    CTA                       -->
<!-- ============================================ -->

<section id="cta-1">
    <div class="cs-container">
        <div class="cs-content">
            <span class="cs-topper">Our Team</span>
            <h2 class="cs-title">Ready for a fresh, organized home?</h2>
            <p class="cs-text">
              We’re passionate about creating clean, organized spaces that make life easier. Every service we offer is thoughtfully designed to deliver real results and lasting comfort.            </p>
            <a href="" class="cs-button-solid">Get an Estimate</a>
        </div>
        <div class="cs-image-group">
            <!--Powder Image
            <picture class="cs-powder">
                <source media="(max-width: 600px)" srcset="https://csimg.nyc3.digitaloceanspaces.com/CTA/powder.png">
                <source media="(min-width: 601px)" srcset="https://csimg.nyc3.digitaloceanspaces.com/CTA/powder.png">
                <img loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/CTA/powder.png" alt="powder" width="485" height="460" aria-hidden="true">
            </picture>-->
            <!--Bucket Image-->
            <picture class="cs-bucket">
                <source media="(max-width: 600px)" srcset="./reverse.png">
                <source media="(min-width: 601px)" srcset="./reverse.png">
                <img loading="lazy" decoding="async" src="./reverse.png" alt="bucket" width="543" height="437" aria-hidden="true">
            </picture>
        </div>
    </div>
    <!--Background Image
    <picture class="cs-background">
        <source media="(max-width: 600px)" srcset="https://csimg.nyc3.digitaloceanspaces.com/CTA/fabric-m.png">
        <source media="(min-width: 601px)" srcset="https://csimg.nyc3.digitaloceanspaces.com/CTA/fabric.png">
        <img loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/CTA/fabric.png" alt="fabric" width="1920" height="660" aria-hidden="true">
    </picture>-->
</section>
       
`;

export const sampleCss = `
  /*-- -------------------------- -->
<---            CTA             -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
  #cta-1 {
    padding: var(--sectionPadding);
    position: relative;
  }
  #cta-1 .cs-background {
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-blend-mode: multiply;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  #cta-1 .cs-background img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    /* Makes img tag act as a background image */
    object-fit: cover;
  }
  #cta-1 .cs-container {
    width: 100%;
    max-width: 80rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 48px - 64px */
    gap: clamp(3rem, 6vw, 4rem);
  }
  #cta-1 .cs-content {
    /* set text align to left if content needs to be left aligned */
    text-align: center;
    width: 100%;
    max-width: 27.125rem;
    display: flex;
    flex-direction: column;
    /* centers content horizontally, set to flex-start to left align */
    align-items: center;
  }
  #cta-1 .cs-text {
    margin-bottom: 1rem;
  }
  #cta-1 .cs-text:last-of-type {
    margin-bottom: 2rem;
  }
  #cta-1 .cs-button-solid {
    font-size: 1rem;
    /* 46px - 56px */
    line-height: clamp(2.875rem, 5.5vw, 3.5rem);
    text-decoration: none;
    font-weight: 700;
    text-align: center;
    margin: 0;
    color: #fff;
    min-width: 9.375rem;
    padding: 0 1.5rem;
    background-color: var(--primary);
    border-radius: 0.25rem;
    display: inline-block;
    position: relative;
    z-index: 1;
    /* prevents padding from adding to the width */
    box-sizing: border-box;
  }
  #cta-1 .cs-button-solid:before {
    content: "";
    position: absolute;
    height: 100%;
    width: 0%;
    background: #000;
    opacity: 1;
    top: 0;
    left: 0;
    z-index: -1;
    border-radius: 0.25rem;
    transition: width 0.3s;
  }
  #cta-1 .cs-button-solid:hover:before {
    width: 100%;
  }
  #cta-1 .cs-image-group {
    /* everything is in ems so we can scale the container down with a font size */
    font-size: min(2.6vw, .8em);
    width: 33.9375em;
    height: 28.75em;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #cta-1 .cs-bucket {
    width: 33.9375em;
    height: auto;
    display: block;
    position: relative;
   /* margin-left: 4rem;*/
  }
  #cta-1 .cs-bucket img {
    width: 100%;
    height: auto;
  }
  #cta-1 .cs-powder {
    width: 30.3125em;
    height: auto;
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    z-index: -1;
  }
  #cta-1 .cs-powder img {
    width: 100%;
    height: auto;
  }
}
/* Tablet - 768px */
@media only screen and (min-width: 48rem) {
  #cta-1 .cs-container {
    flex-direction: row;
    justify-content: space-between;
  }
  #cta-1 .cs-content {
    text-align: left;
    align-items: flex-start;
    /* sends it to the right in the 2nd position */
    order: 2;
  }
  #cta-1 .cs-image-group {
    font-size: min(1.45vw, 1em);
  }
}
    
`;

export const sampleJs = `

`;