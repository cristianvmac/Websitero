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
<---          Locations          -->
<--- -------------------------- -*/
/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
  #locations {
    position: relative;
    z-index: 1;
  }
  #locations .cs-container {
    width: 100%;
    /* changes to 1920px at tablet */
    max-width: 31.25rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 48px - 64px */
    gap: clamp(3rem, 6vw, 4rem);
  }
  #locations .cs-card-group {
    width: 100%;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  }
  #locations .cs-item {
    text-align: center;
    list-style: none;
    width: 100%;
    /* prevents padding and border from affecting height and width */
    box-sizing: border-box;
    /* 24px - 100px top & bottom*/
    padding: clamp(1.5rem, 7vw, 6.25rem) 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-column: span 12;
    grid-row: span 1;
    position: relative;
    z-index: 1;
    /* bottom border */
  }
  #locations .cs-item::after {
    content: "";
    width: 100%;
    height: 1px;
    /* to change the color of the bottom border, adjust the second color (at 50%). the first and third will blend the color to transparent */
    /* note you'll also have to change the color in the tablet media query when the lines go vertical */
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #bababa 50%, rgba(255, 255, 255, 0) 100%);
    position: absolute;
    bottom: 0;
    left: 0;
  }
  #locations .cs-item:hover .cs-h3 {
    color: var(--bodyTextColorWhite);
  }
  #locations .cs-item:hover .cs-item-text {
    color: var(--bodyTextColorWhite);
    opacity: 0.9;
  }
  #locations .cs-item:hover .cs-background {
    opacity: 1;
  }
  #locations .cs-item:last-of-type::after {
    content: none;
  }
  #locations .cs-h3 {
    /* 20px - 25px */
    font-size: clamp(1.25rem, 2.5vw, 1.5625rem);
    font-weight: bold;
    line-height: 1.2em;
    margin: 0 0 1rem 0;
    color: var(--headerColor);
  }
  #locations .cs-item-text {
    /* 14px - 16px */
    font-size: clamp(0.875rem, 1.5vw, 1rem);
    line-height: 1.5em;
    text-decoration: none;
    max-width: 18.75rem;
    padding: 0;
    color: var(--bodyTextColor);
  }
  #locations .cs-address {
    max-width: 20ch;
    margin-bottom: 1rem;
  }
  #locations .cs-link {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.2em;
    text-align: inherit;
    text-decoration: none;
    margin-top: auto;
    /* setting minimum top spacing with padding and using margin-top: auto; to ensure the link is always at the bottom of the item */
    /* 24px - 32px */
    padding-top: clamp(1.5rem, 1vw, 2rem);
    color: var(--secondary);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.625rem;
    transition: color 0.3s;
  }
  #locations .cs-link:hover .cs-arrow {
    transform: translateX(0.25rem);
  }
  #locations .cs-link-text {
    width: fit-content;
  }
  #locations .cs-arrow {
    width: 1.25rem;
    height: auto;
    display: block;
    transition: filter 0.3s, transform 0.3s;
  }
  #locations .cs-background {
    width: 100%;
    height: 100%;
    opacity: 0;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: opacity 0.3s;
  }
  #locations .cs-background:before {
    /* background color overlay */
    content: "";
    width: 100%;
    height: 100%;
    background: #1a1a1a;
    opacity: 0.84;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  #locations .cs-background img {
    width: 100%;
    height: 100%;
    /* Makes img tag act as a background image */
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
}
/* Tablet - 768px */
@media only screen and (min-width: 48rem) {
  #locations .cs-container {
    max-width: 120rem;
  }
  #locations .cs-item {
    grid-column: span 3;
  }
  #locations .cs-item::after {
    width: 1px;
    height: 100%;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, #bababa 50%, rgba(255, 255, 255, 0) 100%);
    right: 0;
    left: initial;
  }
}
/* Desktop - 1024px */
@media only screen and (min-width: 64rem) {
  #locations .cs-item {
    /* 24px - 100px */
    padding-right: clamp(1.5rem, 5vw, 6.25rem);
    padding-left: clamp(1.5rem, 5vw, 6.25rem);
  }
}

`;

export const sampleHtml = `

<!-- ============================================ -->
<!--                  Locations                   -->
<!-- ============================================ -->

<section id="locations">
    <div class="cs-container">
        <!-- Left Content Section-->
        <ul class="cs-card-group">
            <!-- Astro <Picture /> generates the responsive avif/webp sources automatically -->
            <li class="cs-item">
                <h3 class="cs-h3">San Francisco, USA</h3>
                <span class="cs-item-text cs-address">
                    123 Market Street, San Francisco, CA, 94103
                </span>
                <a class="cs-item-text" href="tel:+14151234567">+1 (415) 123-4567</a>
                <a class="cs-item-text" href="mailto:sf@company.com">sf@company.com</a>
                <a href="" class="cs-link">
                    <span class="cs-link-text">Get Direction</span>
                    <Image class="cs-arrow" src={arrowIcon} alt="icon" width={20} height={20} />
                </a>
                <!--Background Image-->
                <Picture src={sanFranciscoImage} alt="San Francisco" width={480} height={425} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-background" }} />
            </li>
            <li class="cs-item">
                <h3 class="cs-h3">Tokyo, Japan</h3>
                <span class="cs-item-text cs-address">
                    2 Chome-8-1 Nihonbashi, Chuo City, Tokyo 103-0027
                </span>
                <a class="cs-item-text" href="tel:+81312345678">+81 3-1234-5678</a>
                <a class="cs-item-text" href="mailto:tokyo@company.com">tokyo@company.com</a>
                <a href="" class="cs-link">
                    <span class="cs-link-text">Get Direction</span>
                    <Image class="cs-arrow" src={arrowIcon} alt="icon" width={20} height={20} />
                </a>
                <!--Background Image-->
                <Picture src={tokyoImage} alt="Tokyo" width={480} height={425} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-background" }} />
            </li>
            <li class="cs-item">
                <h3 class="cs-h3">Berlin, Germany</h3>
                <span class="cs-item-text cs-address">
                    Alexanderplatz 1, 10178 Berlin, Germany
                </span>
                <a class="cs-item-text" href="tel:+49301234567">+49 30 1234567</a>
                <a class="cs-item-text" href="mailto:berlin@company.com">berlin@company.com</a>
                <a href="" class="cs-link">
                    <span class="cs-link-text">Get Direction</span>
                    <Image class="cs-arrow" src={arrowIcon} alt="icon" width={20} height={20} />
                </a>
                <!--Background Image-->
                <Picture src={berlinImage} alt="Berlin" width={480} height={425} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-background" }} />
            </li>
            <li class="cs-item">
                <h3 class="cs-h3">Sydney, Australia</h3>
                <span class="cs-item-text cs-address">
                    1 Macquarie St, Sydney NSW 2000, Australia
                </span>
                <a class="cs-item-text" href="tel:+61212345678">+61 2 1234 5678</a>
                <a class="cs-item-text" href="mailto:sydney@company.com">sydney@company.com</a>
                <a href="" class="cs-link">
                    <span class="cs-link-text">Get Direction</span>
                    <Image class="cs-arrow" src={arrowIcon} alt="icon" width={20} height={20} />
                </a>
                <!--Background Image-->
                <Picture src={sydneyImage} alt="Sydney" width={480} height={425} formats={["avif", "webp"]} pictureAttributes={{ class: "cs-background" }} />
            </li>
        </ul>
    </div>
</section>                             
              
`;

export const sampleJs = `

`;