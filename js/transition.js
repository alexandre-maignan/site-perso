document.addEventListener("DOMContentLoaded", () => {

    const panel =
        document.querySelector(
            ".page-transition-panel"
        );

    const main =
        document.querySelector("main");

    const links =
        document.querySelectorAll(".page-link");


    /* ==================================================
       ARRIVÉE SUR LA NOUVELLE PAGE
    ================================================== */

    const transitionIn =
        document.documentElement.classList.contains(
            "transition-in"
        );


    if (transitionIn) {

        /*
        ==========================================
        Le panneau est déjà à 100%.
        On attend que le navigateur ait
        rendu la page.
        ==========================================
        */

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                /*
                ==========================================
                1. Apparition du contenu
                ==========================================
                */

                main.classList.add(
                    "page-content-visible"
                );


                /*
                ==========================================
                2. Le panneau repart vers le haut
                ==========================================
                */

                panel.style.transition =
                    "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)";

                panel.style.transform =
                    "translateY(-100%)";

            });

        });


        /*
        ==========================================
        Quand le panneau a complètement
        disparu vers le haut
        ==========================================
        */

        panel.addEventListener(
            "transitionend",
            event => {

                if (
                    event.propertyName !==
                    "transform"
                ) {
                    return;
                }


                panel.style.transition = "";
                panel.style.transform = "";

                document.documentElement.classList.remove(
                    "transition-in"
                );

            },
            {
                once: true
            }
        );

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


                /*
                ==========================================
                Empêche de recharger la page actuelle
                ==========================================
                */

                if (
                    destination ===
                    window.location.href
                ) {

                    event.preventDefault();

                    return;

                }


                event.preventDefault();


                /*
                ==========================================
                Indique à la prochaine page
                qu'une transition est en cours
                ==========================================
                */

                sessionStorage.setItem(
                    "page-transition",
                    "true"
                );


                /*
                ==========================================
                PREMIÈRE PARTIE

                Le panneau est sous l'écran :

                    100%

                Il monte jusqu'à :

                    0%

                ==========================================
                */

                panel.style.transition =
                    "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)";

                panel.style.transform =
                    "translateY(0)";


                /*
                ==========================================
                Une fois l'écran complètement couvert,
                on change de page.
                ==========================================
                */

                panel.addEventListener(
                    "transitionend",
                    event => {

                        if (
                            event.propertyName !==
                            "transform"
                        ) {
                            return;
                        }


                        window.location.href =
                            destination;

                    },
                    {
                        once: true
                    }
                );

            }
        );

    });

});