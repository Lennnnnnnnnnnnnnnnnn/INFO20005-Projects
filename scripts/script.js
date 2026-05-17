// Injects the shared nav into every page's <header>.
function initHeader() {
    document.querySelector('header').innerHTML = `
        <nav>
            <a href="index.html">
                <p class="brand-logo">VM Pet Shop</p>
            </a>
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

// Fall back to previous page after closing menu 
if (document.body.id === 'menu-page') {
    const closeBtn = document.querySelector('#menu-page > img');
    closeBtn.addEventListener('click', () => history.back());
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

// Wires up the payment page: method tab switching and card/expiry input formatting.
function initPaymentPage() {
    // Grab all payment method tab buttons and the two form sections
    const tabs = document.querySelectorAll('.method-tab');
    const cardFields = document.getElementById('card-fields');
    const paypalFields = document.getElementById('paypal-fields');

    // Attach a click listener to every tab button
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove the active highlight from all tabs, then add it to the clicked one
            tabs.forEach(t => t.classList.remove('method-tab-active'));
            tab.classList.add('method-tab-active');

            // Read the data-method attribute on the button ("card" or "paypal")
            // and show the matching form section while hiding the other
            if (tab.dataset.method === 'card') {
                cardFields.classList.remove('payment-hidden');
                paypalFields.classList.add('payment-hidden');
            } else {
                cardFields.classList.add('payment-hidden');
                paypalFields.classList.remove('payment-hidden');
            }
        });
    });

    // Format card number with spaces every 4 digits (e.g. "1234 5678 9012 3456")
    const cardInput = document.getElementById('card-number');
    if (cardInput) {
        cardInput.addEventListener('input', () => {
            // Strip all non-digit characters, then cap at 16 digits
            const digits = cardInput.value.replace(/\D/g, '').slice(0, 16);
            // Insert a space after every group of 4 digits, except the last group
            // (?=.) ensures we don't add a trailing space after the final digit
            cardInput.value = digits.replace(/(.{4})(?=.)/g, '$1 ');
        });
    }

    // Format expiry date as MM / YY (e.g. "12 / 26")
    const expiryInput = document.getElementById('expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', () => {
            // Find every character that is NOT a digit, and replace it with nothing (delete it)
            const digits = expiryInput.value.replace(/\D/g, '').slice(0, 4);
            // Once the user has typed the month (2 digits) and started the year,
            // insert " / " between them
            if (digits.length >= 3) {
                expiryInput.value = digits.slice(0, 2) + ' / ' + digits.slice(2);
            } else {
                expiryInput.value = digits;
            }
        });
    }
}

// ── Run only on the cart page ──
if (document.body.id === 'cart-page') {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            window.location.href = 'payment.html';
        });
    }
}

// ── Run only on the payment page ──
if (document.body.id === 'payment-page') {
    initPaymentPage();
}

// ── Run on every page ──
initHeader();
initFooter();

// ── Run only on the product detail page ──
if (document.body.id === 'Product-detail') {
    initQuantity();
    initVariants();
    initImageZoom();
}
