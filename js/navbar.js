/* ==================================================
   MENU MOBILE
================================================== */

const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");


if (
    menuToggle &&
    menuClose &&
    mobileMenu &&
    mobileMenuOverlay
) {


    /* ==================================================
       OUVRIR LE MENU
    ================================================== */

    function openMenu() {

        mobileMenu.classList.add("active");
        mobileMenuOverlay.classList.add("active");

        document.body.classList.add("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Fermer le menu"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    /* ==================================================
       FERMER LE MENU
    ================================================== */

    function closeMenu() {

        mobileMenu.classList.remove("active");
        mobileMenuOverlay.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Ouvrir le menu"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* ==================================================
       OUVERTURE
    ================================================== */

    menuToggle.addEventListener(
        "click",
        openMenu
    );


    /* ==================================================
       FERMETURE
    ================================================== */

    menuClose.addEventListener(
        "click",
        closeMenu
    );


    /* ==================================================
       CLIC SUR L'OVERLAY
    ================================================== */

    mobileMenuOverlay.addEventListener(
        "click",
        closeMenu
    );


    /* ==================================================
       CLIC SUR UN LIEN
    ================================================== */

    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


    /* ==================================================
       FERMETURE AVEC ESC
    ================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                mobileMenu.classList.contains("active")
            ) {

                closeMenu();

            }

        }
    );

}




































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







/* ==================================================
   NAVBAR — NAVBAR-TOP + HIDE ON SCROLL
================================================== */

const navbar = document.querySelector(".navbar");

if (navbar) {

    const TOP_THRESHOLD = 100;

    let lastScrollY = window.scrollY;

    /*
       Le système navbar-top est activé
       uniquement si la classe existe
       initialement dans le HTML.
    */
    const hasNavbarTop = navbar.classList.contains("navbar-top");


    function updateNavbar() {

        const currentScrollY = window.scrollY;


        /* ==================================================
           NAVBAR-TOP
        ================================================== */

        if (hasNavbarTop) {

            navbar.classList.toggle(
                "navbar-top",
                currentScrollY < TOP_THRESHOLD
            );

        }


        /* ==================================================
           NAVBAR HIDE / SHOW
        ================================================== */

        if (
            currentScrollY > lastScrollY &&
            currentScrollY > TOP_THRESHOLD
        ) {

            // ↓ Scroll vers le bas
            navbar.classList.add("navbar-hidden");

        } else if (currentScrollY < lastScrollY) {

            // ↑ Scroll vers le haut
            navbar.classList.remove("navbar-hidden");

        }


        /* ==================================================
           MÉMOIRE
        ================================================== */

        lastScrollY = currentScrollY;
    }


    /* ==================================================
       INITIALISATION
    ================================================== */

    updateNavbar();


    /* ==================================================
       SCROLL
    ================================================== */

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

}