    // Close navbar when clicking outside (mobile)
    document.addEventListener('click', function(e) {
        const navbarMenu = document.getElementById('navbarMenu');
        const toggler = document.querySelector('.navbar-toggler');
        const isNavbarOpen = navbarMenu.classList.contains('show');
        const isClickInsideNavbar = navbarMenu.contains(e.target) || toggler.contains(e.target);
        if (window.innerWidth < 992 && isNavbarOpen && !isClickInsideNavbar) {
            const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarMenu);
            bsCollapse.hide();
        }
    });

/* ========== PATH HELPERS (GitHub Pages friendly) ========== */

// Guess the repo root from the URL: "/miste/" for https://.../miste/anything
function getRepoBase() {
  // example: "/miste/solutions/page.html" -> "/miste/"
  const m = window.location.pathname.match(/^\/[^/]+\//);
  if (m && m[0] !== "/") return `/${m[0]}`; // not expected, but safe
  return m ? m[0] : "/"; // if custom domain, this becomes "/"
}
const BASE = getRepoBase();

/* Resolve a possibly-relative URL to an absolute path from the repo root. */
function toRootAbsolute(url) {
  if (!url) return url;
  const trimmed = url.trim();
  // ignore anchors, mailto, tel, absolute http(s), protocol-relative, and already absolute-root (/...)
  if (
    trimmed.startsWith("#") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:") ||
    /^https?:\/\//i.test(trimmed) ||
    trimmed.startsWith("//") ||
    trimmed.startsWith(BASE) ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }
  // make it root-absolute under the repo
  return BASE + trimmed.replace(/^\.?\//, "");
}

/* After injecting HTML, fix all relative href/src inside that container */
function absolutizeLinks(container) {
  if (!container) return;
  const selector = [
    "a[href]",
    "link[href]",
    "script[src]",
    "img[src]",
    "source[src]",
    "video[src]",
    "audio[src]",
    "use[href]"
  ].join(",");
  container.querySelectorAll(selector).forEach(el => {
    if (el.hasAttribute("href")) el.setAttribute("href", toRootAbsolute(el.getAttribute("href")));
    if (el.hasAttribute("src")) el.setAttribute("src", toRootAbsolute(el.getAttribute("src")));
  });
}

/* ========== INCLUDE NAVBAR + FOOTER ========== */

function loadPartial(targetId, filename, afterInsert) {
  const target = document.getElementById(targetId);
  if (!target) return;
  // IMPORTANT: fetch *from repo root*, works on any subfolder
  fetch(`${BASE}${filename}`)
    .then(res => {
      if (!res.ok) throw new Error(`${filename} not found`);
      return res.text();
    })
    .then(html => {
      target.innerHTML = html;
      // rewrite any relative URLs inside the injected HTML
      absolutizeLinks(target);
      if (typeof afterInsert === "function") afterInsert();
    })
    .catch(err => {
      console.error(`Failed to load ${filename}:`, err);
    });
}

/* ========== NAVBAR INTERACTIONS ========== */

function initNavbarFeatures() {
  // mobile: close when clicking outside
  document.addEventListener("click", function (e) {
    const navbarMenu = document.getElementById("navbarMenu");
    const toggler = document.querySelector(".navbar-toggler");
    if (!navbarMenu || !toggler) return;

    const isOpen = navbarMenu.classList.contains("show");
    const clickedInside = navbarMenu.contains(e.target) || toggler.contains(e.target);
    if (window.innerWidth < 992 && isOpen && !clickedInside) {
      try {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarMenu);
        bsCollapse.hide();
      } catch (_) {}
    }
  });

  // optional dedicated close button for offcanvas style menus
  const closeBtn = document.querySelector(".mobile-close-btn");
  const navbarMenu = document.getElementById("navbarMenu");
  if (closeBtn && navbarMenu) {
    closeBtn.addEventListener("click", function () {
      try {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarMenu);
        bsCollapse.hide();
      } catch (_) {}
    });
  }

  // hover dropdowns on desktop
  document.querySelectorAll(".navbar .dropdown").forEach(dropdown => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    if (!toggle) return;

    dropdown.addEventListener("mouseenter", function () {
      if (window.innerWidth >= 992) {
        try {
          bootstrap.Dropdown.getOrCreateInstance(toggle).show();
        } catch (_) {}
      }
    });

    dropdown.addEventListener("mouseleave", function () {
      if (window.innerWidth >= 992) {
        try {
          bootstrap.Dropdown.getOrCreateInstance(toggle).hide();
        } catch (_) {}
      }
    });

    // optional: redirect on heading click (desktop only)
    if (toggle.dataset.redirect) {
      toggle.addEventListener("click", function () {
        if (window.innerWidth >= 992) window.location.href = toggle.dataset.redirect;
      });
    }
  });

  // add/remove .scrolled on navbar
  const navbar = document.querySelector(".navbar");
  function onScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll);
  onScroll(); // initialize on load in case page starts scrolled
}

/* ========== PARALLAX SAFE INIT (Rellax) ========== */

function initParallax() {
  // Only run if Rellax is loaded and there are elements to parallax
  const hasParallaxEls = document.querySelector(".parallax");
  if (!hasParallaxEls) return;

  if (typeof Rellax !== "undefined") {
    try {
      // init exactly once
      if (!window.__rellaxInstance) {
        window.__rellaxInstance = new Rellax(".parallax");
      }
    } catch (e) {
      console.warn("Rellax init failed:", e);
    }
  } else {
    // If Rellax not loaded for some page, fail gracefully.
    // (Optional) you could add a tiny scroll effect here with CSS/JS if desired.
  }
}

/* ========== BOOTSTRAP ORDER SAFETY CHECK ========== */

function bootstrapReady() {
  return typeof bootstrap !== "undefined" && bootstrap.Collapse && bootstrap.Dropdown;
}

/* ========== DOM READY ========== */

document.addEventListener("DOMContentLoaded", function () {
  // load navbar then init features (needs Bootstrap to be present already)
  loadPartial("navbar", "navbar.html", function () {
    if (bootstrapReady()) initNavbarFeatures();
    else console.warn("Bootstrap not ready when initializing navbar features.");
  });

  // load footer (no JS init required)
  loadPartial("footer", "footer.html");

  // init parallax after everything is in the DOM
  initParallax();
});



  window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


function initNavbarFeatures() {
    // Mobile close button
    const closeBtn = document.querySelector('.mobile-close-btn');
    const navbarMenu = document.getElementById('navbarMenu');
    closeBtn?.addEventListener('click', function() {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navbarMenu);
        bsCollapse.hide();
    });

    // Hover dropdowns for desktop
    const dropdowns = document.querySelectorAll('.navbar .dropdown');
    dropdowns.forEach(function(dropdown) {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (!toggle) return;
        // Show dropdown on hover (desktop only)
        dropdown.addEventListener('mouseenter', function() {
            if (window.innerWidth >= 992) {
                const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(toggle);
                bsDropdown.show();
            }
        });
        dropdown.addEventListener('mouseleave', function() {
            if (window.innerWidth >= 992) {
                const bsDropdown = bootstrap.Dropdown.getOrCreateInstance(toggle);
                bsDropdown.hide();
            }
        });
        // Redirect on click for heading
        if (toggle.dataset.redirect) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth >= 992) {
                    window.location.href = toggle.dataset.redirect;
                }
            });
        }
    });
}