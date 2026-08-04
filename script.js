// Mobile navigation
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const navBar = document.querySelector(".site-header");
const year = document.getElementById("year");
const isMobileMenuOpen = () => navLinks.classList.contains("open");
const closeMenu = () => {
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
};

if (navToggle && navLinks) {
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close when a nav link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close when clicking anywhere outside the header (mobile)
  document.addEventListener("click", (e) => {
    if (navBar && !navBar.contains(e.target) && isMobileMenuOpen()) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isMobileMenuOpen()) {
      closeMenu();
    }
  });

  // Close automatically when the user scrolls / browses the page
  window.addEventListener("scroll", () => {
    if (isMobileMenuOpen()) {
      closeMenu();
    }
  });
}

// Theme toggle (dark / light)
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;
const STORAGE_KEY = "sm-theme";

const applyTheme = (theme) => {
  root.setAttribute("data-theme", theme);
  themeToggle.setAttribute("aria-pressed", theme === "light");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (e) {}
};

const stored = (() => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    return null;
  }
})();

if (themeToggle) {
  applyTheme(stored || "dark");
  themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
  });
}

// Set current year in footer
if (year) {
  year.textContent = new Date().getFullYear();
}

// Subtle scroll reveal for sections
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".section > .container").forEach((el) => {
  observer.observe(el);
});