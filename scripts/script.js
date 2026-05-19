// OBJECTS ---------------------------------------------------------------------------------

/*-------------------------------------- Food Products--------------------------------------*/
const products = {
  dogs: [
    {
      name: "Dog Food 1",
      price: 99.99,
      originalPrice: 129.99,
      image: "images/product_img/dog_food_1.png",
      sale: true,
      variants: ["500g", "1kg", "2kg"],
      ingredients:
        "Chicken, whole grain corn, animal fat, natural flavours, vitamins & minerals.",
      description:
        "Complete nutrition for adult dogs. Rich in protein with essential vitamins for a healthy coat and strong bones.",
    },
    {
      name: "Dog Food 2",
      price: 99.99,
      originalPrice: 129.99,
      image: "images/product_img/dog_food_2.png",
      sale: true,
      variants: ["1kg", "3kg"],
      ingredients:
        "Beef, rice flour, vegetable oil, natural flavours, taurine, vitamins & minerals.",
      description:
        "Premium beef formula for active adult dogs. Supports muscle development and sustained energy levels.",
    },
    {
      name: "Dog Food 3",
      price: 99.99,
      image: "images/product_img/dog_food_3.png",
      sale: false,
      variants: ["500g", "2kg", "5kg"],
      ingredients:
        "Lamb, barley, sunflower oil, flaxseed, probiotics, vitamins & minerals.",
      description:
        "Gentle lamb and barley recipe ideal for dogs with sensitive stomachs. Promotes healthy digestion.",
    },
    {
      name: "Dog Food 4",
      price: 99.99,
      image: "images/product_img/dog_food_4.png",
      sale: false,
      variants: ["1kg", "2kg"],
      ingredients:
        "Salmon, sweet potato, pea flour, omega-3 fatty acids, vitamins & minerals.",
      description:
        "Grain-free salmon formula rich in omega-3 fatty acids for a shiny coat and healthy skin.",
    },
  ],
  cats: [
    {
      name: "Cat Food 1",
      price: 89.99,
      originalPrice: 109.99,
      image: "images/product_img/cat_food_1.png",
      sale: true,
      variants: ["400g", "1kg"],
      ingredients:
        "Chicken, fish meal, corn starch, taurine, vitamins & minerals.",
      description:
        "Complete and balanced nutrition for adult cats. High in protein to support lean muscle mass.",
    },
    {
      name: "Cat Food 2",
      price: 79.99,
      image: "images/product_img/cat_food_2.png",
      sale: false,
      variants: ["300g", "800g"],
      ingredients: "Tuna, rice, sunflower oil, taurine, vitamins & minerals.",
      description:
        "Delicious tuna flavour cats love. Promotes urinary tract health and supports a healthy immune system.",
    },
    {
      name: "Cat Food 3",
      price: 79.99,
      image: "images/product_img/cat_food_3.png",
      sale: false,
      variants: ["300g", "800g", "2kg"],
      ingredients:
        "Salmon, herring, pea protein, omega-3 fatty acids, vitamins & minerals.",
      description:
        "Ocean fish blend that supports healthy vision and brain development in adult cats.",
    },
    {
      name: "Cat Food 4",
      price: 79.99,
      image: "images/product_img/cat_food_4.png",
      sale: false,
      variants: ["400g", "1.2kg"],
      ingredients: "Beef, liver, potato starch, taurine, vitamins & minerals.",
      description:
        "Rich beef and liver recipe for cats who prefer red meat flavours. Supports muscle tone and vitality.",
    },
  ],
};

// FUNCTIONS ---------------------------------------------------------------------------------

/*-------------------------------------- Header & Footer--------------------------------------*/

// Injects the shared nav into every page's <header>.
function initHeader() {
  document.querySelector("header").innerHTML = `
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
  document.querySelector("footer").innerHTML = `
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

/*-------------------------------------- Menu--------------------------------------*/

// Fall back to previous page after closing menu
if (document.body.id === "menu-page") {
  const closeBtn = document.querySelector("#menu-page > img");
  closeBtn.addEventListener("click", () => history.back());
}

/*-------------------------------------- Product List--------------------------------------*/

function initProductList() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  const category = new URLSearchParams(window.location.search).get("category");
  const list = products[category];

  document.getElementById("category-title").textContent =
    category.charAt(0).toUpperCase() + category.slice(1) + " Foods";
  document.getElementById("product-count").textContent =
    `${list.length} Products`;
  grid.innerHTML = list
    .map((p, i) => renderProductCard(p, category, i))
    .join("");
}

/*-------------------------------------- Product Detail--------------------------------------*/

// Wires up the +/- quantity buttons.
// Prevents the value from going below 1 when decrementing.
function initQuantity() {
  // check if quantity input exists on this page
  const qtyInput = document.getElementById("qty");
  if (!qtyInput) return;

  document.getElementById("qty-minus").addEventListener("click", () => {
    // decrement but not below 1
    qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1);
  });
  document.getElementById("qty-plus").addEventListener("click", () => {
    // increment
    qtyInput.value = parseInt(qtyInput.value) + 1;
  });
}

// Wires up the variant size buttons. On click, marks the selected button as active,
// deactivates all others, and updates the size label to match.
function initVariants() {
  const variantBtns = document.querySelectorAll(".product-variants button");
  const sizeLabel = document.querySelector(".size strong");
  // run when there are multiple buttons
  if (!variantBtns.length) return;

  variantBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // remove active from all buttons then add active to clicked button
      variantBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      // update label
      if (sizeLabel) sizeLabel.textContent = btn.textContent;
    });
  });
}

// Opens an enlarged version of the product image in a fullscreen darkened overlay.
// Clicking the container (image or enlarge icon), the overlay, or pressing Escape closes it.
function initImageZoom() {
  // check if product image exists on this page
  const productImg = document.querySelector(".product-img img");
  const productImgContainer = document.querySelector(".product-img");
  if (!productImg) return;

  // create overlay and enlarged image elements dynamically
  const overlay = document.createElement("div");
  overlay.id = "img-overlay";
  const enlargedImg = document.createElement("img");
  enlargedImg.src = productImg.src;
  enlargedImg.alt = productImg.alt;
  overlay.appendChild(enlargedImg);
  document.body.appendChild(overlay);

  // open overlay when image container (or enlarge icon) is clicked
  productImgContainer.addEventListener("click", () => {
    overlay.classList.add("active");
  });

  // close overlay when background is clicked
  overlay.addEventListener("click", () => {
    overlay.classList.remove("active");
  });

  // close overlay on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") overlay.classList.remove("active");
  });
}


function initProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const index = parseInt(params.get("index"), 10);
  const product = products[category]?.[index];
  if (!product) return;

  // Image
  const img = document.querySelector(".product-img img");
  img.src = product.image;
  img.alt = product.name;

  // Name, price, initial size label
  document.querySelector(".product-info h1").textContent = product.name;
  document.querySelector(".product-info .price").textContent =
    `$${product.price.toFixed(2)}`;
  const sizeLabel = document.querySelector(".size strong");
  if (sizeLabel)
    sizeLabel.textContent = product.variants[product.variants.length - 1];

  // Variant buttons
  const variantsDiv = document.querySelector(".product-variants");
  variantsDiv.innerHTML = product.variants
    .map((v, i) => {
      if (i === product.variants.length - 1) {
        return `<button class="active">${v}</button>`;
      } else {
        return `<button>${v}</button>`;
      }
    })
    .join("");

  // Adding accordion content
  const details = document.querySelectorAll(".product-description details");
  if (details[0])
    details[0].querySelector("p").textContent = product.ingredients;
  if (details[1])
    details[1].querySelector("p").textContent = product.description;

  // Related products (up to 2 others in same category)
  const relatedSection = document.querySelector(".related-products");
  const related = products[category]
    .map((p, i) => ({ product: p, index: i }))
    .filter(({ index: i }) => i !== index)
    .slice(0, 2);

  relatedSection.innerHTML =
    `<h2>Related Products</h2>` +
    related
      .map(
        ({ product: p, index: i }) => `
        <a href="product_detail.html?category=${category}&index=${i}" class="product-card-link">
            <article class="product-card product-card-row">
                <div class="product-card-img">
                    <img src="${p.image}" alt="${p.name}">
                </div>
                <div class="product-card-info">
                    <h3>${p.name}</h3>
                    <p class="price">$${p.price.toFixed(2)}</p>
                </div>
            </article>
        </a>`,
      )
      .join("");

  // Re-init interactive components now that DOM is populated
  initVariants();
  initImageZoom();
}

/*-------------------------------------- Payment--------------------------------------*/

// Wires up the payment page: method tab switching and card/expiry input formatting.
function initPaymentPage() {
  // Grab all payment method tab buttons and the two form sections
  const tabs = document.querySelectorAll(".method-tab");
  const cardFields = document.getElementById("card-fields");
  const paypalFields = document.getElementById("paypal-fields");

  // Attach a click listener to every tab button
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove the active highlight from all tabs, then add it to the clicked one
      tabs.forEach((t) => t.classList.remove("method-tab-active"));
      tab.classList.add("method-tab-active");

      // Read the data-method attribute on the button ("card" or "paypal")
      // and show the matching form section while hiding the other
      if (tab.dataset.method === "card") {
        cardFields.classList.remove("payment-hidden");
        paypalFields.classList.add("payment-hidden");
      } else {
        cardFields.classList.add("payment-hidden");
        paypalFields.classList.remove("payment-hidden");
      }
    });
  });

  // Format card number with spaces every 4 digits (e.g. "1234 5678 9012 3456")
  const cardInput = document.getElementById("card-number");
  if (cardInput) {
    cardInput.addEventListener("input", () => {
      // Strip all non-digit characters, then cap at 16 digits
      const digits = cardInput.value.replace(/\D/g, "").slice(0, 16);
      // Insert a space after every group of 4 digits, except the last group
      // (?=.) ensures we don't add a trailing space after the final digit
      cardInput.value = digits.replace(/(.{4})(?=.)/g, "$1 ");
    });
  }

  // Format expiry date as MM / YY (e.g. "12 / 26")
  const expiryInput = document.getElementById("expiry");
  if (expiryInput) {
    expiryInput.addEventListener("input", () => {
      // Find every character that is NOT a digit, and replace it with nothing (delete it)
      const digits = expiryInput.value.replace(/\D/g, "").slice(0, 4);
      // Once the user has typed the month (2 digits) and started the year,
      // insert " / " between them
      if (digits.length >= 3) {
        expiryInput.value = digits.slice(0, 2) + " / " + digits.slice(2);
      } else {
        expiryInput.value = digits;
      }
    });
  }
}

// ── Run only on the cart page ──
if (document.body.id === "cart-page") {
  const checkoutBtn = document.querySelector(".checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      window.location.href = "payment.html";
    });
  }
}

function renderProductCard(product, category, index, row = false) {
  const saleBadge = product.sale ? `<span class="sale-badge">SALE</span>` : "";
  const originalPrice = product.originalPrice
    ? `<del class="original-price">$${product.originalPrice.toFixed(2)}</del>`
    : "";
  return `
        <article class="product-card">
            <a href="product_detail.html?category=${category}&index=${index}" class="product-card-img-link">
                <div class="product-card-img">
                    <img src="${product.image}" alt="${product.name}">
                    ${saleBadge}
                </div>
            </a>
            <div class="product-card-right">
                <a href="product_detail.html?category=${category}&index=${index}" class="product-card-link">
                    <div class="product-card-info">
                        <h3>${product.name}</h3>
                        <p>
                            <span class="price">$${product.price.toFixed(2)}</span>
                            ${originalPrice}
                        </p>
                    </div>
                </a>
                <div class="card-btn-row">
                    <a href="product_detail.html?category=${category}&index=${index}" class="card-view-btn">View Product</a>
                    <button class="card-add-btn">Add to Cart</button>
                </div>
            </div>
        </article>
    `;
}

/*-------------------------------------- On Sale --------------------------------------*/

function initOnSalePage() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  // Gather all sale products across every category, preserving category + index for linking
  const saleProducts = [];
  for (const [category, list] of Object.entries(products)) {
    list.forEach((product, index) => {
      if (product.sale) {
        saleProducts.push({ product, category, index });
      }
    });
  }

  // Sorts product via selected sort method from filter function
  function render(sortValue) {
    const sorted = [...saleProducts];
    if (sortValue === "price-asc") {
      sorted.sort((a, b) => a.product.price - b.product.price);
    } else if (sortValue === "price-desc") {
      sorted.sort((a, b) => b.product.price - a.product.price);
    }

    document.getElementById("product-count").textContent = `${sorted.length} Products`;
    grid.innerHTML = sorted
      .map(({ product, category, index }) => renderProductCard(product, category, index))
      .join("");
  }

  render("default");

  document.getElementById("sort-select").addEventListener("change", (e) => render(e.target.value));
}

/*-------------------------------------- Initializations --------------------------------------*/


// ── Run only on the payment page ──
if (document.body.id === "payment-page") {
  initPaymentPage();
}

// ── Run on every page ──
initHeader();
initFooter();

// ── Run only on the product detail page ──
if (document.body.id === "Product-detail") {
  initProductDetail();
  initQuantity();
}

if (document.body.id === "Product-list") {
  initProductList();
}

if (document.body.id === "on-sale-page") {
  initOnSalePage();
}
