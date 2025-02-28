// Initialize AOS library
AOS.init();

// Global Variables
let allProducts = [];
let filteredProducts = [];
const productsContainer = document.querySelector("#products .row");

// Fetch and Render Products
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((products) => {
    allProducts = products;
    filteredProducts = [...allProducts];
    console.log("Fetched products:", allProducts);
    renderProducts();
  })
  .catch((error) => {
    console.error("Error fetching products:", error);
    productsContainer.innerHTML = `
      <div class="col-12 text-center text-danger">
        <p>Failed to load products. Please try again later.</p>
      </div>`;
  });

// Function to Render Products
function renderProducts() {
  productsContainer.innerHTML = "";

  filteredProducts.forEach((product) => {
    const colDiv = document.createElement("div");
    colDiv.className = "col-md-4 d-flex";

    colDiv.innerHTML = `
      <div class="card h-100">
        <img src="${product.image}" class="card-img-top" alt="${
      product.title
    }" />
        <div class="card-body text-center">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">$${product.price.toFixed(2)}</p>
        </div>
        <div class="card-footer text-center">
          <button class="btn btn-custom">Buy Now</button>
        </div>
      </div>
    `;
    productsContainer.appendChild(colDiv);
  });
}

// Function to apply filters
function applyFilters() {
  const maxPrice = parseInt(document.getElementById("priceRange").value);
  const keyword = document.getElementById("keywordSearch").value.toLowerCase();

  // Filter products based on price and keyword
  filteredProducts = allProducts.filter((product) => {
    const isWithinPriceRange = product.price <= maxPrice;
    const matchesKeyword =
      product.title.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword);

    return isWithinPriceRange && matchesKeyword;
  });

  // Re-render products with the new filtered list
  renderProducts();
}

// Price Range Slider Event Listener
const priceRangeInput = document.getElementById("priceRange");
priceRangeInput.addEventListener("input", (event) => {
  const maxPrice = event.target.value;
  document.getElementById("priceRangeValue").textContent = `$0 - $${maxPrice}`;
  applyFilters();
});

// Keyword Search Event Listener
document
  .getElementById("keywordSearch")
  .addEventListener("input", applyFilters);

// Function to reset filters
function resetFilters() {
  // Reset price range slider to max value (1000)
  document.getElementById("priceRange").value = 1000;
  document.getElementById("priceRangeValue").textContent = `$0 - $1000`;

  // Reset keyword search input
  document.getElementById("keywordSearch").value = "";

  // Apply the filters again (with default values)
  applyFilters();
}

// Reset Filters Event Listener
const resetButton = document.getElementById("resetFilters");
if (resetButton) {
  resetButton.addEventListener("click", resetFilters);
}

// Initialize Swiper
const swiper = new Swiper(".swiper-container", {
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
  },
});

// Dark Mode Toggle Setup
const darkModeToggle = document.getElementById("darkmode-toggle");

// Check the saved dark mode preference in localStorage on page load
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  document.querySelector(".navbar").classList.add("navbar-dark-mode");
  document
    .querySelector(".custom-carousel")
    .classList.add("carousel-dark-mode");
  darkModeToggle.checked = true;
}

// Handle dark mode toggle change
darkModeToggle.addEventListener("change", () => {
  const navbar = document.querySelector(".navbar");
  const carousel = document.querySelector(".custom-carousel");

  if (darkModeToggle.checked) {
    document.body.classList.add("dark-mode");
    navbar.classList.add("navbar-dark-mode");
    carousel.classList.add("carousel-dark-mode");
    localStorage.setItem("darkMode", "enabled");
  } else {
    document.body.classList.remove("dark-mode");
    navbar.classList.remove("navbar-dark-mode");
    carousel.classList.remove("carousel-dark-mode");
    localStorage.setItem("darkMode", "disabled");
  }
});

// Navbar Scroll Behavior (optional integration with dark mode)
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Update navbar background when dark mode is toggled
  if (darkModeToggle.checked) {
    navbar.classList.add("navbar-dark-mode");
  } else {
    navbar.classList.remove("navbar-dark-mode");
  }
});

// Show modal
document.getElementById("addProductBtn").addEventListener("click", function () {
  const modal = new bootstrap.Modal(document.getElementById("addProductModal"));
  modal.show();
});

// Save product and hide modal
document
  .getElementById("saveProductBtn")
  .addEventListener("click", function () {
    const title = document.getElementById("productTitle").value;
    const price = document.getElementById("productPrice").value;
    const image = document.getElementById("productImage").value;

    if (title && price && image) {
      const newProduct = {
        title,
        price: parseFloat(price),
        image,
      };

      allProducts.push(newProduct);
      filteredProducts = [...allProducts];
      renderProducts();

      // Close modal with Bootstrap 5
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("addProductModal")
      );
      modal.hide();
    }
  });
