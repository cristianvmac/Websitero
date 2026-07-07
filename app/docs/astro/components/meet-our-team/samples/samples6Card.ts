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

export const sampleCss = `

    /*-- -------------------------- -->
<---       Meet The Team        -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
    #meet-us {
        padding: var(--sectionPadding);
    }
    #meet-us .cs-container {
        width: 100%;
        max-width: 80rem;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* 48px - 64px */
        gap: clamp(3rem, 6vw, 4rem);
    }
    #meet-us .cs-content {
        /* set text align to left if content needs to be left aligned */
        text-align: center;
        width: 100%;
        display: flex;
        flex-direction: column;
        /* centers content horizontally, set to flex-start to left align */
        align-items: center;
    }
    #meet-us .cs-topper {
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
    #meet-us .cs-title {
        font-size: var(--headerFontSize);
        font-weight: 900;
        line-height: 1.2em;
        text-align: inherit;
        max-width: 43.75rem;
        margin: 0 0 1rem 0;
        color: var(--headerColor);
        position: relative;
    }
    #meet-us .cs-text {
        font-size: var(--bodyFontSize);
        line-height: 1.5em;
        text-align: inherit;
        width: 100%;
        max-width: 40.625rem;
        margin: 0;
        color: var(--bodyTextColor);
    }
    #meet-us .cs-card-group {
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
    }
    #meet-us .cs-item {
        list-style: none;
        width: 100%;
        min-height: 18.875rem;
        position: relative;
        aspect-ratio: 1.08609272;
    }
    #meet-us .cs-item:hover .cs-background img {
        transform: scale(1.1);
    }
    #meet-us .cs-info {
        padding: 0.625rem 0;
        background-color: rgba(255, 255, 255, 0.06);
        border-radius: 0.5rem;
        -webkit-backdrop-filter: blur(18px);
        backdrop-filter: blur(18px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: absolute;
        /* 12px - 16px */
        bottom: clamp(0.75rem, 1.4vw, 1rem);
        left: clamp(0.75rem, 1.4vw, 1rem);
        right: clamp(0.75rem, 1.4vw, 1rem);
        z-index: 10;
    }
    #meet-us .cs-name {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--primaryLight);
        line-height: 1.2em;
        margin: 0;
        display: block;
    }
    #meet-us .cs-job {
        /* 14px - 16px */
        font-size: clamp(0.875rem, 1.5vw, 1rem);
        line-height: 1.5em;
        color: #fff;
        display: block;
    }
    #meet-us .cs-background {
        width: 100%;
        height: 100%;
        border-radius: 0.75rem;
        /* clips the corners of the img tag */
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        display: block;
    }
    #meet-us .cs-background img {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        object-fit: cover;
        transition: transform 0.6s;
    }
}
/* Tablet - 768px */
@media only screen and (min-width: 48rem) {
    #meet-us .cs-card-group {
        max-width: 62.1875rem;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
    }
    #meet-us .cs-item {
        aspect-ratio: 0.74172185;
        width: 100%;
        max-width: 19.0625rem;
    }
}
                               
`;

export const sampleHtml = `

<!-- ============================================ -->
<!--                Meet The Team                 -->
<!-- ============================================ -->

<section id="meet-us">
    <div class="cs-container">
        <div class="cs-content">
            <span class="cs-topper">Meet Us</span>
            <h2 class="cs-title">Our Team Members</h2>
            <p class="cs-text">
                Aenean tincidunt id mauris idology auctor. Donec at ligula lacus. Nulla dig nissimmi quis neque interdum.
            </p>
        </div>
        <ul class="cs-card-group">
            <!-- Astro <Picture /> generates the responsive avif/webp sources automatically -->
            <li class="cs-item">
                <div class="cs-info">
                    <span class="cs-name">Sarah Johnson</span>
                    <span class="cs-job">Designer</span>
                </div>
                <!--Background Image-->
                <Picture src={sarahImage} alt="designer" width={305} height={407} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-background" }} />
            </li>
            <li class="cs-item">
                <div class="cs-info">
                    <span class="cs-name">Michael Brown</span>
                    <span class="cs-job">Marketing Specialist</span>
                </div>
                <!--Background Image-->
                <Picture src={michaelImage} alt="marketing specialist" width={305} height={407} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-background" }} />
            </li>
            <li class="cs-item">
                <div class="cs-info">
                    <span class="cs-name">Emily Davis</span>
                    <span class="cs-job">Product Manager</span>
                </div>
                <!--Background Image-->
                <Picture src={emilyImage} alt="product manager" width={305} height={407} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-background" }} />
            </li>
            <li class="cs-item">
                <div class="cs-info">
                    <span class="cs-name">Daniel Smith</span>
                    <span class="cs-job">Civil Engineer</span>
                </div>
                <!--Background Image-->
                <Picture src={danielImage} alt="civil engineer" width={305} height={407} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-background" }} />
            </li>
            <li class="cs-item">
                <div class="cs-info">
                    <span class="cs-name">Olivia Martinez</span>
                    <span class="cs-job">UX Researcher</span>
                </div>
                <!--Background Image-->
                <Picture src={oliviaImage} alt="ux researcher" width={305} height={407} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-background" }} />
            </li>
            <li class="cs-item">
                <div class="cs-info">
                    <span class="cs-name">Robert Lee</span>
                    <span class="cs-job">Partner Manager</span>
                </div>
                <!--Background Image-->
                <Picture src={robertImage} alt="partner manager" width={305} height={407} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-background" }} />
            </li>
        </ul>
    </div>
</section>      
                                
`;

export const sampleJs = `

`;