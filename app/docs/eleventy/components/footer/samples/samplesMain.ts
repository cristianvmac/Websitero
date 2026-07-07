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
<---          Footer            -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0px) {

  #cs-footer {
    background-color: #1a1a1a;
    padding: clamp(3.75rem, 7.82vw, 6.25rem) 1rem;
  }

  #cs-footer .cs-container {
    width: 100%;
    max-width: 34.375rem;
    margin: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    column-gap: 5.5rem;
    row-gap: 2rem;
    padding: 0 1rem;
  }

  #cs-footer .cs-logo-group {
    width: 100%;
    position: relative;
  }

  #cs-footer .cs-logo {
    width: clamp(13.125rem, 8vw, 15rem);
    height: 5rem;
    display: block;
    margin-bottom: clamp(1.75rem, 4.17vw, 2.75rem);
  }

  #cs-footer .cs-logo-img {
    width: 100%;
    height: auto;
  }

  #cs-footer .cs-logo-img.dark {
    display: none;
  }

  #cs-footer .cs-text {
    color: var(--bodyTextColorWhite);
    margin-bottom: 1rem;
  }

  #cs-footer .cs-social {
    display: inline-flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 0.75rem;
    position: absolute;
    top: 0;
    right: 0;
  }

  #cs-footer .cs-social-link {
    width: 1.5rem;
    height: 1.5rem;
    background-color: #4e4b66;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    transition: transform 0.3s, background-color 0.3s;
  }

  #cs-footer .cs-social-link:hover {
    background-color: #1a1a1a;
    transform: translateY(-0.1875rem);
  }

  #cs-footer .cs-social-img {
    height: 0.8125rem;
    width: auto;
    display: block;
  }

  #cs-footer .cs-nav {
    padding: 0;
    margin: 0;
  }

  #cs-footer .cs-nav-li {
    list-style: none;
    margin-bottom: 1rem;
  }

  #cs-footer .cs-nav-li:last-of-type {
    margin-bottom: 0;
  }

  #cs-footer .cs-header {
    font-size: 1rem;
    line-height: 1.5em;
    font-weight: 700;
    color: var(--bodyTextColorWhite);
    position: relative;
  }

  #cs-footer .cs-header:after {
    content: "";
    width: 2rem;
    height: 0.25rem;
    margin: 1rem auto 1.5rem 0;
    background: var(--primary);
    display: block;
  }

  #cs-footer .cs-nav-link {
    font-size: 1rem;
    text-decoration: none;
    line-height: 1.5em;
    color: var(--bodyTextColorWhite);
    position: relative;
  }

  #cs-footer .cs-nav-link:before {
    content: "";
    width: 0%;
    height: 0.125rem;
    background: var(--bodyTextColorWhite);
    position: absolute;
    bottom: -0.125rem;
    left: 0;
    transition: width 0.3s;
  }

  #cs-footer .cs-nav-link:hover:before {
    width: 100%;
  }

  #cs-footer .cs-contact {
    margin: 0;
    padding: 0;
    width: 35%;
  }

  #cs-footer .cs-contact-li {
    list-style: none;
    margin-bottom: 0;
  }

  #cs-footer .cs-contact-li:last-of-type {
    margin-bottom: 0;
  }

  #cs-footer .cs-contact-link {
    font-size: 1rem;
    text-decoration: none;
    line-height: 1.5em;
    text-align: left;
    color: var(--bodyTextColorWhite);
    display: inline-block;
  }

  #cs-footer .cs-contact-link:hover {
    text-decoration: underline;
  }

  #cs-footer .cs-address {
    font-size: 1rem;
    margin-bottom: 1.25rem;
  }
}

/* Tablet - 768px */
@media only screen and (min-width: 48rem) {

  #cs-footer .cs-container {
    max-width: 80rem;
    row-gap: 0;
  }

  #cs-footer .cs-contact {
    flex-direction: row;
    justify-content: space-between;
    border-top: none;
  }

  #cs-footer .cs-contact-li {
    margin: 0;
  }
}

/* Small Desktop - 1024px */
@media only screen and (min-width: 64rem) {

  #cs-footer .cs-container {
    align-items: flex-start;
    justify-content: flex-end;
  }

  #cs-footer .cs-logo-group {
    margin-right: auto;
    width: auto;
    max-width: 19.0625rem;
  }

  #cs-footer .cs-text {
    width: 100%;
  }

  #cs-footer .cs-social {
    flex-direction: row;
    position: relative;
    top: auto;
    right: auto;
  }

  #cs-footer .cs-contact {
    width: auto;
  }
}

`;

export const sampleHtml = `


<!-- ============================================ -->
<!--                   Footer                     -->
<!-- ============================================ -->

<footer id="cs-footer">
    <div class="cs-container">
        <!-- Logo Group -->
        <div class="cs-logo-group">
           <!--  <a aria-label="go back to home" class="cs-logo" href="/">
                <img class="cs-logo-img" loading="lazy" decoding="async" src="/assets/images/footer/logo-white.svg" alt="logo" width="240" height="32">
            </a> -->
            <a href="/" class="cs-logo" aria-label="Return to Home">
                  <img class="cs-logo-img" decoding="async" src="/assets/svgs/logo-white.svg" alt="play icon" width="260" height="135" aria-hidden="true">
		        </a>
            <p class="cs-text">
                Extra content if you need it, if not you can delete this whole p tag. I usually do.
            </p>
            <div class="cs-social">
                <a class="cs-social-link" aria-label="visit google profile" href="" target="_blank" rel="noopener">
                    <img class="cs-social-img" decoding="async" src="/assets/svgs/google.svg" alt="play icon" width="11" height="11" aria-hidden="true">
                </a>
                <a class="cs-social-link" aria-label="visit facebook profile" href="" target="_blank" rel="noopener">
                    <img class="cs-social-img" decoding="async" src="/assets/svgs/facebook.svg" alt="play icon" width="11" height="11" aria-hidden="true">
                </a>
                <a class="cs-social-link" aria-label="visit instagram profile" href="" target="_blank" rel="noopener">
                    <img class="cs-social-img" decoding="async" src="/assets/svgs/instagram.svg" alt="play icon" width="11" height="11" aria-hidden="true">
                </a>
            </div>
        </div>
        <!-- Links -->
        <ul class="cs-nav">
            <li class="cs-nav-li">
                <span class="cs-header">Information</span>
            </li>
            <li class="cs-nav-li">
                <a class="cs-nav-link" href="/">Home</a>
            </li>
            <li class="cs-nav-li">
                <a class="cs-nav-link" href="/about/">About</a>
            </li>
            <li class="cs-nav-li">
                <a class="cs-nav-link" href="/portfolio/">Portfolio</a>
            </li>
            <li class="cs-nav-li">
                <a class="cs-nav-link" href="/reviews/">Reviews</a>
            </li>
            <li class="cs-nav-li">
                <a class="cs-nav-link" href="/contact/">Contact</a>
            </li>
        </ul>
        <ul class="cs-nav">
            <li class="cs-nav-li">
                <span class="cs-header">Services</span>
            </li>
            <li class="cs-nav-li">
                <a class="cs-nav-link" href="/serviceone/">Service One</a>
            </li>
            <li class="cs-nav-li">
                <a class="cs-nav-link" href="/servicetwo/">Service Two</a>
            </li>
            <li class="cs-nav-li">
                <a class="cs-nav-link" href="/servicethree/">Service Three</a>
            </li>
        </ul>
        <!-- Contact Info -->
        <ul class="cs-contact">
            <li class="cs-nav-li">
                <span class="cs-header">Contact</span>
            </li>
            <li class="cs-contact-li">
                <a class="cs-contact-link cs-address" href="{{ client.address.mapLink }}" target="_blank" rel="noopener">
                    {{ client.address.lineOne }}, <br>
                    {{ client.address.lineTwo }}, <br>
                    {{ client.address.city }}, 
                    {{ client.address.state }}, 
                    {{ client.address.zip }}
                </a>
            </li>
            <li class="cs-contact-li">
                <a class="cs-contact-link" href="tel:{{ client.phoneForTel }}">{{ client.phoneFormatted }}</a>
            </li>
            <li class="cs-contact-li">
                <a class="cs-contact-link" href="mailto:{{ client.email }}">{{ client.email }}</a>
            </li>
        </ul>
    </div>
</footer>

`;

export const sampleJs = `

`;