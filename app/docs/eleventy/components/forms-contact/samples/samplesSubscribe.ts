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
<!--                     CTA                      -->
<!-- ============================================ -->

<section id="cta-11">
    <div class="cs-container">
        <div class="cs-content">
            <span class="cs-topper">Stay Up To Date</span>
            <h2 class="cs-title">Subscribe for Newsletter</h2>
            <p class="cs-text">
                Nulla dig nissimmi pruneaus bibliotecaus caparcos quis neque interdum. 
            </p>
            <form class="cs-form" name="Contact Form" method="post">
                <input class="cs-input" type="email" id="cs-email-302-1146" name="find-us" placeholder="Email Address">
                <button class="cs-button-solid cs-submit" type="submit">Subscribe Now</button>
            </form>
        </div>
    </div>
    <picture class="cs-background">
        <!--Mobile Image-->
        <source media="(max-width: 600px)" srcset="./news.jpg">
        <!--Tablet and above Image-->
        <source media="(min-width: 601px)" srcset="./news.jpg">
        <img loading="lazy" decoding="async" src="./news.jpg" alt="family" width="1280" height="568">
    </picture>
    <!--White splash graphic-->
    <picture class="cs-graphic cs-light">
        <!--Mobile Image-->
        <source media="(max-width: 600px)" srcset="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/MISC/splash-m.png">
        <!--Tablet and above Image-->
        <source media="(max-width: 1023px)" srcset="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/MISC/splash-t.png">
        <!--Desktop and above Image-->
        <source media="(min-width: 1024px)" srcset="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/MISC/splash.png">
        <img loading="lazy" decoding="async" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/MISC/splash.png" alt="graphic" width="1920" height="108" aria-hidden="true">
    </picture>
    <!--Dark Mode splash graphic, Remove if not needed!-->
    <picture class="cs-graphic cs-dark">
        <!--Mobile Image-->
        <source media="(max-width: 600px)" srcset="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/MISC/splash-m-dark.png">
        <!--Tablet and above Image-->
        <source media="(max-width: 1023px)" srcset="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/MISC/splash-t-dark.png">
        <!--Desktop and above Image-->
        <source media="(min-width: 1024px)" srcset="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/MISC/splash-dark.png">
        <img loading="lazy" decoding="async" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/MISC/splash-dark.png" alt="graphic" width="1920" height="108" aria-hidden="true">
    </picture>
</section>
                                

`;

export const sampleCss = `
                /*-- -------------------------- -->
<---            CTA             -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
    #cta-11 {
        padding: var(--sectionPadding);
        /* chnages at tablet */
        padding-bottom: 30vw;
        background-color: var(--primary);
        overflow: hidden;
        position: relative;
        z-index: 1;
    }
    #cta-11 .cs-container {
        width: 100%;
        max-width: 80rem;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* 48px - 64px */
        gap: clamp(3rem, 6vw, 4rem);
    }
    #cta-11 .cs-content {
        /* set text align to left if content needs to be left aligned */
        text-align: center;
        width: 100%;
        display: flex;
        flex-direction: column;
        /* centers content horizontally, set to flex-start to left align */
        align-items: center;
    }

    #cta-11 .cs-title {
        max-width: 24ch;

        color: var(--bodyTextColorWhite);
    }
    #cta-11 .cs-text {
        /* 28px - 40px */
        margin: 0 0 clamp(1.75rem, 4vw, 2.5rem);
        color: var(--bodyTextColorWhite);
    }
    #cta-11 .cs-form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* 8px - 16px */
        gap: clamp(0.5rem, 2vw, 1rem);
    }
    #cta-11 .cs-input {
        font-size: 1rem;
        width: 100%;
        height: clamp(2.875rem, 5.5vw, 3.5rem);
        margin: 0;
        padding: 0;
        padding-left: 1.25rem;
        border: none;
        border-radius: 0.25rem;
        /* prevents padding from adding to width and height */
        box-sizing: border-box;
        display: block;
    }
    #cta-11 .cs-input::placeholder {
        color: #767676;
    }
    #cta-11 .cs-button-solid {
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
        background-color: var(--secondary);
        border-radius: 0.25rem;
        display: inline-block;
        position: relative;
        z-index: 1;
        /* prevents padding from adding to the width */
        box-sizing: border-box;
    }
    #cta-11 .cs-button-solid:before {
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
    #cta-11 .cs-button-solid:hover:before {
        width: 100%;
    }
    #cta-11 .cs-submit {
        width: 100%;
        color: var(--headerColor);
        border: none;
    }
    #cta-11 .cs-background {
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }
    #cta-11 .cs-background:before {
        /* background color overlay */
        content: "";
        position: absolute;
        display: block;
        height: 100%;
        width: 100%;
        background: #1a1a1a;
        opacity: 0.8;
        top: 0;
        left: 0;
        z-index: 1;
    }
    #cta-11 .cs-background img {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        /* Makes img tag act as a background image */
        object-fit: cover;
    }
    #cta-11 .cs-graphic {
        width: 100%;
        height: auto;
        display: flex;
        align-items: flex-end;
        position: absolute;
        bottom: -1px;
        left: 0;
        z-index: 10;
    }
    #cta-11 .cs-graphic img {
        width: 100%;
        height: auto;
        display: block;
    }
    #cta-11 .cs-dark {
        display: none;
    }
}
/* Tablet - 768px */
@media only screen and (min-width: 48rem) {
    #cta-11 {
        /* changes at desktop */
        padding-bottom: 15vw;
    }
    #cta-11 .cs-form {
        flex-direction: row;
    }
    #cta-11 .cs-input {
        width: 22.5rem;
    }
    #cta-11 .cs-submit {
        width: 12.8125rem;
    }
}
/* Desktop - 1024px */
@media only screen and (min-width: 64rem) {
    #cta-11 {
        /* changes at desktop */
        padding-bottom: 10vw;
    }
}
`;

export const sampleJs = `

`;