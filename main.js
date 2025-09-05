// DOM ELEMENTS & VARIABLES
const mainContent = document.getElementById("main-content");
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileNavMenu = document.querySelector(".mobile-nav-menu");
const mobileNavOverlay = document.querySelector(".mobile-nav-overlay");
const navLinks = document.querySelectorAll(".mobile-nav-links .nav-link");
const body = document.body;

const searchIconBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const searchContainer = document.querySelector(".search-container");
const cartIcon = document.querySelector(".cart-btn");
const wishlistIcon = document.querySelector(".wishlist-btn");
const loginLink = document.getElementById("show-login");
const signupLink = document.getElementById("show-signup");
const loginCard = document.getElementById("login-card");
const signupCard = document.getElementById("signup-card");
const productsContainer = document.querySelector(".products-grid");
const wishlistItemsContainer = document.getElementById(
  "wishlist-items-container"
);
const cartItemsContainer = document.querySelector(".cart-items");

// NEW: close button inside drawer & dynamic header height var
const mobileCloseBtn = document.querySelector(".mobile-close");
const siteHeader = document.getElementById("site-header");

// HELPERS: Sync header height to CSS var
function syncHeaderHeightVar() {
  if (!siteHeader) return;
  const h = siteHeader.offsetHeight || 64;
  document.documentElement.style.setProperty("--header-height", h + "px");
}
syncHeaderHeightVar();
window.addEventListener("resize", syncHeaderHeightVar);

// CORE WEBSITE FUNCTIONALITY

// This is the new, combined logic from your other code
function toggleMobileNav() {
  const isOpen = body.classList.toggle("menu-open");
  if (mobileNavMenu) {
    mobileNavMenu.setAttribute("aria-hidden", String(!isOpen));
  }
}

function handleFormToggle() {
  if (loginLink && signupLink && loginCard && signupCard) {
    loginLink.addEventListener("click", (e) => {
      e.preventDefault();
      loginCard.classList.remove("hidden");
      signupCard.classList.add("hidden");
    });

    signupLink.addEventListener("click", (e) => {
      e.preventDefault();
      signupCard.classList.remove("hidden");
      loginCard.classList.add("hidden");
    });
  }
}

// E-COMMERCE LOGIC

function initializeCounts() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  updateCartDisplay(cart.length);
  updateWishlistDisplay(wishlist.length);
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay(cart.length);
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex((item) => item.id === productId);
  if (index > -1) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay(cart.length);
    renderCartItems();
  }
}

function toggleWishlist(product) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const index = wishlist.findIndex((item) => item.id === product.id);

  if (index === -1) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistDisplay(wishlist.length);
    return true;
  } else {
    wishlist.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistDisplay(wishlist.length);
    return false;
  }
}

function updateCartDisplay(count) {
  if (cartIcon) {
    if (count > 0) {
      cartIcon.innerHTML = `<i class="bx bx-shopping-bag"></i><span class="cart-badge">${count}</span>`;
    } else {
      cartIcon.innerHTML = `<i class="bx bx-shopping-bag"></i>`;
    }
  }
}

function updateWishlistDisplay(count) {
  if (wishlistIcon) {
    if (count > 0) {
      wishlistIcon.innerHTML = `<i class="bx bxs-heart"></i><span class="cart-badge">${count}</span>`;
    } else {
      wishlistIcon.innerHTML = `<i class="bx bx-heart"></i>`;
    }
  }
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.dataset.productId = product.id;

  card.innerHTML = `
    <button class="add-to-wishlist" aria-label="Add to wishlist"><i class="bx bx-heart"></i></button>
    <div class="product-image-container">
      <img src="${product.image}" alt="${product.name}" class="product-image" />
    </div>
    <h3 class="product-title">${product.name}</h3>
    <p class="product-price">₹${product.price.toFixed(2)}</p>
    <div class="product-actions">
      <button class="btn btn-primary add-to-cart">Add to Cart</button>
      <button class="btn btn-secondary buy-now">Buy Now</button>
    </div>
  `;

  const wishlistBtn = card.querySelector(".add-to-wishlist");
  const wishlistIconElement = wishlistBtn.querySelector("i");

  wishlistBtn.addEventListener("click", () => {
    const isAdded = toggleWishlist(product);
    // Correct classes to toggle for the wishlist icon
    wishlistIconElement.classList.toggle("bxs-heart", isAdded);
    wishlistIconElement.classList.toggle("bx-heart", !isAdded);
    wishlistBtn.classList.toggle("active", isAdded);
  });

  card.querySelector(".add-to-cart").addEventListener("click", () => {
    addToCart(product);
  });

  card.querySelector(".buy-now").addEventListener("click", () => {
    addToCart(product);
    window.location.href = "cart.html";
  });

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (wishlist.some((item) => item.id === product.id)) {
    wishlistBtn.classList.add("active");
    wishlistIconElement.classList.remove("bx-heart");
    wishlistIconElement.classList.add("bxs-heart");
  }

  return card;
}

function renderProducts(products) {
  if (!productsContainer) return;
  productsContainer.innerHTML = "";
  if (products.length === 0) {
    productsContainer.innerHTML =
      "<p style='text-align:center; padding: 2rem;'>No products found.</p>";
  } else {
    products.forEach((product) => {
      productsContainer.appendChild(createProductCard(product));
    });
  }
}

function renderWishlistItems() {
  if (!wishlistItemsContainer) return;
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlistItemsContainer.innerHTML = "";

  if (wishlist.length === 0) {
    /* Fix: Use the new empty-message class for centering */
    wishlistItemsContainer.innerHTML =
      "<div class='empty-message'>Your wishlist is empty.</div>";
  } else {
    wishlist.forEach((product) => {
      const itemElement = document.createElement("div");
      itemElement.className = "wishlist-item";
      itemElement.dataset.productId = product.id;

      itemElement.innerHTML = `
        <img src="${product.image}" alt="${
        product.name
      }" class="wishlist-item-image">
        <div class="item-info">
          <h3 class="item-name">${product.name}</h3>
          <p class="item-price">₹${product.price.toFixed(2)}</p>
        </div>
        <button class="remove-btn" aria-label="Remove from wishlist">
          <i class="bx bx-x"></i>
        </button>
      `;

      itemElement.querySelector(".remove-btn").addEventListener("click", () => {
        toggleWishlist(product);
        itemElement.remove();
      });

      wishlistItemsContainer.appendChild(itemElement);
    });
  }
}

function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Get the containers from the DOM
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartGrid = document.querySelector(".cart-grid");

  // Clear previous content to prevent duplicates
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = "";
  }

  // Also clear the summary box if it exists
  const existingSummary = document.getElementById("cart-summary");
  if (existingSummary) {
    existingSummary.remove();
  }

  if (cart.length === 0) {
    // If cart is empty, show the "empty" message
    if (cartItemsContainer) {
      /* Fix: Use the new empty-message class for centering */
      cartItemsContainer.innerHTML =
        "<div class='empty-message'>Your cart is empty.</div>";
    }
  } else {
    let total = 0;

    // Render each item in the cart
    cart.forEach((product) => {
      total += product.price;
      const itemElement = document.createElement("div");
      itemElement.className = "cart-item";
      itemElement.dataset.productId = product.id;
      itemElement.innerHTML = `
        <img src="${product.image}" alt="${
        product.name
      }" class="cart-item-image">
        <div class="item-info">
          <h3 class="item-name">${product.name}</h3>
          <p class="item-price">₹${product.price.toFixed(2)}</p>
        </div>
        <div class="cart-actions">
          <button class="remove-btn" aria-label="Remove from cart">
            <i class="bx bx-x"></i>
          </button>
        </div>
      `;
      itemElement.querySelector(".remove-btn").addEventListener("click", () => {
        removeFromCart(product.id);
      });
      if (cartItemsContainer) {
        cartItemsContainer.appendChild(itemElement);
      }
    });

    // Dynamically create and append the cart summary section
    const cartSummaryElement = document.createElement("div");
    cartSummaryElement.className = "cart-summary";
    cartSummaryElement.id = "cart-summary";
    cartSummaryElement.innerHTML = `
        <h3 class="summary-title">Order Summary</h3>
        <div class="summary-line">
          <span>Subtotal</span>
          <span>₹${total.toFixed(2)}</span>
        </div>
        <div class="summary-line total-line">
          <span>Total</span>
          <span>₹${total.toFixed(2)}</span>
        </div>
        <button class="btn btn-primary checkout-btn">Proceed to Checkout</button>
    `;

    if (cartGrid) {
      cartGrid.appendChild(cartSummaryElement);
    }
  }
}

function handleSearch() {
  if (searchInput) {
    searchInput.addEventListener("keyup", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const allProductsArray = [].concat(...Object.values(ALL_PRODUCTS));
      const filteredProducts = allProductsArray.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
      renderProducts(filteredProducts);
    });
  }
}

// EVENT LISTENERS & INITIALIZATION

// FIX: Change event listeners to use the new toggleMobileNav function
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", toggleMobileNav);
}

if (mobileCloseBtn) {
  mobileCloseBtn.addEventListener("click", toggleMobileNav);
}

// Overlay closes drawer
if (mobileNavOverlay) {
  mobileNavOverlay.addEventListener("click", toggleMobileNav);
}

// Close on link click
navLinks.forEach((link) => {
  link.addEventListener("click", toggleMobileNav);
});

// Search functionality is now always active, no need for a toggle event
if (searchIconBtn) {
  searchIconBtn.addEventListener("click", (e) => {
    e.preventDefault();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  syncHeaderHeightVar();
  initializeCounts();
  handleFormToggle();
  handleSearch();

  const body = document.body;
  const category = body.dataset.category;

  if (category && ALL_PRODUCTS[category]) {
    renderProducts(ALL_PRODUCTS[category]);
  } else if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/"
  ) {
    const latestArrivals = ALL_PRODUCTS.men
      .slice(0, 4)
      .concat(ALL_PRODUCTS.women.slice(0, 4));
    renderProducts(latestArrivals);
  } else if (window.location.pathname.endsWith("wishlist.html")) {
    renderWishlistItems();
  } else if (window.location.pathname.endsWith("cart.html")) {
    renderCartItems();
  }
});
