// Initialize AOS library
AOS.init();

// Dark Mode Toggle Setup
const darkModeToggle = document.getElementById("darkmode-toggle");

// Check the saved dark mode preference in localStorage on page load
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  document.querySelector(".navbar").classList.add("navbar-dark-mode");
  darkModeToggle.checked = true;
}

// Handle dark mode toggle change
// Handle dark mode toggle change
darkModeToggle.addEventListener("change", () => {
  const navbar = document.querySelector(".navbar");
  const about = document.querySelector("#about");

  if (darkModeToggle.checked) {
    document.body.classList.add("dark-mode");
    navbar.classList.add("navbar-dark-mode");
    navbar.querySelectorAll(".nav-link").forEach((link) => {
      link.style.color = "white"; // Set navbar link color to white
    });
    about.classList.add("about-dark-mode");
    about.classList.remove("bg-light");
    localStorage.setItem("darkMode", "enabled");
  } else {
    document.body.classList.remove("dark-mode");
    navbar.classList.remove("navbar-dark-mode");
    navbar.querySelectorAll(".nav-link").forEach((link) => {
      link.style.color = ""; // Reset navbar link color to default
    });
    about.classList.remove("about-dark-mode");
    about.classList.add("bg-light");
    localStorage.setItem("darkMode", "disabled");
  }
});

const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  if (darkModeToggle.checked) {
    navbar.classList.add("navbar-dark-mode");
  } else {
    navbar.classList.remove("navbar-dark-mode");
  }
});

// Async function

const salesButton = document.getElementById("sales-button");
const salesCounter = document.getElementById("sales-counter");

let salesCount = 0;
let intervalId = null;

salesButton.addEventListener("click", async () => {
  if (!intervalId) {
    salesButton.textContent = "Stop Sales Counter";

    intervalId = setInterval(() => {
      salesCount++;
      salesCounter.textContent = `Sales Today: ${salesCount}`;
    }, 1000);
  } else {
    clearInterval(intervalId);
    intervalId = null;
    salesButton.textContent = "Start Sales Counter";
  }
});
