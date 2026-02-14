// story.js – interactions for "our story" page

document.addEventListener('DOMContentLoaded', () => {
    // ---------- CART COUNT (simple demo state) ----------
    let cartItems = 0;
    const cartCountSpan = document.querySelector('.cart-count');
    const cartIcon = document.getElementById('cart-icon');
    const searchIcon = document.getElementById('search-icon');

    function updateCartDisplay() {
        if (cartCountSpan) cartCountSpan.textContent = cartItems;
    }

    // simulate adding to cart via cart icon click (demo)
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            alert(`🛒 you have ${cartItems} item${cartItems !== 1 ? 's' : ''} in your cart`);
        });
    }

    // search icon demo
    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            alert('🔍 search coming soon — for now, enjoy our story.');
        });
    }

    // optional: any "add to cart" could appear? not on this page, but we keep cart consistent.
    // we can provide a tiny demo: click on any story icon to add a "story" item to cart? 
    // but that might be confusing. Instead we'll just keep cart at zero, but you can still click.

    // For a whimsical touch: click on any story block to "heart" it (demo only)
    const storyBlocks = document.querySelectorAll('.story-block');
    storyBlocks.forEach((block, index) => {
        block.addEventListener('click', () => {
            // gently pulse the icon as feedback
            const icon = block.querySelector('.story-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.2s';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 200);
            }
            // optional message (commented by default – can enable if needed)
            // alert(`❤️ you appreciated "${block.querySelector('h2')?.innerText}"`);
        });
    });

    // footer links demo (prevent default and show friendly message)
    document.querySelectorAll('.footer-col a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            // only intercept if it's a dummy link (#) or not an html page we have
            if (href === '#' || (!href.includes('story.html') && !href.includes('journal.html') && !href.includes('shop.html') && !href.includes('care.html'))) {
                e.preventDefault();
                alert(`📬 "${link.innerText}" page — coming soon.`);
            }
            // otherwise let it navigate normally (to story, journal, etc)
        });
    });

    // update cart display initially
    updateCartDisplay();
});