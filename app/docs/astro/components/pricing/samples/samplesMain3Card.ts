export const sampleRoot = `

/*-- -------------------------- -->
<---        Core Styles         -->
<--- -------------------------- -*/

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
    letter-spacing: 0.1em;
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
                            

/*-- -------------------------- -->
<---    Components + Utilities  -->
<--- -------------------------- -*/

@media only screen and (min-width: 0px) {
    .skip {
        z-index: -1111111;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
    }

    .cs-button-solid {
        z-index: 1;
        position: relative;
        display: inline-block;
        background-color: var(--primary);
        width: auto;
        padding: 1rem 2rem;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 1rem;
        line-height: 1em;
        font-weight: bold;
        border-radius: 0.25rem;
        overflow: hidden;
        color: var(--bodyTextColorWhite);
        transition: color 0.3s;
        transition-delay: 0.1s;
        text-align: center;
    }

    .cs-button-solid:hover {
        color: #fff;
    }

    .cs-button-solid:hover:before {
        width: 100%;
    }

    .cs-button-solid:before {
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        opacity: 1;
        display: block;
        background-color: #000;
        height: 100%;
        width: 0;
        transition: width 0.3s;
    }

    .cs-button-outline {
        z-index: 1;
        position: relative;
        display: inline-block;
        width: auto;
        padding: 1rem 2rem;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 1rem;
        line-height: 1em;
        font-weight: bold;
        border: 2px solid #000;
        color: #000;
        transition: color 0.3s;
        transition-delay: 0.1s;
        text-align: center;
    }

    .cs-button-outline:hover {
        color: #fff;
    }

    .cs-button-outline:hover:before {
        width: 100%;
    }

    .cs-button-outline:before {
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        opacity: 1;
        display: block;
        background-color: #000;
        height: 100%;
        width: 0;
        transition: width 0.3s;
    }

    .cs-color {
        color: var(--primary);
    }

    .cs-bold {
        font-weight: 700;
    }

    .cs-hide-on-mobile {
        display: none !important;
    }

    .cs-dark,
    .dark {
        display: none !important;
    }

    body.dark-mode .cs-light,
    body.dark-mode .light {
        display: none !important;
    }

    body.dark-mode .cs-dark,
    body.dark-mode .dark {
        display: block !important;
    }

    body.dark-mode .cs-button-outline {
        border-color: #fff;
        color: #fff;
    }
}

/* Desktop Utilities */
@media only screen and (min-width: 64rem) {
    .cs-hide-on-mobile {
        display: block !important;
    }

    .cs-hide-on-desktop {
        display: none !important;
    }
}

/*-- -------------------------- -->
<---    Base Element Styles     -->
<--- -------------------------- -*/

@media only screen and (min-width: 0px) {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: var(--headerFont);
        line-height: 1.2em;
        color: var(--headerColor);
    }

    p,
    li,
    a {
        font-size: 1rem;
        line-height: 1.5em;
    }

    p,
    li {
        color: var(--bodyTextColor);
    }

    p a,
    li a {
        color: var(--primary);
    }

    a:hover,
    button:hover {
        cursor: pointer;
    }

    body.dark-mode {
        background-color: var(--dark);
    }

    body.dark-mode p,
    body.dark-mode li,
    body.dark-mode h1,
    body.dark-mode h2,
    body.dark-mode h3,
    body.dark-mode h4,
    body.dark-mode h5,
    body.dark-mode h6 {
        color: #fff;
    }
}

/*-- -------------------------- -->
<---          Fonts             -->
<--- -------------------------- -*/

@media only screen and (min-width: 0px) {
    @font-face {
        font-style: normal;
        font-family: "Roboto";
        font-weight: 400;
        font-display: swap;
        src: local(""),
            url("/assets/fonts/roboto-v29-latin-regular.woff2") format("woff2"),
            url("/assets/fonts/roboto-v29-latin-regular.woff") format("woff");
    }

    @font-face {
        font-style: normal;
        font-family: "Roboto";
        font-weight: 700;
        font-display: swap;
        src: local(""),
            url("/assets/fonts/roboto-v29-latin-700.woff2") format("woff2"),
            url("/assets/fonts/roboto-v29-latin-700.woff") format("woff");
    }

    @font-face {
        font-style: normal;
        font-family: "Roboto";
        font-weight: 900;
        font-display: swap;
        src: local(""),
            url("/assets/fonts/roboto-v29-latin-900.woff2") format("woff2"),
            url("/assets/fonts/roboto-v29-latin-900.woff") format("woff");
    }
}


/* Add this as it's own dark.css file and linked on all pages */
/*-- -------------------------- -->
<---      Core Dark Styles      -->
<--- -------------------------- -*/
/* Mobile */
@media only screen and (min-width: 0rem) {
  :root {
    --dark: #082032;
    --medium: #2c394b;
    --accent: #334756;
    --bodyTextColorWhite: #fafbfc;
  }
  body.dark-mode {
    background-color: var(--dark);
  }
  body.dark-mode p,
  body.dark-mode li,
  body.dark-mode h1,
  body.dark-mode h2,
  body.dark-mode h3,
  body.dark-mode h4,
  body.dark-mode h5,
  body.dark-mode h6,
  body.dark-mode .cs-title,
  body.dark-mode .cs-text,
  body.dark-mode .cs-li {
    color: var(--bodyTextColorWhite);
  }
  body.dark-mode .light {
    display: none;
  }
  body.dark-mode .dark {
    display: block !important;
  }
  .dark {
    /* class used to hide elements that only need to be seen when dark mode is enabled */
    display: none;
  }
}
/*-- -------------------------- -->
<---      Dark Mode Toggle      -->
<--- -------------------------- -*/
/* Mobile */
@media only screen and (min-width: 0rem) {
  body.dark-mode #dark-mode-toggle .cs-sun {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  body.dark-mode #dark-mode-toggle .cs-moon {
    transform: translate(-50%, -150%);
    opacity: 0;
  }
  #dark-mode-toggle {
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 3.75rem;
    width: 3rem;
    height: 3rem;
    background: transparent;
    border: none;
    overflow: hidden;
    padding: 0;
  }
  #dark-mode-toggle img,
  #dark-mode-toggle svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1.5625rem;
    height: 1.5625rem;
    pointer-events: none;
  }
  #dark-mode-toggle .cs-moon {
    z-index: 2;
    transition: transform 0.3s,
                opacity 0.3s,
                fill 0.3s;
    fill: #000;
  }
  #dark-mode-toggle .cs-sun {
    z-index: 1;
    transform: translate(-50%, 100%);
    opacity: 0;
    transition: transform 0.3s,
                opacity 0.3s;
  }
}
/* Desktop */
@media only screen and (min-width: 64rem) {
  #dark-mode-toggle {
    position: relative;
    top: auto;
    right: auto;
    transform: none;
    margin-left: 1.875rem;
    margin-bottom: 0rem;
  }
  #dark-mode-toggle .moon {
    /* change to whatever you need */
    /* fill: #fff; */
  }
}
          
`;



export const sampleCss = `

/*-- -------------------------- -->
<---          Pricing           -->
<--- -------------------------- -*/

/* Mobile */
@media only screen and (min-width: 0rem) {
    #pricing {
        padding: var(--sectionPadding);
        background-color: #f7f7f7;
    }
    #pricing .cs-container {
        width: 100%;
        max-width: 80rem;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* 48px - 64px */
        gap: clamp(3rem, 6vw, 4rem);
    }
    #pricing .cs-content {
        /* set text align to left if content needs to be left aligned */
        text-align: center;
        width: 100%;
        display: flex;
        flex-direction: column;
        /* centers content horizontally, set to flex-start to left align */
        align-items: center;
    }

    #pricing .cs-card-group {
        width: 100%;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        /* 16px - 20px */
        gap: clamp(1rem, 2vw, 1.25rem);
    }
    #pricing .cs-item {
        list-style: none;
        /* 20px - 32px top & bottom */
        /* 16px - 32px left & right */
        padding: clamp(1.25rem, 3vw, 2rem) clamp(1rem, 2.4vw, 2rem);
        width: 100%;
        max-width: 25.8125rem;
        border-radius: 1rem;
        background: #fff;
        border: 1px solid #e8e8e8;
        /* prevents padding from adding to height and width */
        box-sizing: border-box;
    }
    #pricing .cs-item:nth-of-type(2) .cs-option2-text,
    #pricing .cs-item:nth-of-type(2) .cs-option1-text {
        transition-delay: 0.1s;
    }
    #pricing .cs-item:nth-of-type(3) .cs-option2-text,
    #pricing .cs-item:nth-of-type(3) .cs-option1-text {
        transition-delay: 0.2s;
    }
    #pricing .cs-popular {
        background: var(--primary);
        position: relative;
        /* clips the popular tag */
        overflow: hidden;
        /* send to the top */
        order: -1;
    }
    #pricing .cs-popular:before {
        /* Most Popular Tag */
        content: "Popular";
        font-size: 0.875rem;
        text-align: center;
        line-height: 1.8125em;
        font-weight: 700;
        width: 10.625rem;
        padding: 0 0.75rem;
        color: var(--bodyTextColorWhite);
        background-color: var(--secondary);
        position: absolute;
        display: block;
        top: 1.25rem;
        right: -3.75rem;
        transform: rotate(42deg);
    }
    #pricing .cs-popular .cs-h3,
    #pricing .cs-popular .cs-item-text,
    #pricing .cs-popular .cs-price,
    #pricing .cs-popular .cs-included,
    #pricing .cs-popular .cs-li,
    #pricing .cs-popular .cs-small {
        color: var(--bodyTextColorWhite);
    }
    #pricing .cs-popular .cs-button-solid {
        background-color: #fff;
        color: var(--primary);
        transition: color 0.3s;
    }
    #pricing .cs-popular .cs-button-solid:before {
        background-color: var(--secondary);
    }
    #pricing .cs-popular .cs-button-solid:hover {
        color: #fff;
    }
    #pricing .cs-popular .cs-li-img {
        /* turns the check mark white */
        filter: brightness(900%);
    }
    #pricing .cs-h3 {
        font-size: 1.25rem;
        line-height: 1.2em;
        font-weight: 700;
        margin: 0 0 0.25rem;
        padding: 0;
        color: var(--headerColor);
    }
    #pricing .cs-item-text {
        font-size: 0.875rem;
        line-height: 1.5em;
        /* 16px - 24px */
        margin: 0 0 clamp(1rem, 2vw, 1.5rem);
        padding: 0;
        color: var(--bodyTextColor);
    }
    #pricing .cs-option-group {
        position: relative;
    }
    #pricing .cs-option-group:after {
        /* top right box */
        content: "";
        width: 100%;
        height: 1px;
        /* 32px - 40px */
        margin-bottom: clamp(2rem, 4vw, 2.5rem);
        background: linear-gradient(
            90deg,
            rgba(232, 232, 232, 0.2) 0%,
            #e8e8e8 53.78%,
            rgba(232, 232, 232, 0.2) 100%
        );
        opacity: 1;
        position: relative;
        display: block;
    }
    #pricing .cs-price {
        font-size: 3.0625rem;
        line-height: 1.2em;
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: var(--headerColor);
        /* spans are inline, need to add block for margin to work */
        display: block;
    }
    #pricing .cs-small {
        font-size: 0.875rem;
        font-weight: 400;
        color: #4e4b66;
    }
    #pricing .cs-included {
        font-size: 1rem;
        line-height: 1.5em;
        font-weight: 700;
        /* 16px - 24px */
        margin-bottom: clamp(1rem, 3vw, 1.5rem);
        color: var(--headerColor);
        display: block;
    }
    #pricing .cs-ul {
        padding: 0;
        margin: 0;
        /* 32px - 40px */
        margin-bottom: clamp(2rem, 4vw, 2.5rem);
    }
    #pricing .cs-li {
        /* 14px - 16px */
        font-size: clamp(0.875rem, 1.5vw, 1rem);
        line-height: 1.5em;
        list-style: none;
        padding: 0;
        margin: 0 0 0.75rem;
        color: var(--bodyTextColor);
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }
    #pricing .cs-li:last-of-type {
        margin-bottom: 0;
    }
    #pricing .cs-disabled {
        /* fades out list items that are disabled from the price tier */
        filter: grayscale(1);
        opacity: 0.3;
    }
    #pricing .cs-li-img {
        width: 1.25rem;
        height: auto;
        margin-top: 0.1875rem;
        margin-right: 0.5rem;
    }
    #pricing .cs-button-solid {
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
    #pricing .cs-button-solid:before {
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
    #pricing .cs-button-solid:hover:before {
        width: 100%;
    }
    #pricing .cs-button-solid {
        /* cs-button-solid override */
        width: 100%;
        margin: 0 0 1rem 0;
    }
}
/* Tablet 768px */
@media only screen and (min-width: 48rem) {
    #pricing .cs-card-group {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        flex-wrap: nowrap;
    }
    #pricing .cs-item {
        width: 100%;
        /* ensures they stay the same height if you add more content */
        align-self: stretch;
    }
    #pricing .cs-popular {
        /* send back to its original order */
        order: unset;
    }
    #pricing #cs-option2:before {
        top: -0.625rem;
    }
    #pricing #cs-option2:after {
        top: -2.1875rem;
        right: -6.25rem;
    }
}
/* Dark Mode */
@media only screen and (min-width: 0rem) {
    body.dark-mode #pricing {
        background-color: var(--dark);
    }
    body.dark-mode #pricing .cs-topper {
        color: var(--primaryLight);
    }
    body.dark-mode #pricing .cs-title,
    body.dark-mode #pricing .cs-text {
        color: var(--bodyTextColorWhite);
    }
    body.dark-mode #pricing .cs-plan {
        color: var(--bodyTextColorWhite);
    }
    body.dark-mode #pricing .cs-item {
        background: var(--accent);
        border-color: var(--medium);
    }
    body.dark-mode #pricing .cs-popular {
        background: var(--primary);
    }
    body.dark-mode #pricing .cs-h3,
    body.dark-mode #pricing .cs-item-text,
    body.dark-mode #pricing .cs-price,
    body.dark-mode #pricing .cs-included,
    body.dark-mode #pricing .cs-li,
    body.dark-mode #pricing .cs-small {
        color: var(--bodyTextColorWhite);
    }
    body.dark-mode #pricing .cs-li-img {
        /* make so bright it turns white */
        filter: brightness(900%) grayscale(1);
    }
}
                                
                                
`;

export const sampleHtml = `


<!-- ============================================ -->
<!--                  Pricing                     -->
<!-- ============================================ -->

<section id="pricing">
  <div class="cs-container">
      <div class="cs-content">
          <span class="cs-topper">Our Plans</span>
          <h2 class="cs-title">Find the Right Fit for You</h2>
          <p class="cs-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.
          </p>
      </div>
      <ul class="cs-card-group">
          <!-- Option 1 -->
          <li class="cs-item">
              <h3 class="cs-h3">Starter</h3>
              <p class="cs-item-text">
                  Lorem ipsum dolor sit.
              </p>
              <div class="cs-option-group">
                  <span class="cs-price">$39<span class="cs-small">/month</span></span>
              </div>
              <span class="cs-included">Lorem Ipsum Includes</span>
              <ul class="cs-ul">
                  <li class="cs-li">
                      <img class="cs-li-img" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/Pricing/check-blue.svg" alt="code stitch icon" width="20" height="20">
                      Lorem ipsum dolor amet
                  </li>
                  <li class="cs-li">
                      <img class="cs-li-img" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/Pricing/check-blue.svg" alt="code stitch icon" width="20" height="20">
                      Consectetur adipiscing elit
                  </li>
                  <li class="cs-li cs-disabled">
                      <img class="cs-li-img" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/Pricing/check-blue.svg" alt="code stitch icon" width="20" height="20">
                      Sed do eiusmod tempor
                  </li>
                  <li class="cs-li cs-disabled">
                      <img class="cs-li-img" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/Pricing/check-blue.svg" alt="code stitch icon" width="20" height="20">
                      Incididunt ut labore
                  </li>
                  <li class="cs-li cs-disabled">
                      <img class="cs-li-img" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/Pricing/check-blue.svg" alt="code stitch icon" width="20" height="20">
                      Dolore magna aliqua
                  </li>
                  <li class="cs-li cs-disabled">
                      <img class="cs-li-img" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/Pricing/check-blue.svg" alt="code stitch icon" width="20" height="20">
                      Ut enim ad minim veniam
                  </li>
              </ul>
              <a href="/basic.html" class="cs-button-solid">Get Started</a>
          </li>
          <!-- Option 2 -->
          <li class="cs-item cs-popular">
              <h3 class="cs-h3">Growth</h3>
              <p class="cs-item-text">
                  Lorem ipsum dolor sit.
              </p>
              <div class="cs-option-group">
                  <span class="cs-price">$69<span class="cs-small">/month</span></span>
              </div>
              <span class="cs-included">Lorem Ipsum Includes</span>
              <ul class="cs-ul">
                  <li class="cs-li">
                      <img class="cs-li-img" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/Pricing/check-blue.svg" alt="code stitch icon" width="20" height="20">
                      Lorem ipsum dolor amet
                  </li>
                  <li class="cs-li">
                      <img class="cs-li-img" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/Pricing/check-blue.svg" alt="code stitch icon" width="20" height="20">
                      Consectetur adipiscing elit
                  </li>
                  <li class="cs-li">
                      <img class="cs-li-img" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/Pricing/check-blue.svg" alt="code stitch icon" width="20" height="20">
                      Sed do eiusmod tempor
                  </li>
                  <li class="cs-li">
                      <img class="cs-li-img" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/Pricing/check-blue.svg" alt="code stitch icon" width="20" height="20">
                      Incididunt ut labore
                  </li>
                  <li class="cs-li cs-disabled">
                      <img class="cs-li-img" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/Pricing/check-blue.svg" alt="code stitch icon" width="20" height="20">
                      Dolore magna aliqua
                  </li>
                  <li class="cs-li cs-disabled">
                      <img class="cs-li-img" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/Pricing/check-blue.svg" alt="code stitch icon" width="20" height="20">
                      Ut enim ad minim veniam
                  </li>
              </ul>
              <a href="/basic.html" class="cs-button-solid">Get Started</a>
          </li>
          <!-- Option 3 -->
          <li class="cs-item">
              <h3 class="cs-h3">Premium</h3>
              <p class="cs-item-text">
                  Lorem ipsum dolor sit.
              </p>
              <div class="cs-option-group">
                  <span class="cs-price">$99<span class="cs-small">/month</span></span>
              </div>
              <span class="cs-included">Lorem Ipsum Includes</span>
              <ul class="cs-ul">
                  <li class="cs-li">
                      <img class="cs-li-img" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/Pricing/check-blue.svg" alt="code stitch icon" width="20" height="20">
                      Lorem ipsum dolor amet
                  </li>
                  <li class="cs-li">
                      <img class="cs-li-img" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/Pricing/check-blue.svg" alt="code stitch icon" width="20" height="20">
                      Consectetur adipiscing elit
                  </li>
                  <li class="cs-li">
                      <img class="cs-li-img" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/Pricing/check-blue.svg" alt="code stitch icon" width="20" height="20">
                      Sed do eiusmod tempor
                  </li>
                  <li class="cs-li">
                      <img class="cs-li-img" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/Pricing/check-blue.svg" alt="code stitch icon" width="20" height="20">
                      Incididunt ut labore
                  </li>
                  <li class="cs-li">
                      <img class="cs-li-img" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/Pricing/check-blue.svg" alt="code stitch icon" width="20" height="20">
                      Dolore magna aliqua
                  </li>
                  <li class="cs-li">
                      <img class="cs-li-img" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/Pricing/check-blue.svg" alt="code stitch icon" width="20" height="20">
                      Ut enim ad minim veniam
                  </li>
              </ul>
              <a href="/basic.html" class="cs-button-solid">Get Started</a>
          </li>
      </ul>
  </div>
</section>
                                                               
`;

export const sampleJs = `

`;