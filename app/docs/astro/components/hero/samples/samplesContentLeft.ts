

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


export const sampleCss = `

  /*-- -------------------------- -->
<---            Hero            -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
  #hero-85 {
    /* 116px - 164px top */
    /* 60px - 100px  bottom */
    padding: clamp(7.25rem, 16.82vw, 10.25rem) 1rem clamp(3.75rem, 7.82vw, 6.25rem);
    background-color: #f7f7f7;
    /* clips the svg wave from overflowing */
    overflow: hidden;
    position: relative;
    z-index: 1;
  }
  #hero-85 .cs-container {
    width: 100%;
    max-width: 80rem;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
  }
  #hero-85 .cs-content {
    max-width: 39.375rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  #hero-85 .cs-topper {
    font-size: 1rem;
    line-height: 1.2em;
    text-transform: uppercase;
    text-align: inherit;
    letter-spacing: 0.1em;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 0.25rem;
    display: block;
  }
  #hero-85 .cs-title {
    /* 39px - 61px */
    font-size: clamp(2.4375rem, 5vw, 3.8125rem);
    font-weight: 900;
    line-height: 1.2em;
    text-align: center;
    /* 23 characters including spaces wide */
    max-width: 23ch;
    margin: 0 0 1rem 0;
    color: var(--headerColor);
    position: relative;
  }
  #hero-85 .cs-text {
    /* 16px - 20px */
    font-size: clamp(1rem, 1.5vw, 1.25rem);
    line-height: 1.5em;
    text-align: center;
    width: 100%;
    max-width: 33.1875rem;
    /* 28px - 40px */
    margin: 0 0 clamp(1.75rem, 3.92vw, 2.5rem) 0;
    color: var(--bodyTextColor);
  }
  #hero-85 .cs-button-solid {
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
  #hero-85 .cs-button-solid:before {
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
  #hero-85 .cs-button-solid:hover:before {
    width: 100%;
  }
  #hero-85 .cs-picture {
    width: 100%;
    max-width: 35.625rem;
    /* 400px - 712px */
    height: clamp(25rem, 95vw, 44.5rem);
    /* 100px - 200px */
    border-radius: 0 clamp(6.25rem, 17vw, 12.5rem) 0 clamp(6.25rem, 17vw, 12.5rem);
    box-shadow: 0px 4px 60px rgba(0, 0, 0, 0.16);
    /* clips the img tag corners */
    overflow: hidden;
    display: block;
    position: relative;
  }
  #hero-85 .cs-picture img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    /* makes image act as a background image */
    object-fit: cover;
    /* ensures the top of the images is at the top of the container, no heads getting cut off */
    object-position: top;
  }
  #hero-85 .cs-wave {
    /* we're stretching the svg wider than the viewport so it's taller and has more of a presence */
    width: 320%;
    height: auto;
    display: block;
    position: absolute;
    left: 50%;
    bottom: -1px;
    transform: translateX(-50%);
    z-index: -1;
  }
}
/* Small Desktop - 1024px */
@media only screen and (min-width: 64rem) {
  #hero-85 {
    text-align: left;
  }
  #hero-85 .cs-container {
    flex-direction: row;
    justify-content: space-between;
  }
  #hero-85 .cs-content {
    width: 40vw;
    /* prevents flex-box from squishing it */
    flex: none;
    align-items: flex-start;
  }
  #hero-85 .cs-title,
  #hero-85 .cs-text {
    text-align: left;
  }
  #hero-85 .cs-picture {
    /* 623px - 814px */
    height: clamp(38.9375rem, 60vw, 50.875rem);
  }
  #hero-85 .cs-wave {
    width: 100%;
    left: 0;
    transform: none;
  }
}
                                                          
                                
`;

export const sampleHtml = `
                      
<!-- ============================================ -->
<!--                    Hero                      -->
<!-- ============================================ -->

<section id="hero-85">
    <div class="cs-container">
        <div class="cs-content">
            <span class="cs-topper">Compassionate • Experienced • Trusted</span>
            <h1 class="cs-title">Advanced Orthopedic & Sports Rehabilitation</h1>
            <p class="cs-text">
                Restore movement, relieve pain, and regain confidence with personalized rehabilitation programs tailored to your lifestyle. Our licensed specialists use evidence-based treatments and hands-on care to help you recover faster and perform at your best.
            </p>
            <a href="" class="cs-button-solid">Book Your Free Consultation</a>
        </div>
        <!--Hero Image-->
        <picture class="cs-picture">
            <!--Mobile-->
            <source media="(max-width: 600px)" srcset="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80">
            <!--Tablet-->
            <source media="(min-width: 601px)" srcset="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80">
            <!--Desktop-->
            <source media="(min-width: 1024px)" srcset="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80">
            <img aria-hidden="true" decoding="async" src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80" alt="Physical therapist assisting patient with shoulder rehabilitation exercises" width="570" height="701">
        </picture>
    </div>
    <!--Change the svg path fill color to whatever color the section below is so you can match it and create the illusion it is all one piece-->
    <svg class="cs-wave" width="1920" height="179" viewBox="0 0 1920 179" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1920 179V91.3463C1835.33 91.3463 1715.47 76.615 1549.2 32.9521C1299.48 -32.3214 1132.77 12.1006 947.32 61.5167C810.762 97.9044 664.042 137 466.533 137C331.607 137 256.468 123.447 188.082 111.113C130.974 100.812 78.5746 91.3609 0 91.3609V179H1920Z" fill="white"/>
    </svg>
</section>        

`;

export const sampleJs = `

`;
