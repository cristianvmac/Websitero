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
    <div class="cs-top-bar">
        <div class="cs-top-container">
            <!--Nav Logo-->
            <a href="" class="cs-logo" aria-label="back to home">
                <img src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Logos/invest-logo-black.svg" alt="logo" width="197" height="43" aria-hidden="true" decoding="async">
            </a>
            <div class="cs-contact-group">
                <a class="cs-contact-link" href="mailto:Info@invetexfinance.com">
                    <picture class="cs-wrapper">
                        <img class="cs-icon" loading="lazy" decoding="async" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/yellow-mail.svg" alt="icon" width="24" height="24">
                    </picture>
                    <div class="cs-info">
                        <span class="cs-header">Send A Message</span>
                        <span class="cs-link-content">Info@invetexfinance.com</span>
                    </div>
                </a>
                <a class="cs-contact-link" href="mailto:Info@health&wellness.com">
                    <picture class="cs-wrapper">
                        <img class="cs-icon" loading="lazy" decoding="async" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/yellow-pin.svg" alt="icon" width="24" height="24">
                    </picture>
                    <div class="cs-info">
                        <span class="cs-header">Visit Us At</span>
                        <span class="cs-link-content">Oak Harbor, WA</span>
                    </div>
                </a>
                <a href="" class="cs-button-solid">Schedule Appointment</a>
            </div>
            <!--Dark Mode toggle, uncomment button code if you want to enable a dark mode toggle-->
            <!-- <button id="dark-mode-toggle" aria-label="dark mode toggle">
                <svg class="cs-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" style="enable-background:new 0 0 480 480" xml:space="preserve"><path d="M459.782 347.328c-4.288-5.28-11.488-7.232-17.824-4.96-17.76 6.368-37.024 9.632-57.312 9.632-97.056 0-176-78.976-176-176 0-58.4 28.832-112.768 77.12-145.472 5.472-3.712 8.096-10.4 6.624-16.832S285.638 2.4 279.078 1.44C271.59.352 264.134 0 256.646 0c-132.352 0-240 107.648-240 240s107.648 240 240 240c84 0 160.416-42.688 204.352-114.176 3.552-5.792 3.04-13.184-1.216-18.496z"/></svg>
                <img class="cs-sun" aria-hidden="true" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons%2Fsun.svg" decoding="async" alt="moon" width="15" height="15">
            </button> -->
        </div>
    </div>
    <!--Wrapped the bottom container in a wrapper div so we can have a full width background color, and centered the container inside of it-->
    <div class="cs-bottom-bar">
        <div class="cs-container">
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
                        <li class="cs-li">
                            <a href="" class="cs-li-link">
                                About
                            </a>
                        </li>
                        <!--Copy and paste this cs-dropdown list item and replace any .cs-li with this cs-dropdown group to make a new dropdown and it will work-->
                        <li class="cs-li cs-dropdown" tabindex="0">
                            <span class="cs-li-link">
                                Services
                                <img class="cs-drop-icon" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Logos/down-yellow.svg" alt="dropdown icon" width="15" height="15" decoding="async" aria-hidden="true">
                            </span>
                            <ul class="cs-drop-ul">
                                <li class="cs-drop-li">
                                    <a href="" class="cs-li-link cs-drop-link">About</a>
                                </li>
                                <li class="cs-drop-li">
                                    <a href="" class="cs-li-link cs-drop-link">Tax Prep</a>
                                </li>
                            </ul>
                        </li>
                        <li class="cs-li">
                            <a href="" class="cs-li-link">
                                Team
                            </a>
                        </li>
                        <li class="cs-li">
                            <a href="" class="cs-li-link">
                                Our Work
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
            <a class="cs-call" href="tel:555-555-0234">
                <picture class="cs-wrapper">
                    <img class="cs-icon" loading="lazy" decoding="async" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/phone-1a.svg" alt="icon" width="24" height="24">
                </picture>
                <div class="cs-info">
                    <span class="cs-header">Free Contact 24/7</span>
                    <span class="cs-link-content">(604) 555-0234</span>
                </div>
            </a>
        </div>
    </div>
</header>
                                                            
`;

export const sampleCss = `
   /*-- -------------------------- -->
<---     Mobile Navigation      -->
<--- -------------------------- -*/

/* Mobile - 1023px */
@media only screen and (max-width: 63.9375rem) {
    body.cs-open {
        overflow: hidden;
    }
    body.scroll #cs-navigation .cs-top-container {
        gap: 0;
    }
    body.scroll #cs-navigation .cs-top-social {
        height: 0;
        opacity: 0;
        overflow: hidden;
        visibility: hidden;
    }
    #cs-navigation {
        width: 100%;
        /* prevents padding and border from affecting height and width */
        box-sizing: border-box;
        background-color: #fff;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        position: fixed;
        z-index: 10000;
    }
    #cs-navigation:before {
        content: "";
        width: 100%;
        height: 0vh;
        background: rgba(0, 0, 0, 0.6);
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        position: absolute;
        display: block;
        top: 100%;
        right: 0;
        z-index: -1100;
        opacity: 0;
        transition:
            height 0.5s,
            opacity 0.5s;
    }
    #cs-navigation.cs-active:before {
        height: 150vh;
        opacity: 1;
    }
    #cs-navigation.cs-active .cs-ul-wrapper {
        opacity: 1;
        transform: scaleY(1);
        transition-delay: 0.15s;
    }
    #cs-navigation.cs-active .cs-li {
        transform: translateY(0);
        opacity: 1;
    }
    #cs-navigation .cs-top-bar {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #cs-navigation .cs-top-container {
        width: 100%;
        /* 16px - 20px */
        padding: clamp(1rem, 2.5vw, 1.25rem) 1rem;
        /* prevents padding and border from affecting height and width */
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    #cs-navigation .cs-contact-group {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        gap: 2.5rem;
        /* sends it to the right in the 2nd position */
        order: 2;
    }
    #cs-navigation .cs-contact-link {
        display: none;
    }
    #cs-navigation .cs-container {
        width: 100%;
        /* 16px - 20px */
        padding: clamp(1rem, 2.5vw, 1.25rem) 1rem;
        /* prevents padding and border from affecting height and width */
        box-sizing: border-box;
        background-color: #1a1a1a;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }
    #cs-navigation .cs-logo {
        width: auto;
        /* 24px - 32px */
        height: clamp(1.5rem, 3vw, 2rem);
        margin: 0 auto 0 0;
        padding: 0;
        /* prevents padding and border from affecting height and width */
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        order: 1;
        z-index: 10;
    }
    #cs-navigation .cs-logo img {
        width: auto;
        height: 100%;
        /* ensures the image never overflows the container. It stays contained within it's width and height and expands to fill it then stops once it reaches an edge */
        object-fit: contain;
    }
    #cs-navigation .cs-nav {
        order: 2;
    }
    #cs-navigation .cs-toggle {
        /* 48px - 56px */
        width: clamp(3rem, 7.2vw, 3.5rem);
        height: clamp(3rem, 7.2vw, 3.5rem);
        margin: 0 0 0 auto;
        background-color: #484848;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 0.6s;
    }
    #cs-navigation .cs-toggle.cs-active {
        transform: rotate(180deg);
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
        /* 24px - 28px */
        width: clamp(1.5rem, 2vw, 1.75rem);
        height: 1rem;
        position: relative;
    }
    #cs-navigation .cs-line {
        width: 100%;
        height: 2px;
        border-radius: 2px;
        background-color: #fafbfc;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    #cs-navigation .cs-line1 {
        top: 0;
        transform-origin: center;
        transition:
            transform 0.5s,
            top 0.3s,
            left 0.3s;
        animation-duration: 0.7s;
        animation-timing-function: ease;
        animation-fill-mode: forwards;
        animation-direction: normal;
    }
    #cs-navigation .cs-line2 {
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        transition:
            top 0.3s,
            left 0.3s,
            transform 0.5s;
        animation-duration: 0.7s;
        animation-timing-function: ease;
        animation-fill-mode: forwards;
        animation-direction: normal;
    }
    #cs-navigation .cs-line3 {
        bottom: 0;
        transition:
            bottom 0.3s,
            opacity 0.3s;
    }
    #cs-navigation .cs-ul-wrapper {
        width: 100%;
        height: auto;
        padding-bottom: 3rem;
        opacity: 0;
        background-color: #fff;
        box-shadow: inset rgba(0, 0, 0, 0.2) 0px 8px 24px;
        overflow: hidden;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: -1;
        transform: scaleY(0);
        transform-origin: top;
        transition:
            transform 0.4s,
            opacity 0.3s;
    }
    #cs-navigation .cs-ul {
        margin: 0;
        padding: 3rem 0 0 0;
        width: 100%;
        height: auto;
        max-height: 65vh;
        overflow: scroll;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;
        gap: 1.25rem;
    }
    #cs-navigation .cs-li {
        width: 100%;
        text-align: center;
        list-style: none;
        margin-right: 0;
        /* transition from these values */
        transform: translateY(-4.375rem);
        opacity: 0;
        transition:
            transform 0.6s,
            opacity 0.9s;
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
    #cs-navigation .cs-li:nth-of-type(10) {
        transition-delay: 0.5s;
    }
    #cs-navigation .cs-li:nth-of-type(11) {
        transition-delay: 0.55s;
    }
    #cs-navigation .cs-li:nth-of-type(12) {
        transition-delay: 0.6s;
    }
    #cs-navigation .cs-li:nth-of-type(13) {
        transition-delay: 0.65s;
    }
    #cs-navigation .cs-li-link {
        /* 16px - 24px */
        font-size: clamp(1rem, 2.5vw, 1.5rem);
        line-height: 1.2em;
        text-decoration: none;
        margin: 0;
        color: var(--headerColor);
        display: inline-block;
        position: relative;
    }
    #cs-navigation .cs-li-link.cs-active {
        color: var(--primary);
    }
    #cs-navigation .cs-li-link:hover {
        color: var(--primary);
    }
    #cs-navigation .cs-button-solid {
        font-size: 1rem;
        /* 46px - 56px */
        line-height: clamp(2.875rem, 5.5vw, 3.5rem);
        text-decoration: none;
        font-weight: 700;
        text-align: center;
        margin: 0;
        color: #1a1a1a;
        min-width: 9.375rem;
        padding: 0 1.5rem;
        background-color: var(--primary);
        display: inline-block;
        position: relative;
        z-index: 1;
        /* prevents padding from adding to the width */
        box-sizing: border-box;
        transition: color 0.3s;
    }
    #cs-navigation .cs-button-solid:before {
        content: "";
        position: absolute;
        height: 100%;
        width: 0%;
        background: #000;
        opacity: 1;
        top: 0;
        left: 0;
        z-index: -1;
        transition: width 0.3s;
    }
    #cs-navigation .cs-button-solid:hover {
        color: #fff;
    }
    #cs-navigation .cs-button-solid:hover:before {
        width: 100%;
    }
    #cs-navigation .cs-button-solid {
        margin: 0;
        display: none;
    }
    #cs-navigation .cs-call {
        text-decoration: none;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
        position: relative;
    }
    #cs-navigation .cs-call:before {
        /* light green circle that animates on hover */
        content: "";
        width: 3rem;
        height: 3rem;
        background: #eff1f0;
        border-radius: 1.5rem;
        opacity: 1;
        position: absolute;
        display: block;
        top: 50%;
        left: 0;
        z-index: -1;
        transform: translateY(-50%);
        transition:
            width 0.3s,
            height 0.3s,
            border-radius 0.3s;
    }
    #cs-navigation .cs-call .cs-wrapper {
        width: 3.5rem;
        height: 3.5rem;
        background-color: var(--primary);
        display: flex;
        justify-content: center;
        align-items: center;
        /* prevents flexbox from squishing it */
        flex: none;
        transition: transform 0.3s;
    }
    #cs-navigation .cs-call .cs-icon {
        width: 1.5rem;
        height: auto;
        display: block;
        transition: transform 0.3s;
    }
    #cs-navigation .cs-call .cs-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    #cs-navigation .cs-call .cs-header {
        font-size: 0.875rem;
        line-height: 1.2em;
        font-weight: 400;
        margin: 0;
        color: var(--bodyTextColorWhite);
        display: block;
    }
    #cs-navigation .cs-call .cs-link-content {
        font-size: 1.25rem;
        line-height: 1.2em;
        font-weight: 700;
        margin: 0;
        color: var(--bodyTextColorWhite);
        display: block;
    }
}
/* Tablet - 768px */
@media only screen and (min-width: 48rem) {
    #cs-navigation .cs-button-solid {
        display: block;
    }
}

/*-- -------------------------- -->
<---     Navigation Dropdown    -->
<--- -------------------------- -*/

/* Mobile - 1023px */
@media only screen and (max-width: 63.9375rem) {
    #cs-navigation .cs-li {
        text-align: center;
        width: 100%;
        display: block;
    }
    #cs-navigation .cs-dropdown {
        position: relative;
        color: var(--bodyTextColorWhite);
    }
    #cs-navigation .cs-dropdown.cs-active .cs-drop-ul {
        height: auto;
        opacity: 1;
        visibility: visible;
        margin: 0.75rem 0 0 0;
        padding: 0.75rem 0;
    }
    #cs-navigation .cs-dropdown.cs-active .cs-drop-link {
        opacity: 1;
    }
    #cs-navigation .cs-dropdown .cs-li-link {
        position: relative;
        transition: opacity 0.3s;
    }
    #cs-navigation .cs-drop-icon {
        width: 0.9375rem;
        height: auto;
        position: absolute;
        top: 50%;
        right: -1.25rem;
        transform: translateY(-50%);
    }
    #cs-navigation .cs-drop-ul {
        width: 100%;
        height: 0;
        margin: 0;
        padding: 0;
        background-color: var(--primary);
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        transition:
            padding 0.3s,
            margin 0.3s,
            height 0.3s,
            opacity 0.3s,
            visibility 0.3s;
    }
    #cs-navigation .cs-drop-li {
        list-style: none;
    }
    #cs-navigation .cs-li-link.cs-drop-link {
        /* 14px - 16px */
        font-size: clamp(0.875rem, 2vw, 1.25rem);
        color: #fff;
    }
}
/* Desktop - 1024px */
@media only screen and (min-width: 64rem) {
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
        width: 0.9375rem;
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
        transition:
            transform 0.3s,
            visibility 0.3s,
            opacity 0.3s;
    }
    #cs-navigation .cs-drop-li {
        list-style: none;
        font-size: 1rem;
        text-decoration: none;
        opacity: 0;
        width: 100%;
        height: auto;
        display: block;
        transform: translateY(-0.625rem);
        transition:
            opacity 0.6s,
            transform 0.6s;
    }
    #cs-navigation .cs-drop-li:nth-of-type(1) {
        transition-delay: 0.05s;
    }
    #cs-navigation .cs-drop-li:nth-of-type(2) {
        transition-delay: 0.1s;
    }
    #cs-navigation .cs-drop-li:nth-of-type(3) {
        transition-delay: 0.15s;
    }
    #cs-navigation .cs-drop-li:nth-of-type(4) {
        transition-delay: 0.2s;
    }
    #cs-navigation .cs-drop-li:nth-of-type(5) {
        transition-delay: 0.25s;
    }
    #cs-navigation .cs-drop-li:nth-of-type(6) {
        transition-delay: 0.3s;
    }
    #cs-navigation .cs-drop-li:nth-of-type(7) {
        transition-delay: 0.35s;
    }
    #cs-navigation .cs-drop-li:nth-of-type(8) {
        transition-delay: 0.4s;
    }
    #cs-navigation .cs-drop-li:nth-of-type(9) {
        transition-delay: 0.45s;
    }
    #cs-navigation .cs-drop-li:nth-of-type(10) {
        transition-delay: 0.5s;
    }
    #cs-navigation .cs-drop-li:nth-of-type(11) {
        transition-delay: 0.55s;
    }
    #cs-navigation .cs-drop-li:nth-of-type(12) {
        transition-delay: 0.6s;
    }
    #cs-navigation .cs-drop-li:nth-of-type(13) {
        transition-delay: 0.65s;
    }
    #cs-navigation .cs-li-link.cs-drop-link {
        font-size: 1rem;
        white-space: nowrap;
        line-height: 1.5em;
        text-transform: capitalize;
        text-decoration: none;
        width: 100%;
        padding: 0.75rem;
        /* prevents padding and border from affecting height and width */
        box-sizing: border-box;
        color: var(--bodyTextColor);
        display: block;
        transition:
            color 0.3s,
            background-color 0.3s;
    }
    #cs-navigation .cs-li-link.cs-drop-link:hover {
        color: var(--primary);
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
@media only screen and (min-width: 64rem) {
    #cs-navigation {
        width: 100%;
        padding: 0;
        /* prevents padding and border from affecting height and width */
        box-sizing: border-box;
        background-color: #fff;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        position: fixed;
        z-index: 10000;
    }
    #cs-navigation .cs-top-bar {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #cs-navigation .cs-top-container {
        width: 100%;
        max-width: 80rem;
        padding: 1rem;
        /* prevents padding and border from affecting height and width */
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1.5rem;
    }
    #cs-navigation .cs-contact-group {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 1.5rem;
    }
    #cs-navigation .cs-contact-link {
        text-decoration: none;
        padding-right: 1.875rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
        position: relative;
        perspective: 200px;
        transform-style: preserve-3d;
    }
    #cs-navigation .cs-contact-link:nth-of-type(2) {
        display: none;
    }
    #cs-navigation .cs-contact-link:hover .cs-wrapper {
        transform: rotateY(180deg);
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
        background-color: var(--primary);
        opacity: 0.1;
        position: absolute;
        display: block;
        top: 0;
        left: 0;
    }
    #cs-navigation .cs-icon {
        width: 1.5rem;
        height: auto;
        display: block;
        transition: transform 0.3s;
    }
    #cs-navigation .cs-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
    }
    #cs-navigation .cs-header {
        font-size: 1rem;
        line-height: 1.2em;
        font-weight: 700;
        margin: 0;
        color: var(--headerColor);
        display: block;
    }
    #cs-navigation .cs-link-content {
        font-size: 0.875rem;
        line-height: 1.2em;
        font-weight: 400;
        margin: 0;
        color: var(--bodyTextColor);
        display: block;
    }
    #cs-navigation .cs-button-solid {
        font-size: 1rem;
        /* 46px - 56px */
        line-height: clamp(2.875rem, 5.5vw, 3.5rem);
        text-decoration: none;
        font-weight: 700;
        text-align: center;
        margin: 0;
        color: #1a1a1a;
        min-width: 9.375rem;
        padding: 0 3rem;
        background-color: var(--primary);
        display: inline-block;
        position: relative;
        z-index: 1;
        /* prevents padding from adding to the width */
        box-sizing: border-box;
        transition: color 0.3s;
    }
    #cs-navigation .cs-button-solid:before {
        content: "";
        position: absolute;
        height: 100%;
        width: 0%;
        background: #000;
        opacity: 1;
        top: 0;
        left: 0;
        z-index: -1;
        transition: width 0.3s;
    }
    #cs-navigation .cs-button-solid:hover {
        color: #fff;
    }
    #cs-navigation .cs-button-solid:hover:before {
        width: 100%;
    }
    #cs-navigation .cs-bottom-bar {
        width: 100%;
        background-color: #1a1a1a;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #cs-navigation .cs-container {
        width: 100%;
        max-width: 80rem;
        margin: auto;
        padding: 0 1rem;
        /* prevents padding from affectin gheight */
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1.5rem;
        position: relative;
    }
    #cs-navigation .cs-toggle {
        display: none;
    }
    #cs-navigation .cs-logo {
        width: 18.4%;
        max-width: 12.3125rem;
        height: 3.75rem;
        /* margin-right auto pushes everything away from it to the right */
        margin: 0 auto 0 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
    }
    #cs-navigation .cs-logo img {
        width: 100%;
        height: 100%;
        /* ensures the image never overflows the container. It stays contained within it's width and height and expands to fill it then stops once it reaches an edge */
        object-fit: contain;
    }
    #cs-navigation .cs-ul {
        width: 100%;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 2.25rem;
    }
    #cs-navigation .cs-li {
        list-style: none;
        padding: 2.25rem 0;
        /* prevent flexbox from squishing it */
        flex: none;
    }
    #cs-navigation .cs-li-link {
        font-size: 1rem;
        text-transform: uppercase;
        line-height: 1.5em;
        text-decoration: none;
        margin: 0;
        color: var(--bodyTextColorWhite);
        display: block;
        position: relative;
        transition: color 0.3s;
    }
    #cs-navigation .cs-li-link:hover {
        color: var(--primary);
    }
    #cs-navigation .cs-li-link.cs-active {
        font-weight: 700;
        color: var(--primary);
    }
    #cs-navigation .cs-call {
        text-decoration: none;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
        position: relative;
        perspective: 200px;
        transform-style: preserve-3d;
    }
    #cs-navigation .cs-call:hover:hover .cs-wrapper {
        transform: rotateY(180deg);
    }
    #cs-navigation .cs-call .cs-wrapper {
        width: 3.5rem;
        height: 3.5rem;
        background-color: var(--primary);
        display: flex;
        justify-content: center;
        align-items: center;
        /* prevents flexbox from squishing it */
        flex: none;
        transition: transform 0.6s;
    }
    #cs-navigation .cs-call .cs-icon {
        width: 1.5rem;
        height: auto;
        display: block;
        transition: transform 0.3s;
    }
    #cs-navigation .cs-call .cs-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    #cs-navigation .cs-call .cs-header {
        font-size: 0.875rem;
        line-height: 1.2em;
        font-weight: 400;
        margin: 0;
        color: var(--bodyTextColorWhite);
        display: block;
    }
    #cs-navigation .cs-call .cs-link-content {
        font-size: 1.25rem;
        line-height: 1.2em;
        font-weight: 700;
        margin: 0;
        color: var(--bodyTextColorWhite);
        display: block;
    }
}
/* Large Desktop - 1300px */
@media only screen and (min-width: 75rem) {
    #cs-navigation .cs-contact-link:nth-of-type(2) {
        display: flex;
    }
}
/* Larger Desktop - 1200px */
@media only screen and (min-width: 100rem) {
    #cs-navigation .cs-donate {
        display: flex;
        margin-left: auto;
    }
    #cs-navigation .cs-nav-button {
        margin: 0;
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
                                
`;

