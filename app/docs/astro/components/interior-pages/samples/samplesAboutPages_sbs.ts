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

<div id="banner-10">
    <div class="cs-container">
        
        <span class="cs-int-title">Welcome to Harborview Café</span>
        <p class="cs-text">
            Nestled along the waterfront, Harborview Café serves freshly brewed coffee, artisan pastries, and seasonal dishes made from locally sourced ingredients. Whether you're meeting friends or enjoying a quiet morning by the sea, we offer a warm atmosphere and unforgettable flavors.
        </p>
    </div>
    <!--Background Image-->
    <picture class="cs-background">
        <source media="(max-width: 600px)" srcset="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80">
        <source media="(min-width: 601px)" srcset="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80">
        <img decoding="async" src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80" alt="cafe interior with food and coffee" width="1920" height="1000">
    </picture>
</div>
<!-- ============================================ -->
<!--                 Side By Side                 -->
<!-- ============================================ -->

 <section id="sbs-10">
    <div class="cs-container">
        <!-- Left Image Section -->
        <div class="cs-image-group">
            <picture class="cs-picture cs-picture1">
                <source media="(max-width: 600px)" srcset="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=800&q=80">
                <source media="(min-width: 601px)" srcset="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=80">
                <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1200&q=80" alt="chef preparing gourmet dish" width="522" height="581" aria-hidden="true">
            </picture>
            <picture class="cs-picture cs-picture2">
                <source media="(max-width: 600px)" srcset="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80">
                <source media="(min-width: 601px)" srcset="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80">
                <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80" alt="plated gourmet dinner" width="414" height="400" aria-hidden="true">
            </picture>
        </div>
        <!-- Right Content Section-->
        <div class="cs-content">
            <span class="cs-topper">Our Story</span>
            <h2 class="cs-title">Crafted with Passion & Precision</h2>
            <p class="cs-text">
                What began as a small neighborhood kitchen has grown into a destination for culinary excellence. Our team blends traditional techniques with modern creativity, delivering dishes that celebrate bold flavors and seasonal ingredients.
            </p>
            <p class="cs-text">
                Every plate is thoughtfully prepared using locally sourced produce and responsibly selected proteins. We believe dining should be more than a meal—it should be an experience that brings people together and creates lasting memories.
            </p>
            <div class="cs-quote">
                <span class="cs-quote-text">
                    “Great food is not just about taste — it’s about the care, creativity, and community behind every dish we serve.”
                </span>
                <span class="cs-name">Elena Martinez</span>
                <span class="cs-job">Executive Chef & Founder</span>
                <img class="cs-quote-icon" loading="lazy" decoding="async" src="https://csimg.nyc3.digitaloceanspaces.com/SideBySide/quote-white.svg" alt="quote icon" width="136" height="77">
            </div>
        </div>
    </div>
</section>

<!-- ============================================ -->
<!--                    CTA                       -->
<!-- ============================================ -->

<section id="cta-10">
    <div class="cs-container">
        <div class="cs-left-section">
            <h2 class="cs-title">Reserve Your Table for Dinner Tonight</h2>
            <a href="" class="cs-button-solid">Book a Table</a>
        </div>
        <div class="cs-content">
            <span class="cs-header">Opening Hours</span>
            <p class="cs-p"> 
                Monday – Friday: 3:00pm – 10:00pm<br>
                Saturday – Sunday: 2:00pm – 11:00pm
            </p>
            <p class="cs-p">
                Reservations Recommended for Evenings.<br>
                Private Events & Catering Available Upon Request.
            </p>
        </div>
        <picture class="cs-background">
            <source media="(max-width: 600px)" srcset="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80">
            <source media="(min-width: 601px)" srcset="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80">
            <img aria-hidden="true" loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80" alt="restaurant dinner setting with wine glasses" width="275" height="132">
        </picture>
    </div>
</section>       
`;

export const sampleCss = `
  
           /*-- -------------------------- -->
<---          Banner            -->
<--- -------------------------- -*/
/* Mobile - 360px */
@media only screen and (min-width: 0em) {
  #banner-10 {
    padding: 0 1rem;
    /* 160px - 245px */
    padding-top: clamp(10rem, 25vw, 15.3125rem);
    padding-bottom: 7.5rem;
    background-color: #000;
    position: relative;
    z-index: 1;
  }
  #banner-10 .cs-container {
    text-align: center;
    width: 100%;
    max-width: 80rem;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  #banner-10 .cs-picture {
    width: 100%;
    margin: 0 0 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    position: relative;
  }
  #banner-10 .cs-picture:before {
    /* left line */
    content: "";
    width: 50%;
    max-width: 9.375rem;
    height: 1px;
    background: #b4b2c7;
    opacity: 1;
    position: relative;
    display: block;
  }
  #banner-10 .cs-picture:after {
    /* right line */
    content: "";
    width: 50%;
    max-width: 9.375rem;
    height: 1px;
    background: #b4b2c7;
    opacity: 1;
    position: relative;
    display: block;
  }
  #banner-10 .cs-icon {
    width: 40%;
    /* 100px - 180px */
    max-width: clamp(6.25rem, 18vw, 11.25rem);
    height: auto;
    /* prevents flexbox from squishing it */
    flex: none;
  }
  #banner-10 .cs-int-title {
    /* 39px - 61px */
    font-size: clamp(2.4375rem, 6.5vw, 3.8125rem);
    font-weight: 900;
    line-height: 1.2em;
    text-align: center;
    max-width: 43.75rem;
    margin: 0 0 1rem 0;
    color: var(--bodyTextColorWhite);
    position: relative;
  }
  #banner-10 .cs-text {
    color: var(--bodyTextColorWhite);
  }
  #banner-10 .cs-background {
    width: 100%;
    height: 100%;
    opacity: 0.7;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    z-index: -1;
  }
  #banner-10 .cs-background:before {
    /* black overlay box */
    content: "";
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.72;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    z-index: 1;
  }
  #banner-10 .cs-background img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
/*-- -------------------------- -->
<---       Side By Side         -->
<--- -------------------------- -*/
/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
  #sbs-10 {
    padding: var(--sectionPadding);
    background-color: #f7f7f7;
  }
  #sbs-10 .cs-container {
    width: 100%;
    max-width: 80rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 48px - 64px */
    gap: clamp(3rem, 6vw, 4rem);
  }
  #sbs-10 .cs-content {
    /* set text align to left if content needs to be left aligned */
    text-align: left;
    width: 100%;
    max-width: 33.875rem;
    display: flex;
    flex-direction: column;
    /* centers content horizontally, set to flex-start to left align */
    align-items: flex-start;
  }
  #sbs-10 .cs-text {
    font-size: var(--bodyFontSize);
    line-height: 1.5em;
    text-align: inherit;
    width: 100%;
    max-width: 40.625rem;
    margin: 0;
    color: var(--bodyTextColor);
  }
  #sbs-10 .cs-text {
    margin-bottom: 1rem;
  }
  #sbs-10 .cs-text:last-of-type {
    margin-bottom: 2rem;
  }
  #sbs-10 .cs-quote {
    margin: 0 0 2rem 0;
    /* 16px - 32px */
    padding: clamp(1rem, 3vw, 2rem);
    background-color: #1a1a1a;
    position: relative;
  }
  #sbs-10 .cs-quote-text {
    /* 14px - 16px */
    font-size: clamp(0.875rem, 1.5vw, 1rem);
    line-height: 1.5em;
    margin: 0 0 1rem;
    color: var(--bodyTextColorWhite);
    display: block;
  }
  #sbs-10 .cs-name {
    font-size: 1rem;
    line-height: 1.2em;
    text-transform: uppercase;
    font-weight: bold;
    margin: 0 0 0.25rem;
    color: var(--primary);
    display: block;
  }
  #sbs-10 .cs-job {
    font-size: 0.875rem;
    line-height: 1.5em;
    color: var(--bodyTextColorWhite);
    display: block;
  }
  #sbs-10 .cs-quote-icon {
    /* 60px - 136px */
    width: clamp(3.75rem, 10vw, 8.5rem);
    height: auto;
    position: absolute;
    bottom: 0rem;
    /* 16px - 32px */
    right: clamp(1rem, 4vw, 2rem);
  }
  #sbs-10 .cs-image-group {
    /* scaling the font size with the view width */
    font-size: min(2.31vw, .7em);
    /* using ems so we can use font size to scale the whole section */
    width: 39.4375em;
    height: 39.75em;
    position: relative;
  }
  #sbs-10 .cs-picture {
    position: absolute;
    display: block;
  }
  #sbs-10 .cs-picture img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    /* makes image act like a background image */
    object-fit: cover;
  }
  #sbs-10 .cs-picture1 {
    width: 32.625em;
    height: 36.3125em;
    left: 0;
    top: 0;
  }
  #sbs-10 .cs-picture2 {
    width: 25.875em;
    height: 25em;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 40px;
    /* 6px - 12px */
    border: clamp(0.375em, 1.5vw, 0.75em) solid #fff;
    right: 0;
    bottom: 0;
  }
}
/* Desktop - 1024px */
@media only screen and (min-width: 64rem) {
  #sbs-10 .cs-container {
    flex-flow: row;
    justify-content: space-between;
    gap: 3.25rem;
  }
  #sbs-10 .cs-image-group {
    font-size: min(1.2vw, 1em);
    flex: none;
  }
  #sbs-10 .cs-content {
    margin: 0;
  }
}
/*-- -------------------------- -->
<---            CTA             -->
<--- -------------------------- -*/
/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
  #cta-10 {
    padding: var(--sectionPadding);
  }
  #cta-10 .cs-container {
    width: 100%;
    max-width: 80rem;
    margin: auto;
    /* 32px - 88px top & bottom */
    /* 24px - 88px left & right */
    padding: clamp(2em, 6.3vw, 5.5em) clamp(1.5em, 5.7vw, 5.5em);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;
    position: relative;
    /* clips the corners for the border radius to show */
    overflow: hidden;
    z-index: 1;
    /* prevents padding from adding to height and width */
    box-sizing: border-box;
  }
  #cta-10 .cs-background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    z-index: -1;
  }
  #cta-10 .cs-background:before {
    /* black overlay */
    content: "";
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.8;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    z-index: 1;
  }
  #cta-10 .cs-background img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  #cta-10 .cs-left-section {
    max-width: 27.125rem;
  }
  #cta-10 .cs-title {
    /* 25px - 49px */
    font-size: clamp(1.5625rem, 3.9vw, 3.0625rem);
    font-weight: 900;
    line-height: 1.2em;
    text-align: left;
    max-width: 50rem;
    /* 20px - 48px */
    margin: 0 auto clamp(1.25rem, 4.7vw, 3rem);
    color: var(--bodyTextColorWhite);
    position: relative;
  }
  #cta-10 .cs-button-solid {
    font-size: 1rem;
    /* 46px - 56px */
    line-height: clamp(2.875em, 5.5vw, 3.5em);
    text-decoration: none;
    font-weight: 700;
    text-align: center;
    margin: auto;
    color: #fff;
    min-width: 9.375rem;
    padding: 0 2rem;
    background-color: var(--primary);
    display: inline-block;
    position: relative;
    z-index: 1;
    /* prevents padding from adding to the width */
    box-sizing: border-box;
  }
  #cta-10 .cs-button-solid:before {
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
  #cta-10 .cs-button-solid:hover:before {
    width: 100%;
  }
  #cta-10 .cs-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    /* 12px - 20px */
    gap: clamp(0.75rem, 1.6vw, 1.25rem);
  }
  #cta-10 .cs-header {
    /* 20px - 25px */
    font-size: clamp(1.25rem, 2.4vw, 1.5625rem);
    font-weight: bold;
    color: var(--primary);
    display: block;
  }
  #cta-10 .cs-p {
    /* 14px - 20px */
    font-size: clamp(0.875rem, 1.5vw, 1.25rem);
    line-height: 1.5em;
    margin: 0;
    color: var(--bodyTextColorWhite);
  }
}
/* Tablet - 768px */
@media only screen and (min-width: 48rem) {
  #cta-10 .cs-container {
    flex-direction: row;
    justify-content: space-between;
  }
  #cta-10 .cs-content {
    align-items: flex-end;
    text-align: right;
    /* prevents flexbox from squishing it */
    flex: none;
  }
}
             
`;

export const sampleJs = `

`;