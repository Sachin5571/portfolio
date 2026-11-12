/* =========================================================
   Sachin Kumar – Portfolio Scripts (Vanilla JavaScript)
   ========================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js"); // lets CSS apply scroll-reveal only when JS works

  /* ---------- 1. Theme toggle (remembers choice, follows system by default) ---------- */
  var themeBtn = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }

  applyTheme(root.getAttribute("data-theme") || "light");

  themeBtn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked: ignore */ }
  });

  // Follow system changes only while the user has not chosen manually
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
      var saved = null;
      try { saved = localStorage.getItem("theme"); } catch (err) {}
      if (!saved) applyTheme(e.matches ? "dark" : "light");
    });
  }

  /* ---------- 2. Mobile menu ---------- */
  var menuBtn = document.getElementById("menu-toggle");
  var navLinks = document.getElementById("nav-links");

  function setMenu(open) {
    navLinks.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  menuBtn.addEventListener("click", function () {
    setMenu(!navLinks.classList.contains("open"));
  });

  // Close after choosing a link
  navLinks.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });

  // Close with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navLinks.classList.contains("open")) {
      setMenu(false);
      menuBtn.focus();
    }
  });

  // Close when clicking outside the header
  document.addEventListener("click", function (e) {
    if (navLinks.classList.contains("open") && !e.target.closest(".site-header")) setMenu(false);
  });

  /* ---------- 3. Active link highlighting ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  function updateActive() {
    var y = window.scrollY + 120;
    var current = sections[0] ? sections[0].id : "";
    sections.forEach(function (s) { if (s.offsetTop <= y) current = s.id; });
    // At the very bottom, highlight the last section
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4 && sections.length) {
      current = sections[sections.length - 1].id;
    }
    links.forEach(function (a) {
      var active = a.getAttribute("href") === "#" + current;
      a.classList.toggle("active", active);
      if (active) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
  }

  /* ---------- 4. Back-to-top button ---------- */
  var toTop = document.getElementById("to-top");

  function onScroll() {
    toTop.classList.toggle("show", window.scrollY > 500);
    updateActive();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateActive);
  onScroll();

  toTop.addEventListener("click", function () {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });

  /* ---------- 5. Scroll-reveal animation ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- 6. Image fallbacks (clean placeholders if a file is missing) ---------- */
  function watchImage(img, wrapper) {
    if (!img || !wrapper) return;
    function fail() { wrapper.classList.add("no-image"); }
    img.addEventListener("error", fail);
    if (img.complete && img.naturalWidth === 0) fail();
  }
  watchImage(document.getElementById("profile-img"), document.getElementById("photo-frame"));
  watchImage(document.querySelector("#project-image img"), document.getElementById("project-image"));

  /* ---------- 7. Hide project buttons whose link is still a placeholder ---------- */
  document.querySelectorAll(".project-link").forEach(function (a) {
    var href = (a.getAttribute("href") || "").trim();
    if (href === "" || href === "#" || href.charAt(0) === "[") {
      a.hidden = true;
      a.style.display = "none";
    }
  });
  // Hide the whole button row if every button was hidden
  document.querySelectorAll(".project-body .btn-row").forEach(function (row) {
    var visible = row.querySelectorAll(".project-link:not([hidden])").length;
    if (!visible) row.style.display = "none";
  });

  /* ---------- 8. Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
