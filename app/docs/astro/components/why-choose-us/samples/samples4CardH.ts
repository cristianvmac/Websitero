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
<!--                 Why Choose                   -->
<!-- ============================================ -->

                              
<section id="why-choose-89">
    <div class="cs-container">
        <div class="cs-content">
            <span class="cs-topper">Our Strengths</span>
            <h2 class="cs-title">What Sets Us Apart</h2>
            <p class="cs-text">
                Choosing the right partner makes all the difference. We focus on delivering high-quality solutions backed by experience, innovation, and a commitment to long-term client success. Every service we provide is designed to create measurable impact and lasting value.
            </p>
        </div>
        <ul class="cs-card-group">
            <li class="cs-item">
                <img class="cs-icon" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons%2Fballs1.svg" loading="lazy" decoding="async" alt="icon" width="48" height="48" aria-hidden="true">
                <div class="cs-text-group">
                    <h3 class="cs-h3">Expert-Led Strategy</h3>
                    <p class="cs-item-text">
                       Our experienced consultants analyze your business challenges and craft strategic solutions tailored to your goals, ensuring clarity, direction, and sustainable growth.
                    </p>
                </div>
            </li>
            <li class="cs-item">
                <img class="cs-icon" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons%2Fballs2.svg" loading="lazy" decoding="async" alt="icon" width="48" height="48" aria-hidden="true">
                <div class="cs-text-group">
                    <h3 class="cs-h3">Personalized Client Experience</h3>
                    <p class="cs-item-text">
                        We believe every client is unique. Our team works closely with you, maintaining transparent communication and adapting our approach to meet your specific needs.
                    </p>
                </div>
            </li>
            <li class="cs-item">
                <img class="cs-icon" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons%2Fballs3.svg" loading="lazy" decoding="async" alt="icon" width="48" height="48" aria-hidden="true">
                <div class="cs-text-group">
                    <h3 class="cs-h3">Proven Performance Results</h3>
                    <p class="cs-item-text">
                        Our track record speaks for itself. We implement data-driven strategies that increase efficiency, boost visibility, and deliver measurable outcomes.
                    </p>
                </div>
            </li>
            <li class="cs-item">
                <img class="cs-icon" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons%2Fballs4.svg" loading="lazy" decoding="async" alt="icon" width="48" height="48" aria-hidden="true">
                <div class="cs-text-group">
                    <h3 class="cs-h3">Innovative & Scalable Solutions</h3>
                    <p class="cs-item-text">
                        We design flexible systems that evolve with your business, ensuring you stay competitive, efficient, and prepared for future growth opportunities.
                    </p>
                </div>
            </li>
        </ul>
        <a href="" class="cs-button-solid">Start Your Project</a>
        <img class="cs-floater" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images%2FGraphics%2Forange-arrow.svg" alt="arrow" loading="lazy" decoding="async" aria-hidden="true">
    </div>
</section>
               
`;

export const sampleCss = `
             /*-- -------------------------- -->
<---         Why Choose         -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
    #why-choose-89 {
        /* Centers Button */
        text-align: center;
        padding: var(--sectionPadding);
        /* prevents the arrow from causing an overflow */
        overflow: hidden;
        position: relative;
        z-index: 1;
    }
    #why-choose-89 .cs-container {
        width: 100%;
        /* changes to 1280px at tablet */
        max-width: 34.375rem;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* 48px - 64px */
        gap: clamp(3rem, 6vw, 4rem);
        position: relative;
    }
    #why-choose-89 .cs-content {
        /* set text align to left if content needs to be left aligned */
        text-align: center;
        width: 100%;
        display: flex;
        flex-direction: column;
        /* centers content horizontally, set to flex-start to left align */
        align-items: center;
    }
    #why-choose-89 .cs-topper {
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
    #why-choose-89 .cs-title {
        font-size: var(--headerFontSize);
        font-weight: 900;
        line-height: 1.2em;
        text-align: inherit;
        max-width: 43.75rem;
        margin: 0 0 1rem 0;
        color: var(--headerColor);
        position: relative;
    }
    #why-choose-89 .cs-text {
        font-size: var(--bodyFontSize);
        line-height: 1.5em;
        text-align: inherit;
        width: 100%;
        max-width: 40.625rem;
        margin: 0;
        color: var(--bodyTextColor);
    }
    #why-choose-89 .cs-text {
        max-width: 62.5rem;
    }
    #why-choose-89 .cs-button-solid {
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
    #why-choose-89 .cs-button-solid:before {
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
    #why-choose-89 .cs-button-solid:hover:before {
        width: 100%;
    }
    #why-choose-89 .cs-card-group {
        width: 100%;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        /* 16px - 20px */
        gap: clamp(1rem, 2vw, 1.25rem);
    }
    #why-choose-89 .cs-item {
        width: 100%;
        text-align: left;
        list-style: none;
        /* 20px - 32px */
        padding: clamp(1.25rem, 2.3vw, 2rem);
        background-color: #fef7f4;
        border-radius: 1rem;
        /* prevents padding and border from affecting height and width */
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        grid-column: span 4;
        position: relative;
        z-index: 1;
    }
    #why-choose-89 .cs-icon {
        width: 3rem;
        height: auto;
        margin: 0 0 1.25rem 0;
        display: block;
    }
    #why-choose-89 .cs-h3 {
        font-size: 1.25rem;
        line-height: 1.5em;
        margin: 0 0 0.75rem 0;
        color: var(--headerColor);
        transition: color 0.3s;
    }
    #why-choose-89 .cs-item-text {
        /* 14px - 16px */
        font-size: clamp(0.875rem, 1.5vw, 1rem);
        line-height: 1.5em;
        margin: 0;
        color: var(--bodyTextColor);
        transition: color 0.3s;
    }
    #why-choose-89 .cs-floater {
        width: 21.9375rem;
        height: auto;
        display: none;
        position: absolute;
        top: -13.75rem;
        right: -3.75rem;
        transform: rotate(-66deg);
    }
}
/* Tablet - 768px */
@media only screen and (min-width: 48rem) {
    #why-choose-89 .cs-container {
        max-width: 80rem;
    }
    #why-choose-89 .cs-item {
        grid-column: span 2;
    }
    #why-choose-89 .cs-floater {
        display: block;
    }
}
/* Desktop - 1024px */
@media only screen and (min-width: 64rem) {
    #why-choose-89 .cs-item {
        grid-column: span 1;
    }
}

`;

export const sampleJs = `

`;