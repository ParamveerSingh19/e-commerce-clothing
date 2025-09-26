// Helper to safely read from localStorage
function getLocalStorageData(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

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

const mobileCloseBtn = document.querySelector(".mobile-close");
const siteHeader = document.getElementById("site-header");

// Sync header height CSS var
function syncHeaderHeightVar() {
  if (!siteHeader) return;
  const h = siteHeader.offsetHeight || 64;
  document.documentElement.style.setProperty("--header-height", h + "px");
}
syncHeaderHeightVar();
window.addEventListener("resize", syncHeaderHeightVar);

// Mobile nav toggle
function toggleMobileNav() {
  const isOpen = body.classList.toggle("menu-open");
  if (mobileNavMenu) mobileNavMenu.setAttribute("aria-hidden", String(!isOpen));
  const hamburgerIcon = mobileMenuToggle?.querySelector("i");
  if (hamburgerIcon)
    hamburgerIcon.className = isOpen ? "bx bx-x" : "bx bx-menu";
}

// Close mobile nav
function closeMobileNav() {
  body.classList.remove("menu-open");
  if (mobileNavMenu) mobileNavMenu.setAttribute("aria-hidden", "true");
  const hamburgerIcon = mobileMenuToggle?.querySelector("i");
  if (hamburgerIcon) hamburgerIcon.className = "bx bx-menu";
}

// Toggle between login/signup forms
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

// Initialize cart and wishlist badges count
function initializeCounts() {
  const cart = getLocalStorageData("cart");
  const wishlist = getLocalStorageData("wishlist");
  updateCartDisplay(cart.length);
  updateWishlistDisplay(wishlist.length);
}

// Add product to cart and update display
function addToCart(product) {
  let cart = getLocalStorageData("cart");
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay(cart.length);
  showFeedback(`${product.name} added to cart!`, "success");
}

// Remove from cart by productId
function removeFromCart(productId) {
  let cart = getLocalStorageData("cart");
  const index = cart.findIndex((item) => item.id === productId);
  if (index > -1) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay(cart.length);
    renderCartItems();
  }
}

// Add or remove product from wishlist
function toggleWishlist(product) {
  let wishlist = getLocalStorageData("wishlist");
  const index = wishlist.findIndex((item) => item.id === product.id);
  if (index === -1) {
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistDisplay(wishlist.length);
    showFeedback(`${product.name} added to wishlist!`, "success");
    return true;
  } else {
    wishlist.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistDisplay(wishlist.length);
    showFeedback(`${product.name} removed from wishlist!`, "info");
    return false;
  }
}

// Update cart badge display count
function updateCartDisplay(count) {
  if (!cartIcon) return;
  let badge = cartIcon.querySelector(".cart-badge");
  if (count > 0) {
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "cart-badge";
      cartIcon.appendChild(badge);
    }
    badge.textContent = count;
    badge.style.display = "flex";
  } else if (badge) {
    badge.style.display = "none";
  }
}

// Update wishlist badge display count
function updateWishlistDisplay(count) {
  if (!wishlistIcon) return;
  let badge = wishlistIcon.querySelector(".cart-badge");
  if (count > 0) {
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "cart-badge";
      wishlistIcon.appendChild(badge);
    }
    badge.textContent = count;
    badge.style.display = "flex";
  } else if (badge) {
    badge.style.display = "none";
  }
}

// Create product card DOM element
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.dataset.productId = product.id;
  card.innerHTML = `
    <button class="add-to-wishlist" aria-label="Add to wishlist" data-product-id="${
      product.id
    }">
      <i class="bx bx-heart"></i>
    </button>
    <div class="product-image-container">
      <img src="${product.image}" alt="${
    product.name
  }" class="product-image" loading="lazy" />
    </div>
    <h3 class="product-title">${product.name}</h3>
    <p class="product-price">₹${product.price.toFixed(2)}</p>
    <div class="product-actions">
      <button class="btn btn-primary add-to-cart" data-product-id="${
        product.id
      }">Add to Cart</button>
      <button class="btn btn-secondary buy-now" data-product-id="${
        product.id
      }">Buy Now</button>
    </div>
  `;
  // Wishlist toggle state sync
  const wishlist = getLocalStorageData("wishlist");
  const wishlistBtn = card.querySelector(".add-to-wishlist");
  const wishlistIconElement = wishlistBtn.querySelector("i");
  if (wishlist.some((item) => item.id === product.id)) {
    wishlistBtn.classList.add("active");
    wishlistIconElement.classList.remove("bx-heart");
    wishlistIconElement.classList.add("bxs-heart");
  }
  return card;
}

// Render products on page
function renderProducts(products) {
  if (!productsContainer) return;
  productsContainer.innerHTML = "";
  if (products.length === 0) {
    productsContainer.innerHTML =
      "<p style='text-align:center; padding: 2rem; grid-column: 1 / -1;'>No products found.</p>";
  } else {
    products.forEach((product) => {
      productsContainer.appendChild(createProductCard(product));
    });
  }
}

// Render wishlist items
function renderWishlistItems() {
  if (!wishlistItemsContainer) return;
  const wishlist = getLocalStorageData("wishlist");
  wishlistItemsContainer.innerHTML = "";
  if (wishlist.length === 0) {
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
      }" class="wishlist-item-image" loading="lazy">
        <div class="item-info">
          <h3 class="item-name">${product.name}</h3>
          <p class="item-price">₹${product.price.toFixed(2)}</p>
          <div class="product-actions">
            <button class="btn btn-primary add-to-cart" data-product-id="${
              product.id
            }">Add to Cart</button>
          </div>
        </div>
        <button class="remove-btn" aria-label="Remove from wishlist" data-product-id="${
          product.id
        }">
          <i class="bx bx-x"></i>
        </button>
      `;
      wishlistItemsContainer.appendChild(itemElement);
    });
  }
}

// Render cart items
function renderCartItems() {
  console.log("Rendering cart items");
  const cart = getLocalStorageData("cart");
  const container = document.querySelector(".cart-items");
  if (!container) {
    console.warn("Cart container not found");
    return;
  }
  container.innerHTML = "";
  const cartGrid = document.querySelector(".cart-grid");
  const existingSummary = document.getElementById("cart-summary");
  if (existingSummary) existingSummary.remove();
  if (cart.length === 0) {
    container.innerHTML =
      "<div class='empty-message'>Your cart is empty.</div>";
  } else {
    let total = 0;
    cart.forEach((product) => {
      total += product.price;
      const itemElement = document.createElement("div");
      itemElement.className = "cart-item";
      itemElement.dataset.productId = product.id;
      itemElement.innerHTML = `
        <img src="${product.image}" alt="${
        product.name
      }" class="cart-item-image" loading="lazy" />
        <div class="item-info">
          <h3 class="item-name">${product.name}</h3>
          <p class="item-price">₹${product.price.toFixed(2)}</p>
        </div>
        <div class="cart-actions">
          <button class="remove-btn" aria-label="Remove from cart" data-product-id="${
            product.id
          }">
            <i class="bx bx-x"></i>
          </button>
        </div>
      `;
      container.appendChild(itemElement);
    });

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
    if (cartGrid) cartGrid.appendChild(cartSummaryElement);
  }
}

// Search with debounce
function handleSearch() {
  if (!searchInput) return;
  let searchTimeout;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const searchTerm = e.target.value.toLowerCase().trim();
      if (searchTerm === "") {
        const bodyCat = document.body.dataset.category;
        if (bodyCat && ALL_PRODUCTS[bodyCat]) {
          renderProducts(ALL_PRODUCTS[bodyCat]);
        } else if (
          window.location.pathname.endsWith("index.html") ||
          window.location.pathname === "/"
        ) {
          const latestArrivals = ALL_PRODUCTS.men
            .slice(0, 3)
            .concat(ALL_PRODUCTS.women.slice(0, 3));
          renderProducts(latestArrivals);
        }
        return;
      }
      const allProductsArray = [].concat(...Object.values(ALL_PRODUCTS));
      const filteredProducts = allProductsArray.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      );
      if (productsContainer) productsContainer.classList.add("search-results");
      renderProducts(filteredProducts);
    }, 300);
  });
}

// Show feedback messages
function showFeedback(message, type = "info") {
  const existingFeedback = document.querySelector(".feedback-message");
  if (existingFeedback) existingFeedback.remove();
  const feedback = document.createElement("div");
  feedback.className = `feedback-message feedback-${type}`;
  feedback.textContent = message;
  feedback.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${
      type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : "#2196F3"
    };
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    z-index: 1000;
    animation: slideIn 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  document.body.appendChild(feedback);
  setTimeout(() => {
    feedback.style.animation = "slideOut 0.3s ease forwards";
    setTimeout(() => feedback.remove(), 300);
  }, 3000);
}

// Event delegation for buttons
function setupEventDelegation() {
  document.addEventListener("click", (e) => {
    const target = e.target.closest("button");
    if (!target) return;
    const productId = target.dataset.productId;
    if (!productId) return;
    const allProductsArray = [].concat(...Object.values(ALL_PRODUCTS));
    const product = allProductsArray.find((p) => p.id == productId);
    if (!product) return;
    if (target.classList.contains("add-to-cart")) {
      e.preventDefault();
      addToCart(product);
    } else if (target.classList.contains("buy-now")) {
      e.preventDefault();
      addToCart(product);
      window.location.href = "cart.html";
    } else if (target.classList.contains("add-to-wishlist")) {
      e.preventDefault();
      const isAdded = toggleWishlist(product);
      const wishlistIconElement = target.querySelector("i");
      wishlistIconElement.classList.toggle("bxs-heart", isAdded);
      wishlistIconElement.classList.toggle("bx-heart", !isAdded);
      target.classList.toggle("active", isAdded);
    } else if (target.classList.contains("remove-btn")) {
      e.preventDefault();
      if (target.closest(".cart-item")) {
        removeFromCart(product.id);
      } else if (target.closest(".wishlist-item")) {
        toggleWishlist(product);
        target.closest(".wishlist-item").remove();
      }
    }
  });
}

// Event Listeners & Initialization
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMobileNav();
  });
}

if (mobileCloseBtn) {
  mobileCloseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    closeMobileNav();
  });
}

if (mobileNavOverlay) {
  mobileNavOverlay.addEventListener("click", closeMobileNav);
}

navLinks.forEach((link) => {
  link.addEventListener("click", closeMobileNav);
});

if (searchIconBtn) {
  searchIconBtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchInput?.focus();
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth >= 640 && body.classList.contains("menu-open")) {
    closeMobileNav();
  }
});

const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

document.addEventListener("DOMContentLoaded", () => {
  syncHeaderHeightVar();
  initializeCounts();
  handleFormToggle();
  handleSearch();
  setupEventDelegation();

  // Always render wishlist and cart if containers exist
  if (
    productsContainer &&
    document.body.dataset.category &&
    ALL_PRODUCTS[document.body.dataset.category]
  ) {
    renderProducts(ALL_PRODUCTS[document.body.dataset.category]);
  }

  if (
    productsContainer &&
    (!document.body.dataset.category || document.body.dataset.category === "")
  ) {
    const latestArrivals = ALL_PRODUCTS.men
      .slice(0, 3)
      .concat(ALL_PRODUCTS.women.slice(0, 3));
    renderProducts(latestArrivals);
  }

  if (wishlistItemsContainer) renderWishlistItems();
  if (cartItemsContainer) renderCartItems();
});
