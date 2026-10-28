const lenis = new Lenis({
    duration: 1.4,
    smoothWheel: true,
    syncTouch: false,
    wheelMultiplier: 1,
    smoothTouch: false
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


// =========================
// LIENS D'ANCRAGE
// =========================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        event.preventDefault();

        lenis.scrollTo(target, {
            duration: 1.2
        });

    });

});