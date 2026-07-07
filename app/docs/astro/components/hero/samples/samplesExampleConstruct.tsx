

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
<---           Hero             -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
    #hero {
        /* Centers button */
        text-align: center;
        /* 144px - 300px - leaving extra space for the navigation */
        padding: clamp(9rem, 25.95vw, 18.75rem) 1rem 0;
        /* 130px - 200px */
        padding-bottom: clamp(8.125rem, 12.5vw, 25em);
        position: relative;
        z-index: 1;
    
     .cs-background {
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -2;
    }
     .cs-background:before {
        /* Overlay */
        content: "";
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.7;
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        z-index: 1;
        /* prevents the cursor from interacting with it */
        pointer-events: none;
    }
    .cs-background img {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
     .cs-container {
        width: 100%;
        max-width: 67.5rem;
        margin: auto;
    }
     .cs-title {
        /* 39px - 61px */
        font-size: clamp(2.4375rem, 6.4vw, 3.8125rem);
        font-weight: 700;
        line-height: 1.2em;
        text-align: center;
        max-width: 51.8125rem;
        /* 16px - 24px */
        margin: 0 auto clamp(1rem, 4vw, 1.5rem);
        color: #fff;
        position: relative;
    }
     .cs-title:after {
        /* Divider Line */
        content: "";
        width: 6.25rem;
        height: 0.5rem;
        /* 16px - 24px */
        margin: clamp(1rem, 4vw, 1.5rem) auto clamp(1rem, 4vw, 1.5rem);
        background: var(--primary);
        opacity: 1;
        position: relative;
        display: block;
    }
     .cs-text {
        /* 16px - 25px */
        font-size: clamp(1rem, 1.95vw, 1.5625rem);
        line-height: 1.5em;
        text-align: center;
        width: 100%;
        /* 464px - 800px */
        max-width: clamp(29rem, 60vw, 50rem);
        margin: 0 auto;
        /* 40px - 48px */
        margin-bottom: clamp(2.5rem, 4vw, 3rem);
        color: #fff;
    }
     .cs-button-solid {
        font-size: 1rem;
        line-height: 3.5rem;
        text-decoration: none;
        font-weight: 700;
        margin: auto;
        color: #fff;
        padding: 0 1.5rem;
        background-color: var(--primary);
        border-radius: 0.25rem;
        display: inline-block;
        position: relative;
        z-index: 1;
        margin-bottom: 4rem;
    }
     .cs-button-solid:before {
        content: "";
        position: absolute;
        display: block;
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
     .cs-button-solid:hover:before {
        width: 100%;
    }
  }
}

/* Dark Mode */
@media only screen and (min-width: 0rem) {
    body.dark-mode #hero {
        &:before,
        &:after {
            background: var(--dark);
        }
        .cs-background {
            &:before {
                opacity: 0.85;
            }
        }
    }
}
   
                                


/*-- -------------------------- -->
<---          Services          -->
<--- -------------------------- -*/
/* Mobile */
@media only screen and (min-width: 0em) {
  .service {
    border-radius: 0.3125em;
    margin: auto;
    margin-top: -10.4375em;
    position: relative;
    z-index: 100;
    background: #fff;
    width: 90%;
    max-width: 82.5em;
    padding: 3.125em 1.25em;
    border-top: 0.375em solid var(--primary);
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.05);
    margin-bottom: 3.125em;
  
   .card {
    display: block;
    width: 100%;
    max-width: 22.3125em;
    margin: auto;
    margin-bottom: 3.125em;
  }
   .card:last-of-type {
    margin-bottom: 0;
  }
   .card picture {
    background: var(--primary);
    width: 5.5em;
    height: 5.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-bottom: 1.4375em;
    border-radius: 50%;
  }
   .card picture img {
    width: 3em;
    height: 3em;
  }
   .card h2 {
    text-align: center;
    font-size: 2em;
    line-height: 1.35em;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 0.65em;
  }
   .card p {
    text-align: center;
    line-height: 1.33333333em;
    width: 100%;
    opacity: .7;
  }
}
}
/* Inbetween */
@media only screen and (min-width: 768px) {
  .service {
    font-size: min(1.8vw, 1em);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 98%;
  
   .card {
    margin: 0;
    max-width: 20.3125em;
  }
}
}
/* Large Desktop */
@media only screen and (min-width: 1300px) {
  .service {
    padding: 3.125em 5em;
  
   .card {
    max-width: 22.3125em;
  }
}
}
/* Dark mode */
@media only screen and (min-width: 0em) {
    body.dark-mode #service {
        background: var(--medium);
        picture {
            background: var(--primaryDark);
        }
        h2 {
            color: #fff;
            font-weight: bold;
        }
    }
}
   
`;

export const sampleHtml = `
<!-- ============================================ -->
<!--                    Hero                      -->
<!-- ============================================ -->

<section id="hero">
    <div class="cs-container">
        <h1 class="cs-title">Construction & Maintenance Experts in LA</h1>
        <p class="cs-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. At quis donec eget tellus turpis imperdiet aenean libero. 
        </p>
        <a href="" class="cs-button-solid">Request Appointment</a>
    </div>

    <!-- Background Image -->
    <picture class="cs-background">
        <source media="(max-width: 600px)" srcset="./assets/images/landing-construction.jpg">
        <source media="(min-width: 601px)" srcset="./assets/images/landing-construction.jpg">
        <img decoding="async" src="./assets/images/landing-construction.jpg" alt="construction" width="2250" height="1500" aria-hidden="true">
    </picture>
</section>
                                

<!-- ============================================ -->
<!--                  Services                    -->
<!-- ============================================ -->

<section id="service" class="service">
  <!-- Get Icons From flaticon.com -->
  <div class="card">
    <picture>
      <img
        aria-hidden="true"
        decoding="async"
        src="/assets/svgs/service1.svg"
        alt="appliance"
        width="48"
        height="48"
/>
    </picture>
    <h2>Service 1</h2>
    <p>Talk about the service with keywords people will be searching for it by. Keep it 1-2 sentences.</p>
  </div>
  <div class="card">
    <picture>
      <img
        aria-hidden="true"
        decoding="async"
        src="/assets/svgs/service2.svg"
        alt="appliance"
        width="48"
        height="48"
/>
    </picture>
    <h2>Service 2</h2>
    <p>Talk about the service with keywords people will be searching for it by. Keep it 1-2 sentences.</p>
  </div>
  <div class="card">
    <picture>
      <img
        aria-hidden="true"
        decoding="async"
        src="/assets/svgs/service3.svg"
        alt="appliance"
        width="48"
        height="48"
/>
    </picture>
    <h2>Service 3</h2>
    <p>Talk about the service with keywords people will be searching for it by. Keep it 1-2 sentences.</p>
  </div>
</section>
`;

export const sampleJs = `

`;