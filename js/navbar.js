/* ==================================================
   MENU MOBILE
================================================== */

const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const navLinks = document.getElementById("nav-links");


if (menuToggle && menuClose && navLinks) {

    function openMenu() {

        navLinks.classList.add("active");
        document.body.classList.add("menu-open");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Fermer le menu");

    }


    function closeMenu() {

        navLinks.classList.remove("active");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Ouvrir le menu");

    }


    menuToggle.addEventListener("click", openMenu);
    menuClose.addEventListener("click", closeMenu);

}

















/* ==================================================
   NAVBAR — SCROLL
================================================== */

const navbar = document.querySelector(".navbar");
const logo = document.querySelector(".logo");

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {

    const currentScrollY = window.scrollY;

    /* Logo */
    if (logo) {
        logo.classList.toggle("scrolled", currentScrollY > 50);
    }

    /* Navbar */
    if (
        navbar &&
        (!navLinks || !navLinks.classList.contains("active"))
    ) {
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            navbar.classList.add("navbar-hidden");
        } else {
            navbar.classList.remove("navbar-hidden");
        }
    }

    lastScrollY = currentScrollY;

}, { passive: true });



























document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector(".navbar");
    const hero = document.querySelector(".hero");

    if (!navbar || !hero) {
        return;
    }

    function updateNavbar() {

        const heroRect = hero.getBoundingClientRect();

        navbar.classList.toggle(
            "navbar-over-hero",
            heroRect.bottom > 0
        );
    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    window.addEventListener("resize", updateNavbar);

});




















document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector(".navbar");

    if (!navbar) {
        return;
    }

    gsap.from(navbar, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });

});





