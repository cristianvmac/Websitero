export const sampleRoot = `
/*-- -------------------------- -->
<---         CSS Reset          -->
<--- -------------------------- -*/

/* Modern CSS Reset - Based on Josh Comeau's reset */
/* 1. Use a more-intuitive box-sizing model */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* 2. Remove default margin */
* {
  margin: 0;
}

/* 3. Enable keyword animations */
@media (prefers-reduced-motion: no-preference) {
  html {
    interpolate-size: allow-keywords;
  }
}

body {
  /* 4. Add accessible line-height */
  line-height: 1.5;
  /* 5. Improve text rendering */
  -webkit-font-smoothing: antialiased;
}

/* 6. Improve media defaults */
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

/* 7. Inherit fonts for form controls */
input,
button,
textarea,
select {
  font: inherit;
}

/* 8. Avoid text overflows */
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

/* 9. Improve line wrapping */
p {
  text-wrap: pretty;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
}

/* 10. Create a root stacking context */
#root,
#__next {
  isolation: isolate;
}

/*-- -------------------------- -->
<---       CSS Variables        -->
<--- -------------------------- -*/

@media only screen and (min-width: 0em) {
  :root {
    /* Website colors */
    --primary: #ff6a3e;
    --primaryLight: #ffba43;
    --secondary: #001f3f;
    --secondaryLight: #001f3f;
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
}
    
`;

export const sampleCss = `

/*-- -------------------------- -->
<---          Services          -->
<--- -------------------------- -*/

/* Mobile */
@media only screen and (min-width: 0em) {
    .services {
        width: 90%;
        max-width: 82.5em;
        margin: auto;
        margin-top: -10.4375em;
        margin-bottom: 3.125em;
        padding: 3.125em 1.25em;
        background: #fff;
        box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.05);
        border-top: 0.375em solid var(--primary);
        border-radius: 0.3125em;
        position: relative;
        z-index: 100;
    }

    .services .card {
        width: 100%;
        max-width: 22.3125em;
        margin: auto;
        margin-bottom: 3.125em;
        display: block;
    }

    .services .card:last-of-type {
        margin-bottom: 0;
    }

    .services .card picture {
        width: 5.5em;
        height: 5.5em;
        margin: auto;
        margin-bottom: 1.4375em;
        background: var(--primary);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .services .card picture img {
        width: 3em;
        height: 3em;
    }

    .services .card h2 {
        font-size: 2em;
        font-weight: 700;
        line-height: 1.35em;
        text-align: center;
        margin-bottom: 0.65em;
        color: #1a1a1a;
    }

    .services .card p {
        line-height: 1.3333em;
        text-align: center;
        width: 100%;
        opacity: 0.7;
    }
}

/* Inbetween */
@media only screen and (min-width: 768px) {
    .services {
        font-size: min(1.8vw, 1em);
        width: 98%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }

    .services .card {
        max-width: 20.3125em;
        margin: 0;
    }
}

/* Large Desktop */
@media only screen and (min-width: 1300px) {
    .services {
        padding: 3.125em 5em;
    }

    .services .card {
        max-width: 22.3125em;
    }
}

/* Dark mode */
@media only screen and (min-width: 0em) {
    body.dark-mode #services {
        background: var(--medium);
    }

    body.dark-mode #services picture {
        background: var(--primaryDark);
    }

    body.dark-mode #services h2 {
        font-weight: bold;
        color: #fff;
    }
}

`;

// take in consideration to use img instead of Icon component, looks simpler

export const sampleHtml = `
<!-- ============================================ -->
  <!--                   Services                   -->
 <!-- ============================================ -->
<section id="services" class="services">
  <div class="card">
    <picture>
      <Icon name="service4" width="48" height="48" aria-hidden="true" />
    </picture>
    <h2>Service 1</h2>
    <p>
      Write a short description of the service using common search terms. Aim for 1–2 sentences.
    </p>
  </div>
  <div class="card">
    <picture>
      <Icon name="service5" width="48" height="48" aria-hidden="true" />
    </picture>
    <h2>Service 2</h2>
    <p>
      Write a short description of the service using common search terms. Aim for 1–2 sentences.
    </p>
  </div>
  <div class="card">
    <picture>
      <Icon name="service6" width="48" height="48" aria-hidden="true" />
    </picture>
    <h2>Service 3</h2>
    <p>
      Write a short description of the service using common search terms. Aim for 1–2 sentences.
    </p>
  </div>
</section>
`;

export const sampleJs = `

`;