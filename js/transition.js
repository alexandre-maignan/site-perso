document.addEventListener("DOMContentLoaded", () => {

    const panel =
        document.querySelector(
            ".page-transition-panel"
        );

    const main =
        document.querySelector("main");

    const links =
        document.querySelectorAll(
            ".page-link, .main-link, .logo"
        );


    /* ==================================================
       COURBE DE BÉZIER
    ================================================== */

    CustomEase.create(
        "pageTransition",
        "M0,0 C0.55,0 0.1,1 1,1"
    );


    /* ==================================================
       ARRIVÉE SUR LA NOUVELLE PAGE
    ================================================== */

    const transitionIn =
        document.documentElement.classList.contains(
            "transition-in"
        );


    if (transitionIn) {

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                main.classList.add(
                    "page-content-visible"
                );


                gsap.to(panel, {

                    y: "-100%",

                    duration: 0.7,

                    ease: "pageTransition",

                    onComplete: () => {

                        gsap.set(panel, {
                            clearProps: "transform"
                        });

                        document.documentElement.classList.remove(
                            "transition-in"
                        );

                    }

                });

            });

        });

    }


    /* ==================================================
       CHANGEMENT DE PAGE
    ================================================== */

    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const destination =
                    link.href;


                event.preventDefault();


                sessionStorage.setItem(
                    "page-transition",
                    "true"
                );


                /* ==================================================
                   MAIN
                   → démarre immédiatement
                   → n'empêche PAS la navigation
                ================================================== */

                gsap.to(main, {

                    y: "-11rem",

                    opacity: 0.6,

                    duration: 0.7,

                    ease: "pageTransition"

                });


                /* ==================================================
                   PANNEAU
                   → démarre après 0.25s
                   → contrôle la navigation
                ================================================== */

                gsap.to(panel, {

                    y: "0%",

                    duration: 0.7,

                    delay: 0.25,

                    ease: "pageTransition",

                    onComplete: () => {

                        window.location.href =
                            destination;

                    }

                });

            }
        );

    });

});