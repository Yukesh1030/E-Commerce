// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('active');
    
    if (menuOpen) {
        hamburger.innerHTML = '<i data-lucide="x"></i>';
    } else {
        hamburger.innerHTML = '<i data-lucide="menu"></i>';
    }
    lucide.createIcons();
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.classList.remove('active');
        hamburger.innerHTML = '<i data-lucide="menu"></i>';
        lucide.createIcons();
    });
});

// Scroll Reveal Observer
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // For older sections that used 'fade-in'
            entry.target.classList.add('fade-in');
        }
    });
}, revealOptions);

// Elements to observe
const elementsToObserve = [
    '.reveal', '.leftreveal', '.rightreveal', '.scroll-reveal',
    '.product-card', '.section-title', '.about-text', '.about-img'
];

document.querySelectorAll(elementsToObserve.join(', ')).forEach(el => {
    revealObserver.observe(el);
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Smooth Header Background & Parallax
window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    const header = document.querySelector('header');
    const heroOverlay = document.querySelector('.hero-overlay');
    
    // Header Background
    if (scroll > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.padding = '1rem 3rem';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.8)';
        header.style.padding = '1.5rem 3rem';
    }
    
    // Hero Parallax
    if (heroOverlay) {
        heroOverlay.style.transform = `translateX(-${scroll * 0.1}px)`;
    }
});

// Global cart sync for header badge across pages
function updateGlobalCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        try {
            let cart = JSON.parse(localStorage.getItem('stackly_cart')) || [];
            let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'flex' : 'none';
        } catch (e) {
            console.error("Cart parse error", e);
        }
    }
}

document.addEventListener('DOMContentLoaded', updateGlobalCartBadge);
