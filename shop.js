// script.js – complete multi-page navigation + ecommerce interactions

document.addEventListener('DOMContentLoaded', () => {
    // ---------- product data (used only in shop) ----------
    const products = [
        { id: 1, name: 'Monstera Deliciosa', price: 48, category: 'indoor', image: '🍃', bg: 'linear-gradient(145deg, #b7d0b0, #a3bc9b)' },
        { id: 2, name: 'Olive Tree', price: 65, category: 'outdoor', image: '🌿', bg: 'linear-gradient(145deg, #c2cfb5, #a3b894)' },
        { id: 3, name: 'String of Pearls', price: 32, category: 'succulent', image: '🪴', bg: 'linear-gradient(145deg, #d7e2cd, #c0d1b3)' },
        { id: 4, name: 'Alocasia Silver', price: 55, category: 'rare', image: '🌱', bg: 'linear-gradient(145deg, #cbdcc2, #b6cbaa)' },
        { id: 5, name: 'Snake Plant', price: 39, category: 'indoor', image: '🌵', bg: 'linear-gradient(145deg, #d1ddc5, #b2c3a2)' },
        { id: 6, name: 'Lavender', price: 24, category: 'outdoor', image: '🌸', bg: 'linear-gradient(145deg, #ddcfbc, #cbbca8)' },
        { id: 7, name: 'Moon Cactus', price: 18, category: 'succulent', image: '🌵', bg: 'linear-gradient(145deg, #eedac8, #e3cfbb)' },
        { id: 8, name: 'Philodendron Pink', price: 59, category: 'rare', image: '🪴', bg: 'linear-gradient(145deg, #e5cfc2, #dbbcae)' },
        { id: 9, name: 'Bird of Paradise', price: 72, category: 'indoor', image: '🌿', bg: 'linear-gradient(145deg, #c4d2b8, #aebeab)' },
        { id: 10, name: 'Echeveria', price: 16, category: 'succulent', image: '🌺', bg: 'linear-gradient(145deg, #ebdad3, #dacac0)' }
    ];

    // ---------- shared state ----------
    let cartItems = 0;
    const cartCountSpan = document.querySelector('.cart-count');
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');

    // ---------- utility functions ----------
    function updateCartDisplay() {
        if (cartCountSpan) cartCountSpan.textContent = cartItems;
    }

    // add to cart handler (used in shop)
    function addToCartHandler(e) {
        e.preventDefault();
        cartItems += 1;
        updateCartDisplay();
        const btn = e.currentTarget;
        btn.style.backgroundColor = '#d4e0d4';
        setTimeout(() => btn.style.backgroundColor = '', 150);
    }

    function buyNowHandler(e) {
        e.preventDefault();
        cartItems += 1;
        updateCartDisplay();
        const card = e.currentTarget.closest('.product-card');
        const title = card?.querySelector('.product-title')?.innerText || 'this plant';
        alert(`✨ Purchasing ${title} – redirect to checkout (demo)`);
        const btn = e.currentTarget;
        btn.style.backgroundColor = '#d4e0d4';
        setTimeout(() => btn.style.backgroundColor = '', 200);
    }

    // ---------- page render functions ----------
    function renderShopPage() {
        let filter = 'all';
        
        // shop html skeleton
        let html = `
            <div class="filter-bar">
                <button class="filter-btn active" data-filter="all">all plants</button>
                <button class="filter-btn" data-filter="indoor">indoor</button>
                <button class="filter-btn" data-filter="outdoor">outdoor</button>
                <button class="filter-btn" data-filter="rare">rare finds</button>
                <button class="filter-btn" data-filter="succulent">succulents</button>
            </div>
            <div class="product-grid" id="product-grid"></div>
        `;
        mainContent.innerHTML = html;

        const productGrid = document.getElementById('product-grid');
        const filterButtons = document.querySelectorAll('.filter-btn');

        function renderProducts(filterVal) {
            const filtered = filterVal === 'all' ? products : products.filter(p => p.category === filterVal);
            productGrid.innerHTML = filtered.map(prod => `
                <div class="product-card" data-category="${prod.category}">
                    <div class="product-image" style="background: ${prod.bg};">${prod.image}</div>
                    <div class="product-info">
                        <div class="product-category">${prod.category}</div>
                        <div class="product-title">${prod.name}</div>
                        <div class="product-price">₹${prod.price}</div>
                        <div class="button-group">
                            <button class="add-to-cart" data-id="${prod.id}"><i class="fas fa-shopping-bag"></i> cart</button>
                            <button class="buy-now" data-id="${prod.id}"><i class="fas fa-bolt"></i> buy</button>
                        </div>
                    </div>
                </div>
            `).join('');

            document.querySelectorAll('.add-to-cart').forEach(btn => btn.addEventListener('click', addToCartHandler));
            document.querySelectorAll('.buy-now').forEach(btn => btn.addEventListener('click', buyNowHandler));
        }

        filterButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                renderProducts(this.getAttribute('data-filter'));
            });
        });

        renderProducts('all');
    }

    function renderStoryPage() {
        mainContent.innerHTML = `
            <h1 class="page-title">our story</h1>
            <div class="story-container">
                <div class="story-block">
                    <div class="story-icon"><i class="fas fa-seedling"></i></div>
                    <div class="story-text">
                        <h2>rooted in 2020</h2>
                        <p>What began as a tiny balcony garden grew into a dream: to share the joy of greenery with everyone. Plan nursery was born from a love of slow living and biophilic design.</p>
                    </div>
                </div>
                <div class="story-block">
                    <div class="story-icon"><i class="fas fa-hand-holding-heart"></i></div>
                    <div class="story-text">
                        <h2>grown with care</h2>
                        <p>We partner with local growers who share our ethos — organic methods, minimal waste, and heirloom varieties. Every plant is nurtured, never forced.</p>
                    </div>
                </div>
                <div class="story-block">
                    <div class="story-icon"><i class="fas fa-leaf"></i></div>
                    <div class="story-text">
                        <h2>mindful future</h2>
                        <p>We’re committed to plastic‑free packaging and planting a tree for every order placed. Because a beautiful world needs beautiful roots.</p>
                    </div>
                </div>
            </div>
        `;
    }

    function renderCarePage() {
        mainContent.innerHTML = `
            <h1 class="page-title">plant care</h1>
            <p class="page-subtitle">simple wisdom for happy plants</p>
            <div class="care-grid">
                <div class="care-card"><i class="fas fa-tint"></i><h3>watering</h3><p>Most indoor plants like their soil to dry slightly between waterings. Stick a finger in — if dry an inch down, it’s time.</p></div>
                <div class="care-card"><i class="fas fa-sun"></i><h3>light</h3><p>Bright, indirect light is the sweet spot. South or east windows usually work wonders. Rotate occasionally.</p></div>
                <div class="care-card"><i class="fas fa-seedling"></i><h3>humidity</h3><p>Tropical plants adore humidity. Mist them or set on a pebble tray. They’ll reward you with glossy leaves.</p></div>
                <div class="care-card"><i class="fas fa-cut"></i><h3>pruning</h3><p>Snip yellow leaves and leggy stems to encourage bushy growth. Always use clean shears.</p></div>
                <div class="care-card"><i class="fas fa-leaf"></i><h3>feeding</h3><p>Feed monthly in spring‑summer with a balanced liquid fertiliser. Rest in winter — no food needed.</p></div>
                <div class="care-card"><i class="fas fa-home"></i><h3>repotting</h3><p>When roots peek out the bottom, it’s time to pot up. Choose a pot 2” wider and fresh soil.</p></div>
            </div>
        `;
    }

    function renderJournalPage() {
        mainContent.innerHTML = `
            <h1 class="page-title">journal</h1>
            <p class="page-subtitle">thoughts on greenery & slowness</p>
            <div class="journal-grid">
                <div class="journal-entry">
                    <div class="journal-image">📝</div>
                    <div class="journal-content">
                        <div class="journal-date">MARCH 12, 2025</div>
                        <div class="journal-title">the zen of pruning</div>
                        <div class="journal-excerpt">A quiet afternoon with shears can reshape not only your plant but your state of mind...</div>
                        <button class="read-more">read more →</button>
                    </div>
                </div>
                <div class="journal-entry">
                    <div class="journal-image">☕</div>
                    <div class="journal-content">
                        <div class="journal-date">FEBRUARY 28, 2025</div>
                        <div class="journal-title">cozy plants for winter</div>
                        <div class="journal-excerpt">Snake plants, ZZ, and peace lilies — the trio that thrives while you hibernate.</div>
                        <button class="read-more">read more →</button>
                    </div>
                </div>
                <div class="journal-entry">
                    <div class="journal-image">🌱</div>
                    <div class="journal-content">
                        <div class="journal-date">JANUARY 15, 2025</div>
                        <div class="journal-title">propagation 101</div>
                        <div class="journal-excerpt">Turn one plant into many with these simple water‑propagation tricks.</div>
                        <button class="read-more">read more →</button>
                    </div>
                </div>
            </div>
        `;
        // attach read more demo
        document.querySelectorAll('.read-more').forEach(btn => {
            btn.addEventListener('click', () => alert('📖 full journal entry — coming soon'));
        });
    }

    // ---------- routing / page switching ----------
    function loadPage(page) {
        // update active class in nav
        navLinks.forEach(link => {
            link.classList.remove('active-page');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active-page');
            }
        });

        // render corresponding page
        switch(page) {
            case 'shop': renderShopPage(); break;
            case 'story': renderStoryPage(); break;
            case 'care': renderCarePage(); break;
            case 'journal': renderJournalPage(); break;
            default: renderShopPage(); // fallback
        }
    }

    // get initial page from URL query param ?page=...
    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = urlParams.get('page') || 'shop';
    loadPage(initialPage);

    // handle navigation clicks (SPA style)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            // update url without reload
            const newUrl = `${window.location.pathname}?page=${page}`;
            window.history.pushState({ page }, '', newUrl);
            loadPage(page);
        });
    });

    // handle browser back/forward
    window.addEventListener('popstate', (event) => {
        const params = new URLSearchParams(window.location.search);
        const page = params.get('page') || 'shop';
        loadPage(page);
    });

    // ---------- header icons (non‑navigation) ----------
    document.querySelector('.fa-search')?.addEventListener('click', () => alert('🔍 search coming soon'));
    document.getElementById('cart-icon')?.addEventListener('click', () => {
        alert(`🛒 you have ${cartItems} item${cartItems !== 1 ? 's' : ''} in your cart`);
    });

    // initial cart display
    updateCartDisplay();
});