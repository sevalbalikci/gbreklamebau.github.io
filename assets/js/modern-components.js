// Modern Component Loader and Interactions
// G & B Reklamebau 2026

document.addEventListener("DOMContentLoaded", function () {
  // Load Header Component
  loadComponent(
    "components/modern-header.html",
    "header-placeholder",
    function () {
      initMobileMenu();
      initScrollHeader();
      setActiveNavLink();
    },
  );

  // Load Footer Component
  loadComponent(
    "components/modern-footer.html",
    "footer-placeholder",
    function () {
      initScrollToTop();
    },
  );

  // Load CTA Section Component
  loadComponent("components/cta-section.html", "cta-placeholder");
});

// Component Loader Function
function loadComponent(url, elementId, callback) {
  const element = document.getElementById(elementId);
  if (!element) return;

  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      element.innerHTML = data;
      if (callback) callback();
    })
    .catch((error) => console.error("Error loading component:", error));
}

// Mobile Menu Toggle
function initMobileMenu() {
  const toggle = document.getElementById("mobileMenuToggle");
  const menu = document.getElementById("navMenu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", function () {
    menu.classList.toggle("active");
    const icon = this.querySelector("i");
    if (menu.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Close menu when clicking on a link
  const navLinks = menu.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      menu.classList.remove("active");
      const icon = toggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
      menu.classList.remove("active");
      const icon = toggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
}

// Scroll Header Effect
function initScrollHeader() {
  const header = document.getElementById("mainHeader");
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });
}

// Set Active Navigation Link
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

// Scroll to Top Button
function initScrollToTop() {
  const scrollBtn = document.getElementById("scrollToTop");
  if (!scrollBtn) return;

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }
  });

  scrollBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements with animation classes
document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(
    ".product-card, .feature-item, .timeline-content, .gallery-item, .stat-item",
  );
  animatedElements.forEach((el) => {
    observer.observe(el);
  });
});

// Form Submission Handler
document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll(".contact-form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      const submitBtn = this.querySelector(".submit-btn");
      if (submitBtn) {
        submitBtn.innerHTML =
          '<i class="fa fa-spinner fa-spin"></i> Wird gesendet...';
        submitBtn.disabled = true;
      }

      // Formspree will handle the actual submission
      // This just provides visual feedback
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML =
            'Nachricht senden <i class="fa fa-paper-plane"></i>';
          submitBtn.disabled = false;
        }
      }, 2000);
    });
  });
});

// Counter Animation
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + "+";
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + "+";
    }
  }, 16);
}

// Initialize counters when they come into view
const counterObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        const target = parseInt(entry.target.getAttribute("data-target"));
        animateCounter(entry.target, target);
        entry.target.classList.add("counted");
      }
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll(".stat-number").forEach((counter) => {
  counterObserver.observe(counter);
});

// Image Lazy Loading Enhancement
if ("loading" in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach((img) => {
    img.src = img.dataset.src || img.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
  document.body.appendChild(script);
}

// Add parallax effect to hero images
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".hero-image-grid img");

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    element.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
  });
});

// Gallery Modal Functionality
function initGalleryModal() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const img = this.querySelector("img");
      if (!img) return;

      // Create modal
      const modal = document.createElement("div");
      modal.className = "gallery-modal";
      modal.innerHTML = `
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `;

      document.body.appendChild(modal);
      document.body.style.overflow = "hidden";

      // Close modal
      const closeBtn = modal.querySelector(".modal-close");
      closeBtn.addEventListener("click", () => {
        modal.remove();
        document.body.style.overflow = "auto";
      });

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.remove();
          document.body.style.overflow = "auto";
        }
      });
    });
  });
}

// Initialize gallery on page load
window.addEventListener("load", initGalleryModal);

// Add CSS for gallery modal
const modalStyles = document.createElement("style");
modalStyles.textContent = `
    .gallery-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    }
    
    .gallery-modal .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        animation: scaleIn 0.3s ease;
    }
    
    .gallery-modal img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
        border-radius: 10px;
    }
    
    .modal-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .modal-close:hover {
        transform: scale(1.2);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes scaleIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(modalStyles);
