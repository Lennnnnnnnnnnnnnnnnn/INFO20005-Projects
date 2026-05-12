// Injects the shared nav into every page's <header>.
function initHeader() {
    document.querySelector('header').innerHTML = `
        <nav>
            <p class="brand-logo">VM Pet Shop</p>
            <div class="nav-icons">
                <a href="menu.html">
                    <img id="menu-icon" src="images/icons/Menu.svg" alt="Menu button">
                </a>
                <a href="search.html">
                    <img id="search-icon" src="images/icons/Search.svg" alt="Search button">
                </a>
                <a href="shopping_cart.html">
                    <img id="cart-icon" src="images/icons/cart.svg" alt="Cart button">
                </a>
            </div>
        </nav>
    `;
}

// Injects the shared footer content into every page's <footer>.
function initFooter() {
    document.querySelector('footer').innerHTML = `
        <div class="footer-about">
            <h3>About</h3>
            <p>Locations: Shop 11-12 F Shed Laneway Queen Victoria Market Melbourne, VIC 3000</p>
            <p>Wechat Contact: weimachongwudian</p>
            <p>Phone Contact: 0432 715 529</p>
        </div>
        <div class="footer-services">
            <h3>Customer Services</h3>
            <p>My account</p>
            <p>About Us</p>
            <p>Terms and Conditions</p>
        </div>
        <div class="footer-brand">
            <h3>VM Pet Shop</h3>
            <p class="footer-copy">2020 Victoria Market Pet Shop</p>
        </div>
    `;
}

// Wires up the +/- quantity buttons.
// Prevents the value from going below 1 when decrementing.
function initQuantity() {
    // check if quantity input exists on this page
    const qtyInput = document.getElementById('qty');
    if (!qtyInput) return;

    document.getElementById('qty-minus').addEventListener('click', () => {
        // decrement but not below 1
        qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1);
    });
    document.getElementById('qty-plus').addEventListener('click', () => {
        // increment
        qtyInput.value = parseInt(qtyInput.value) + 1;
    });
}

// Wires up the variant size buttons. On click, marks the selected button as active,
// deactivates all others, and updates the size label to match.
function initVariants() {
    const variantBtns = document.querySelectorAll('.product-variants button');
    const sizeLabel = document.querySelector('.size strong');
    // run when there are multiple buttons
    if (!variantBtns.length) return;

    variantBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            // remove active from all buttons then add active to clicked button
            variantBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // update label
            if (sizeLabel) sizeLabel.textContent = btn.textContent;
        });
    });
}

// Wires up the Add to Cart button. On click, briefly flashes a lighter colour
// to confirm the action, then reverts to the normal dark colour after 500ms.
function initAddToCart() {
    // check if add to cart button exists on this page
    const addToCartBtn = document.getElementById('add-to-cart');
    if (!addToCartBtn) return;

    addToCartBtn.addEventListener('click', () => {
        // add flash class then remove after 500ms
        addToCartBtn.classList.add('btn-flash');
        setTimeout(() => addToCartBtn.classList.remove('btn-flash'), 500);
    });
}

// Opens an enlarged version of the product image in a fullscreen darkened overlay.
// Clicking the container (image or enlarge icon), the overlay, or pressing Escape closes it.
function initImageZoom() {
    // check if product image exists on this page
    const productImg = document.querySelector('.product-img img');
    const productImgContainer = document.querySelector('.product-img');
    if (!productImg) return;

    // create overlay and enlarged image elements dynamically
    const overlay = document.createElement('div');
    overlay.id = 'img-overlay';
    const enlargedImg = document.createElement('img');
    enlargedImg.src = productImg.src;
    enlargedImg.alt = productImg.alt;
    overlay.appendChild(enlargedImg);
    document.body.appendChild(overlay);

    // open overlay when image container (or enlarge icon) is clicked
    productImgContainer.addEventListener('click', () => {
        overlay.classList.add('active');
    });

    // close overlay when background is clicked
    overlay.addEventListener('click', () => {
        overlay.classList.remove('active');
    });

    // close overlay on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') overlay.classList.remove('active');
    });
}

// ── Run on every page ──
initHeader();
initFooter();

// ── Run only on the product detail page ──
if (document.body.id === 'Product-detail') {
    initQuantity();
    initVariants();
    initAddToCart();
    initImageZoom();
}
