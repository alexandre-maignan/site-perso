/* ==================================================
   ANNÉE DU FOOTER
================================================== */

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}























/* ==================================================
   EMPÊCHER LE RECHARGEMENT DE LA PAGE COURANTE
================================================== */

document.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", e => {

        const targetURL = new URL(
            link.href,
            window.location.href
        );

        if (
            targetURL.pathname === window.location.pathname &&
            targetURL.search === window.location.search &&
            targetURL.hash === window.location.hash
        ) {

            e.preventDefault();

        }

    });

});


/* ==================================================
   LIENS DU MENU MOBILE
   FERMER LE MENU AU CLIC
================================================== */

document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        closeMenu();

    });

});