const fs = require('fs');
const path = require('path');

const shopHtmlPath = path.join(__dirname, 'Shop.html');
let html = fs.readFileSync(shopHtmlPath, 'utf8');

const images = [
    'assets/drop5_jacket_1774241890555.webp',
    'assets/drop5_sweater_1774241908404.webp',
    'assets/drop5_bag_1774241922238.webp',
    'assets/drop5_boots_1774241938251.webp',
    'assets/drop5_frames_1774241956698.webp',
    'assets/drop5_tee_1774241972149.webp',
    'assets/drop5_hoodie_1774242291628.webp',
    'assets/shop_item_blazer_cart_1774241017184.webp',
    'assets/shop_item_tote_cart_1774241034471.webp',
    'assets/shop_item_ring_cart_1774241049633.webp',
    'assets/shop_item_dress_cart_1774241065849.webp',
    'assets/product3.webp'
];

const categories = ['mens', 'womens', 'kids'];
let productHtml = '\n';
let counter = 1;

categories.forEach(category => {
    for (let i = 0; i < 30; i++) {
        const image = images[Math.floor(Math.random() * images.length)];
        const price = Math.floor(Math.random() * 800) + 50; // Random price between 50 and 850
        
        let titlePrefix = '';
        if (category === 'mens') titlePrefix = 'Mens';
        if (category === 'womens') titlePrefix = 'Womens';
        if (category === 'kids') titlePrefix = 'Kids';
        
        const adjectives = ['Technical', 'Minimalist', 'Brutalist', 'Oversized', 'Structured', 'Essential', 'Premium'];
        const nouns = ['Jacket', 'Sweater', 'Tote', 'Boots', 'Ring', 'Tee', 'Hoodie', 'Blazer', 'Dress', 'Frames'];
        
        const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        
        const title = `${titlePrefix} ${adj} ${noun}`;

        productHtml += `
            <div class="shop-product-card reveal" data-category="${category}" data-price="${price}">
                <div class="product-image">
                    <a href="Product.html?id=${counter}" class="product-link-wrap">
                        <img src="${image}" alt="${title}">
                    </a>
                    <button class="add-to-cart-btn" onclick="event.stopPropagation(); console.log('BAG_BTN_CLICK'); addToCart('${title.replace(/'/g, "\\'")}', ${price})">ADD TO BAG</button>
                </div>
                <div class="product-info">
                    <a href="Product.html?id=${counter}" class="product-link-wrap">
                        <h3>${title}</h3>
                        <p class="price">$${price}.00</p>
                    </a>
                </div>
            </div>\n`;
        counter++;
    }
});

// find the product-listing div and replace contents
const startTag = '<div class="product-listing" id="productGrid">';
const endTag = '</div>\n    </main>';

const startIndex = html.indexOf(startTag) + startTag.length;
const endIndex = html.lastIndexOf(endTag);

if (startIndex > startTag.length - 1 && endIndex > -1) {
    const newHtml = html.substring(0, startIndex) + productHtml + '        ' + html.substring(endIndex);
    fs.writeFileSync(shopHtmlPath, newHtml, 'utf8');
    console.log('Successfully injected 90 products into Shop.html');
} else {
    console.error('Could not find injection point in Shop.html');
}
