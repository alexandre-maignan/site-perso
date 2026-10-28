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
       
       Le menu reste ouvert lors du changement
       de page.

       Il se ferme uniquement si le lien correspond
       à la page actuellement affichée.
    ================================================== */

    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    const currentPage =
                        window.location.pathname.split("/").pop() ||
                        "index.html";

                    const linkPage =
                        link.getAttribute("href").split("/").pop();

                    if (linkPage === currentPage) {

                        closeMenu();

                    }

                }
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

    const TOP_THRESHOLD = 300; 
    const HIDE_THRESHOLD = 150; 
    const BOTTOM_MARGIN = 100; // marge avant le bas de page

    let lastScrollY = window.scrollY; 


    /* 
       Le système navbar-top est activé 
       uniquement si la classe existe 
       initialement dans le HTML. 
    */ 
    const hasNavbarTop = 
        navbar.classList.contains("navbar-top"); 


    function updateNavbar() { 

        const currentScrollY = window.scrollY; 

        /* ================================================== 
           CALCUL DU BAS DE PAGE
        ================================================== */ 

        const pageHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;

        const distanceFromBottom =
            pageHeight - (currentScrollY + viewportHeight);


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
           ACTIVÉ APRÈS 150 PX
        ================================================== */ 

        if (distanceFromBottom <= BOTTOM_MARGIN) {

            // ↓ Près du bas de la page → toujours visible
            navbar.classList.remove("navbar-hidden");

        }

        else if ( 
            currentScrollY > lastScrollY && 
            currentScrollY > HIDE_THRESHOLD 
        ) { 

            // ↓ Scroll vers le bas
            navbar.classList.add("navbar-hidden"); 

        } 

        else if (currentScrollY < lastScrollY) { 

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