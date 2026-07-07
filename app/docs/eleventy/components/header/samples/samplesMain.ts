
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


/* ==========================================================================
   Mobile Navigation — max-width: 1023px (63.9375rem)
   ========================================================================== */

@media only screen and (max-width: 63.9375rem) {
  body.cs-open {
    overflow: hidden;
  }

  #cs-navigation {
    font-family: "Roboto", "Arial", sans-serif;
    width: 100%;
    box-sizing: border-box;
    padding: 0.75rem 1rem;
    background-color: #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    position: fixed;
    z-index: 10000;
    height: 3.75rem; /* or whatever your desired mobile nav height is */

  }

  #cs-navigation::before {
    content: "";
    width: 0%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    opacity: 0;
    display: block;
    position: absolute;
    top: 100%;
    right: 0;
    z-index: -11;
    transition: width 0.5s, opacity 0.3s;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }

  #cs-navigation.cs-active::before {
    width: 100%;
    opacity: 1;
  }

  #cs-navigation.cs-active .cs-ul-wrapper {
    opacity: 1;
    visibility: visible;
    transform: scaleX(1);
    transition-delay: 0.2s;
  }

  #cs-navigation.cs-active .cs-li {
    opacity: 1;
    transform: translateX(0);
  }

  #cs-navigation .cs-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%; /* lets container fill the fixed nav height */

  }

  #cs-navigation .cs-logo {
    width: 40%;
    max-width: 9.125rem;
    height: 100%;
    margin: 0 auto 0 0;
    box-sizing: border-box;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    /* replace height: 100% with a max-height so it doesn't grow */
    height: auto;
    max-height: 2.5rem; /* adjust to your logo's natural size */
  }

  #cs-navigation .cs-logo svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: left;
  }

  #cs-navigation .cs-toggle {
    width: clamp(2.75rem, 6vw, 3rem);
    height: clamp(2.75rem, 6vw, 3rem);
    margin: 0 0 0 auto;
    background-color: transparent;
    border: none;
    border-radius: 0.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #cs-navigation .cs-active .cs-line1 {
    top: 50%;
    transform: translate(-50%, -50%) rotate(225deg);
  }

  #cs-navigation .cs-active .cs-line2 {
    top: 50%;
    transform: translate(-50%, -50%) translateY(0) rotate(-225deg);
    transform-origin: center;
  }

  #cs-navigation .cs-active .cs-line3 {
    opacity: 0;
    bottom: 100%;
  }

  #cs-navigation .cs-box {
    width: clamp(1.5rem, 2vw, 1.75rem);
    height: clamp(0.875rem, 1.5vw, 1rem);
    position: relative;
  }

  #cs-navigation .cs-line {
    width: 100%;
    height: 2px;
    background-color: #1a1a1a;
    border-radius: 2px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  #cs-navigation .cs-line1 {
    top: 0;
    transition: transform 0.5s, top 0.3s, left 0.3s;
    animation-duration: 0.7s;
    animation-timing-function: ease;
    animation-direction: normal;
    animation-fill-mode: forwards;
    transform-origin: center;
  }

  #cs-navigation .cs-line2 {
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    transition: top 0.3s, left 0.3s, transform 0.5s;
    animation-duration: 0.7s;
    animation-timing-function: ease;
    animation-direction: normal;
    animation-fill-mode: forwards;
  }

  #cs-navigation .cs-line3 {
    bottom: 0;
    transition: bottom 0.3s, opacity 0.3s;
  }

  #cs-navigation .cs-ul-wrapper {
    height: 100vh;
    background-color: #fff;
    box-shadow: inset rgba(0, 0, 0, 0.2) 0px 8px 24px;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 100%;
    right: 0;
    left: auto;
    z-index: -1;
    overflow: hidden;
    transform: scaleX(0);
    transition: transform 0.4s, opacity 0.3s;
    transform-origin: top right;
  }

  #cs-navigation .cs-ul {
    width: auto;
    min-width: 40%;
    height: 65vh;
    margin: 0;
    padding: 3rem clamp(1.75rem, 3vw, 2.5rem) 2rem 4.375rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    gap: 1.25rem;
    overflow: scroll;
  }

  #cs-navigation .cs-li {
    text-align: right;
    list-style: none;
    width: 100%;
    margin-right: 0;
    opacity: 0;
    transform: translateX(-2.5rem);
    transition: transform 0.6s, opacity 0.9s;
  }

  #cs-navigation .cs-li:nth-of-type(1) { transition-delay: 0.05s; }
  #cs-navigation .cs-li:nth-of-type(2) { transition-delay: 0.1s; }
  #cs-navigation .cs-li:nth-of-type(3) { transition-delay: 0.15s; }
  #cs-navigation .cs-li:nth-of-type(4) { transition-delay: 0.2s; }
  #cs-navigation .cs-li:nth-of-type(5) { transition-delay: 0.25s; }
  #cs-navigation .cs-li:nth-of-type(6) { transition-delay: 0.3s; }
  #cs-navigation .cs-li:nth-of-type(7) { transition-delay: 0.35s; }
  #cs-navigation .cs-li:nth-of-type(8) { transition-delay: 0.4s; }
  #cs-navigation .cs-li:nth-of-type(9) { transition-delay: 0.45s; }

  #cs-navigation .cs-li-link {
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    /*color: inherit;*/
    color: var(--headerColor);
    line-height: 1.2em;
    text-decoration: none;
    margin: 0;
    display: inline-block;
    position: relative;
  }

  #cs-navigation .cs-li-link::before {
    content: "";
    width: 100%;
    height: 1px;
    background: currentColor;
    opacity: 1;
    display: none;
    position: absolute;
    bottom: -0.125rem;
    left: 0;
  }

  #cs-navigation .cs-li-link.cs-active::before {
    display: block;
  }

  #cs-navigation .cs-button-solid {
    display: none;
  }
}

/* Dark Mode — Mobile 
@media only screen and (max-width: 63.9375rem) {
  body.dark-mode #cs-navigation {
    background-color: var(--dark);
  }

  body.dark-mode #cs-navigation .cs-logo {
    filter: grayscale(1) brightness(1000%);
  }

  body.dark-mode #cs-navigation .cs-line {
    background-color: #fff;
  }

  body.dark-mode #cs-navigation .cs-ul-wrapper {
    background-color: var(--medium);
  }

  body.dark-mode #cs-navigation .cs-li-link {
    color: var(--bodyTextColorWhite);
  }
}*/

/* ==========================================================================
   Navigation Dropdown — Mobile (max-width: 1023px)
   ========================================================================== */

@media only screen and (max-width: 63.9375rem) {
  #cs-navigation .cs-dropdown {
    color: var(--bodyTextColorWhite);
    color: var(--headerColor);
    position: relative;
  }

  #cs-navigation .cs-dropdown.cs-active .cs-drop-ul {
    height: auto;
    margin: 0.75rem 0 0 0;
    padding: 1.5rem;
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }

  #cs-navigation .cs-dropdown.cs-active .cs-drop-link {
    opacity: 1;
  }

  #cs-navigation .cs-dropdown.cs-active .cs-drop-icon {
    transform: rotate(0);
  }

  #cs-navigation .cs-dropdown .cs-li-link {
    position: relative;
    transition: opacity 0.3s;
  }

  #cs-navigation .cs-drop-icon {
    width: 0.9375rem;
    height: auto;
    display: inline-block;
    color: inherit;
    transform: rotate(180deg);
    transition: 0.3s;
  }

  #cs-navigation .cs-drop-ul {
    width: 100%;
    height: 0;
    margin: 0;
    box-sizing: border-box;
    padding: 0 1.5rem 0 1.5rem;
    background-color: var(--primary);
    opacity: 0;
    display: flex;
    visibility: hidden;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    gap: 0.75rem;
    overflow: hidden;
    transform: scale(0);
    transition: padding 0.3s, margin 0.3s, height 0.3s, opacity 0.3s, transform 0.3s, visibility 0.3s;
    transform-origin: top right;
  }

  #cs-navigation .cs-drop-li {
    text-align: inherit;
    list-style: none;
  }

  #cs-navigation .cs-li-link.cs-drop-link {
    font-size: clamp(0.875rem, 2vw, 1.25rem);
    color: #fff;
  }

  #cs-navigation .cs-dropdown-toggle {
    background-color: transparent;
    border: none;
    appearance: none;
  }
}

/* Navigation Dropdown — Desktop (min-width: 1024px) */
@media only screen and (min-width: 64rem) {
  #cs-navigation .cs-dropdown {
    position: relative;
  }

  #cs-navigation .cs-dropdown:hover .cs-drop-ul,
  #cs-navigation .cs-dropdown.cs-active .cs-drop-ul {
    opacity: 1;
    visibility: visible;
    transform: scaleY(1);
    cursor: pointer;
  }

  #cs-navigation .cs-dropdown:hover .cs-drop-li,
  #cs-navigation .cs-dropdown.cs-active .cs-drop-li {
    opacity: 1;
    transform: translateY(0);
    cursor: pointer;
  }

  #cs-navigation .cs-dropdown:has(.cs-drop-icon) {
    display: flex;
    align-items: center;
  }

  #cs-navigation .cs-dropdown:has(.cs-drop-icon):hover .cs-drop-icon {
    transform: rotate(0);
  }

  #cs-navigation .cs-drop-icon {
    width: 0.9375rem;
    height: auto;
    display: inline-block;
    color: inherit;
    transform: rotate(180deg);
    transition: 0.3s;
  }

  #cs-navigation .cs-drop-ul {
    min-width: 12.5rem;
    margin: 0;
    padding: 0;
    background-color: #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 10px 16px;
    opacity: 0;
    border-bottom: 5px solid var(--primary);
    visibility: hidden;
    position: absolute;
    top: 100%;
    z-index: -100;
    overflow: hidden;
    transform: scaleY(0);
    transition: transform 0.3s, visibility 0.3s, opacity 0.3s;
    transform-origin: top;
  }

  #cs-navigation .cs-drop-li {
    font-size: 1rem;
    text-decoration: none;
    list-style: none;
    width: 100%;
    height: auto;
    color: var(--bodyTextColor);
    opacity: 0;
    display: block;
    transform: translateY(-0.625rem);
    transition: opacity 0.6s, transform 0.6s;
  }

  #cs-navigation .cs-drop-li:nth-of-type(1)  { transition-delay: 0.05s; }
  #cs-navigation .cs-drop-li:nth-of-type(2)  { transition-delay: 0.1s; }
  #cs-navigation .cs-drop-li:nth-of-type(3)  { transition-delay: 0.15s; }
  #cs-navigation .cs-drop-li:nth-of-type(4)  { transition-delay: 0.2s; }
  #cs-navigation .cs-drop-li:nth-of-type(5)  { transition-delay: 0.25s; }
  #cs-navigation .cs-drop-li:nth-of-type(6)  { transition-delay: 0.3s; }
  #cs-navigation .cs-drop-li:nth-of-type(7)  { transition-delay: 0.35s; }
  #cs-navigation .cs-drop-li:nth-of-type(8)  { transition-delay: 0.4s; }
  #cs-navigation .cs-drop-li:nth-of-type(9)  { transition-delay: 0.45s; }
  #cs-navigation .cs-drop-li:nth-of-type(10) { transition-delay: 0.5s; }
  #cs-navigation .cs-drop-li:nth-of-type(11) { transition-delay: 0.55s; }
  #cs-navigation .cs-drop-li:nth-of-type(12) { transition-delay: 0.6s; }
  #cs-navigation .cs-drop-li:nth-of-type(13) { transition-delay: 0.65s; }

  #cs-navigation .cs-li-link.cs-drop-link {
    font-size: 1rem;
    line-height: 1.5em;
    text-decoration: none;
    white-space: nowrap;
    width: 100%;
    box-sizing: border-box;
    padding: 0.75rem;
    color: var(--bodyTextColor);
    display: block;
    transition: color 0.3s, background-color 0.3s;
  }

  #cs-navigation .cs-li-link.cs-drop-link:hover {
    background-color: #f7f7f7;
  }

  #cs-navigation .cs-li-link.cs-drop-link:focus-within {
    outline: 2px solid currentColor;
    outline-offset: -2px;
  }

  #cs-navigation .cs-li-link.cs-drop-link::before {
    display: none;
  }

  #cs-navigation .cs-dropdown-toggle {
    background-color: transparent;
    border: none;
    appearance: none;
  }
}

/* Dark Mode — Dropdown (all widths)
@media only screen and (min-width: 0rem) {
  body.dark-mode #cs-navigation .cs-drop-ul {
    background-color: var(--dark);
  }

  body.dark-mode #cs-navigation .cs-li-link.cs-drop-link:hover {
    background-color: var(--medium);
  }

  body.dark-mode #cs-navigation .cs-drop-icon {
    filter: grayscale(1) brightness(1000%);
  }
} */

/* ==========================================================================
   Desktop Navigation — min-width: 1024px (64rem)
   ========================================================================== */

@media only screen and (min-width: 64rem) {
  #cs-navigation {
    font-family: "Roboto", "Arial", sans-serif;
    width: 100%;
    box-sizing: border-box;
    padding: 0 1rem;
    background-color: #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    position: fixed;
    z-index: 10000;
  }

  #cs-navigation .cs-container {
    width: 100%;
    max-width: 80rem;
    margin: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1.5rem;
  }

  #cs-navigation .cs-toggle {
    display: none;
  }

  #cs-navigation .cs-logo {
    width: 18.4%;
    max-width: 21.875rem;
    height: 4.0625rem;
    margin: 0 auto 0 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }

  #cs-navigation .cs-logo svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  #cs-navigation .cs-ul {
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.25rem;
  }

  #cs-navigation .cs-li {
    list-style: none;
    padding: 2rem 1rem;
    flex: none;
  }

  #cs-navigation .cs-li-link {
    font-size: clamp(0.875rem, 1vw, 1rem);
    line-height: 1.5em;
    text-decoration: none;
    margin: 0;
    color: var(--bodyTextColor);
    display: block;
    position: relative;
  }

  #cs-navigation .cs-li-link::before {
    content: "";
    width: 0%;
    height: 2px;
    background: var(--primary);
    opacity: 1;
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: width 0.3s;
  }

  #cs-navigation .cs-li-link:hover::before {
    width: 100%;
  }

  #cs-navigation .cs-li-link.cs-active::before {
    width: 100%;
  }
}

/* Dark Mode — Desktop 
@media only screen and (min-width: 64rem) {
  body.dark-mode #cs-navigation {
    background-color: var(--dark);
  }

  body.dark-mode #cs-navigation .cs-logo {
    filter: grayscale(1) brightness(1000%);
  }

  body.dark-mode #cs-navigation .cs-li-link {
    color: var(--bodyTextColorWhite);
  }

  body.dark-mode #cs-navigation .cs-li-link::before {
    background-color: var(--primaryLight);
  }
}*/

`;

export const sampleHtml = `

<!-- ============================================ -->
<!--                 Navigation                   -->
<!-- ============================================ -->

<header id="cs-navigation">
    <div class="cs-container">
        <!--Nav Logo-->
        <a href="/" class="cs-logo" aria-label="Company Name Home page">
            <img src="/assets/images/header/logo-black.svg" alt="Company Logo" width="260" height="135" aria-hidden="true" decoding="async">
        </a>
        <!--Navigation List-->
		<nav class="cs-nav" aria-label="main navigation">
			<!--Mobile Nav Toggle-->
			<button class="cs-toggle" id="cs-toggle" aria-expanded="false" aria-controls="cs-ul-wrapper" aria-haspopup="menu" aria-label="mobile menu toggle">
				<span class="cs-box" aria-hidden="true">
					<span class="cs-line cs-line1" aria-hidden="true"></span>
					<span class="cs-line cs-line2" aria-hidden="true"></span>
					<span class="cs-line cs-line3" aria-hidden="true"></span>
				</span>
			</button>
			<!-- We need a wrapper div so we can set a fixed height on the cs-ul in case the nav list gets too long from too many dropdowns being opened and needs to have an overflow scroll. This wrapper acts as the background so it can go the full height of the screen and not cut off any overflowing nav items while the cs-ul stops short of the bottom of the screen, which keeps all nav items in view no matter how many there are-->
			<div class="cs-ul-wrapper" id="cs-ul-wrapper">
				<ul id="cs-expanded" class="cs-ul">
					<li class="cs-li">
						<a href="/" class="cs-li-link {% if page.url == "/" %} cs-active {% endif %}" {% if page.url == "/" %} aria-current="page" {% endif %}> Home </a>
					</li>
					<li class="cs-li">
						<a href="/about/" class="cs-li-link {% if page.url == "/about/" %} cs-active {% endif %}" {% if page.url == "/about/" %} aria-current="page" {% endif %}> About Us </a>
					</li>
					<!--Copy and paste this cs-dropdown list item and replace any .cs-li with this cs-dropdown group to make a new dropdown and it will work-->
					<!-- Note: When copying this dropdown, update the id attribute with an appropriate name (e.g., "services-dropdown-toggle", "products-dropdown-toggle") and ensure the aria-labelledby attribute on the ul matches the button's id -->
					<li class="cs-li cs-dropdown">
						<button class="cs-li-link cs-dropdown-toggle {% if '/services/' in page.url %}cs-active{% endif %}" aria-haspopup="menu" aria-expanded="false" id="projects-dropdown-toggle">
							Services
							<img class="cs-drop-icon" src="/assets/svgs/dropdown.svg" alt="" width="15" height="15" decoding="async" aria-hidden="true">
						</button>
						<ul class="cs-drop-ul" aria-labelledby="projects-dropdown-toggle">
							<li class="cs-drop-li">
    							<a href="/services/service-1/"
       								class="cs-li-link cs-drop-link {% if page.url == "/services/service-1/" %} cs-active {% endif %}"
       								{% if page.url == "/services/service-1/" %} aria-current="page" {% endif %}>
       								Service 1
    							</a>
							</li>

							<li class="cs-drop-li">
    							<a href="/services/service-2/"
       								class="cs-li-link cs-drop-link {% if page.url == "/services/service-2/" %} cs-active {% endif %}"
       								{% if page.url == "/services/service-2/" %} aria-current="page" {% endif %}>
       								Service 2
    							</a>
							</li>
						</ul>
					</li>
					<li class="cs-li">
						<a href="/portfolio/" class="cs-li-link {% if page.url == "/portfolio/" %} cs-active {% endif %}" {% if page.url == "/portfolio/" %} aria-current="page" {% endif %}>Portfolio</a>
                    </li>
					<li class="cs-li">
						<a href="/reviews/" class="cs-li-link {% if page.url == "/reviews/" %} cs-active {% endif %}" {% if page.url == "/reviews/" %} aria-current="page" {% endif %}> Reviews </a>
					</li>
					<li class="cs-li">
						<a href="/faq/" class="cs-li-link {% if page.url == "/faq/" %} cs-active {% endif %}" {% if page.url == "/faq/" %} aria-current="page" {% endif %}> FAQ</a>
					</li>
					<li class="cs-li">
						<a href="/blog/" class="cs-li-link {% if page.url == "/blog/" %} cs-active {% endif %}" {% if page.url == "/blog/" %} aria-current="page" {% endif %}>Blog</a>
					</li>
					<li class="cs-li cs-hide-on-desktop">
						<a href="/contact/" class="cs-li-link {% if page.url == "/contact/" %} cs-active {% endif %}" {% if page.url == "/contact/" %} aria-current="page" {% endif %}>Contact</a>
					</li>
				</ul>
			</div>
		</nav>
		<a href="/contact/" class="cs-button-solid cs-nav-button">Contact Us</a>
        <!--Dark Mode toggle, uncomment button code if you want to enable a dark mode toggle-->
        <button id="dark-mode-toggle" aria-label="dark mode toggle" aria-pressed="false">
            <img class="cs-moon" aria-hidden="true" src="/assets/svgs/moon.svg" decoding="async" alt="" width="15" height="15">
            <img class="cs-sun" aria-hidden="true" src="/assets/svgs/sun.svg" decoding="async" alt="" width="15" height="15">
        </button>
    </div>
</header>

`;

export const sampleJs = `
(() => {
	// Configuration
	const CONFIG = {
		BREAKPOINTS: {
			MOBILE: 1023.5,
		},
		SELECTORS: {
			body: "body",
			navigation: "#cs-navigation",
			hamburger: "#cs-navigation .cs-toggle",
			menuWrapper: "#cs-ul-wrapper",
			dropdownToggle: ".cs-dropdown-toggle",
			dropdown: ".cs-dropdown",
			dropdownMenu: ".cs-drop-ul",
			navButton: ".cs-nav-button",
			darkModeToggle: "#dark-mode-toggle",
		},
		CLASSES: {
			active: "cs-active",
			menuOpen: "cs-open",
		},
	};

	// DOM Elements
	const elements = {
		body: document.querySelector(CONFIG.SELECTORS.body),
		navigation: document.querySelector(CONFIG.SELECTORS.navigation),
		hamburger: document.querySelector(CONFIG.SELECTORS.hamburger),
		menuWrapper: document.querySelector(CONFIG.SELECTORS.menuWrapper),
		navButton: document.querySelector(CONFIG.SELECTORS.navButton),
		darkModeToggle: document.querySelector(CONFIG.SELECTORS.darkModeToggle),
	};

	// Utilities
	const isMobile = () => window.matchMedia(\`(max-width: \${CONFIG.BREAKPOINTS.MOBILE}px)\`).matches;

	const toggleAttribute = (element, attribute, value1 = "true", value2 = "false") => {
		if (!element) return;
		const current = element.getAttribute(attribute);
		element.setAttribute(attribute, current === value1 ? value2 : value1);
	};

	const toggleInert = (element) => element && (element.inert = !element.inert);

	// Dropdown Management
	const dropdownManager = {
		close(dropdown, shouldFocus = false) {
			if (!dropdown || !dropdown.classList.contains(CONFIG.CLASSES.active)) return false;

			dropdown.classList.remove(CONFIG.CLASSES.active);
			const button = dropdown.querySelector(CONFIG.SELECTORS.dropdownToggle);
			const menu = dropdown.querySelector(CONFIG.SELECTORS.dropdownMenu);

			if (button) {
				button.setAttribute("aria-expanded", "false");
				shouldFocus && button.focus();
			}

			if (menu) {
				menu.inert = true;
			}

			return true;
		},

		toggle(element) {
			element.classList.toggle(CONFIG.CLASSES.active);
			const button = element.querySelector(CONFIG.SELECTORS.dropdownToggle);
			const menu = element.querySelector(CONFIG.SELECTORS.dropdownMenu);

			button && toggleAttribute(button, "aria-expanded");
			menu && toggleInert(menu);
		},

		closeAll() {
			if (!elements.navigation) return false;
			let closed = false;

			elements.navigation.querySelectorAll(\`\${CONFIG.SELECTORS.dropdown}.\${CONFIG.CLASSES.active}\`).forEach((dropdown) => {
				this.close(dropdown, true);
				closed = true;
			});

			return closed;
		},
	};

	// Menu Management
	const menuManager = {
		toggle() {
			if (!elements.hamburger || !elements.navigation) return;

			const isClosing = elements.navigation.classList.contains(CONFIG.CLASSES.active);

			[elements.hamburger, elements.navigation].forEach((el) => el.classList.toggle(CONFIG.CLASSES.active));
			elements.body.classList.toggle(CONFIG.CLASSES.menuOpen);
			toggleAttribute(elements.hamburger, "aria-expanded");

			// Only manage inert state on mobile devices
			if (elements.menuWrapper && isMobile()) {
				toggleInert(elements.menuWrapper);
			}

			// When closing the mobile menu, also close any open dropdowns
			isClosing && dropdownManager.closeAll();
		},
	};

	// Keyboard Management
	const keyboardManager = {
		handleEscape() {
			if (!elements.navigation) return;

			// Close any open dropdown menus first
			const dropdownsClosed = dropdownManager.closeAll();
			if (dropdownsClosed) return;

			// Then close hamburger menu if open
			if (elements.hamburger && elements.hamburger.classList.contains(CONFIG.CLASSES.active)) {
				menuManager.toggle();
				elements.hamburger.focus();
			}
		},
	};

	// Event Management
	const eventManager = {
		handleDropdownClick(event) {
			if (!isMobile()) return;

			const button = event.target.closest(CONFIG.SELECTORS.dropdownToggle);
			if (!button) return;

			event.preventDefault();
			const dropdown = button.closest(CONFIG.SELECTORS.dropdown);
			if (dropdown) {
				dropdownManager.toggle(dropdown);
			}
		},

		handleDropdownKeydown(event) {
			if (event.key !== "Enter" && event.key !== " ") return;

			const button = event.target.closest(CONFIG.SELECTORS.dropdownToggle);
			if (!button) return;

			event.preventDefault();
			const dropdown = button.closest(CONFIG.SELECTORS.dropdown);
			if (dropdown) {
				dropdownManager.toggle(dropdown);
			}
		},

		handleFocusOut(event) {
			setTimeout(() => {
				if (!event.relatedTarget) return;

				const dropdown = event.target.closest(CONFIG.SELECTORS.dropdown);
				if (dropdown?.classList.contains(CONFIG.CLASSES.active) && !dropdown.contains(event.relatedTarget)) {
					dropdownManager.close(dropdown);
				}
			}, 10);
		},

		handleMobileFocus(event) {
			if (!isMobile() || !elements.navigation.classList.contains(CONFIG.CLASSES.active)) return;
			if (elements.menuWrapper.contains(event.target) || elements.hamburger.contains(event.target)) return;

			menuManager.toggle();
		},

		handleDropdownHover(event) {
			if (isMobile()) return; // Only apply hover behavior on desktop

			const dropdown = event.target.closest(CONFIG.SELECTORS.dropdown);
			if (!dropdown) return;

			const menu = dropdown.querySelector(CONFIG.SELECTORS.dropdownMenu);
			if (!menu) return;

			if (event.type === "mouseenter") {
				menu.inert = false;
			} else if (event.type === "mouseleave") {
				// Only set inert=true if mouse is leaving the entire dropdown area
				// Use setTimeout to allow mouseleave/mouseenter events to complete
				setTimeout(() => {
					// Check if mouse is still over the dropdown or its menu
					if (!dropdown.matches(":hover")) {
						menu.inert = true;
					}
				}, 1);
			}
		},
	};

	// Initialization & Setup
	const init = {
		inertState() {
			if (!elements.menuWrapper) return;

			// On mobile, menu starts closed, so set inert=true
			// On desktop, menu is always visible, so set inert=false
			elements.menuWrapper.inert = isMobile();

			// Initialize dropdown menus - they start closed, so inert=true on all devices
			if (elements.navigation) {
				const dropdownMenus = elements.navigation.querySelectorAll(CONFIG.SELECTORS.dropdownMenu);
				dropdownMenus.forEach((dropdown) => {
					dropdown.inert = true;
				});
			}
		},

		eventListeners() {
			if (!elements.hamburger || !elements.navigation) return;

			// Hamburger menu
			elements.hamburger.addEventListener("click", menuManager.toggle);
			elements.navigation.addEventListener("click", (e) => {
				if (e.target === elements.navigation && elements.navigation.classList.contains(CONFIG.CLASSES.active)) {
					menuManager.toggle();
				}
			});

			// Dropdown delegation
			elements.navigation.addEventListener("click", eventManager.handleDropdownClick);
			elements.navigation.addEventListener("keydown", eventManager.handleDropdownKeydown);
			elements.navigation.addEventListener("focusout", eventManager.handleFocusOut);

			// Desktop hover listeners for inert management
			elements.navigation.addEventListener("mouseenter", eventManager.handleDropdownHover, true);
			elements.navigation.addEventListener("mouseleave", eventManager.handleDropdownHover, true);

			// Global events
			document.addEventListener("keydown", (e) => e.key === "Escape" && keyboardManager.handleEscape());
			document.addEventListener("focusin", eventManager.handleMobileFocus);

			// Resize handling
			window.addEventListener("resize", () => {
				this.inertState();
				if (!isMobile() && elements.navigation.classList.contains(CONFIG.CLASSES.active)) {
					menuManager.toggle();
				}
			});
		},
	};

	// Initialize navigation system
	init.inertState();
	init.eventListeners();
})();




    // faq
    const faqItems = Array.from(document.querySelectorAll('.cs-faq-item'));
        for (const item of faqItems) {
            const onClick = () => {
            item.classList.toggle('active')
        }
        item.addEventListener('click', onClick)
        }



`;