// journal.js – interactions for journal page

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
            alert('🔍 search coming soon — for now, enjoy the journal.');
        });
    }

    // ---------- READ MORE BUTTONS (simulate opening full entry) ----------
    const readMoreButtons = document.querySelectorAll('.read-more');
    readMoreButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const entry = btn.getAttribute('data-entry') || 'journal';
            // map to friendly titles
            let title = 'journal entry';
            if (entry === 'featured') title = 'the gentle art of tending';
            else if (entry === 'pruning') title = 'the zen of pruning';
            else if (entry === 'cozy') title = 'cozy plants for winter';
            else if (entry === 'propagation') title = 'propagation 101';
            else if (entry === 'winter') title = 'winter light adjustments';
            else if (entry === 'pots') title = 'choosing the right pot';
            else if (entry === 'pet') title = 'pet‑friendly plants';
            
            alert(`📖 opening full entry: "${title}" (demo – full article would appear here).`);
            
            // subtle animation on button
            btn.style.backgroundColor = '#d4e0d4';
            setTimeout(() => {
                btn.style.backgroundColor = '';
            }, 200);
        });
    });

    // ---------- NEWSLETTER FORM SUBMISSION (demo) ----------
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            if (email) {
                alert(`🌸 thanks for subscribing! A welcome note will arrive at ${email} (demo).`);
                emailInput.value = '';
            } else {
                alert('please enter an email address.');
            }
        });
    }

    // ---------- FOOTER LINK INTERCEPT (demo) ----------
    document.querySelectorAll('.footer-col a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#' || (!href.includes('journal.html') && !href.includes('story.html') && !href.includes('care.html') && !href.includes('shop.html'))) {
                e.preventDefault();
                alert(`📬 "${link.innerText}" page — coming soon.`);
            }
        });
    });

    // initial cart display
    updateCartDisplay();
});