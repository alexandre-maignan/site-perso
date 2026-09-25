/* ==================================================
   ANNÉE DU FOOTER
================================================== */

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}



















document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", e => {
        const targetURL = new URL(link.href, window.location.href);

        if (
            targetURL.pathname === window.location.pathname &&
            targetURL.search === window.location.search &&
            targetURL.hash === window.location.hash
        ) {
            e.preventDefault();
        }
    });
});


document.querySelectorAll(".nav-menu-content a").forEach(link => {
    link.addEventListener("click", e => {
        const targetURL = new URL(link.href, window.location.href);

        if (
            targetURL.pathname === window.location.pathname &&
            targetURL.search === window.location.search &&
            targetURL.hash === window.location.hash
        ) {
            e.preventDefault();

            // Fermer le menu mobile
            closeMenu();
        }
    });
});