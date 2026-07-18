/* =========================================================
   NextGen Learning Hub — main.js
   Vanilla JS: nav, scroll effects, FAQ, forms, reveal
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Navbar: solid on scroll ---------- */
  const navbar = document.getElementById("navbar");
  const scrollTopBtn = document.getElementById("scroll-top");

  function onScroll() {
    const scrolled = window.scrollY > 40;
    navbar.classList.toggle("scrolled", scrolled);
    scrollTopBtn.classList.toggle("visible", window.scrollY > 500);
    highlightActive();
  }

  /* ---------- Mobile menu toggle ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const icon = navToggle.querySelector("i");
    const open = navMenu.classList.contains("active");
    icon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  });

  // Close mobile menu when a link is clicked
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navToggle.querySelector("i").className = "fa-solid fa-bars";
    });
  });

  /* ---------- Scroll-to-top ---------- */
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Active link highlight on scroll ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function highlightActive() {
    let current = "";
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  }

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Close all
      faqItems.forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });

      // Open clicked one (if it was closed)
      if (!isOpen) {
        item.classList.add("open");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: reveal everything
    revealEls.forEach((el) => el.classList.add("revealed"));
  }

  /* ---------- Contact form ---------- */
  const contactForm = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const subject = contactForm.subject.value.trim();
    const message = contactForm.message.value.trim();

    // Simple validation
    if (!name || !email || !subject || !message) {
      showFeedback("Please fill in all fields.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFeedback("Please enter a valid email address.", "error");
      return;
    }

    // Simulate successful submission
    showFeedback(`Thank you, ${name}! Your message has been sent.`, "success");
    contactForm.reset();
    setTimeout(() => {
      feedback.textContent = "";
      feedback.className = "form-feedback";
    }, 5000);
  });

  function showFeedback(msg, type) {
    feedback.textContent = msg;
    feedback.className = `form-feedback ${type}`;
  }

  /* ---------- Newsletter form ---------- */
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector("input");
      const btn = newsletterForm.querySelector("button");
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i>';
      input.value = "";
      setTimeout(() => {
        btn.innerHTML = original;
      }, 2000);
    });
  }

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Init ---------- */
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
