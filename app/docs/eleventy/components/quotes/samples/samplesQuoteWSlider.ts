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
<!--                     Quote                    -->
<!-- ============================================ -->

 <section id="quote-20"> 
    <div class="cs-container">
        <div class="cs-content">
            <span class="cs-topper">Single quote</span>
            <p class="cs-quote">
                At SmileWorks, we merge cutting-edge dental innovation with personalized care to ensure every patient leaves with a confident, radiant smile. Our team is committed to comfort, precision, and results that last.
            </p>
            <span class="cs-name">Elena Rodriguez</span>
            <span class="cs-job">Chief Dental Officer</span>
        </div>
        <!-- make sure the before/after images are the same dimensions and that the object of focus is centered -->
        <div class="cs-picture-group">
            <picture class="cs-picture cs-picture-before">
                <source media="(max-width: 600px)" srcset="https://images.pexels.com/photos/3768166/pexels-photo-3768166.jpeg">
                <source media="(min-width: 601px)" srcset="https://images.pexels.com/photos/3768166/pexels-photo-3768166.jpeg">
                <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/3768166/pexels-photo-3768166.jpeg" alt="before dental treatment" width="630" height="877">
            </picture>
            <picture class="cs-picture cs-picture-after">
                <source media="(max-width: 600px)" srcset="https://images.pexels.com/photos/3768170/pexels-photo-3768170.jpeg">
                <source media="(min-width: 601px)" srcset="https://images.pexels.com/photos/3768170/pexels-photo-3768170.jpeg">
                <img loading="lazy" decoding="async" src="https://images.pexels.com/photos/3768170/pexels-photo-3768170.jpeg" alt="after dental treatment" width="630" height="877">
            </picture>
            <div class="cs-slider-wrapper">
                <div class="cs-tags">
                    <span class="cs-tag">BEFORE</span>
                    <span class="cs-tag">AFTER</span>
                </div>
                <div class="cs-line"></div>
                <div class="cs-arrows">
                    <img class="cs-arrow" loading="lazy" decoding="async" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/dental-before-arrow.svg" alt="before" width="16" height="16">
                    <img class="cs-arrow" loading="lazy" decoding="async" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/dental-after-arrow.svg" alt="after" width="16" height="16">
                </div>
            </div>
        </div>
    </div>
    <picture class="cs-background">
        <img loading="lazy" decoding="async" src="https://csimg.nyc3.cdn.digitaloceanspaces.com/Images/Icons/dental-waves.svg" alt="waves" width="320" height="700">
    </picture>
</section>   
`;

export const sampleCss = `
       /*-- -------------------------- -->
<---           Quote            -->
<--- -------------------------- -*/

/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
  #quote-20 {
    padding: var(--sectionPadding);
    position: relative;
    z-index: 1;
  }
  #quote-20 .cs-container {
    width: 100%;
    max-width: 80rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* 48px - 100px */
    gap: clamp(3rem, 10vw, 6.25rem);
    position: relative;
    z-index: 2;
  }
  #quote-20 .cs-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-self: center;
  }
  #quote-20 .cs-topper {
    text-align: center;
    color: var(--secondary);
  }
  #quote-20 .cs-quote {
    /* 25px - 39px */
    font-size: clamp(1.5625rem, 2.8vw, 2.4375rem);
    font-weight: 700;
    line-height: 1.2em;
    text-align: center;
    /* 24px - 32px */
    margin: 0 0 clamp(1.5rem, 3vw, 2rem);
    color: var(--headerColor);
  }
  #quote-20 .cs-name {
    /* 16px - 25px */
    font-size: clamp(1rem, 3vw, 1.5625rem);
    font-weight: 700;
    line-height: 1.2em;
    text-align: center;
    color: var(--primary);
    display: block;
  }
  #quote-20 .cs-job {
    /* 14px - 16px */
    font-size: clamp(0.875rem, 1.5vw, 1rem);
    line-height: 1.5em;
    text-align: center;
    color: var(--bodyTextColor);
    display: block;
  }
  #quote-20 .cs-picture-group {
    width: 100%;
    /* the exact height/widths are calculated in the JS. set maximums here */
    max-width: 52.875rem;
    /* 180px - 480px */
    max-height: clamp(11.25rem, 47vw, 30rem);
    margin: auto;
    overflow: hidden;
    border-radius: 0.375rem;
    position: relative;
  }
  #quote-20 .cs-picture {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }
  #quote-20 .cs-picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
  #quote-2059 .cs-picture-before {
    width: 50%;
    z-index: 2;
  }
  #quote-20 .cs-slider-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    z-index: 10;
    transform: translateX(-50%);
  }
  #quote-20 .cs-tags {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    position: absolute;
    /* 6px - 16px */
    top: clamp(0.375rem, 1.5vw, 1rem);
    left: 50%;
    transform: translateX(-56%);
  }
  #quote-20 .cs-tag {
    /* 6px - 16px */
    font-size: clamp(0.375rem, 1.5vw, 1rem);
    font-weight: 700;
    line-height: 1.2em;
    color: var(--Main-White, #fff);
  }
  #quote-20 .cs-line {
    width: 1px;
    height: 100%;
    background: #fff;
  }
  #quote-20 .cs-arrows {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  #quote-20 .cs-arrow {
    /* 16px - 40px */
    width: clamp(1rem, 4vw, 2.5rem);
    height: auto;
  }
  #quote-20 .cs-background {
    width: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    /* 180px - 330px */
    bottom: clamp(11.25rem, 25vw, 20.625rem);
    z-index: 1;
  }
  #quote-20 .cs-background:before {
    /* actual background-color */
    content: '';
    width: 100%;
    height: 100%;
    background: var(--primary);
    opacity: 0.1;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
  }
  #quote-20 .cs-background img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }
}
`;

export const sampleJs = `
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('#quote-2059 .cs-picture-group');
    const beforeImage = container.querySelector('.cs-picture-after img');
    const afterImage = container.querySelector('.cs-picture-before img');
    const afterContainer = container.querySelector('.cs-picture-before');
    const slider = container.querySelector('.cs-slider-wrapper');

    let isResizing = false;

    const getAspectRatio = (img) => img.naturalWidth / img.naturalHeight;

    const resize = (e) => {
        if (!isResizing) return;
        const containerRect = container.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - containerRect.left;
        const percent = Math.max(0, Math.min(100, x / containerRect.width * 100));
        slider.style.left = \`\${percent}%\`;
        afterContainer.style.width = \`\${percent}%\`;
    };

    const setDimensions = () => {
        const aspectRatio = getAspectRatio(beforeImage);
        const containerWidth = container.offsetWidth;
        const containerStyle = window.getComputedStyle(container);
        const maxHeight = parseInt(containerStyle.maxHeight);
        const containerHeight = containerWidth / aspectRatio;

        const finalHeight = Math.min(containerHeight, maxHeight);
        container.style.height = \`\${finalHeight}px\`;

        const imageAspectRatio = aspectRatio;
        const containerAspectRatio = containerWidth / finalHeight;
        let imageWidth, imageHeight;

        if (imageAspectRatio > containerAspectRatio) {
            imageHeight = finalHeight;
            imageWidth = imageHeight * imageAspectRatio;
        } else {
            imageWidth = containerWidth;
            imageHeight = imageWidth / imageAspectRatio;
        }

        const offsetX = (containerWidth - imageWidth) / 2;
        const offsetY = (finalHeight - imageHeight) / 2;

        [beforeImage, afterImage].forEach(img => {
            img.style.width = \`\${imageWidth}px\`;
            img.style.height = \`\${imageHeight}px\`;
            img.style.left = \`\${offsetX}px\`;
            img.style.top = \`\${offsetY}px\`;
        });

        afterContainer.style.width = '50%';
    };

    Promise.all(Array.from(container.querySelectorAll('img')).map(img => {
        return new Promise((resolve) => {
            if (img.complete) resolve();
            else img.onload = resolve;
        });
    })).then(setDimensions);

    window.addEventListener('resize', setDimensions);

    container.addEventListener('mousedown', () => isResizing = true);
    container.addEventListener('touchstart', () => isResizing = true);
    window.addEventListener('mousemove', resize);
    window.addEventListener('touchmove', resize);
    window.addEventListener('mouseup', () => isResizing = false);
    window.addEventListener('touchend', () => isResizing = false);

    container.addEventListener('mousemove', (e) => {
        if (!isResizing) {
            const containerRect = container.getBoundingClientRect();
            const x = e.clientX - containerRect.left;
            const percent = Math.max(0, Math.min(100, x / containerRect.width * 100));
            slider.style.left = \`\${percent}%\`;
            afterContainer.style.width = \`\${percent}%\`;
        }
    });

    container.addEventListener('mouseleave', () => {
        if (!isResizing) {
            slider.style.left = '50%';
            afterContainer.style.width = '50%';
        }
    });
});
`;