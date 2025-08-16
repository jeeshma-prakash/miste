 const swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 30,
    centeredSlides: false,
    centerInsufficientSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      }
    }
  });

//   modal pop up
  const openModal = document.getElementById("openModal");
  const closeModal = document.getElementById("closeModal");
  const modal = document.getElementById("signupModal");

  openModal.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
// GSAP and ScrollTrigger Initialization gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-livestock",
      start: "top 70%", // when top of section hits 70% of viewport
      toggleActions: "play none none reverse",
    }
  });

  tl.from(".phone-image", {
    x: -200,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  })
  .from(".phone-image2", {
    x: 200,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  }, "-=1") // starts at the same time as previous

  .from(".info-boxes .info-box", {
    y: 100,
    opacity: 0,
    duration: 2,
    stagger: 0.3,
    ease: "power3.out"
  }, "-=0.5");


  // industries we serve
 
document.querySelectorAll(".carousel-track").forEach(track => {
  track.innerHTML += track.innerHTML; // clone for seamless loop
});