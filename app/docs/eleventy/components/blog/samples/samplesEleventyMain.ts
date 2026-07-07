
export const sampleRoot = `
 /*-- -------------------------- -->
<---        Core Styles         -->
<--- -------------------------- -*/

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
    letter-spacing: 0.1em;
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
                            

/*-- -------------------------- -->
<---    Components + Utilities  -->
<--- -------------------------- -*/

@media only screen and (min-width: 0px) {
    .skip {
        z-index: -1111111;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
    }

    .cs-button-solid {
        z-index: 1;
        position: relative;
        display: inline-block;
        background-color: var(--primary);
        width: auto;
        padding: 1rem 2rem;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 1rem;
        line-height: 1em;
        font-weight: bold;
        border-radius: 0.25rem;
        overflow: hidden;
        color: var(--bodyTextColorWhite);
        transition: color 0.3s;
        transition-delay: 0.1s;
        text-align: center;
    }

    .cs-button-solid:hover {
        color: #fff;
    }

    .cs-button-solid:hover:before {
        width: 100%;
    }

    .cs-button-solid:before {
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        opacity: 1;
        display: block;
        background-color: #000;
        height: 100%;
        width: 0;
        transition: width 0.3s;
    }

    .cs-button-outline {
        z-index: 1;
        position: relative;
        display: inline-block;
        width: auto;
        padding: 1rem 2rem;
        text-decoration: none;
        text-transform: uppercase;
        font-size: 1rem;
        line-height: 1em;
        font-weight: bold;
        border: 2px solid #000;
        color: #000;
        transition: color 0.3s;
        transition-delay: 0.1s;
        text-align: center;
    }

    .cs-button-outline:hover {
        color: #fff;
    }

    .cs-button-outline:hover:before {
        width: 100%;
    }

    .cs-button-outline:before {
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        opacity: 1;
        display: block;
        background-color: #000;
        height: 100%;
        width: 0;
        transition: width 0.3s;
    }

    .cs-color {
        color: var(--primary);
    }

    .cs-bold {
        font-weight: 700;
    }

    .cs-hide-on-mobile {
        display: none !important;
    }

    .cs-dark,
    .dark {
        display: none !important;
    }

    body.dark-mode .cs-light,
    body.dark-mode .light {
        display: none !important;
    }

    body.dark-mode .cs-dark,
    body.dark-mode .dark {
        display: block !important;
    }

    body.dark-mode .cs-button-outline {
        border-color: #fff;
        color: #fff;
    }
}

/* Desktop Utilities */
@media only screen and (min-width: 64rem) {
    .cs-hide-on-mobile {
        display: block !important;
    }

    .cs-hide-on-desktop {
        display: none !important;
    }
}

/*-- -------------------------- -->
<---    Base Element Styles     -->
<--- -------------------------- -*/

@media only screen and (min-width: 0px) {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: var(--headerFont);
        line-height: 1.2em;
        color: var(--headerColor);
    }

    p,
    li,
    a {
        font-size: 1rem;
        line-height: 1.5em;
    }

    p,
    li {
        color: var(--bodyTextColor);
    }

    p a,
    li a {
        color: var(--primary);
    }

    a:hover,
    button:hover {
        cursor: pointer;
    }

    body.dark-mode {
        background-color: var(--dark);
    }

    body.dark-mode p,
    body.dark-mode li,
    body.dark-mode h1,
    body.dark-mode h2,
    body.dark-mode h3,
    body.dark-mode h4,
    body.dark-mode h5,
    body.dark-mode h6 {
        color: #fff;
    }
}

/*-- -------------------------- -->
<---          Fonts             -->
<--- -------------------------- -*/

@media only screen and (min-width: 0px) {
    @font-face {
        font-style: normal;
        font-family: "Roboto";
        font-weight: 400;
        font-display: swap;
        src: local(""),
            url("/assets/fonts/roboto-v29-latin-regular.woff2") format("woff2"),
            url("/assets/fonts/roboto-v29-latin-regular.woff") format("woff");
    }

    @font-face {
        font-style: normal;
        font-family: "Roboto";
        font-weight: 700;
        font-display: swap;
        src: local(""),
            url("/assets/fonts/roboto-v29-latin-700.woff2") format("woff2"),
            url("/assets/fonts/roboto-v29-latin-700.woff") format("woff");
    }

    @font-face {
        font-style: normal;
        font-family: "Roboto";
        font-weight: 900;
        font-display: swap;
        src: local(""),
            url("/assets/fonts/roboto-v29-latin-900.woff2") format("woff2"),
            url("/assets/fonts/roboto-v29-latin-900.woff") format("woff");
    }
}


/* Add this as it's own dark.css file and linked on all pages */
/*-- -------------------------- -->
<---      Core Dark Styles      -->
<--- -------------------------- -*/
/* Mobile */
@media only screen and (min-width: 0rem) {
  :root {
    --dark: #082032;
    --medium: #2c394b;
    --accent: #334756;
    --bodyTextColorWhite: #fafbfc;
  }
  body.dark-mode {
    background-color: var(--dark);
  }
  body.dark-mode p,
  body.dark-mode li,
  body.dark-mode h1,
  body.dark-mode h2,
  body.dark-mode h3,
  body.dark-mode h4,
  body.dark-mode h5,
  body.dark-mode h6,
  body.dark-mode .cs-title,
  body.dark-mode .cs-text,
  body.dark-mode .cs-li {
    color: var(--bodyTextColorWhite);
  }
  body.dark-mode .light {
    display: none;
  }
  body.dark-mode .dark {
    display: block !important;
  }
  .dark {
    /* class used to hide elements that only need to be seen when dark mode is enabled */
    display: none;
  }
}
/*-- -------------------------- -->
<---      Dark Mode Toggle      -->
<--- -------------------------- -*/
/* Mobile */
@media only screen and (min-width: 0rem) {
  body.dark-mode #dark-mode-toggle .cs-sun {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  body.dark-mode #dark-mode-toggle .cs-moon {
    transform: translate(-50%, -150%);
    opacity: 0;
  }
  #dark-mode-toggle {
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 3.75rem;
    width: 3rem;
    height: 3rem;
    background: transparent;
    border: none;
    overflow: hidden;
    padding: 0;
  }
  #dark-mode-toggle img,
  #dark-mode-toggle svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1.5625rem;
    height: 1.5625rem;
    pointer-events: none;
  }
  #dark-mode-toggle .cs-moon {
    z-index: 2;
    transition: transform 0.3s,
                opacity 0.3s,
                fill 0.3s;
    fill: #000;
  }
  #dark-mode-toggle .cs-sun {
    z-index: 1;
    transform: translate(-50%, 100%);
    opacity: 0;
    transition: transform 0.3s,
                opacity 0.3s;
  }
}
/* Desktop */
@media only screen and (min-width: 64rem) {
  #dark-mode-toggle {
    position: relative;
    top: auto;
    right: auto;
    transform: none;
    margin-left: 1.875rem;
    margin-bottom: 0rem;
  }
  #dark-mode-toggle .moon {
    /* change to whatever you need */
    /* fill: #fff; */
  }
}
                     
`;

export const sampleCss = `

/*-- -------------------------- -->
<---          Sidebar           -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
    #blog-sidebar {
        width: 100%;
        max-width: 50rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1.25rem;
    }

    #blog-sidebar .cs-featured-group {
        width: 100%;
        padding: 2rem 1.25rem;
        border: 1px solid #ebebeb;
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    #blog-sidebar .cs-sidebar-header {
        font-size: 1.25rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 1rem;
        color: var(--headerColor);
        display: block;
        position: relative;
    }

    #blog-sidebar .cs-sidebar-header:after {
        content: "";
        width: 4rem;
        height: 3px;
        margin: 1rem auto;
        background: var(--headerColor);
        border-radius: 0.25rem;
        display: block;
        position: relative;
    }

    #blog-sidebar .cs-sidebar-link {
        text-decoration: none;
        width: 100%;
        padding: 1.5rem 0;
        border-bottom: 1px solid #ebebeb;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 1.5rem;
    }

    #blog-sidebar .cs-sidebar-link:nth-of-type(1) {
        padding-top: 0;
    }

    #blog-sidebar .cs-sidebar-link:last-of-type {
        padding-bottom: 0;
        border: none;
    }

    #blog-sidebar .cs-sidebar-img {
        width: 3.75rem;
        height: 3.75rem;
        overflow: hidden;
        border-radius: 50%;
        display: block;
        position: relative;
        flex: none;
    }

    #blog-sidebar .cs-sidebar-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
    }

    #blog-sidebar .cs-sidebar-title {
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.5em;
        text-decoration: none;
        margin: 0;
        margin-bottom: 0.25rem;
        color: var(--headerColor);
        display: block;
    }

    #blog-sidebar .cs-sidebar-date {
        font-size: 0.875rem;
        line-height: 1.5em;
        color: var(--bodyTextColor);
        display: block;
    }

    #blog-sidebar .cs-toc {
        font-size: 0.875rem;
        list-style: none;
        width: 100%;
        margin-top: 1rem;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    #blog-sidebar .cs-toc-item {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    #blog-sidebar .cs-toc-item.cs-active {
        padding-left: 1rem;
        border-left: 4px solid var(--primary);
    }

    #blog-sidebar .cs-toc-item.cs-active .cs-toc-link {
        font-weight: 700;
        color: var(--primary);
    }

    #blog-sidebar .cs-toc-link {
        text-decoration: none;
        width: 100%;
        color: var(--bodyTextColor);
        display: block;
        transition: color 0.2s ease-in-out;
    }

    #blog-sidebar .cs-toc-link:hover {
        color: var(--primary);
    }
}

/* Desktop - 1024px */
@media only screen and (min-width: 64rem) {
    #blog-sidebar {
        max-width: 22.5rem;
        position: sticky;
        top: 10rem;
    }
}

/* Dark Mode */
@media only screen and (min-width: 0rem) {
    body.dark-mode #blog-sidebar .cs-sidebar-header,
    body.dark-mode #blog-sidebar .cs-toc-link,
    body.dark-mode #blog-sidebar .cs-sidebar-title,
    body.dark-mode #blog-sidebar .cs-sidebar-date {
        color: var(--bodyTextColorWhite);
    }

    body.dark-mode #blog-sidebar .cs-sidebar-date {
        opacity: 0.8;
    }

    body.dark-mode #blog-sidebar .cs-sidebar-header::after {
        background-color: var(--bodyTextColorWhite);
    }

    body.dark-mode #blog-sidebar .cs-toc-item.cs-active {
        border-color: var(--secondary);
    }

    body.dark-mode #blog-sidebar .cs-toc-item.cs-active .cs-toc-link {
        color: var(--secondary);
    }
}

/*-- -------------------------- -->
<---        Blog Listing        -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
    #blog-listing {
        width: 100%;
        max-width: 80rem;
        margin: auto;
        padding: var(--sectionPadding);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* 48px - 64px */
        gap: clamp(3rem, 6vw, 4rem);
    }

    #blog-listing .cs-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* 48px - 64px */
        gap: clamp(3rem, 6vw, 4rem);
    }

    #blog-listing .cs-article {
        width: 100%;
        overflow: hidden;
        display: block;
        flex: none;
    }

    #blog-listing .cs-article-image {
        width: 100%;
        /* 200px - 400px */
        height: clamp(12.5rem, 30vw, 25rem);
        overflow: hidden;
        border-radius: 0.5rem 0.5rem 0 0;
        display: block;
        position: relative;
    }

    #blog-listing .cs-article-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
    }

    #blog-listing .cs-article-group {
        /* 30px - 50px */
        padding: clamp(1.875rem, 5vw, 3.125rem);
        border: 1px solid #ebebeb;
        border-radius: 0 0 0.5rem 0.5rem;
    }

    #blog-listing .cs-author-group {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0.75rem;
    }

    #blog-listing .cs-author-img {
        width: 2rem;
        height: 2rem;
        overflow: hidden;
        border-radius: 50%;
        display: block;
        position: relative;
    }

    #blog-listing .cs-author-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
    }

    #blog-listing .cs-author-name,
    #blog-listing .cs-date {
        font-size: 0.875rem;
        line-height: 1.5em;
        color: var(--bodyTextColor);
    }

    #blog-listing .cs-dot {
        width: 3px;
        height: 3px;
        background-color: var(--primary);
        border-radius: 50%;
        display: block;
    }

    #blog-listing .cs-article-title {
        /* 20px - 32px */
        font-size: clamp(1.25rem, 5vw, 2rem);
        font-weight: 700;
        line-height: 1.5em;
        margin: 1rem 0;
        color: var(--headerColor);
    }

    #blog-listing .cs-article-desc {
        font-size: 1rem;
        line-height: 1.5em;
        margin: 1rem 0 2rem;
        color: var(--bodyTextColor);
    }
}

/* Desktop - 1024px */
@media only screen and (min-width: 64rem) {
    #blog-listing {
        flex-direction: row;
        align-items: flex-start;
    }

    #blog-listing .cs-article-title {
        max-width: 34.375rem;
    }
}

/* Dark Mode */
@media only screen and (min-width: 0rem) {
    body.dark-mode #blog-listing .cs-article-title,
    body.dark-mode #blog-listing .cs-author-name,
    body.dark-mode #blog-listing .cs-date,
    body.dark-mode #blog-listing .cs-article-desc {
        color: var(--bodyTextColorWhite);
    }

    body.dark-mode #blog-listing .cs-author-name,
    body.dark-mode #blog-listing .cs-date,
    body.dark-mode #blog-listing .cs-article-desc {
        opacity: 0.8;
    }
}

/*-- -------------------------- -->
<---     Single Blog Article    -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
    #single-article {
        width: 100%;
        max-width: 80rem;
        margin: auto;
        padding: var(--sectionPadding);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4rem;
    }

    #single-article .cs-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4rem;
    }

    #single-article .cs-article-post {
        width: 100%;
        max-width: 50rem;
        display: block;
    }

    #single-article .cs-article-image {
        width: 100%;
        /* 200px - 400px */
        height: clamp(12.5rem, 30vw, 25rem);
        margin: 0 0 3rem;
        overflow: hidden;
        border-radius: 0.5rem;
        display: block;
        position: relative;
    }

    #single-article .cs-article-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
    }

    #single-article .cs-author-img {
        width: 2rem;
        height: 2rem;
        overflow: hidden;
        border-radius: 50%;
        display: block;
        position: relative;
    }

    #single-article .cs-author-img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
    }

    #single-article .cs-author-group {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0.75rem;
    }

    #single-article .cs-author-name,
    #single-article .cs-date {
        font-size: 0.875rem;
        line-height: 1.5em;
        color: var(--bodyTextColor);
    }

    #single-article .cs-dot {
        width: 0.1875rem;
        height: 0.1875rem;
        background-color: var(--primary);
        border-radius: 50%;
        display: block;
    }

    #single-article .cs-article-title {
        /* 20px - 39px */
        font-size: clamp(1.25rem, 5vw, 2.4375rem);
        font-weight: 700;
        line-height: 1.4em;
        max-width: 34.375rem;
        margin: 0 0 1rem;
        color: var(--headerColor);
    }

    #single-article .cs-article-content {
        margin-top: 1rem;
        padding-top: 1.5rem;
        border-top: 1px solid #ebebeb;
    }

    #single-article .cs-article-content h1 {
        font-size: 2rem;
        font-weight: 700;
        line-height: 1.75em;
        margin-bottom: 1rem;
        color: var(--headerColor);
    }

    #single-article .cs-article-group h2,
    #single-article .cs-article-content h2 {
        font-size: 1.75rem;
        font-weight: 700;
        line-height: 1.5em;
        margin-bottom: 1rem;
        color: var(--headerColor);
    }

    #single-article .cs-article-group h3,
    #single-article .cs-article-content h3 {
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1.5em;
        margin-bottom: 1rem;
        color: var(--primary);
    }

    #single-article .cs-article-group h4,
    #single-article .cs-article-group h5,
    #single-article .cs-article-group h6,
    #single-article .cs-article-content h4,
    #single-article .cs-article-content h5,
    #single-article .cs-article-content h6 {
        font-size: 1.25rem;
        font-weight: 700;
        line-height: 1.5em;
        margin-bottom: 1rem;
        color: var(--headerColor);
    }

    #single-article .cs-article-group p,
    #single-article .cs-article-content p {
        font-size: 1rem;
        line-height: 1.6em;
        margin: 0;
        margin-bottom: 1rem;
        color: var(--bodyTextColor);
    }

    #single-article .cs-article-group a:not(.cs-button-solid),
    #single-article .cs-article-content a:not(.cs-button-solid) {
        font-size: inherit;
        text-decoration: underline;
        color: var(--secondary);
    }

    #single-article .cs-article-group .cs-button-solid,
    #single-article .cs-article-content .cs-button-solid {
        margin-bottom: 2rem;
    }

    #single-article .cs-article-group ul,
    #single-article .cs-article-group ol,
    #single-article .cs-article-content ul,
    #single-article .cs-article-content ol {
        margin: 1rem 0;
        padding-left: 2.5rem;
    }

    #single-article .cs-article-group ul li,
    #single-article .cs-article-group ol li,
    #single-article .cs-article-content ul li,
    #single-article .cs-article-content ol li {
        font-size: 1rem;
        line-height: 1.6em;
        list-style: circle;
        margin-bottom: 1rem;
        color: var(--bodyTextColor);
    }
}

/* Desktop - 1024px */
@media only screen and (min-width: 64rem) {
    #single-article {
        flex-direction: row;
        align-items: flex-start;
    }
}

/* Dark Mode */
@media only screen and (min-width: 0rem) {
    body.dark-mode #single-article .cs-article-group h1,
    body.dark-mode #single-article .cs-article-group h2,
    body.dark-mode #single-article .cs-article-group h3,
    body.dark-mode #single-article .cs-article-group h4,
    body.dark-mode #single-article .cs-article-group h5,
    body.dark-mode #single-article .cs-article-group h6,
    body.dark-mode #single-article .cs-article-group p,
    body.dark-mode #single-article .cs-article-group span,
    body.dark-mode #single-article .cs-article-group li,
    body.dark-mode #single-article .cs-article-content h1,
    body.dark-mode #single-article .cs-article-content h2,
    body.dark-mode #single-article .cs-article-content h3,
    body.dark-mode #single-article .cs-article-content h4,
    body.dark-mode #single-article .cs-article-content h5,
    body.dark-mode #single-article .cs-article-content h6,
    body.dark-mode #single-article .cs-article-content p,
    body.dark-mode #single-article .cs-article-content span,
    body.dark-mode #single-article .cs-article-content li {
        color: var(--bodyTextColorWhite);
    }

    body.dark-mode #single-article .cs-article-group p,
    body.dark-mode #single-article .cs-article-group span,
    body.dark-mode #single-article .cs-article-group li,
    body.dark-mode #single-article .cs-article-content p,
    body.dark-mode #single-article .cs-article-content span,
    body.dark-mode #single-article .cs-article-content li {
        opacity: 0.8;
    }
}                                                          
                                
`;

export const sampleHtml = `
                      
  <!-- ============================================ -->
    <!--                 Blog Listings                -->
    <!-- ============================================ -->

    <div id="blog-listing">
      <div class="cs-container">
          <article class="cs-article">
              <picture class="cs-article-image">
                  <source media="(max-width: 600px)" srcset="https://picsum.photos/seed/blog1/900/600">
                  <source media="(min-width: 601px)" srcset="https://picsum.photos/seed/blog1/2250/1500">
                  <img decoding="async" src="https://picsum.photos/seed/blog1/2250/1500" alt="Laptop and notebook on a desk" width="2250" height="1500">
              </picture>
              <div class="cs-article-group">
                  <div class="cs-author-group">
                      <picture class="cs-author-img">
                          <img src="https://i.pravatar.cc/64?img=12" alt="Author avatar" width="32" height="32" decoding="async" loading="lazy" />
                      </picture>
                      <span class="cs-author-name">Jane Cooper</span>
                      <span aria-hidden="true" class="cs-dot"></span>
                      <span class="cs-date">June 24, 2026</span>
                  </div>
                  <h2 class="cs-article-title">
                      Getting Started with Static Site Generators
                  </h2>
                  <p class="cs-article-desc">
                      Learn how modern static site generators can help you build fast, secure, and
                      scalable websites without the overhead of a traditional CMS.
                  </p>
                  <a href="#" class="cs-button-solid">Continue Reading</a>
              </div>
          </article>

          <article class="cs-article">
              <picture class="cs-article-image">
                  <source media="(max-width: 600px)" srcset="https://picsum.photos/seed/blog2/900/600">
                  <source media="(min-width: 601px)" srcset="https://picsum.photos/seed/blog2/2250/1500">
                  <img decoding="async" src="https://picsum.photos/seed/blog2/2250/1500" alt="Team collaborating around a table" width="2250" height="1500">
              </picture>
              <div class="cs-article-group">
                  <div class="cs-author-group">
                      <picture class="cs-author-img">
                          <img src="https://i.pravatar.cc/64?img=32" alt="Author avatar" width="32" height="32" decoding="async" loading="lazy" />
                      </picture>
                      <span class="cs-author-name">Marcus Lee</span>
                      <span aria-hidden="true" class="cs-dot"></span>
                      <span class="cs-date">June 18, 2026</span>
                  </div>
                  <h2 class="cs-article-title">
                      Designing Accessible Color Systems
                  </h2>
                  <p class="cs-article-desc">
                      A practical guide to choosing color palettes that look great in both light and
                      dark mode while remaining accessible to every visitor.
                  </p>
                  <a href="#" class="cs-button-solid">Continue Reading</a>
              </div>
          </article>

          <article class="cs-article">
              <picture class="cs-article-image">
                  <source media="(max-width: 600px)" srcset="https://picsum.photos/seed/blog3/900/600">
                  <source media="(min-width: 601px)" srcset="https://picsum.photos/seed/blog3/2250/1500">
                  <img decoding="async" src="https://picsum.photos/seed/blog3/2250/1500" alt="Code on a computer screen" width="2250" height="1500">
              </picture>
              <div class="cs-article-group">
                  <div class="cs-author-group">
                      <picture class="cs-author-img">
                          <img src="https://i.pravatar.cc/64?img=45" alt="Author avatar" width="32" height="32" decoding="async" loading="lazy" />
                      </picture>
                      <span class="cs-author-name">Priya Nair</span>
                      <span aria-hidden="true" class="cs-dot"></span>
                      <span class="cs-date">June 9, 2026</span>
                  </div>
                  <h2 class="cs-article-title">
                      Performance Tips for Faster Page Loads
                  </h2>
                  <p class="cs-article-desc">
                      From image optimization to lazy loading, discover the techniques that keep your
                      pages snappy and your visitors engaged.
                  </p>
                  <a href="#" class="cs-button-solid">Continue Reading</a>
              </div>
          </article>
      </div>

      <!-- ============================================ -->
      <!--                Featured Posts                -->
      <!-- ============================================ -->

      <div id="blog-sidebar">
       <!--Featured-->
        <div class="cs-featured-group">
          <span class="cs-sidebar-header">Featured Posts</span>
          <a class="cs-sidebar-link" href="#">
              <picture class="cs-sidebar-img">
                  <source media="(max-width: 600px)" srcset="https://picsum.photos/seed/feat1/300/300">
                  <source media="(min-width: 601px)" srcset="https://picsum.photos/seed/feat1/300/300">
                  <img decoding="async" src="https://picsum.photos/seed/feat1/300/300" alt="Mountain landscape" width="60" height="60">
              </picture>
              <div class="cs-content-group">
                  <h3 class="cs-sidebar-title">10 Habits of Highly Productive Developers</h3>
                  <span class="cs-sidebar-date">May 30, 2026</span>
              </div>
          </a>
          <a class="cs-sidebar-link" href="#">
              <picture class="cs-sidebar-img">
                  <source media="(max-width: 600px)" srcset="https://picsum.photos/seed/feat2/300/300">
                  <source media="(min-width: 601px)" srcset="https://picsum.photos/seed/feat2/300/300">
                  <img decoding="async" src="https://picsum.photos/seed/feat2/300/300" alt="City skyline at night" width="60" height="60">
              </picture>
              <div class="cs-content-group">
                  <h3 class="cs-sidebar-title">Why CSS Grid Changed Layout Forever</h3>
                  <span class="cs-sidebar-date">May 22, 2026</span>
              </div>
          </a>
          <a class="cs-sidebar-link" href="#">
              <picture class="cs-sidebar-img">
                  <source media="(max-width: 600px)" srcset="https://picsum.photos/seed/feat3/300/300">
                  <source media="(min-width: 601px)" srcset="https://picsum.photos/seed/feat3/300/300">
                  <img decoding="async" src="https://picsum.photos/seed/feat3/300/300" alt="Coffee cup beside a keyboard" width="60" height="60">
              </picture>
              <div class="cs-content-group">
                  <h3 class="cs-sidebar-title">A Beginner's Guide to Semantic HTML</h3>
                  <span class="cs-sidebar-date">May 14, 2026</span>
              </div>
          </a>
        </div>
      </div>
  </div>

`;

export const sampleJs = `

`;