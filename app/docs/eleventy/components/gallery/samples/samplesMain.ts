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
<---          Gallery           -->
<--- -------------------------- -*/

/* Mobile - base styles */
@media only screen and (min-width: 0em) {
  #gallery {
    text-align: center;
    padding: var(--sectionPadding);
    position: relative;
    overflow: hidden;
  }

  #gallery .cs-container {
    width: 100%;
    max-width: 82.625rem; /* 1322px */
    margin: auto;
  }

  #gallery .cs-topper {
    text-align: center;
    margin-bottom: 1rem;
  }

  #gallery .cs-title {
    text-align: center;
    max-width: 38.8125rem; /* 621px */
    margin: 0 auto 2.5rem;
  }

  #gallery .cs-image-group {
    font-size: min(1.1vw, 1em);
    width: 100%;
    max-width: 82.625rem;
    margin: 0 auto 3.75rem;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 1.875rem;
  }

  #gallery .cs-row {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 1.875rem;
  }

  #gallery .cs-picture {
    display: block;
    position: relative;
  }

  #gallery .cs-picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }

  /* Row 1 */
  #gallery .cs-row-1 .cs-picture1 {
    width: 26.25rem;
    height: 35.4375rem;
  }

  #gallery .cs-row-1 .cs-picture2 {
    width: 26.25rem;
    height: 39.3125rem;
  }

  #gallery .cs-row-1 .cs-picture3 {
    width: 26.25rem;
    height: 32rem;
  }

  /* Row 2 */
  #gallery .cs-row-2 .cs-picture1 {
    width: 26.25rem;
    height: 30.75rem;
  }

  #gallery .cs-row-2 .cs-picture2 {
    width: 26.25rem;
    height: 32.3125rem;
  }

  #gallery .cs-row-2 .cs-picture3 {
    width: 26.25rem;
    height: 39.3125rem;
  }

  /* Row 3 */
  #gallery .cs-row-3 .cs-picture1 {
    width: 26.25rem;
    height: 39.0625rem;
  }

  #gallery .cs-row-3 .cs-picture2 {
    width: 26.25rem;
    height: 28.25rem;
  }

  #gallery .cs-row-3 .cs-picture3 {
    width: 26.25rem;
    height: 39.3125rem;
  }
}

/* Dark mode */
@media only screen and (min-width: 0em) {
  body.dark-mode #gallery .cs-title {
    color: var(--bodyTextColorWhite);
  }
}


  
`;
export const sampleHtml = `

<!-- ============================================ -->
<!--                   Gallery                    -->
<!-- ============================================ -->

<section id="gallery">
  <div class="cs-container">
    <span class="cs-topper">Our Portfolio</span>
    <h2 class="cs-title">
      Expert Backup Generator Installation Services
    </h2>
    <div class="cs-image-group">
      <!-- Row 1-->
      <div class="cs-row cs-row-1">
        <!-- To add more images, copy and paste this row's picture tags here in order from cs-picture-1 to cs-picture-3 and they will maintain the same layout-->
        <picture class="cs-picture cs-picture1">
          <source media="(max-width: 600px)" srcset="/assets/images/portfolio/port1.jpg">
            <source media="(min-width: 601px)" srcset="/assets/images/portfolio/port1.jpg">
            <img aria-hidden="true" loading="lazy" decoding="async" src="/assets/images/portfolio/port1.jpg" alt="commercial fit-out" width="275" height="132">
        </picture>
        <picture class="cs-picture cs-picture2">
          <source media="(max-width: 600px)" srcset="/assets/images/portfolio/port4.jpg">
            <source media="(min-width: 601px)" srcset="/assets/images/portfolio/port4.jpg">
            <img aria-hidden="true" loading="lazy" decoding="async" src="/assets/images/gallery/port4.jpg" alt="commercial fit-out" width="275" height="132">
        </picture>
        <picture class="cs-picture cs-picture3">
          <source media="(max-width: 600px)" srcset="/assets/images/portfolio/port7.jpg">
            <source media="(min-width: 601px)" srcset="/assets/images/portfolio/port7.jpg">
            <img aria-hidden="true" loading="lazy" decoding="async" src="/assets/images/portfolio/port7.jpg" alt="commercial fit-out" width="275" height="132">
        </picture>
      </div>
      <!-- Row 2 -->
      <div class="cs-row cs-row-2">
        <!-- To add more images, copy and paste this row's picture tags here in order from cs-picture-1 to cs-picture-3 and they will maintain the same layout-->
        <picture class="cs-picture cs-picture1">
          <source media="(max-width: 600px)" srcset="/assets/images/portfolio/port2.jpg">
            <source media="(min-width: 601px)" srcset="/assets/images/portfolio/port2.jpg">
            <img aria-hidden="true" loading="lazy" decoding="async" src="/assets/images/portfolio/port2.jpg" alt="commercial fit-out" width="275" height="132">
        </picture>
        <picture class="cs-picture cs-picture2">
          <source media="(max-width: 600px)" srcset="/assets/images/portfolio/port5.jpg">
            <source media="(min-width: 601px)" srcset="/assets/images/portfolio/port5.jpg">
            <img aria-hidden="true" loading="lazy" decoding="async" src="/assets/images/portfolio/port5.jpg" alt="commercial fit-out" width="275" height="132">
        </picture>
        <picture class="cs-picture cs-picture3">
          <source media="(max-width: 600px)" srcset="/assets/images/portfolio/port8.jpg">
            <source media="(min-width: 601px)" srcset="/assets/images/portfolio/port8.jpg">
            <img aria-hidden="true" loading="lazy" decoding="async" src="/assets/images/portfolio/port8.jpg" alt="commercial fit-out" width="275" height="132">
        </picture>
      </div>
      <!-- Row 3 -->
      <div class="cs-row cs-row-3">
        <!-- To add more images, copy and paste this row's picture tags here in order from cs-picture-1 to cs-picture-3 and they will maintain the same layout-->
        <picture class="cs-picture cs-picture1">
          <source media="(max-width: 600px)" srcset="/assets/images/portfolio/port3.jpg">
            <source media="(min-width: 601px)" srcset="/assets/images/portfolio/port3.jpg">
            <img aria-hidden="true" loading="lazy" decoding="async" src="/assets/images/portfolio/port3.jpg" alt="commercial fit-out" width="275" height="132">
        </picture>
        <picture class="cs-picture cs-picture2">
          <source media="(max-width: 600px)" srcset="/assets/images/portfolio/port6.jpg">
            <source media="(min-width: 601px)" srcset="/assets/images/portfolio/port6.jpg">
            <img aria-hidden="true" loading="lazy" decoding="async" src="/assets/images/portfolio/port6.jpg" alt="commercial fit-out" width="275" height="132">
        </picture>
        <picture class="cs-picture cs-picture3">
          <source media="(max-width: 600px)" srcset="/assets/images/portfolio/port9.jpg">
            <source media="(min-width: 601px)" srcset="/assets/images/portfolio/port9.jpg">
            <img aria-hidden="true" loading="lazy" decoding="async" src="/assets/images/portfolio/port9.jpg" alt="commercial fit-out" width="275" height="132">
        </picture>
      </div>
    </div>
    <a href="/projects/" class="cs-button-solid">View all projects</a>
  </div>
</section>

`;

export const sampleJs = `

`;