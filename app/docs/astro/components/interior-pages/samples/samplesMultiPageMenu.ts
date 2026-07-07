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
        
        <span class="cs-int-title">Discover Our Signature Dishes</span>
        <p class="cs-text">
            Crafted with fresh ingredients and bold flavors, our menu brings together timeless classics and modern favorites. From handcrafted appetizers to indulgent desserts, every dish is prepared with passion and attention to detail.
        </p>
    </div>
    <!--Background Image-->
    <picture class="cs-background">
        <source media="(max-width: 600px)" srcset="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop">
        <source media="(min-width: 601px)" srcset="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1920&auto=format&fit=crop">
        <img decoding="async" src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1920&auto=format&fit=crop" alt="restaurant table filled with gourmet dishes" width="1920" height="1000">
    </picture>
</div> 
<div id="cs-menu-group-10">
    <div class="cs-button-group">
    <button class="cs-button cs-active" data-filter="one" onclick="window.location.href='#cs-menu-group';">
        Hot Coffee
    </button>
    <button class="cs-button" data-filter="two" onclick="window.location.href='#cs-menu-group';">
        Iced Drinks
    </button>
    <button class="cs-button" data-filter="three" onclick="window.location.href='#cs-menu-group';">
        Teas & Matcha
    </button>
    <button class="cs-button" data-filter="four" onclick="window.location.href='#cs-menu-group';">
        Pastries
    </button>
    <button class="cs-button" data-filter="five" onclick="window.location.href='#cs-menu-group';">
        Breakfast Bites
    </button>
    </div>
    <!--Breakfast-->
    <div id="cs-menu1-10" class="cs-menu-group" data-category="one">
    <!--Hot Coffee Section 1-->
    <section class="cs-menu">
        <div class="cs-container">
            <div class="cs-content">
                <h2 class="cs-title">Hot Coffee</h2>
                <p class="cs-text">
                    Crafted from freshly roasted beans and brewed to perfection, our hot coffee selection delivers rich flavor, bold aroma, and comforting warmth in every cup.
                </p>
            </div>
            <ul class="cs-menu-list">
                <div class="cs-menu-row cs-3">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Espresso</span>
                            <span class="cs-price">$3.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            A bold and concentrated shot with a rich crema and deep flavor.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Americano</span>
                            <span class="cs-price">$4.00</span>
                        </h3>
                        <p class="cs-menu-p">
                            Smooth espresso blended with hot water for a balanced finish.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Cappuccino</span>
                            <span class="cs-price">$4.75</span>
                        </h3>
                        <p class="cs-menu-p">
                            Espresso topped with steamed milk and a thick layer of foam.
                        </p>
                    </div>
                </div>

                <div class="cs-menu-row">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Latte</span>
                            <span class="cs-price">$5.00</span>
                        </h3>
                        <p class="cs-menu-p">
                            Creamy steamed milk combined with rich espresso.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Flat White</span>
                            <span class="cs-price">$4.85</span>
                        </h3>
                        <p class="cs-menu-p">
                            Velvety microfoam poured over a double shot of espresso.
                        </p>
                    </div>
                </div>

                <div class="cs-menu-row">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Mocha</span>
                            <span class="cs-price">$5.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            Espresso blended with chocolate and steamed milk.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Caramel Macchiato</span>
                            <span class="cs-price">$5.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Espresso layered with vanilla milk and caramel drizzle.
                        </p>
                    </div>
                </div>

                <div class="cs-menu-row">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Hazelnut Latte</span>
                            <span class="cs-price">$5.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            Smooth espresso infused with sweet hazelnut syrup.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Vanilla Latte</span>
                            <span class="cs-price">$5.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            A comforting blend of espresso, steamed milk, and vanilla.
                        </p>
                    </div>
                </div>

                <div class="cs-menu-row">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Chai Latte</span>
                            <span class="cs-price">$4.75</span>
                        </h3>
                        <p class="cs-menu-p">
                            Spiced chai tea combined with steamed milk.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Hot Chocolate</span>
                            <span class="cs-price">$4.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Rich cocoa blended with steamed milk and topped with foam.
                        </p>
                    </div>
                </div>
            </ul>
        </div>
    </section>

    <!--Specialty Roasts-->
    <section class="cs-menu cs-menu-style2">
        <div class="cs-container">
            <div class="cs-content">
                <h2 class="cs-title">Specialty Roasts</h2>
                <p class="cs-text">
                    Explore our rotating selection of single-origin and seasonal specialty beans.
                </p>
            </div>
            <ul class="cs-menu-list">
                <div class="cs-menu-row">
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Ethiopian Yirgacheffe</span>
                            <span class="cs-price">$5.75</span>
                        </h3>
                        <p class="cs-menu-p">
                            Bright acidity with floral aroma and citrus notes.
                        </p>
                    </li>
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Colombian Supremo</span>
                            <span class="cs-price">$5.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Smooth body with caramel sweetness and nutty finish.
                        </p>
                    </li>
                </div>
            </ul>
        </div>
    </section>

    <!--Seasonal Favorites-->
    <section class="cs-menu">
        <div class="cs-container">
            <div class="cs-content">
                <h2 class="cs-title">Seasonal Favorites</h2>
                <p class="cs-text">
                    Limited-time handcrafted beverages inspired by the flavors of the season.
                </p>
            </div>
            <ul class="cs-menu-list">
                <div class="cs-menu-row">
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Pumpkin Spice Latte</span>
                            <span class="cs-price">$5.75</span>
                        </h3>
                        <p class="cs-menu-p">
                            A fall classic with warm spices and creamy espresso.
                        </p>
                    </li>
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Peppermint Mocha</span>
                            <span class="cs-price">$5.75</span>
                        </h3>
                        <p class="cs-menu-p">
                            Chocolate espresso infused with refreshing peppermint.
                        </p>
                    </li>
                </div>
            </ul>
        </div>
    </section>
</div>
    <!--Lunch-->
    <div id="cs-menu2-10" class="cs-menu-group" data-category="two">
    <!--Iced Drinks Section 1-->
    <section class="cs-menu">
        <div class="cs-container">
            <div class="cs-content">
                <h2 class="cs-title">Iced Drinks</h2>
                <p class="cs-text">
                    Refreshing, bold, and perfectly chilled. Our iced beverages are crafted to keep you cool while delivering rich espresso flavor and smooth finishes.
                </p>
            </div>
            <div class="cs-menu-list">
                <div class="cs-menu-row cs-3">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Iced Americano</span>
                            <span class="cs-price">$4.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Smooth espresso poured over ice with cold filtered water.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Iced Latte</span>
                            <span class="cs-price">$5.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            Rich espresso blended with chilled milk and ice.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Iced Mocha</span>
                            <span class="cs-price">$5.75</span>
                        </h3>
                        <p class="cs-menu-p">
                            Chocolate espresso served cold with creamy milk.
                        </p>
                    </div>
                </div>

                <div class="cs-menu-row">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Cold Brew</span>
                            <span class="cs-price">$4.95</span>
                        </h3>
                        <p class="cs-menu-p">
                            Slow-steeped for 18 hours for a bold, smooth finish.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Vanilla Sweet Cream Cold Brew</span>
                            <span class="cs-price">$5.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Cold brew topped with house-made vanilla sweet cream.
                        </p>
                    </div>
                </div>

                <div class="cs-menu-row">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Iced Caramel Macchiato</span>
                            <span class="cs-price">$5.95</span>
                        </h3>
                        <p class="cs-menu-p">
                            Layered espresso with vanilla milk and caramel drizzle.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Iced Flat White</span>
                            <span class="cs-price">$5.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Double espresso poured over ice with silky milk.
                        </p>
                    </div>
                </div>

                <div class="cs-menu-row">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Iced Matcha Latte</span>
                            <span class="cs-price">$5.75</span>
                        </h3>
                        <p class="cs-menu-p">
                            Premium matcha blended with cold milk and ice.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Iced Chai Latte</span>
                            <span class="cs-price">$5.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Spiced chai tea served chilled with creamy milk.
                        </p>
                    </div>
                </div>

                <div class="cs-menu-row">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Iced Honey Latte</span>
                            <span class="cs-price">$5.75</span>
                        </h3>
                        <p class="cs-menu-p">
                            Espresso sweetened with natural honey and chilled milk.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Affogato</span>
                            <span class="cs-price">$6.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            A scoop of vanilla ice cream topped with hot espresso.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!--Iced Specialty Blends-->
    <section class="cs-menu cs-menu-style2">
        <div class="cs-container">
            <div class="cs-content">
                <h2 class="cs-title">Iced Specialty Blends</h2>
                <p class="cs-text">
                    Signature chilled creations crafted for a refreshing twist.
                </p>
            </div>
            <ul class="cs-menu-list">
                <div class="cs-menu-row">
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Salted Caramel Frappe</span>
                            <span class="cs-price">$6.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Blended espresso with caramel and a hint of sea salt.
                        </p>
                    </li>
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Mocha Cookie Crumble</span>
                            <span class="cs-price">$6.75</span>
                        </h3>
                        <p class="cs-menu-p">
                            Chocolate frappe topped with whipped cream and cookie pieces.
                        </p>
                    </li>
                </div>

                <div class="cs-menu-row">
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Strawberry Matcha Fusion</span>
                            <span class="cs-price">$6.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            Layered strawberry puree with creamy iced matcha.
                        </p>
                    </li>
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Coconut Cold Brew</span>
                            <span class="cs-price">$6.00</span>
                        </h3>
                        <p class="cs-menu-p">
                            Smooth cold brew with a splash of coconut milk.
                        </p>
                    </li>
                </div>
            </ul>
        </div>
    </section>

    <!--Refreshing Non-Coffee Drinks-->
    <section class="cs-menu">
        <div class="cs-container">
            <div class="cs-content">
                <h2 class="cs-title">Refreshing Non-Coffee</h2>
                <p class="cs-text">
                    Light, fruity, and caffeine-free options for every mood.
                </p>
            </div>
            <ul class="cs-menu-list">
                <div class="cs-menu-row">
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Iced Peach Tea</span>
                            <span class="cs-price">$4.75</span>
                        </h3>
                        <p class="cs-menu-p">
                            Fresh brewed tea infused with sweet peach flavor.
                        </p>
                    </li>
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Lemonade Spritzer</span>
                            <span class="cs-price">$4.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Sparkling lemonade served ice cold with citrus zest.
                        </p>
                    </li>
                </div>

                <div class="cs-menu-row">
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Berry Hibiscus Cooler</span>
                            <span class="cs-price">$5.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            A vibrant blend of hibiscus tea and mixed berries.
                        </p>
                    </li>
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Sparkling Mango Refresher</span>
                            <span class="cs-price">$5.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Tropical mango flavors with a refreshing sparkle.
                        </p>
                    </li>
                </div>
            </ul>
        </div>
    </section>
</div>
    <!--Dinner-->
    <div id="cs-menu3-10" class="cs-menu-group" data-category="three">
    <!--Teas & Matcha Section 1-->
    <section class="cs-menu">
        <div class="cs-container">
            <div class="cs-content">
                <h2 class="cs-title">Teas & Matcha</h2>
                <p class="cs-text">
                    From delicate floral blends to rich ceremonial matcha, our tea selection is crafted for calm moments, focused mornings, and refreshing afternoons.
                </p>
            </div>
            <div class="cs-menu-list">
                <div class="cs-menu-row cs-3">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Sencha Green Tea</span>
                            <span class="cs-price">$4.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Light, grassy notes with a clean and refreshing finish.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Earl Grey Supreme</span>
                            <span class="cs-price">$4.75</span>
                        </h3>
                        <p class="cs-menu-p">
                            Bold black tea infused with fragrant bergamot citrus.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Chamomile Blossom</span>
                            <span class="cs-price">$4.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            A calming herbal infusion with soft floral sweetness.
                        </p>
                    </div>
                </div>

                <div class="cs-menu-row">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Jasmine Pearl Tea</span>
                            <span class="cs-price">$5.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            Hand-rolled pearls scented with delicate jasmine.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Masala Chai</span>
                            <span class="cs-price">$4.95</span>
                        </h3>
                        <p class="cs-menu-p">
                            Robust black tea blended with warming spices.
                        </p>
                    </div>
                </div>

                <div class="cs-menu-row">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">London Fog</span>
                            <span class="cs-price">$5.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Earl Grey with steamed milk and vanilla.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Honey Ginger Tea</span>
                            <span class="cs-price">$4.75</span>
                        </h3>
                        <p class="cs-menu-p">
                            Fresh ginger steeped with natural honey and lemon.
                        </p>
                    </div>
                </div>

                <div class="cs-menu-row">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Ceremonial Matcha</span>
                            <span class="cs-price">$5.75</span>
                        </h3>
                        <p class="cs-menu-p">
                            Premium stone-ground matcha whisked to a smooth froth.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Matcha Latte</span>
                            <span class="cs-price">$5.95</span>
                        </h3>
                        <p class="cs-menu-p">
                            Creamy steamed milk blended with vibrant green matcha.
                        </p>
                    </div>
                </div>

                <div class="cs-menu-row">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Vanilla Matcha Latte</span>
                            <span class="cs-price">$6.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            Smooth matcha balanced with subtle vanilla sweetness.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Iced Strawberry Matcha</span>
                            <span class="cs-price">$6.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Layered strawberry puree with chilled matcha and milk.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!--Specialty Herbal Blends-->
    <section class="cs-menu cs-menu-style2">
        <div class="cs-container">
            <div class="cs-content">
                <h2 class="cs-title">Specialty Herbal Blends</h2>
                <p class="cs-text">
                    Naturally caffeine-free blends designed for relaxation and wellness.
                </p>
            </div>
            <ul class="cs-menu-list">
                <div class="cs-menu-row">
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Peppermint Leaf</span>
                            <span class="cs-price">$4.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            Crisp, cooling mint for a refreshing herbal experience.
                        </p>
                    </li>
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Hibiscus Berry</span>
                            <span class="cs-price">$4.75</span>
                        </h3>
                        <p class="cs-menu-p">
                            Tart hibiscus petals blended with mixed berries.
                        </p>
                    </li>
                </div>

                <div class="cs-menu-row">
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Lavender Dream</span>
                            <span class="cs-price">$4.95</span>
                        </h3>
                        <p class="cs-menu-p">
                            Soothing lavender with gentle floral notes.
                        </p>
                    </li>
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Turmeric Golden Tea</span>
                            <span class="cs-price">$5.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            Earthy turmeric blended with warming spices.
                        </p>
                    </li>
                </div>
            </ul>
        </div>
    </section>

    <!--Seasonal Tea Creations-->
    <section class="cs-menu">
        <div class="cs-container">
            <div class="cs-content">
                <h2 class="cs-title">Seasonal Tea Creations</h2>
                <p class="cs-text">
                    Limited-time tea blends inspired by seasonal flavors and aromas.
                </p>
            </div>
            <ul class="cs-menu-list">
                <div class="cs-menu-row">
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Pumpkin Chai Latte</span>
                            <span class="cs-price">$6.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            Spiced chai with pumpkin and creamy steamed milk.
                        </p>
                    </li>
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Maple Matcha Latte</span>
                            <span class="cs-price">$6.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Rich matcha sweetened with pure maple syrup.
                        </p>
                    </li>
                </div>
            </ul>
        </div>
    </section>
</div>
    <!--Pastries-->
    <div id="cs-menu4-10" class="cs-menu-group" data-category="four">
    <!--Pastries Section 1-->
    <section class="cs-menu">
        <div class="cs-container">
            <div class="cs-content">
                <h2 class="cs-title">Freshly Baked Pastries</h2>
                <p class="cs-text">
                    Baked daily in-house, our pastries pair perfectly with your favorite coffee or tea. Flaky, buttery, and crafted with premium ingredients.
                </p>
            </div>
            <div class="cs-menu-list">
                <div class="cs-menu-row cs-3">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Butter Croissant</span>
                            <span class="cs-price">$3.95</span>
                        </h3>
                        <p class="cs-menu-p">
                            Classic French-style croissant with delicate flaky layers.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Chocolate Croissant</span>
                            <span class="cs-price">$4.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Buttery pastry filled with rich dark chocolate.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Almond Croissant</span>
                            <span class="cs-price">$4.75</span>
                        </h3>
                        <p class="cs-menu-p">
                            Filled with almond cream and topped with toasted almonds.
                        </p>
                    </div>
                </div>

                <div class="cs-menu-row">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Blueberry Muffin</span>
                            <span class="cs-price">$3.75</span>
                        </h3>
                        <p class="cs-menu-p">
                            Moist vanilla muffin bursting with fresh blueberries.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Banana Nut Muffin</span>
                            <span class="cs-price">$3.75</span>
                        </h3>
                        <p class="cs-menu-p">
                            Ripe bananas blended with toasted walnuts.
                        </p>
                    </div>
                </div>

                <div class="cs-menu-row">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Cinnamon Roll</span>
                            <span class="cs-price">$4.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            Soft spiral pastry topped with sweet vanilla glaze.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Sticky Bun</span>
                            <span class="cs-price">$4.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Caramelized brown sugar and pecans baked to perfection.
                        </p>
                    </div>
                </div>

                <div class="cs-menu-row">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Lemon Danish</span>
                            <span class="cs-price">$4.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            Flaky pastry filled with tangy lemon cream.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Raspberry Danish</span>
                            <span class="cs-price">$4.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            Sweet raspberry filling with a light sugar glaze.
                        </p>
                    </div>
                </div>

                <div class="cs-menu-row">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Apple Turnover</span>
                            <span class="cs-price">$4.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Golden pastry filled with spiced cinnamon apples.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Chocolate Chip Scone</span>
                            <span class="cs-price">$3.95</span>
                        </h3>
                        <p class="cs-menu-p">
                            Buttery scone loaded with semi-sweet chocolate chips.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!--Signature Sweet Bakes-->
    <section class="cs-menu cs-menu-style2">
        <div class="cs-container">
            <div class="cs-content">
                <h2 class="cs-title">Signature Sweet Bakes</h2>
                <p class="cs-text">
                    Our house specialties — handcrafted desserts that elevate your coffee break.
                </p>
            </div>
            <ul class="cs-menu-list">
                <div class="cs-menu-row">
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Classic Cheesecake Slice</span>
                            <span class="cs-price">$5.95</span>
                        </h3>
                        <p class="cs-menu-p">
                            Creamy New York-style cheesecake with graham crust.
                        </p>
                    </li>
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Chocolate Fudge Brownie</span>
                            <span class="cs-price">$4.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Rich, dense brownie with deep cocoa flavor.
                        </p>
                    </li>
                </div>

                <div class="cs-menu-row">
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Carrot Cake Slice</span>
                            <span class="cs-price">$5.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Spiced carrot cake layered with cream cheese frosting.
                        </p>
                    </li>
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Tiramisu Cup</span>
                            <span class="cs-price">$5.95</span>
                        </h3>
                        <p class="cs-menu-p">
                            Espresso-soaked ladyfingers with mascarpone cream.
                        </p>
                    </li>
                </div>
            </ul>
        </div>
    </section>

    <!--Seasonal Pastries-->
    <section class="cs-menu">
        <div class="cs-container">
            <div class="cs-content">
                <h2 class="cs-title">Seasonal Pastries</h2>
                <p class="cs-text">
                    Limited-time baked goods inspired by seasonal flavors and ingredients.
                </p>
            </div>
            <ul class="cs-menu-list">
                <div class="cs-menu-row">
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Pumpkin Spice Muffin</span>
                            <span class="cs-price">$4.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            Soft pumpkin muffin topped with cinnamon streusel.
                        </p>
                    </li>
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Strawberry Cream Danish</span>
                            <span class="cs-price">$4.75</span>
                        </h3>
                        <p class="cs-menu-p">
                            Fresh strawberries layered over sweet cream filling.
                        </p>
                    </li>
                </div>
            </ul>
        </div>
    </section>
</div>
    <!--Breakfast Bites-->
    <div id="cs-menu5-10" class="cs-menu-group" data-category="five">
    <!--Breakfast Bites Section 1-->
    <section class="cs-menu">
        <div class="cs-container">
            <div class="cs-content">
                <h2 class="cs-title">Breakfast Bites</h2>
                <p class="cs-text">
                    Start your morning right with hearty, freshly prepared breakfast favorites. Perfectly paired with your coffee or tea.
                </p>
            </div>
            <div class="cs-menu-list">
                <div class="cs-menu-row cs-3">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Avocado Toast</span>
                            <span class="cs-price">$8.95</span>
                        </h3>
                        <p class="cs-menu-p">
                            Smashed avocado on artisan sourdough with chili flakes and lemon.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Egg & Cheese Croissant</span>
                            <span class="cs-price">$7.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Fluffy scrambled eggs and melted cheddar on a buttery croissant.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Breakfast Burrito</span>
                            <span class="cs-price">$9.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            Scrambled eggs, sausage, peppers, and cheese wrapped in a warm tortilla.
                        </p>
                    </div>
                </div>

                <div class="cs-menu-row">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Greek Yogurt Parfait</span>
                            <span class="cs-price">$6.95</span>
                        </h3>
                        <p class="cs-menu-p">
                            Creamy yogurt layered with granola and fresh berries.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Oatmeal Bowl</span>
                            <span class="cs-price">$5.95</span>
                        </h3>
                        <p class="cs-menu-p">
                            Warm oats topped with banana, honey, and cinnamon.
                        </p>
                    </div>
                </div>

                <div class="cs-menu-row">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Bagel with Cream Cheese</span>
                            <span class="cs-price">$4.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Freshly toasted bagel served with whipped cream cheese.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Smoked Salmon Bagel</span>
                            <span class="cs-price">$10.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Cream cheese, smoked salmon, capers, and red onion.
                        </p>
                    </div>
                </div>

                <div class="cs-menu-row">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Breakfast Sandwich</span>
                            <span class="cs-price">$8.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            Fried egg, bacon, and cheddar on a toasted brioche bun.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Spinach & Feta Wrap</span>
                            <span class="cs-price">$7.95</span>
                        </h3>
                        <p class="cs-menu-p">
                            Scrambled eggs with spinach and feta in a soft wrap.
                        </p>
                    </div>
                </div>

                <div class="cs-menu-row">
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Mini Pancake Stack</span>
                            <span class="cs-price">$6.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Fluffy pancakes served with maple syrup and butter.
                        </p>
                    </div>
                    <div class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Fruit Breakfast Bowl</span>
                            <span class="cs-price">$7.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            Seasonal fresh fruit topped with coconut flakes and honey.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!--Light & Healthy Options-->
    <section class="cs-menu cs-menu-style2">
        <div class="cs-container">
            <div class="cs-content">
                <h2 class="cs-title">Light & Healthy Options</h2>
                <p class="cs-text">
                    Wholesome breakfast choices made with fresh and nourishing ingredients.
                </p>
            </div>
            <ul class="cs-menu-list">
                <div class="cs-menu-row">
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Chia Seed Pudding</span>
                            <span class="cs-price">$6.75</span>
                        </h3>
                        <p class="cs-menu-p">
                            Overnight chia pudding with almond milk and berries.
                        </p>
                    </li>
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Protein Breakfast Bowl</span>
                            <span class="cs-price">$8.95</span>
                        </h3>
                        <p class="cs-menu-p">
                            Quinoa, avocado, soft-boiled egg, and mixed greens.
                        </p>
                    </li>
                </div>

                <div class="cs-menu-row">
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Peanut Butter Toast</span>
                            <span class="cs-price">$5.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Whole-grain toast with natural peanut butter and banana.
                        </p>
                    </li>
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Egg White Muffin</span>
                            <span class="cs-price">$6.25</span>
                        </h3>
                        <p class="cs-menu-p">
                            Egg whites, spinach, and turkey sausage on an English muffin.
                        </p>
                    </li>
                </div>
            </ul>
        </div>
    </section>

    <!--Seasonal Breakfast Specials-->
    <section class="cs-menu">
        <div class="cs-container">
            <div class="cs-content">
                <h2 class="cs-title">Seasonal Breakfast Specials</h2>
                <p class="cs-text">
                    Limited-time breakfast creations inspired by seasonal ingredients.
                </p>
            </div>
            <ul class="cs-menu-list">
                <div class="cs-menu-row">
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Pumpkin Spice Waffles</span>
                            <span class="cs-price">$9.50</span>
                        </h3>
                        <p class="cs-menu-p">
                            Warm waffles infused with pumpkin spice and maple syrup.
                        </p>
                    </li>
                    <li class="cs-menu-item">
                        <h3 class="cs-h3">
                            <span class="cs-name">Strawberry Cream French Toast</span>
                            <span class="cs-price">$9.95</span>
                        </h3>
                        <p class="cs-menu-p">
                            Thick-cut brioche topped with fresh strawberries and cream.
                        </p>
                    </li>
                </div>
            </ul>
        </div>
    </section>
</div>
</div>
       
`;

export const sampleCss = `
        /* Paste your  CSS here */
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
    /* 16px - 20px */
    font-size: clamp(1rem, 2vw, 1.25rem);
    line-height: 1.5em;
    text-align: inherit;
    width: 100%;
    max-width: 47.8125rem;
    margin: 0;
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
<---           Menu             -->
<--- -------------------------- -*/
/* Mobile - 360px */
@media only screen and (min-width: 0rem) {
  html,
  body {
    /* when you click a menu button and jump to the top of the screen this makes it so it has a smooth transiiton instead of an abrupt movement */
    scroll-behavior: smooth;
    overflow: initial;
  }
  #cs-menu-group-10 {
    text-align: center;
    height: auto;
    padding: var(--sectionPadding);
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
  }
  #cs-menu-group-10 .cs-container {
    width: 100%;
    /* changes to 1280px at tablet */
    max-width: 34.375rem;
    margin: auto;
    padding: var(--sectionPadding);
    /* 48px - 64px */
    padding-top: clamp(3rem, 5vw, 4rem);
    /* prevents padding and border from affecting height and width */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 48px - 64px */
    gap: clamp(3rem, 6vw, 4rem);
    position: relative;
  }
  #cs-menu-group-10 .cs-hidden {
    display: none;
  }
  #cs-menu-group-10 .cs-button-group {
    width: auto;
    max-width: 62.5rem;
    margin: 0 1rem;
    /* 16px - 28px top & bottom */
    /* 32px - 48px left & right */
    padding: clamp(1rem, 3vw, 1.75rem) clamp(2rem, 4vw, 3rem);
    border-radius: 4.375rem;
    background-color: #f3f3f3;
    border: 1px solid #b4b2c7;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    display: inline-flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    /* 24px - 36px */
    column-gap: clamp(1.5rem, 2vw, 2.25rem);
    row-gap: 0.75rem;
    position: sticky;
    /* change based on how tall your navigation is above it.  If your navigation is 90px tall, set it to 100px from the top on mobile, and increase the larger value in the clamp to change the desktop value if you need to as well */
    /* 84px - 110px */
    top: clamp(5.25rem, 8vw, 6.875rem);
    z-index: 1000;
  }
  #cs-menu-group-10 .cs-button {
    font-size: 1rem;
    line-height: 1.5em;
    font-weight: 400;
    margin: 0;
    padding: 0;
    color: #878787;
    background: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: color 0.3s, font-weight 0.3s, color 0.3s;
  }
  #cs-menu-group-10 .cs-button:hover {
    color: var(--primary);
    cursor: pointer;
  }
  #cs-menu-group-10 .cs-button:after {
    /* active state icon */
    content: "";
    position: relative;
    display: block;
    width: 0;
    /* 16px - 24px */
    height: clamp(1rem, 3vw, 1.5rem);
    background: url("https://csimg.nyc3.cdn.digitaloceanspaces.com/Icons%2Ffancy-icon.svg");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0;
    transition: width 0.3s, opacity 0.3s, margin-left 0.3s;
  }
  #cs-menu-group-10 .cs-button.cs-active {
    color: var(--headerColor);
    font-weight: 700;
  }
  #cs-menu-group-10 .cs-button.cs-active:after {
    width: clamp(1.5625rem, 3vw, 2.25rem);
    opacity: 1;
    /* 8px - 16px */
    margin-left: clamp(0.5rem, 0.5vw, 1rem);
  }
  #cs-menu-group-10 .cs-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* 32px - 64px */
    gap: clamp(2rem, 6vw, 4rem);
  }
  #cs-menu-group-10 .cs-menu.cs-menu-style2 {
    /* changes to desktop at desktop */
    background: url("https://csimg.nyc3.cdn.digitaloceanspaces.com/Images%2FMISC%2Fwood2-m.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
  }
  #cs-menu-group-10 .cs-menu.cs-menu-style2:before {
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
  }
  #cs-menu-group-10 .cs-menu.cs-menu-style2 .cs-title,
  #cs-menu-group-10 .cs-menu.cs-menu-style2 .cs-text {
    color: var(--bodyTextColorWhite);
  }
  #cs-menu-group-10 .cs-menu.cs-menu-style2 .cs-name {
    color: var(--bodyTextColorWhite);
  }
  #cs-menu-group-10 .cs-menu.cs-menu-style2 .cs-menu-p {
    color: #fff;
    opacity: 0.8;
  }
  #cs-menu-group-10 .cs-menu.cs-menu-style3 {
    background-color: rgba(255, 255, 255, 0.7);
  }
  #cs-menu-group-10 .cs-content {
    /* set text align to left if content needs to be left aligned */
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    /* centers content horizontally, set to flex-start to left align */
    align-items: center;
    position: relative;
    z-index: 20;
  }
  #cs-menu-group-10 .cs-text {
    font-size: var(--bodyFontSize);
    line-height: 1.5em;
    text-align: inherit;
    width: 100%;
    max-width: 40.625rem;
    margin: 0;
    color: var(--bodyTextColor);
  }
  #cs-menu-group-10 .cs-menu-list {
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    /* 32px - 60px */
    row-gap: clamp(2rem, 6vw, 3.75rem);
    position: relative;
    z-index: 20;
  }
  #cs-menu-group-10 .cs-menu-row {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    /* 32px - 60px */
    row-gap: clamp(2rem, 6vw, 3.75rem);
  }
  #cs-menu-group-10 .cs-menu-item {
    text-align: left;
    list-style: none;
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  #cs-menu-group-10 .cs-h3 {
    /* 20px - 25px */
    font-size: clamp(1.25rem, 2vw, 1.5625rem);
    line-height: 1.2em;
    font-weight: 700;
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    position: relative;
  }
  #cs-menu-group-10 .cs-h3:after {
    /* divider line */
    content: "";
    width: 50%;
    height: 1px;
    background: #b4b2c7;
    opacity: 1;
    position: relative;
    display: block;
    order: 1;
  }
  #cs-menu-group-10 .cs-name {
    /* 16px - 25px */
    font-size: clamp(1rem, 2vw, 1.5625rem);
    line-height: 1.2em;
    max-width: 16ch;
    margin-right: auto;
    color: var(--headerColor);
    display: block;
    /* prevents flexbox from squishing it */
    flex: none;
  }
  #cs-menu-group-10 .cs-price {
    /* 20px - 25px */
    font-size: clamp(1.25rem, 2vw, 1.5625rem);
    line-height: 1.2em;
    font-weight: bold;
    width: auto;
    margin: 0;
    padding: 0.5rem 0.75rem;
    border-radius: 5rem;
    background-color: #fff;
    border: 1px solid #b4b2c7;
    color: var(--primary);
    /* prevents padding and border from affecting height and width */
    box-sizing: border-box;
    display: block;
    /* prevents flexbox from squishing it */
    flex: none;
    /* forces it into the 3rd position */
    order: 3;
  }
  #cs-menu-group-1018 .cs-menu-p {
    /* 14px - 16px */
    font-size: clamp(0.875rem, 1.5vw, 1rem);
    line-height: 1.5em;
    text-align: inherit;
    width: 100%;
    margin: 0;
    color: var(--bodyTextColor);
  }
}
/* Tablet - 768px */
@media only screen and (min-width: 48rem) {
  #cs-menu-group-10 .cs-container {
    max-width: 80rem;
  }
  #cs-menu-group-10 .cs-menu.cs-menu-style2 {
    background: url("https://csimg.nyc3.cdn.digitaloceanspaces.com/Images%2FMISC%2Fwood.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  #cs-menu-group-10 .cs-menu-row {
    width: 100%;
    flex-direction: row;
    justify-content: stretch;
    /* 32px - 80px */
    gap: clamp(2em, 4vw, 5rem);
  }
  #cs-menu-group-10 .cs-menu-row.cs-3 .cs-h3 {
    gap: 0.5rem;
  }
  #cs-menu-group-10 .cs-menu-row.cs-3 .cs-h3:after {
    display: none;
  }
  #cs-menu-group-10 .cs-menu-row.cs-3 .cs-name {
    font-size: clamp(1rem, 2vw, 1.5625rem);
    width: 70%;
    max-width: 20ch;
  }
  #cs-menu-group-10 .cs-menu-item {
    max-width: 37.5rem;
    margin: 0 auto;
  }
  #cs-menu-group-10 .cs-name {
    width: fit-content;
    max-width: 70%;
  }
}
                                
                
`;

export const sampleJs = `
 document.addEventListener('DOMContentLoaded', function () {
        class CS_MenuFilter {
    filtersSelector = '.cs-button'
    menuSelector = '.cs-menu-group'
    activeClass = 'cs-active'
    hiddenClass = 'cs-hidden'

    constructor() {
        this.$menus = document.querySelectorAll(this.menuSelector)
        const $filters = document.querySelectorAll(this.filtersSelector)

        this.onClick($filters[0])

        for (const $filter of $filters) {
            $filter.addEventListener('click', () => this.onClick($filter))
        }
    }

    onClick($filter) {
        this.filter($filter.dataset.filter)

        const { activeClass } = this

        this.$activeFilter?.classList.remove(activeClass)
        $filter.classList.add(activeClass)

        this.$activeFilter = $filter
    }

    filter(filter) {
        const showAll = filter == 'all'
        const { hiddenClass } = this

        for (const $menu of this.$menus) {
            const show = showAll || $menu.dataset.category == filter
            $menu.classList.toggle(hiddenClass, !show)
        }
    }
}

new CS_MenuFilter()
});                 
`;