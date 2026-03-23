// Cart logic and filtering logic for Shop.html and Product.html
let cart = JSON.parse(localStorage.getItem('stackly_cart')) || [];
const drawer = document.getElementById('cart-drawer');
const overlay = document.getElementById('cart-overlay');
const cartTrigger = document.getElementById('cart-icon-trigger');
const closeBtn = document.getElementById('close-drawer');

function toggleCart() {
    if(!drawer) return;
    drawer.classList.toggle('active');
    overlay.classList.toggle('active');
}

if(cartTrigger) cartTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    toggleCart();
});

if(closeBtn) closeBtn.addEventListener('click', toggleCart);
if(overlay) overlay.addEventListener('click', toggleCart);

// Global function so components can add items
window.addToCart = function(name, price) {
    cart.push({ name, price });
    updateCartUI();
    if (drawer && !drawer.classList.contains('active')) toggleCart();
}

function updateCartUI() {
    const container = document.getElementById('drawer-items');
    const subtotalEl = document.getElementById('drawer-subtotal');
    const countEl = document.querySelector('.cart-count');
    
    if(!container) return; // not on shop page

    if(countEl) countEl.innerText = cart.length;
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-msg">Your bag is currently empty.</p>';
        subtotalEl.innerText = '$0.00';
        return;
    }

    let html = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        html += `
            <div class="drawer-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <button onclick="removeFromCart(${index})" class="remove-btn"><i class="lucide-icon" data-lucide="trash-2"></i></button>
            </div>
        `;
    });
    container.innerHTML = html;
    subtotalEl.innerText = `$${total.toFixed(2)}`;
    
    // Save state
    localStorage.setItem('stackly_cart', JSON.stringify(cart));
    
    if(window.lucide) lucide.createIcons();
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Category Filtering
const catBtns = document.querySelectorAll('.cat-btn');
const productCards = document.querySelectorAll('.shop-product-card');

catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Active state
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        productCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                const categories = card.getAttribute('data-category').split(' ');
                if (categories.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

// Sorting Logic
const sortOptions = document.querySelectorAll('.sort-option');
const productGrid = document.getElementById('productGrid');

sortOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
        e.preventDefault();
        const sortType = opt.getAttribute('data-sort');
        const cardsArray = Array.from(document.querySelectorAll('.shop-product-card'));

        if(sortType === 'low-high') {
            cardsArray.sort((a, b) => parseInt(a.getAttribute('data-price')) - parseInt(b.getAttribute('data-price')));
        } else if(sortType === 'high-low') {
            cardsArray.sort((a, b) => parseInt(b.getAttribute('data-price')) - parseInt(a.getAttribute('data-price')));
        } else {
            // Default sort (DOM order is lost, so simple reload is easiest for mock, or we can assume original order isn't strict)
            // Just for demonstration, we will reverse a random attribute or let it be
        }

        if(productGrid) {
            productGrid.innerHTML = '';
            cardsArray.forEach(card => productGrid.appendChild(card));
        }
    });
});

// Checkout Logic
window.checkout = function() {
    let currentCart = JSON.parse(localStorage.getItem('stackly_cart')) || [];
    if (currentCart.length === 0) {
        alert("Please add something to your bag before checking out.");
    } else {
        window.location.href = "404.html";
    }
}
