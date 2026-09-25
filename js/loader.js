

    /* ==================================================
       PAGE LOADER
    ================================================== */

    const LOADER_DURATION = 1.2;
    const ANIMATION_OVERLAP = 0.4;

    const pageLoader =
        document.querySelector("#page-loader");

    const loaderProgress =
        document.querySelector("#loader-progress");

    let progressAnimation = null;


    /* ==================================================
       PROGRESSION
    ================================================== */

    function updateLoaderProgress(value) {

        if (!loaderProgress) {
            return;
        }

        loaderProgress.textContent =
            `${Math.round(value)}%`;

    }


    function startLoaderProgress() {

        if (!loaderProgress) {
            return;
        }

        const progress = {
            value: 80
        };

        updateLoaderProgress(80);


        progressAnimation = gsap.to(

            progress,

            {
                value: 90,
                duration: 4,
                ease: "power1.out",

                onUpdate: () => {

                    updateLoaderProgress(
                        progress.value
                    );

                }

            }

        );

    }


    function finishLoaderProgress(onComplete) {

        if (!loaderProgress) {

            onComplete();

            return;

        }


        if (progressAnimation) {

            progressAnimation.kill();
            progressAnimation = null;

        }


        const currentValue =
            parseFloat(
                loaderProgress.textContent
            ) || 80;


        const progress = {
            value: currentValue
        };


        gsap.to(

            progress,

            {

                value: 100,
                duration: 0.35,
                ease: "power2.out",

                onUpdate: () => {

                    updateLoaderProgress(
                        progress.value
                    );

                },

                onComplete: () => {

                    updateLoaderProgress(100);

                    onComplete();

                }

            }

        );

    }


    /* ==================================================
       SORTIE DU LOADER
    ================================================== */

    function removeLoader() {

        if (!pageLoader) {

            startPageAnimations();

            return;

        }


        if (!document.body.contains(pageLoader)) {

            startPageAnimations();

            return;

        }


        const loaderTimeline =
            gsap.timeline({

                onComplete: () => {

                    if (
                        pageLoader &&
                        document.body.contains(pageLoader)
                    ) {

                        pageLoader.remove();

                    }

                }

            });


        loaderTimeline.to(

            pageLoader,

            {

                yPercent: -100,
                duration: LOADER_DURATION,
                ease: "power4.inOut"

            }

        );


        loaderTimeline.call(

            () => {

                startPageAnimations();

            },

            null,

            ANIMATION_OVERLAP

        );

    }


    /* ==================================================
       PAGE CHARGÉE
    ================================================== */

    function handlePageLoaded() {

        finishLoaderProgress(

            () => {

                removeLoader();

            }

        );

    }


    /* ==================================================
       INITIALISATION
    ================================================== */

    function initializeLoader() {

        let loaderAlreadyShown = false;


        try {

            loaderAlreadyShown =
                sessionStorage.getItem(
                    "loaderShown"
                ) === "true";

        } catch (error) {

            loaderAlreadyShown = false;

        }


        /* ==================================================
           PAGES SUIVANTES
        ================================================== */

        if (loaderAlreadyShown) {

            if (pageLoader) {

                pageLoader.remove();

            }

            startPageAnimations();

            return;

        }


        /* ==================================================
           PREMIER ACCÈS
        ================================================== */

        try {

            sessionStorage.setItem(
                "loaderShown",
                "true"
            );

        } catch (error) {}

        
        /*
         * Commence directement à 80 %.
         */

        startLoaderProgress();


        if (
            document.readyState === "complete"
        ) {

            handlePageLoaded();

            return;

        }


        window.addEventListener(

            "load",

            handlePageLoaded,

            {
                once: true
            }

        );


        /* ==================================================
           SÉCURITÉ
        ================================================== */

        window.setTimeout(

            () => {

                handlePageLoaded();

            },

            10000

        );

    }


    /* ==================================================
       BFCACHE
    ================================================== */

    window.addEventListener(

        "pageshow",

        event => {

            if (event.persisted) {

                if (pageLoader) {

                    pageLoader.remove();

                }

                showPageImmediately();

            }

        }

    );


    /* ==================================================
       LANCEMENT
    ================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(

            "DOMContentLoaded",

            initializeLoader,

            {
                once: true
            }

        );

    } else {

        initializeLoader();

    }
