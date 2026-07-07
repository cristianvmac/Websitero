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
    --bodyFontSize: 1.2rem;
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
       font-size: var(--bodyFontSize);
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
<---        Content Page        -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
    #content-page {
        padding: var(--sectionPadding);
        background-color: #fff;
        /* clips the wave background from causing overflow issues when it goes off screen */
        overflow: hidden;
        position: relative;
        z-index: 1;
    }
    #content-page .cs-container {
        width: 100%;
        max-width: 80rem;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* 48px - 64px */
        gap: clamp(3rem, 6vw, 4rem);
        position: relative;
    }
    #content-page .cs-content {
        /* set text align to left if content needs to be left aligned */
        text-align: left;
        width: 100%;
        max-width: 39.375rem;
        display: flex;
        flex-direction: column;
        /* centers content horizontally, set to flex-start to left align */
        align-items: flex-start;
    }
    #content-page .cs-title {
        /* bigger minimum (2.25rem/36px) so the title stays large on mobile,
           still scales up to the 3.0625rem/49px max on desktop */
        font-size: clamp(2.25rem, 6vw, 3.0625rem);
        font-weight: 900;
        line-height: 1.2em;
        text-align: inherit;
        width: 100%;
        max-width: 100%;
        margin: 0 0 1rem 0;
        color: var(--headerColor);
        position: relative;
    }
    #content-page h2,
    #content-page h3,
    #content-page h4,
    #content-page h5,
    #content-page h6 {
        font-weight: 700;
        text-align: inherit;
        margin: 0 0 1rem 0;
        color: var(--headerColor);
    }
    #content-page h2 {
        font-size: 2rem;
        margin-top: 2rem;
    }
    #content-page h3 {
        font-size: 1.5rem;
        color: var(--primary);
    }
    #content-page h4,
    #content-page h5,
    #content-page h6 {
        font-size: 1.25rem;
    }
    #content-page .cs-button-solid {
        margin-bottom: 2rem;
    }
    #content-page .cs-no-margin {
        margin: 0;
    }
    #content-page .cs-color {
        color: var(--primary);
    }
    #content-page p {
        font-size: var(--bodyFontSize);
        line-height: 1.5em;
        text-align: inherit;
        width: 100%;
        margin: 0 0 1rem 0;
        color: var(--bodyTextColor);
    }
    #content-page p:last-of-type {
        margin-bottom: 2rem;
    }
    #content-page p a {
        font-size: inherit;
        line-height: inherit;
        text-decoration: underline;
        color: var(--primary);
    }
    #content-page ol,
    #content-page ul {
        padding-left: 1.5rem;
        margin: 0 0 2rem 0;
        color: var(--bodyTextColor);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        font-size: var(--bodyFontSize);
    }
    #content-page ul li {
        list-style: none;
        color: inherit;
        position: relative;
        font-size: var(--bodyFontSize);
    }
    #content-page ul li:before {
        /* custom list bullet */
        content: "";
        width: 3px;
        height: 3px;
        background: currentColor;
        opacity: 1;
        border-radius: 50%;
        position: absolute;
        display: block;
        top: 0.625rem;
        left: -0.75rem;
        font-size: var(--bodyFontSize);
    }
    #content-page img {
        width: 100%;
        height: auto;
        display: block;
    }
    #content-page .cs-image-group {
        /* full width on mobile so the images stack at the bottom below the text */
        width: 100%;
        max-width: 33.875rem;
        display: flex;
        position: relative;
        flex-direction: column;
        gap: 1.25rem;
    }
    #content-page .cs-picture {
        width: 100%;
        /* 300px - 520px */
        height: clamp(18.75rem, 40vw, 32.5rem);
        box-shadow: 0px 3.3478px 50.2169px rgba(0, 0, 0, 0.16);
        /* 125px - 200px */
        border-radius: clamp(7.8125rem, 15vw, 12.5rem) 0
            clamp(7.8125rem, 15vw, 12.5rem) 0;
        /* prevents border from affecting height and width */
        box-sizing: border-box;
        /* clips img tag corners */
        overflow: hidden;
        display: block;
        position: relative;
    }
    #content-page .cs-picture img {
        width: 100%;
        height: 100%;
        /* makes it act like a background image */
        object-fit: cover;
    }
}
/* Tablet - 768px */
@media only screen and (min-width: 48rem) {
    #content-page .cs-container {
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
    }
    #content-page .cs-content {
        flex: none;
        width: 60%;
        /* sends it to the left in the 2nd position */
        order: 2;
    }
    #content-page .cs-image-group {
        /* back to the side column on tablet and up */
        width: 50%;
        display: flex;
    }
}
                               
                      
`;

export const sampleHtml = `


<!-- ============================================ -->
<!--                 Content Page                 -->
<!-- ============================================ -->

<section id="content-page">
    <div class="cs-container">
        <div class="cs-content">
            <h1 class="cs-title">Empowering You To Achieve <span class="cs-color">Lasting Balance</span></h1>
            <h2>Comprehensive Care Designed Around You</h2>
            <h3>Holistic Wellness Solutions</h3>
            <h4>Support That Fits Your Lifestyle</h4>
            <p>
                True wellness is more than just feeling good — it’s about building sustainable habits that support your physical, mental, and emotional health. Our personalized programs are crafted to meet you where you are, helping you move forward with confidence. Whether you're beginning your journey or refining your routine, we provide the guidance and structure you need. Learn more through our <a href="">wellness resources</a> and start creating meaningful change today.
            </p>
            <p>
                We combine evidence-based strategies with compassionate support to ensure every step you take is intentional and effective. From nutrition planning to stress management, our approach focuses on <strong>long-term results, not quick fixes</strong>, empowering you to take control of your well-being.
            </p>
            <h3>Our Process</h3>
            <ol>
                <li>Schedule a personalized consultation to assess your goals and lifestyle.</li>
                <li>Receive a customized wellness plan tailored to your needs.</li>
                <li>Track progress with ongoing guidance and measurable milestones.</li>
            </ol>
            <h4>What You Can Expect</h4>
            <ul>
                <li>Clear and achievable health goals.</li>
                <li>Professional support and accountability.</li>
                <li>Flexible strategies that adapt as you grow.</li>
            </ul>
        </div>
        <div class="cs-image-group">
            <!-- Astro <Picture /> generates the responsive avif/webp sources automatically -->
            <!--Top Picture-->
            <Picture src={mealPrepImage} alt="Healthy meal preparation with fresh vegetables" width={542} height={520} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
            <!--Bottom Picture-->
            <Picture src={yogaImage} alt="Woman practicing yoga outdoors at sunrise" width={542} height={520} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-picture" }} />
        </div>
    </div>
</section>
                   
      
`;

export const sampleJs = `

`;