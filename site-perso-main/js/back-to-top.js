/* =========================
   RETOUR EN HAUT
========================= */

const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }

});

backToTop.addEventListener("click", () => {

    lenis.scrollTo(0, {
        duration: 1.2
    });

});


