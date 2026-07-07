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
<!--                   Banner                     -->
<!-- ============================================ -->

<div id="banner-14">
    <div class="cs-container">
        <span class="cs-int-title">Our Story</span>
        <div class="cs-breadcrumbs">
            <a href="" class="cs-link">Home</a>
            <a href="" class="cs-link cs-active">Our Company</a>
        </div>
    </div>
    <!--Background Image-->
    <picture class="cs-background">
        <!--Mobile Image-->
        <source media="(max-width: 600px)" srcset="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop">
        <!--Tablet and above Image-->
        <source media="(min-width: 601px)" srcset="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop">
        <img decoding="async" src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop" alt="team collaborating in modern office" width="1280" height="568" aria-hidden="true">
    </picture>
</div>                       

<!-- ============================================ -->
<!--                 Content Page                 -->
<!-- ============================================ -->

<section id="content-page-14">
    <div class="cs-container">
        <div class="cs-image-group">
            <div class="cs-flex">
                <picture class="cs-background">
                    <!--Mobile Image-->
                    <source media="(max-width: 600px)" srcset="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop">
                    <!--Tablet and above Image-->
                    <source media="(min-width: 601px)" srcset="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop">
                    <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop" alt="professional working on laptop in office" width="542" height="728">
                </picture>
            </div>
            <ul class="cs-card-group">
                <li class="cs-item">
                    <h3 class="cs-h3">
                        <img class="cs-h3-icon" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/trophy.svg" alt="icon" width="32" height="32">
                        Proven Excellence
                    </h3>
                    <p class="cs-item-text">
                        We deliver consistent, high-quality results backed by years of industry expertise.
                    </p>
                </li>
                <li class="cs-item">
                    <h3 class="cs-h3">
                        <img class="cs-h3-icon" aria-hidden="true" loading="lazy" decoding="async" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/circle-check.svg" alt="icon" width="32" height="32">
                        Client-Focused Approach
                    </h3>
                    <p class="cs-item-text">
                        Every strategy we build is tailored to meet the unique goals of our clients.
                    </p>
                </li>
            </ul>
        </div>
        <div class="cs-content">
            <h1 class="cs-title">Driven By Innovation & <span class="cs-color">Built On Trust</span></h1>
            <h2>Who We Are</h2>
            <h3>Committed to Long-Term Success</h3>
            <h4>Your Partner in Growth</h4>
            <p>
                Our company was founded with a simple mission: to provide reliable, forward-thinking solutions that help businesses and individuals thrive. Over the years, we’ve built a reputation for integrity, performance, and meaningful client relationships. Learn more about our <a href="">core values</a> and discover how we turn ideas into measurable results.
            </p>
            <p>
                We believe success comes from collaboration, transparency, and continuous improvement. By combining modern strategies with <strong>decades of hands-on experience</strong>, we ensure every project is executed with precision and purpose.
            </p>
            <h3>What Sets Us Apart</h3>
            <ol>
                <li>Personalized strategies designed around your goals.</li>
                <li>A dedicated team committed to excellence.</li>
                <li>Clear communication at every stage of the process.</li>
            </ol>
            <h4>Our Core Principles</h4>
            <ul>
                <li>Integrity in every interaction.</li>
                <li>Innovation driven by research and insight.</li>
                <li>Results that create lasting impact.</li>
            </ul>
        </div>
    </div>
    <div class="cs-bubbles" aria-hidden="true"></div>
</section>           
`;

export const sampleCss = `
           /*-- -------------------------- -->
<---          Banner            -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
    #banner-14 {
        padding: var(--sectionPadding);
        /* 190px - 268px */
        padding-top: clamp(11.875rem, 25vw, 16.75rem);
        padding-bottom: 6.25rem;
        /* clips the line from causing overflow issues for going off screen */
        overflow: hidden;
        position: relative;
        z-index: 1;
    }
    #banner-14 .cs-container {
        text-align: center;
        width: 100%;
        max-width: 80rem;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        /* 8px - 12px */
        gap: clamp(0.5rem, 1vw, 0.75rem);
    }
    #banner-14 .cs-int-title {
        /* 39px - 61px */
        font-size: clamp(2.4375rem, 6.4vw, 3.8125rem);
        font-weight: 900;
        line-height: 1.2em;
        text-align: inherit;
        margin: 0;
        color: var(--bodyTextColorWhite);
        position: relative;
    }
    #banner-14 .cs-breadcrumbs {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #banner-14 .cs-link {
        font-size: 1rem;
        line-height: 1.2em;
        text-decoration: none;
        color: var(--bodyTextColorWhite);
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #banner-14 .cs-link:last-of-type {
        /* remove the chevron on the last list item */
    }
    #banner-14 .cs-link:last-of-type::after {
        display: none;
    }
    #banner-14 .cs-link:after {
        /* chevron */
        content: "";
        width: 0.4375rem;
        height: 0.75rem;
        margin: 0 1rem;
        background: url("https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons/white-chev.svg");
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
        display: block;
    }
    #banner-14 .cs-link.cs-active {
        color: var(--primary);
    }
    #banner-14 .cs-background {
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
    #banner-14 .cs-background:before {
        /* gradient overlay */
        content: "";
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.4;
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        z-index: 1;
    }
    #banner-14 .cs-background:after {
        /* gradient overlay */
        content: "";
        width: 100%;
        height: 40%;
        background: -webkit-gradient(
            linear,
            left top,
            left bottom,
            from(#000000),
            to(rgba(0, 0, 0, 0))
        );
        background: -o-linear-gradient(top, #000000 0%, rgba(0, 0, 0, 0) 100%);
        background: linear-gradient(
            to bottom,
            #000000 0%,
            rgba(0, 0, 0, 0) 100%
        );
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        z-index: 2;
    }
    #banner-14 .cs-background img {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        /* Makes img tag act as a background image */
        object-fit: cover;
    }
}
/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
    #banner-14 .cs-background:before {
        width: 50%;
        height: 100%;
        background: -webkit-gradient(
            linear,
            left top,
            right top,
            from(#000000),
            to(rgba(0, 0, 0, 0))
        );
        background: -o-linear-gradient(left, #000000 0%, rgba(0, 0, 0, 0) 100%);
        background: linear-gradient(
            to right,
            #000000 0%,
            rgba(0, 0, 0, 0) 100%
        );
        opacity: 1;
    }
}

/*-- -------------------------- -->
<---        Content Page        -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
    @keyframes floatAnimation {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-2rem);
        }
        100% {
            transform: translateY(0);
        }
    }
    @keyframes floatAnimation2 {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-3rem);
        }
        100% {
            transform: translateY(0);
        }
    }
    #content-page-14 {
        padding: var(--sectionPadding);
        background-color: #fff;
        /* clips the wave background from causing overflow issues when it goes off screen */
        overflow: hidden;
        position: relative;
        z-index: 1;
    }
    #content-page-14 .cs-container {
        width: 100%;
        max-width: 80rem;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* 40px - 64px */
        gap: clamp(2.5rem, 4vw, 4rem);
        position: relative;
    }
    #content-page-14 .cs-content {
        /* set text align to left if content needs to be left aligned */
        text-align: left;
        width: 100%;
        max-width: 46.125rem;
        display: flex;
        flex-direction: column;
        /* centers content horizontally, set to flex-start to left align */
        align-items: flex-start;
    }
    #content-page-14 .cs-title {
        font-size: var(--headerFontSize);
        font-weight: 900;
        line-height: 1.2em;
        text-align: inherit;
        width: 100%;
        max-width: 100%;
        margin: 0 0 1rem 0;
        color: var(--headerColor);
        position: relative;
    }
    #content-page-14 h2,
    #content-page-14 h3,
    #content-page-14 h4,
    #content-page-14 h5,
    #content-page-14 h6 {
        font-weight: 700;
        text-align: inherit;
        margin: 0 0 1rem 0;
        color: var(--headerColor);
    }
    #content-page-14 h2 {
        font-size: 2rem;
        margin-top: 2rem;
    }
    #content-page-14 h3 {
        font-size: 1.5rem;
        color: var(--primary);
    }
    #content-page-14 h4,
    #content-page-14 h5,
    #content-page-14 h6 {
        font-size: 1.25rem;
    }
    #content-page-14 .cs-button-solid {
        margin-bottom: 2rem;
    }
    #content-page-14 .cs-no-margin {
        margin: 0;
    }
    #content-page-14 .cs-color {
        color: var(--primary);
    }
    #content-page-14 p {
        font-size: var(--bodyFontSize);
        line-height: 1.5em;
        text-align: inherit;
        width: 100%;
        margin: 0 0 1rem 0;
        color: var(--bodyTextColor);
    }
    #content-page-14 p:last-of-type {
        margin-bottom: 2rem;
    }
    #content-page-14 p a {
        font-size: inherit;
        line-height: inherit;
        text-decoration: underline;
        color: var(--primary);
        filter: brightness(120%);
    }
    #content-page-14 ol,
    #content-page-14 ul {
        padding-left: 1.5rem;
        margin: 0 0 2rem 0;
        color: var(--bodyTextColor);
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    #content-page-14 ul li {
        list-style: none;
        color: inherit;
        position: relative;
    }
    #content-page-14 ul li:before {
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
    }
    #content-page-14 img {
        width: 100%;
        height: auto;
        display: block;
    }
    #content-page-14 .cs-image-group {
        width: 100%;
        display: none;
        flex-direction: column;
        /* 16px - 20px */
        gap: clamp(1rem, 2.6vw, 1.25rem);
        position: relative;
    }
    #content-page-14 .cs-flex {
        position: relative;
    }
    #content-page-14 .cs-background {
        width: 100%;
        height: 100%;
        /* 32px - 48px */
        border-radius: clamp(2rem, 4vw, 3rem);
        /* clips the corners of the children around the border radius */
        overflow: hidden;
        /* makes it cover the parent dimensions */
        object-fit: cover;
        display: block;
    }
    #content-page-14 .cs-background img {
        width: 100%;
        height: 100%;
        /* makes it cover the parent like a backgorund image */
        object-fit: cover;
        display: block;
    }
    #content-page-14 .cs-box {
        text-align: left;
        width: 100%;
        max-width: 12.5rem;
        padding: 2rem;
        /* prevents padding from affecting height and width */
        box-sizing: border-box;
        background-color: var(--primary);
        /* 48px - 80px */
        border-radius: 2rem;
        display: none;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.5rem;
        position: absolute;
        /* 12px - 20px */
        right: clamp(0.75rem, 1.9vw, 1.5rem);
        /* 12px - 20px */
        bottom: clamp(0.75rem, 1.9vw, 1.5rem);
    }
    #content-page-14 .cs-box-icon {
        width: 3.75rem;
        height: auto;
        display: block;
    }
    #content-page-14 .cs-desc {
        font-size: 1.25rem;
        line-height: 1.2em;
        text-align: inherit;
        font-weight: 700;
        width: 100%;
        margin: 0;
        color: var(--bodyTextColorWhite);
    }
    #content-page-14 .cs-card-group {
        width: 100%;
        max-width: 39.375rem;
        margin: 0 0 1.5rem 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(15.265rem, 1fr));
        align-items: center;
        gap: clamp(1rem, 2vw, 1.25rem);
    }
    #content-page-14 .cs-item {
        list-style: none;
        /* 16px - 24px */
        padding: clamp(1rem, 3vw, 1.5rem);
        /* prevents padding from affecting height and width */
        box-sizing: border-box;
        background-color: #f7f7f7;
        border-radius: 1rem;
        border: 1px solid #e8e8e8;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
    }
    #content-page-14 .cs-item:before {
        display: none;
    }
    #content-page-14 .cs-h3 {
        font-size: 1.25rem;
        line-height: 1.2em;
        font-weight: 700;
        margin: 0;
        color: var(--headerColor);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5rem;
    }
    #content-page-14 .cs-h3-icon {
        width: 2rem;
        height: auto;
        display: block;
    }
    #content-page-14 .cs-item-text {
        font-size: 0.875rem;
        line-height: 1.5em;
        margin: 0;
        color: var(--bodyTextColor);
    }
    #content-page-14 .cs-item-text:last-of-type {
        margin: 0;
    }
    #content-page-14 .cs-ul {
        width: 100%;
        margin: 0 0 1.5rem 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
    }
    #content-page-14 .cs-li {
        font-size: var(--bodyFontSize);
        list-style: none;
        line-height: 1.5em;
        width: 100%;
        color: var(--bodyTextColor);
        display: flex;
        justify-content: flex-start;
        /* push icon top the top so if the list item goes to two lines the icon stays at the top */
        align-items: flex-start;
        gap: 0.5rem;
    }
    #content-page-14 .cs-icon {
        width: 1.5rem;
        height: auto;
        /* adds extra space between the icon and top of parent so it's more centered */
        margin-top: 1px;
        display: block;
    }
    #content-page-14 .cs-bubbles {
        font-size: min(2.5vw, 0.7em);
        width: 36.375em;
        height: 34.8125em;
        display: none;
        position: absolute;
        /* changes to auto at larger desktop */
        left: -16.25em;
        /* changes to -220px at large desktop */
        bottom: -3.125em;
        z-index: -1;
    }
    #content-page-14 .cs-bubbles:before {
        /* white border bubble */
        content: "";
        width: 29em;
        height: 29em;
        background: transparent;
        border: 1px solid #1a1a1a;
        border-radius: 50%;
        opacity: 1;
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        animation-name: floatAnimation;
        animation-duration: 5s;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
    }
    #content-page-14 .cs-bubbles:after {
        /* orange bubble */
        content: "";
        width: 22.875em;
        height: 22.875em;
        background: var(--primary);
        opacity: 0.15;
        border-radius: 50%;
        display: block;
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: -1;
        animation-name: floatAnimation2;
        animation-duration: 14s;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
    }
}
/* Tablet - 768px */
@media only screen and (min-width: 48rem) {
    #content-page-14 .cs-container {
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
    }
    #content-page-14 .cs-content {
        width: 50%;
        max-width: 42.125rem;
        /* prevents flexbox from squishing it */
        flex: none;
    }
    #content-page-14 .cs-image-group {
        width: 44%;
        max-width: 33.875rem;
        display: flex;
    }
}
/* Desktop - 1200px */
@media only screen and (min-width: 75rem) {
    #content-page-14 .cs-content {
        width: 53%;
    }
    #content-page-14 .cs-image-group {
        width: 43%;
    }
    #content-page-14 .cs-box {
        display: flex;
    }
    #content-page-14 .cs-bubbles {
        font-size: 1em;
        margin-right: 37.5rem;
        display: block;
        left: auto;
        right: 50%;
        bottom: -13.75rem;
    }
}

                  
`;

export const sampleJs = `

`;