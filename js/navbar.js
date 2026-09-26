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






/* ==================================================
   NAVBAR — HIDE / SHOW ON SCROLL
================================================== */

const navbar = document.querySelector(".navbar");

let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbar() {

    const currentScrollY = window.scrollY;

    // Tout en haut → navbar toujours visible
    if (currentScrollY <= 0) {
        navbar.classList.remove("navbar-hidden");
    }

    // Scroll vers le bas → cacher
    else if (currentScrollY > lastScrollY) {
        navbar.classList.add("navbar-hidden");
    }

    // Scroll vers le haut → afficher
    else if (currentScrollY < lastScrollY) {
        navbar.classList.remove("navbar-hidden");
    }

    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener("scroll", () => {

    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }

}, { passive: true });












        /* ==================================================
           NAVBAR

        ================================================== */
        
        /*

        const navbar =
            document.querySelector(".navbar");


        gsap.set(navbar, {

            mixBlendMode: "difference",

            color: "#ffffff"

        });
*/