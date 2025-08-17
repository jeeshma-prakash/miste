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

fetch('navbar.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('navbar').innerHTML = data;
        initNavbarFeatures();
    });

fetch('footer.html')
    .then(res => res.text())
    .then(data => document.getElementById('footer').innerHTML = data);


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