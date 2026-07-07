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
<!--                 Content Page                 -->
<!-- ============================================ -->


<section id="content-page-84">
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
            <!--Top Picture-->
            <picture class="cs-picture">
                <!--Mobile Image-->
                <source media="(max-width: 600px)" srcset="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop">
                <!--Tablet and above Image-->
                <source media="(min-width: 601px)" srcset="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200&auto=format&fit=crop">
                <img decoding="async" src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200&auto=format&fit=crop" alt="Healthy meal preparation with fresh vegetables" width="542" height="520" aria-hidden="true">
            </picture>
            <!--Top Picture-->
            <picture class="cs-picture">
                <!--Mobile Image-->
                <source media="(max-width: 600px)" srcset="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop">
                <!--Tablet and above Image-->
                <source media="(min-width: 601px)" srcset="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop">
                <img decoding="async" src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop" alt="Woman practicing yoga outdoors at sunrise" width="542" height="520" aria-hidden="true">
            </picture>
        </div>
    </div>
</section>
`;

export const sampleCss = `
/*-- -------------------------- -->
<---        Content Page        -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
    #content-page-84 {
        padding: var(--sectionPadding);
        background-color: #fff;
        /* clips the wave background from causing overflow issues when it goes off screen */
        overflow: hidden;
        position: relative;
        z-index: 1;
    }
    #content-page-84 .cs-container {
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
    #content-page-84 .cs-content {
        /* set text align to left if content needs to be left aligned */
        text-align: left;
        width: 100%;
        max-width: 39.375rem;
        display: flex;
        flex-direction: column;
        /* centers content horizontally, set to flex-start to left align */
        align-items: flex-start;
    }
    #content-page-84 .cs-title {
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
    #content-page-84 h2,
    #content-page-84 h3,
    #content-page-84 h4,
    #content-page-84 h5,
    #content-page-84 h6 {
        font-weight: 700;
        text-align: inherit;
        margin: 0 0 1rem 0;
        color: var(--headerColor);
    }
    #content-page-84 h2 {
        font-size: 2rem;
        margin-top: 2rem;
    }
    #content-page-84 h3 {
        font-size: 1.5rem;
        color: var(--primary);
    }
    #content-page-84 h4,
    #content-page-84 h5,
    #content-page-84 h6 {
        font-size: 1.25rem;
    }
    #content-page-84 .cs-button-solid {
        margin-bottom: 2rem;
    }
    #content-page-84 .cs-no-margin {
        margin: 0;
    }
    #content-page-84 .cs-color {
        color: var(--primary);
    }
    #content-page-84 p {
        font-size: var(--bodyFontSize);
        line-height: 1.5em;
        text-align: inherit;
        width: 100%;
        margin: 0 0 1rem 0;
        color: var(--bodyTextColor);
    }
    #content-page-84 p:last-of-type {
        margin-bottom: 2rem;
    }
    #content-page-84 p a {
        font-size: inherit;
        line-height: inherit;
        text-decoration: underline;
        color: var(--primary);
    }
    #content-page-84 ol,
    #content-page-84 ul {
        padding-left: 1.5rem;
        margin: 0 0 2rem 0;
        color: var(--bodyTextColor);
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    #content-page-84 ul li {
        list-style: none;
        color: inherit;
        position: relative;
    }
    #content-page-84 ul li:before {
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
    #content-page-84 img {
        width: 100%;
        height: auto;
        display: block;
    }
    #content-page-84 .cs-image-group {
        width: 50%;
        max-width: 33.875rem;
        display: none;
        position: relative;
        flex-direction: column;
        gap: 1.25rem;
    }
    #content-page-84 .cs-picture {
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
    #content-page-84 .cs-picture img {
        width: 100%;
        height: 100%;
        /* makes it act like a background image */
        object-fit: cover;
    }
}
/* Tablet - 768px */
@media only screen and (min-width: 48rem) {
    #content-page-84 .cs-container {
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
    }
    #content-page-84 .cs-content {
        flex: none;
        width: 60%;
        /* sends it to the left in the 2nd position */
        order: 2;
    }
    #content-page-84 .cs-image-group {
        display: flex;
    }
}
                 
`;

export const sampleJs = `

`;