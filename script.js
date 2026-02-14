// script.js – full shop with product detail modal

document.addEventListener('DOMContentLoaded', () => {
    // ---------- 1. AMBIENT BACKGROUND CANVAS ----------
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function initCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        createParticles();
    }

    function createParticles() {
        particles = [];
        const particleCount = 40;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 3 + 1.5,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.15,
                opacity: Math.random() * 0.4 + 0.2,
                color: `rgba(150, 170, 140, ${Math.random() * 0.3 + 0.1})`
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.opacity;
            ctx.fill();
        });
        moveParticles();
        requestAnimationFrame(drawParticles);
    }

    function moveParticles() {
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
        });
    }

    window.addEventListener('resize', () => initCanvas());
    initCanvas();
    drawParticles();

    // ---------- 2. PRODUCT DATA ----------
    const products = [
        { id: 1, name: 'Monstera Deliciosa', price: 48, category: 'indoor', image: '🍃', bg: 'linear-gradient(145deg, #b7d0b0, #a3bc9b)', description: 'Large, iconic leaves with natural holes. Thrives in bright indirect light. A statement plant for any room.' },
        { id: 2, name: 'Olive Tree', price: 65, category: 'outdoor', image: '🌿', bg: 'linear-gradient(145deg, #c2cfb5, #a3b894)', description: 'Ancient symbol of peace. Loves full sun and well-drained soil. Brings a Mediterranean touch.' },
        { id: 3, name: 'String of Pearls', price: 32, category: 'succulent', image: '🪴', bg: 'linear-gradient(145deg, #d7e2cd, #c0d1b3)', description: 'Delicate trailing succulent with bead-like leaves. Perfect for hanging baskets.' },
        { id: 4, name: 'Alocasia Silver', price: 55, category: 'rare', image: '🌱', bg: 'linear-gradient(145deg, #cbdcc2, #b6cbaa)', description: 'Striking silver-veined leaves. A rare collector’s gem that loves humidity.' },
        { id: 5, name: 'Snake Plant', price: 39, category: 'indoor', image: '🌵', bg: 'linear-gradient(145deg, #d1ddc5, #b2c3a2)', description: 'Nearly indestructible. Purifies air and tolerates low light. Perfect beginner plant.' },
        { id: 6, name: 'Lavender', price: 24, category: 'outdoor', image: '🌸', bg: 'linear-gradient(145deg, #ddcfbc, #cbbca8)', description: 'Fragrant purple blooms. Attracts pollinators. Needs full sun and good drainage.' },
        { id: 7, name: 'Moon Cactus', price: 18, category: 'succulent', image: '🌵', bg: 'linear-gradient(145deg, #eedac8, #e3cfbb)', description: 'Colorful grafted cactus. Bright top, easy care. A quirky desk companion.' },
        { id: 8, name: 'Philodendron Pink', price: 59, category: 'rare', image: '🪴', bg: 'linear-gradient(145deg, #e5cfc2, #dbbcae)', description: 'Heart-shaped leaves with pink variegation. Climbing or trailing. Highly sought after.' },
    ];

    // ---------- 3. GLOBAL STATE ----------
    let cartItems = 0;
    const cartCountSpan = document.querySelector('.cart-count');
    const mainContent = document.getElementById('main-content');
    const skeleton = document.getElementById('skeleton');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateCartDisplay() {
        if (cartCountSpan) cartCountSpan.textContent = cartItems;
    }

    // ---------- 4. RENDER SHOP PAGE (with product cards) ----------
    function renderShopPage() {
        let filter = 'all';
        const shopHtml = `
            <div class="actual-content" style="display: block;">
                <section class="hero animate-on-load">
                    <div class="hero-text floating">
                        <h1 class="fade-in-up">green <span>serenity</span> for your space</h1>
                        <p class="fade-in-up delay-1">Curated plants, delivered with care — bring the calm of nature indoors.</p>
                        <a href="#" class="btn pulse">explore collection</a>
                    </div>
                    <div class="hero-image"></div>
                </section>

                <div class="filter-bar">
                    <button class="filter-btn active" data-filter="all">all plants</button>
                    <button class="filter-btn" data-filter="indoor">indoor</button>
                    <button class="filter-btn" data-filter="outdoor">outdoor</button>
                    <button class="filter-btn" data-filter="rare">rare finds</button>
                    <button class="filter-btn" data-filter="succulent">succulents</button>
                </div>

                <div class="product-grid" id="product-grid"></div>
            </div>
        `;
        mainContent.innerHTML = shopHtml;

        const productGrid = document.getElementById('product-grid');
        const filterButtons = document.querySelectorAll('.filter-btn');

        function renderProducts(filterVal) {
            const filtered = filterVal === 'all' ? products : products.filter(p => p.category === filterVal);
            productGrid.innerHTML = filtered.map(prod => `
                <div class="product-card" data-id="${prod.id}">
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

            // Attach event listeners to buttons (stop propagation to avoid card click)
            document.querySelectorAll('.add-to-cart').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    cartItems++;
                    updateCartDisplay();
                    btn.style.backgroundColor = '#d4e0d4';
                    setTimeout(() => btn.style.backgroundColor = '', 200);
                });
            });

            document.querySelectorAll('.buy-now').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    cartItems++;
                    updateCartDisplay();
                    alert('✨ redirect to checkout (demo)');
                    btn.style.backgroundColor = '#d4e0d4';
                    setTimeout(() => btn.style.backgroundColor = '', 200);
                });
            });

            // Attach click to product card to open detail modal
            document.querySelectorAll('.product-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    // Prevent modal if clicking on buttons
                    if (e.target.closest('.add-to-cart') || e.target.closest('.buy-now')) return;
                    const id = card.getAttribute('data-id');
                    const product = products.find(p => p.id == id);
                    if (product) showProductModal(product);
                });
            });
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

    // ---------- 5. PRODUCT DETAIL MODAL ----------
    function showProductModal(product) {
        // Remove any existing modal
        const existing = document.querySelector('.modal-overlay');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="product-detail-modal">
                <span class="close-modal">&times;</span>
                <div class="modal-image" style="background: ${product.bg};">${product.image}</div>
                <div class="modal-details">
                    <div class="modal-category">${product.category}</div>
                    <div class="modal-title">${product.name}</div>
                    <div class="modal-price">₹${product.price}</div>
                    <div class="modal-description">${product.description}</div>
                    <div class="modal-buttons">
                        <button class="modal-btn" id="modal-cart"><i class="fas fa-shopping-bag"></i> add to cart</button>
                        <button class="modal-btn primary" id="modal-buy"><i class="fas fa-bolt"></i> buy now</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Close modal
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('close-modal')) {
                modal.remove();
            }
        });

        // Modal buttons
        document.getElementById('modal-cart').addEventListener('click', () => {
            cartItems++;
            updateCartDisplay();
            modal.remove();
        });

        document.getElementById('modal-buy').addEventListener('click', () => {
            cartItems++;
            updateCartDisplay();
            alert('✨ redirect to checkout (demo)');
            modal.remove();
        });
    }

    // ---------- 6. SKELETON LOADER + INITIAL PAGE ----------
    // Simulate loading delay (1.5 seconds) then show shop
    setTimeout(() => {
        skeleton.style.display = 'none';
        renderShopPage();
        // Set active nav
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === 'shop') link.classList.add('active');
        });
    }, 1500);

    // ---------- 7. HEADER ICONS (demo) ----------
    document.getElementById('search-icon')?.addEventListener('click', () => alert('🔍 search coming soon'));
    document.getElementById('cart-icon')?.addEventListener('click', () => {
        alert(`🛒 you have ${cartItems} item${cartItems !== 1 ? 's' : ''} in your cart`);
    });

    // ---------- 8. NAVIGATION (simple demo for other pages) ----------
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            if (page === 'shop') {
                skeleton.style.display = 'none';
                renderShopPage();
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            } else {
                alert(`📄 ${page} page — coming soon. For now, enjoy the shop with product details.`);
            }
        });
    });

    updateCartDisplay();
});