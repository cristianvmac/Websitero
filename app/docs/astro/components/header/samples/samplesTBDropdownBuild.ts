//import type { SubItem } from "../types/navigation";

// ─────────────────────────────────────────────────────────
// SHARED DROPDOWN ITEMS
// ─────────────────────────────────────────────────────────
/*export const productSubItems: SubItem[] = [
  { label: "Analytics",  href: "#", description: "Better understand your traffic" },
  { label: "Engagement", href: "#", description: "Speak directly to customers" },
  { label: "Security",   href: "#", description: "Keep your data safe" },
];*/
// ─────────────────────────────────────────────────────────
// SAMPLE CODE STRINGS (shown in Root / HTML / CSS / JS tabs)
// ─────────────────────────────────────────────────────────
export const sampleRoot = `
:root {
    --primary: #ff6a3e;
    --primaryLight: #ffba43;
    --secondary: #ffba43;
    --secondaryLight: #ffba43;
    --headerColor: #1a1a1a;
    --bodyTextColor: #4e4b66;
    --bodyTextColorWhite: #fafbfc;
    --topperFontSize: clamp(0.8125rem, 1.6vw, 1rem);
    --headerFontSize: clamp(1.9375rem, 3.9vw, 3.0625rem);
    --bodyFontSize: 1rem;
    --sectionPadding: clamp(3.75rem, 7.82vw, 6.25rem) 1rem;
}
body { margin: 0; padding: 0; }
*, *:before, *:after { box-sizing: border-box; }
.cs-topper {
    font-size: var(--topperFontSize);
    line-height: 1.2em;
    text-transform: uppercase;
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
    max-width: 43.75rem;
    margin: 0 0 1rem 0;
    color: var(--headerColor);
    position: relative;
}
.cs-text {
    font-size: var(--bodyFontSize);
    line-height: 1.5em;
    width: 100%;
    max-width: 40.625rem;
    margin: 0;
    color: var(--bodyTextColor);
}
`;

export const sampleHtml = `
    <!-- ============================================ -->
<!--                 Navigation                   -->
<!-- ============================================ -->

<header id="cs-navigation">
    <!--Nav Logo-->
    <a href="" class="cs-logo cs-desktop" aria-label="back to home">
        <div class="cs-logo-wrapper">
            <!--Default Logo-->
            <img class="cs-default" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Logos/construction-logo.svg" alt="logo" width="210" height="29" aria-hidden="true" decoding="async">
            <!--Dark Mode Logo-->
            <img class="cs-dark" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Logos/construction-logo-white2.svg" alt="logo" width="210" height="29" aria-hidden="true" decoding="async">
        </div>
    </a>
    <div class="cs-middle">
        <!--Top Bar-->
        <div class="cs-top-bar">
            <div class="cs-top-social">
                <a href="" class="cs-social-link">
                    <img class="cs-social-icon" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/facebook-1a.svg" alt="logo" width="12" height="12" aria-hidden="true" decoding="async">
                </a>
                <a href="" class="cs-social-link">
                    <img class="cs-social-icon" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/twitter-1a.svg" alt="logo" width="12" height="12" aria-hidden="true" decoding="async">
                </a>
                <a href="" class="cs-social-link">
                    <img class="cs-social-icon" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/instagram1a.svg" alt="logo" width="12" height="12" aria-hidden="true" decoding="async">
                </a>
                <a href="" class="cs-social-link">
                    <img class="cs-social-icon" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/youtube1a.svg" alt="logo" width="12" height="12" aria-hidden="true" decoding="async">
                </a>
            </div>
            <ul class="cs-location">
                <li class="cs-item cs-remove">
                    <img class="cs-icon" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/red-pin1.svg" alt="icon" width="20" height="20" aria-hidden="true" decoding="async">
                    555 Fake Avenue - South Milwaukee, WI 53172
                </li>
                <li class="cs-item">
                    <img class="cs-icon" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/red-clock1.svg" alt="icon" width="20" height="20" aria-hidden="true" decoding="async">
                    M-F: 8:00am - 9:00pm
                </li>
            </ul>
        </div>
        <div class="cs-bottom-bar">
            <a href="" class="cs-logo cs-mobile" aria-label="back to home">
                <div class="cs-logo-wrapper">
                    <!--Default Logo-->
                    <img class="cs-default" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Logos/construction-logo.svg" alt="logo" width="210" height="29" aria-hidden="true" decoding="async">
                    <!--Dark Mode Logo-->
                    <img class="cs-dark" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Logos/construction-logo-white2.svg" alt="logo" width="210" height="29" aria-hidden="true" decoding="async">
                </div>
            </a>
            <!--Navigation List-->
            <nav class="cs-nav" role="navigation">
                <!--Mobile Nav Toggle-->
                <button class="cs-toggle" aria-label="mobile menu toggle">
                    <div class="cs-box" aria-hidden="true">
                        <span class="cs-line cs-line1" aria-hidden="true"></span>
                        <span class="cs-line cs-line2" aria-hidden="true"></span>
                        <span class="cs-line cs-line3" aria-hidden="true"></span>
                    </div>
                </button>
                <!-- We need a wrapper div so we can set a fixed height on the cs-ul in case the nav list gets too long from too many dropdowns being opened and needs to have an overflow scroll. This wrapper acts as the background so it can go the full height of the screen and not cut off any overflowing nav items while the cs-ul stops short of the bottom of the screen, which keeps all nav items in view no matter how mnay there are-->
                <div class="cs-ul-wrapper">
                    <ul id="cs-expanded" class="cs-ul" aria-expanded="false">
                        <li class="cs-li">
                            <a href="" class="cs-li-link cs-active">
                                Home
                            </a>
                        </li>
                        <!--Copy and paste this cs-dropdown list item and replace any .cs-li with this cs-dropdown group to make a new dropdown and it will work-->
                        <li class="cs-li cs-dropdown" tabindex="0">
                            <span class="cs-li-link">
                                Services
                                <img class="cs-drop-icon" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/arrow-dwon2.svg" alt="dropdown icon" width="24" height="24" decoding="async" aria-hidden="true">
                            </span>
                            <ul class="cs-drop-ul">
                                <li class="cs-drop-li">
                                    <a href="" class="cs-li-link cs-drop-link">New Construction</a>
                                </li>
                                <li class="cs-drop-li">
                                    <a href="" class="cs-li-link cs-drop-link">Home Remodels</a>
                                </li>
                            </ul>
                        </li>
                        <li class="cs-li">
                            <a href="" class="cs-li-link">
                                About
                            </a>
                        </li>
                        <li class="cs-li">
                            <a href="" class="cs-li-link">
                                Asthetics
                            </a>
                        </li>
                        <li class="cs-li">
                            <a href="" class="cs-li-link">
                                FAQ
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <a class="cs-nav-button cs-tablet" href="">
                <picture class="cs-wrapper">
                    <img class="cs-icon" loading="lazy" decoding="async" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/red-phone1.svg" alt="icon" width="24" height="24">
                </picture>
                <div class="cs-info">
                    <span class="cs-header">Free Contact 24/7</span>
                    <span class="cs-link-content">(604) 555-0234</span>
                </div>
            </a>
            <a href="" class="cs-button-border">
                Get In Touch
                <img class="cs-icon" loading="lazy" decoding="async" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/up-right-arrow.svg" alt="icon" width="20" height="20">
            </a>
            <!--Dark Mode toggle, uncomment button code if you want to enable a dark mode toggle-->
            <button id="dark-mode-toggle" aria-label="dark mode toggle">
                <svg class="cs-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" style="enable-background:new 0 0 480 480" xml:space="preserve"><path d="M459.782 347.328c-4.288-5.28-11.488-7.232-17.824-4.96-17.76 6.368-37.024 9.632-57.312 9.632-97.056 0-176-78.976-176-176 0-58.4 28.832-112.768 77.12-145.472 5.472-3.712 8.096-10.4 6.624-16.832S285.638 2.4 279.078 1.44C271.59.352 264.134 0 256.646 0c-132.352 0-240 107.648-240 240s107.648 240 240 240c84 0 160.416-42.688 204.352-114.176 3.552-5.792 3.04-13.184-1.216-18.496z"/></svg>
                <img class="cs-sun" aria-hidden="true" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons%2Fsun.svg" decoding="async" alt="moon" width="15" height="15">
            </button>
        </div>
    </div>
    <div class="cs-contact-wrapper">
        <a class="cs-desktop-button" href="">
            <picture class="cs-wrapper">
                <img class="cs-button-icon" loading="lazy" decoding="async" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/red-phone1.svg" alt="icon" width="24" height="24">
            </picture>
            <div class="cs-info">
                <span class="cs-header">Free Contact 24/7</span>
                <span class="cs-link-content">(604) 555-0234</span>
            </div>
        </a>
    </div>
</header>
                                                           
`;

export const sampleCss = `

  /*-- -------------------------- -->
<---      Dark Mode Toggle      -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
  body.dark-mode #dark-mode-toggle .cs-sun {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  body.dark-mode #dark-mode-toggle .cs-moon {
    transform: translate(-50%, -150%);
    opacity: 0;
    fill: #fff;
  }
  #dark-mode-toggle {
    display: block;
    position: absolute;
    top: 0rem;
    right: 1rem;
    width: 3rem;
    height: 3rem;
    background: transparent;
    border: none;
    overflow: hidden;
    padding: 0;
    z-index: 1000;
    transition: top 0.3s, right 0.3s;
  }
  #dark-mode-toggle img,
  #dark-mode-toggle svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1.25rem;
    height: 1.25rem;
    pointer-events: none;
  }
  #dark-mode-toggle .cs-moon {
    z-index: 2;
    transition: transform 0.3s, opacity 0.3s;
  }
  #dark-mode-toggle .cs-sun {
    z-index: 1;
    transform: translate(-50%, 100%);
    opacity: 0;
    transition: transform 0.3s, opacity 0.3s;
  }
}
/* Tablet - 650px - 1024px */
@media only screen and (min-width: 40.625rem) and (max-width: 1299.5px) {
  #dark-mode-toggle {
    top: auto;
    right: auto;
    position: relative;
    order: 3;
  }
}
/* Desktop - 1024px */
@media only screen and (min-width: 1024px) {
  #dark-mode-toggle {
    margin: 0;
    position: relative;
    transform: none;
    bottom: auto;
    right: auto;
  }
  #dark-mode-toggle:hover {
    cursor: pointer;
  }
}

/*-- -------------------------- -->
<---     Mobile Navigation      -->
<--- -------------------------- -*/

/* Mobile - 1023px */
@media only screen and (max-width: 1299.5px) {
  body.cs-open {
    overflow: hidden;
  }
  #cs-navigation {
    width: 100%;
    padding: 0.75rem 1rem 0 1rem;
    /* prevents padding from affecting height and width */
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    position: fixed;
    z-index: 100;
    transition: transform 0.3s;
  }
  #cs-navigation.cs-active .cs-link {
    color: var(--bodyTextColorWhite);
  }
  #cs-navigation.cs-active .cs-ul-wrapper {
    opacity: 1;
    transform: scaleY(1);
    transition-delay: 0.1s;
  }
  #cs-navigation.cs-active .cs-li {
    transform: translateY(0);
    opacity: 1;
  }
  #cs-navigation.scroll {
    transform: translateY(-3rem);
  }
  #cs-navigation.scroll #dark-mode-toggle {
    top: 4.25rem;
    right: 4.875rem;
  }
  #cs-navigation .cs-location {
    margin: 0;
    padding: 0;
    position: relative;
    transition: height 0.3s, padding-bottom 0.3s, opacity 0.3s;
    z-index: -3;
  }
  #cs-navigation .cs-top-social {
    display: none;
  }
  #cs-navigation .cs-top-bar {
    padding-bottom: 0.75rem;
    position: relative;
    z-index: 1;
  }
  #cs-navigation .cs-top-bar:before {
    /* grey line */
    content: '';
    width: 100vw;
    height: 1px;
    background: #EFF1F0;
    opacity: 1;
    position: absolute;
    display: block;
    bottom: 0;
    left: 50%;
    z-index: -2;
    transform: translateX(-50%);
    transition: opacity 0.3s;
  }
  #cs-navigation .cs-bottom-bar {
    height: auto;
    padding: 1.25rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  #cs-navigation .cs-logo {
    height: 2.5rem;
    width: auto;
    display: block;
  }
  #cs-navigation .cs-logo img {
    height: 100%;
    width: auto;
  }
  #cs-navigation .cs-logo-wrapper {
    width: auto;
    height: 100%;
    position: relative;
    z-index: 1;
    perspective: 700px;
    transform-style: preserve-3d;
  }
  #cs-navigation .cs-default {
    -webkit-backface-visibility: hidden;
    /* Safari */
    backface-visibility: hidden;
    transition: opacity 0.3s, transform 0.6s;
  }
  #cs-navigation .cs-dark {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0;
    -webkit-backface-visibility: hidden;
    /* Safari */
    backface-visibility: hidden;
    transform: rotateX(180deg);
    transition: opacity 0.3s, transform 0.6s;
  }
  #cs-navigation .cs-desktop {
    display: none;
  }
  #cs-navigation .cs-item {
    font-size: 1rem;
    line-height: 1.5rem;
    list-style: none;
    margin: 0;
    color: #585B5D;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
  }
  #cs-navigation .cs-remove {
    display: none;
  }
  #cs-navigation .cs-icon {
    width: 1.25rem;
    height: auto;
    display: block;
  }
  #cs-navigation .cs-header {
    display: none;
  }
  #cs-navigation .cs-link {
    font-size: 0.875rem;
    line-height: 1.5em;
    text-align: inherit;
    text-decoration: none;
    margin: 0;
    color: var(--bodyTextColor);
    display: block;
    transition: color 0.3s;
  }
  #cs-navigation .cs-toggle {
    width: 3rem;
    height: 3rem;
    margin: 0;
    background-color: #F3F3F3;
    border: none;
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
    transform-origin: center;
    transform: translate(-50%, -50%) translateY(0) rotate(-225deg);
  }
  #cs-navigation .cs-active .cs-line3 {
    bottom: 100%;
    opacity: 0;
  }
  #cs-navigation .cs-box {
    width: 1.25rem;
    height: 0.75rem;
    position: relative;
  }
  #cs-navigation .cs-line {
    width: 100%;
    height: 2px;
    border-radius: 2px;
    background-color: #585B5D;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  #cs-navigation .cs-line1 {
    top: 0;
    transform-origin: center;
    transition: transform 0.5s, top 0.3S, left 0.3S;
    animation-duration: 0.7s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    animation-direction: normal;
  }
  #cs-navigation .cs-line2 {
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    transition: top 0.3s, left 0.3s, transform 0.5s;
    animation-duration: 0.7s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    animation-direction: normal;
  }
  #cs-navigation .cs-line3 {
    width: 0.75rem;
    bottom: 0;
    left: 0;
    transform: none;
    transition: bottom 0.3s, opacity 0.3s;
  }
  #cs-navigation .cs-contact-wrapper,
  #cs-navigation .cs-tablet,
  #cs-navigation .cs-button-border {
    display: none;
  }
}
/* Tablet - 650px - 1024px */
@media only screen and (min-width: 40.625rem) and (max-width: 1299.5px) {
  #cs-navigation .cs-location {
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
  }
  #cs-navigation .cs-top-bar {
    padding-bottom: 0.75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #cs-navigation .cs-logo {
    margin-right: auto;
    order: 1;
  }
  #cs-navigation .cs-item {
    position: relative;
  }
  #cs-navigation .cs-item:nth-of-type(2):after {
    display: none;
  }
  #cs-navigation .cs-item:after {
    /* divider line */
    content: '';
    width: 1px;
    height: 100%;
    margin: 0 1rem;
    background: #CFD0D1;
    opacity: 1;
    position: relative;
    display: block;
  }
  #cs-navigation .cs-top-social {
    height: 2rem;
    visibility: visible;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    transition: opacity 0.3s, visibility 0.3s, height 0.3s;
  }
  #cs-navigation .cs-social-link {
    text-decoration: none;
    width: 2rem;
    height: 2rem;
    background-color: #f7f7f7;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #cs-navigation .cs-social-icon {
    width: 0.75rem;
    height: auto;
    opacity: 0.6;
    display: block;
  }
  #cs-navigation .cs-bottom-bar {
    gap: 1rem;
  }
  #cs-navigation .cs-li-link {
    font-size: 1.5rem;
  }
  #cs-navigation .cs-nav-button {
    text-decoration: none;
    margin-right: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    order: 2;
    position: relative;
    perspective: 200px;
    transform-style: preserve-3d;
  }
  #cs-navigation .cs-nav-button:hover .cs-wrapper {
    transform: rotateY(180deg);
  }
  #cs-navigation .cs-nav-button .cs-wrapper {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    /* prevents flexbox from squishing it */
    flex: none;
    position: relative;
    z-index: 1;
    transition: transform 0.6s;
  }
  #cs-navigation .cs-nav-button .cs-wrapper:before {
    /* backgorund color in pseudo so we can use the primary color variable and use opacity */
    content: "";
    width: 100%;
    height: 100%;
    background-color: #F3F3F3;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    z-index: -1;
  }
  #cs-navigation .cs-nav-button .cs-icon {
    width: 1.5rem;
    height: auto;
    display: block;
    transition: transform 0.3s;
  }
  #cs-navigation .cs-nav-button .cs-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  #cs-navigation .cs-nav-button .cs-header {
    font-size: 0.875rem;
    line-height: 1.5em;
    margin: 0;
    color: #585B5D;
    display: block;
  }
  #cs-navigation .cs-nav-button .cs-link-content {
    font-size: 1rem;
    line-height: 1.5em;
    font-weight: 700;
    margin: 0;
    color: var(--headerColor);
    display: block;
  }
  #cs-navigation .cs-nav {
    order: 4;
  }
}
/* Inbetween - 1024px */
@media only screen and (min-width: 1024px) {
  #cs-navigation .cs-bottom-bar {
    justify-content: flex-start;
    padding: 0;
  }
  #cs-navigation .cs-remove {
    display: flex;
  }
  #cs-navigation .cs-toggle {
    display: none;
  }
  #cs-navigation .cs-nav {
    order: 2;
  }
  #cs-navigation .cs-ul {
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* 20px - 36px */
    gap: clamp(1.25rem, 2.6vw, 2.25rem);
  }
  #cs-navigation .cs-li {
    list-style: none;
    /* 24px - 28px */
    padding: clamp(1.5rem, 2.1vw, 1.75rem) 0;
    /* prevent flexbox from squishing it */
    flex: none;
  }
  #cs-navigation .cs-li:last-of-type {
    /* pushes the button to the far roght */
    margin-left: auto;
    padding: 0;
  }
  #cs-navigation .cs-li-link {
    font-size: 1rem;
    line-height: 1.5em;
    text-transform: uppercase;
    text-decoration: none;
    margin: 0;
    color: var(--headerColor);
    display: block;
    position: relative;
    transition: color 0.3s;
  }
  #cs-navigation .cs-li-link.cs-active,
  #cs-navigation .cs-li-link:hover {
    color: var(--primary);
  }
  #cs-navigation .cs-nav-button {
    display: none;
  }
}

/*-- -------------------------- -->
<---   Mobile Navigation Menu   -->
<--- -------------------------- -*/

/* Small Desktop - 1024px */
@media only screen and (max-width: 1023.5px) {
  #cs-navigation .cs-ul-wrapper {
    width: 70vw;
    max-width: 31.25rem;
    height: 100vh;
    opacity: 0;
    background-color: #1a1a1a;
    overflow: hidden;
    position: absolute;
    top: 100%;
    left: auto;
    right: 0;
    z-index: -1;
    transform: scaleX(0);
    transform-origin: top right;
    transition: transform 0.4s, opacity 0.3s;
  }
  #cs-navigation .cs-ul {
    margin: 0;
    /* 28px - 40px */
    padding: 3rem clamp(1.75rem, 3vw, 2.5rem) 2rem 4.375rem;
    width: auto;
    min-width: 40%;
    height: 65vh;
    overflow: scroll;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-end;
    gap: 1.25rem;
  }
  #cs-navigation .cs-li {
    text-align: right;
    list-style: none;
    width: 100%;
    margin-right: 0;
    /* transition from these values */
    transform: translateX(-2.5rem);
    opacity: 0;
    transition: transform 0.6s, opacity 0.9s;
  }
  #cs-navigation .cs-li:nth-of-type(1) {
    transition-delay: 0.05s;
  }
  #cs-navigation .cs-li:nth-of-type(2) {
    transition-delay: 0.1s;
  }
  #cs-navigation .cs-li:nth-of-type(3) {
    transition-delay: 0.15s;
  }
  #cs-navigation .cs-li:nth-of-type(4) {
    transition-delay: 0.2s;
  }
  #cs-navigation .cs-li:nth-of-type(5) {
    transition-delay: 0.25s;
  }
  #cs-navigation .cs-li:nth-of-type(6) {
    transition-delay: 0.3s;
  }
  #cs-navigation .cs-li:nth-of-type(7) {
    transition-delay: 0.35s;
  }
  #cs-navigation .cs-li:nth-of-type(8) {
    transition-delay: 0.4s;
  }
  #cs-navigation .cs-li:nth-of-type(9) {
    transition-delay: 0.45s;
  }
  #cs-navigation .cs-li-link {
    /* 16px - 24px */
    font-size: clamp(1rem, 2.5vw, 1.5rem);
    line-height: 1.2em;
    text-transform: uppercase;
    text-decoration: none;
    margin: 0;
    color: var(--bodyTextColorWhite);
    display: inline-block;
    position: relative;
  }
  #cs-navigation .cs-li-link.cs-active {
    color: var(--primary);
  }
}

/*-- -------------------------- -->
<---     Navigation Dropdown    -->
<--- -------------------------- -*/

/* Mobile - 1023px */
@media only screen and (max-width: 63.9375rem) {
  #cs-navigation .cs-dropdown {
    position: relative;
    color: var(--bodyTextColorWhite);
  }
  #cs-navigation .cs-dropdown.cs-active .cs-drop-ul {
    height: auto;
    opacity: 1;
    visibility: visible;
    margin: 0.75rem 0 0 0;
    padding: 1.5rem;
    transform: scale(1);
  }
  #cs-navigation .cs-dropdown.cs-active .cs-drop-link {
    opacity: 1;
  }
  #cs-navigation .cs-dropdown .cs-li-link {
    position: relative;
    transition: opacity 0.3s;
  }
  #cs-navigation .cs-drop-icon {
    width: 1.5rem;
    height: auto;
    margin-left: 0.25rem;
    filter: grayscale(1) brightness(1000%);
    position: absolute;
    top: 50%;
    right: -1.25rem;
    transform: translateY(-50%);
  }
  #cs-navigation .cs-drop-ul {
    width: 100%;
    height: 0;
    margin: 0;
    padding: 0 1.5rem 0 1.5rem;
    box-sizing: border-box;
    background-color: var(--primary);
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.75rem;
    transform: scale(0);
    transform-origin: top right;
    transition: padding 0.3s, margin 0.3s, height 0.3s, opacity 0.3s, transform 0.3s, visibility 0.3s;
  }
  #cs-navigation .cs-drop-li {
    list-style: none;
    text-align: inherit;
  }
  #cs-navigation .cs-li-link.cs-drop-link {
    /* 14px - 16px */
    font-size: clamp(0.875rem, 2vw, 1.25rem);
    color: #1a1a1a;
  }
}
/* Desktop - 1024px */
@media only screen and (min-width: 1024px) {
  #cs-navigation .cs-dropdown {
    position: relative;
  }
  #cs-navigation .cs-dropdown:hover {
    cursor: pointer;
  }
  #cs-navigation .cs-dropdown:hover .cs-drop-ul {
    transform: scaleY(1);
    opacity: 1;
    visibility: visible;
  }
  #cs-navigation .cs-dropdown:hover .cs-drop-li {
    opacity: 1;
    transform: translateY(0);
  }
  #cs-navigation .cs-drop-icon {
    width: 1.5rem;
    height: auto;
    display: inline-block;
  }
  #cs-navigation .cs-drop-ul {
    min-width: 12.5rem;
    margin: 0;
    padding: 0;
    background-color: #fff;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 10px 16px;
    border-bottom: 5px solid var(--primary);
    /* if you have 8 or more links in your dropdown nav, uncomment the columns property to make the list into 2 even columns. Change it to 3 or 4 if you need extra columns. Then remove the transition delays on the cs-drop-li so they don't have weird scattered animations */
    position: absolute;
    top: 100%;
    z-index: -100;
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.3s, visibility 0.3s, opacity 0.3s;
  }
  #cs-navigation .cs-drop-li {
    list-style: none;
    font-size: 1rem;
    text-decoration: none;
    opacity: 0;
    width: 100%;
    height: auto;
    color: var(--bodyTextColor);
    display: block;
    transform: translateY(-10/16rem);
    transition: opacity 0.6s, transform 0.6s;
  }
  #cs-navigation .cs-drop-li:nth-of-type(2) {
    transition-delay: 0.15s;
  }
  #cs-navigation .cs-drop-li:nth-of-type(3) {
    transition-delay: 0.3s;
  }
  #cs-navigation .cs-drop-li:nth-of-type(4) {
    transition-delay: 0.45s;
  }
  #cs-navigation .cs-drop-li:nth-of-type(5) {
    transition-delay: 0.6s;
  }
  #cs-navigation .cs-drop-li:nth-of-type(6) {
    transition-delay: 0.75s;
  }
  #cs-navigation .cs-li-link {
    display: flex;
    align-items: center;
  }
  #cs-navigation .cs-li-link.cs-drop-link {
    font-size: 1rem;
    white-space: nowrap;
    line-height: 1.5em;
    text-decoration: none;
    padding: 0.75rem;
    /* prevents padding from affecting height and width */
    box-sizing: border-box;
    color: var(--bodyTextColor);
    display: block;
    transition: color 0.3s, background-color 0.3s;
  }
  #cs-navigation .cs-li-link.cs-drop-link:hover {
    background-color: #f7f7f7;
  }
  #cs-navigation .cs-li-link.cs-drop-link:before {
    display: none;
  }
}

/*-- -------------------------- -->
<---     Desktop Navigation     -->
<--- -------------------------- -*/

/* Small Desktop - 1024px */
@media only screen and (min-width: 1300px) {
  #cs-navigation {
    /* 136px tall */
    --headerHeight: 8.5rem;
    width: 100%;
    padding: 0;
    /* prevents padding from affecting height and width */
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    display: flex;
    position: fixed;
    z-index: 10000;
    transition: height 0.3s, background-color 0.3s;
  }
  #cs-navigation.scroll .cs-top-bar {
    height: 0;
    opacity: 0;
    overflow: hidden;
  }
  #cs-navigation.scroll .cs-top-bar:before {
    width: 0;
  }
  #cs-navigation.scroll .cs-middle {
    height: 5rem;
  }
  #cs-navigation.scroll .cs-logo,
  #cs-navigation.scroll .cs-contact-wrapper {
    height: 5rem;
  }
  #cs-navigation.scroll .cs-logo img {
    max-height: 5rem;
  }
  #cs-navigation.scroll .cs-toggle {
    margin-top: 0;
  }
  #cs-navigation .cs-toggle {
    display: none;
  }
  #cs-navigation .cs-logo {
    width: 20%;
    max-width: 21.25rem;
    height: var(--headerHeight);
    border-right: 1px solid #E7E7E8;
    padding: 1rem;
    /* prevents padding from affecting height and width */
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    transition: height 0.3s;
  }
  #cs-navigation .cs-logo img {
    width: 80%;
    max-width: 16.25rem;
    height: auto;
    max-height: 7.5rem;
    box-sizing: border-box;
    /* ensures the image never overflows the container. It stays contained within it's width and height and expands to fill it then stops once it reaches an edge */
    object-fit: contain;
    transition: max-height 0.3s, opacity 0.3s, transform 0.6s;
  }
  #cs-navigation .cs-logo-wrapper {
    width: auto;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    perspective: 700px;
    transform-style: preserve-3d;
  }
  #cs-navigation .cs-default {
    -webkit-backface-visibility: hidden;
    /* Safari */
    backface-visibility: hidden;
  }
  #cs-navigation .cs-dark {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: -1;
    opacity: 0;
    -webkit-backface-visibility: hidden;
    /* Safari */
    backface-visibility: hidden;
    transform: rotateX(180deg) translateX(-50%);
  }
  #cs-navigation .cs-mobile {
    display: none;
  }
  #cs-navigation .cs-top-bar {
    width: 100%;
    height: 3.5rem;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    transition: height 0.3s, opacity 0.3s, transform 0.3s;
  }
  #cs-navigation .cs-top-bar:before {
    /* grey line */
    content: '';
    height: 1px;
    background: #E7E7E8;
    opacity: 1;
    position: absolute;
    display: block;
    bottom: 0;
    left: -2.5rem;
    right: -2.5rem;
    z-index: -2;
    transition: width 0.3s;
  }
  #cs-navigation .cs-top-social {
    height: 2rem;
    visibility: visible;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    transition: opacity 0.3s, visibility 0.3s, height 0.3s;
  }
  #cs-navigation .cs-social-link {
    text-decoration: none;
    width: 2rem;
    height: 2rem;
    background-color: #f7f7f7;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s;
  }
  #cs-navigation .cs-social-link:hover {
    background-color: var(--primary);
  }
  #cs-navigation .cs-social-icon {
    width: 0.75rem;
    height: auto;
    opacity: 0.6;
    display: block;
  }
  #cs-navigation .cs-location {
    display: flex;
    flex-direction: row;
  }
  #cs-navigation .cs-item {
    list-style: none;
    margin: 0;
    display: flex;
    align-items: center;
    flex: none;
    justify-content: flex-start;
    gap: 0.25rem;
    position: relative;
  }
  #cs-navigation .cs-item:last-of-type:after {
    display: none;
  }
  #cs-navigation .cs-item:hover .cs-picture {
    transform: scale(1.1);
  }
  #cs-navigation .cs-item:after {
    /* divider line */
    content: '';
    width: 1px;
    height: 100%;
    /* 24px - 44px */
    margin: 0 1.5rem;
    background: #EFF1F0;
    opacity: 1;
    position: relative;
    display: block;
  }
  #cs-navigation .cs-link {
    font-size: 0.875rem;
    line-height: 1.5em;
    text-align: inherit;
    text-decoration: none;
    margin: 0;
    color: var(--bodyTextColor);
    display: block;
    transition: color 0.3s;
  }
  #cs-navigation .cs-link:hover {
    text-decoration: underline;
  }
  #cs-navigation .cs-middle {
    width: 100%;
    height: var(--headerHeight);
    padding: 0 2.5rem 0 2.5rem;
    transition: height 0.3s;
  }
  #cs-navigation .cs-nav {
    order: -1;
  }
  #cs-navigation .cs-bottom-bar {
    width: 100%;
    /* prevents padding from affecting height and width */
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 2rem;
  }
  #cs-navigation .cs-desktop-button {
    text-decoration: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    order: 2;
    position: relative;
    perspective: 200px;
    transform-style: preserve-3d;
  }
  #cs-navigation .cs-desktop-button:hover .cs-wrapper {
    transform: rotateY(360deg);
  }
  #cs-navigation .cs-wrapper {
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    /* prevents flexbox from squishing it */
    flex: none;
    position: relative;
    z-index: 1;
    transition: transform 0.6s;
  }
  #cs-navigation .cs-wrapper:before {
    /* backgorund color in pseudo so we can use the primary color variable and use opacity */
    content: "";
    width: 100%;
    height: 100%;
    background-color: #F3F3F3;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    z-index: -1;
  }
  #cs-navigation .cs-button-icon {
    width: 1.25rem;
    height: auto;
    display: block;
    transition: transform 0.3s;
  }
  #cs-navigation .cs-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  #cs-navigation .cs-header {
    font-size: 0.875rem;
    line-height: 1.5em;
    margin: 0;
    color: #585B5D;
    display: block;
  }
  #cs-navigation .cs-link-content {
    font-size: 1rem;
    line-height: 1.5em;
    font-weight: 700;
    margin: 0;
    color: var(--headerColor);
    display: block;
  }
  #cs-navigation .cs-nav-button,
  #cs-navigation .cs-button-border {
    display: none;
  }
  #cs-navigation .cs-contact-wrapper {
    width: 18%;
    max-width: 18.375rem;
    height: var(--headerHeight);
    border-left: 1px solid #E7E7E8;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: none;
    transition: height 0.3s;
  }
}
/* Small Desktop - 1500px */
@media only screen and (min-width: 1500px) {
  #cs-navigation .cs-nav {
    margin-right: auto;
  }
  #cs-navigation .cs-button-border {
    font-size: 1rem;
    line-height: 2.875rem;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0 1.75rem;
    color: var(--headerColor);
    border: 1px solid var(--headerColor);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    transition: color 0.3s, background-color 0.3s;
  }
  #cs-navigation .cs-button-border:hover {
    background-color: var(--headerColor);
    color: #fff;
  }
  #cs-navigation .cs-button-border:hover .cs-icon {
    filter: grayscale(1) brightness(1000%);
  }
  #cs-navigation .cs-button-border .cs-icon {
    width: 1.25rem;
  }
}                              
                                
`;

export const sampleJs = `
  // add classes for mobile navigation toggling
    var CSbody = document.querySelector("body");
    const CSnavbarMenu = document.querySelector("#cs-navigation");
    const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");

    CShamburgerMenu.addEventListener('click', function() {
        CShamburgerMenu.classList.toggle("cs-active");
        CSnavbarMenu.classList.toggle("cs-active");
        CSbody.classList.toggle("cs-open");
        // run the function to check the aria-expanded value
        ariaExpanded();
    });

    // checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not 
    function ariaExpanded() {
        const csUL = document.querySelector('#cs-expanded');
        const csExpanded = csUL.getAttribute('aria-expanded');

        if (csExpanded === 'false') {
            csUL.setAttribute('aria-expanded', 'true');
        } else {
            csUL.setAttribute('aria-expanded', 'false');
        }
    }

    // mobile nav toggle code
    const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
        for (const item of dropDowns) {
            const onClick = () => {
            item.classList.toggle('cs-active')
        }
        item.addEventListener('click', onClick)
        }

    // after scrolling down 100px, add .scroll class to the #cs-navigation
    document.addEventListener('scroll', (e) => { 
        const scroll = document.documentElement.scrollTop;
        if(scroll >= 100){
    document.querySelector('#cs-navigation').classList.add('scroll')
        } else {
        document.querySelector('#cs-navigation').classList.remove('scroll')
        }
    });
                                
`;

