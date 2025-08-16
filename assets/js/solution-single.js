 const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(header => {
        header.addEventListener("click", () => {
            const openItem = document.querySelector(".accordion-header.active");
            if (openItem && openItem !== header) {
                openItem.classList.remove("active");
                openItem.nextElementSibling.style.maxHeight = null;
                openItem.nextElementSibling.classList.remove("open");
            }

            header.classList.toggle("active");
            const content = header.nextElementSibling;
            if (header.classList.contains("active")) {
                content.style.maxHeight = content.scrollHeight + "px";
                content.classList.add("open");
            } else {
                content.style.maxHeight = null;
                content.classList.remove("open");
            }
        });
    });

    // Close accordion when clicking outside
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".accordion-container")) {
            headers.forEach(header => {
                header.classList.remove("active");
                header.nextElementSibling.style.maxHeight = null;
                header.nextElementSibling.classList.remove("open");
            });
        }
    });


    // gsaP animation 

    gsap.registerPlugin(ScrollTrigger);

// Animate Hero Section
gsap.from(".hero-title, .hero-overlay h4", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".hero-banner",
        start: "top 80%",
        // toggleActions: "play reverse play reverse"
    }
});

// Animate Problem Section Cards
gsap.utils.toArray(".card1").forEach((card, i) => {
    gsap.from(card, {
        opacity: 0,
        x: i % 2 === 0 ? -100 : 100,
        duration: 1,
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            // toggleActions: "play reverse play reverse"
        }
    });
});

// Animate Images in Problem Section
gsap.utils.toArray(".frame img").forEach((img) => {
    gsap.from(img, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        scrollTrigger: {
            trigger: img,
            start: "top 85%",
            // toggleActions: "play reverse play reverse"
        }
    });
});

// Animate Problem-Solve Cards
gsap.utils.toArray(".cards-container .card").forEach((card) => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
            trigger: card,
            start: "top 90%",
            // toggleActions: "play reverse play reverse"
        }
    });
});

// API Section Animation
gsap.from(".api-text", {
    opacity: 0,
    x: -100,
    duration: 1,
    scrollTrigger: {
        trigger: ".api-text",
        start: "top 85%",
        // toggleActions: "play reverse play reverse"
    }
});
gsap.from(".api-img img", {
    opacity: 0,
    x: 100,
    duration: 1,
    scrollTrigger: {
        trigger: ".api-img",
        start: "top 85%",
        // toggleActions: "play reverse play reverse"
    }
});

// Logos Section Animation
gsap.utils.toArray(".logos-container .logo1").forEach((logo, i) => {
    gsap.from(logo, {
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        delay: i * 0.05,
        scrollTrigger: {
            trigger: logo,
            start: "top 90%",
            // toggleActions: "play reverse play reverse"
        }
    });
});

// FAQ Accordion Animation
gsap.utils.toArray(".accordion-container .accordion-item").forEach((item, i) => {
    gsap.from(item, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        delay: i * 0.1,
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
            // toggleActions: "play reverse play reverse"
        }
    });
});