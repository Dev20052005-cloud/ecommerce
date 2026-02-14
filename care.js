// care.js – interactions for plant care page

document.addEventListener('DOMContentLoaded', () => {
    // ---------- CART & SEARCH (demo) ----------
    let cartItems = 0;
    const cartCountSpan = document.querySelector('.cart-count');
    const cartIcon = document.getElementById('cart-icon');
    const searchIcon = document.getElementById('search-icon');

    function updateCartDisplay() {
        if (cartCountSpan) cartCountSpan.textContent = cartItems;
    }

    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            alert(`🛒 you have ${cartItems} item${cartItems !== 1 ? 's' : ''} in your cart`);
        });
    }

    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            alert('🔍 search coming soon — for now, explore plant care.');
        });
    }

    // ---------- CARE CARDS: click to show tooltip (data-tip) ----------
    const careCards = document.querySelectorAll('.care-card');
    careCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // remove tooltip from any other card
            careCards.forEach(c => c.classList.remove('show-tip'));
            // add to this card
            card.classList.add('show-tip');
            // auto-hide after 2.5 seconds
            setTimeout(() => {
                card.classList.remove('show-tip');
            }, 2500);
        });
    });

    // ---------- ACCORDION (deeper dives) ----------
    const accordionTitle = document.querySelector('.care-accordion h2');
    const accordionItems = document.querySelectorAll('.accordion-item');
    const accordionIcon = accordionTitle?.querySelector('i');

    // toggle all items (open/close) when clicking the "deeper dives" heading
    if (accordionTitle) {
        accordionTitle.addEventListener('click', () => {
            const isOpen = accordionTitle.classList.toggle('open');
            accordionItems.forEach(item => {
                if (isOpen) {
                    item.classList.add('open');
                } else {
                    item.classList.remove('open');
                }
            });
        });
    }

    // individual accordion item toggle (if you click on a title)
    accordionItems.forEach(item => {
        const title = item.querySelector('.accordion-title');
        title.addEventListener('click', (e) => {
            e.stopPropagation();  // prevent triggering the parent heading
            item.classList.toggle('open');
        });
    });

    // ---------- FOOTER LINK INTERCEPT (demo) ----------
    document.querySelectorAll('.footer-col a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#' || (!href.includes('care.html') && !href.includes('story.html') && !href.includes('journal.html') && !href.includes('shop.html'))) {
                e.preventDefault();
                alert(`📬 "${link.innerText}" page — coming soon.`);
            }
        });
    });

    // initial cart display
    updateCartDisplay();
});