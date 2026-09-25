
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
let loaderFinished = false;
let loaderRemoved = false;


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


/* ==================================================
   FIN DE PROGRESSION
================================================== */

function finishLoaderProgress(onComplete) {

    if (loaderFinished) {
        return;
    }

    loaderFinished = true;


    /* Stoppe l'animation 80 → 90 */

    if (progressAnimation) {

        progressAnimation.kill();
        progressAnimation = null;

    }


    /* Pas de compteur */

    if (!loaderProgress) {

        onComplete();

        return;

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

    if (loaderRemoved) {
        return;
    }

    loaderRemoved = true;


    /* Loader inexistant */

    if (!pageLoader) {

        startPageAnimations();

        return;

    }


    /* Loader déjà supprimé */

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

    if (loaderFinished) {
        return;
    }


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

        /*
         * Si sessionStorage est bloqué,
         * le loader fonctionne quand même.
         */

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

    } catch (error) {

        /*
         * Le site continue normalement
         * même si sessionStorage est indisponible.
         */

    }


    /* ==================================================
       DÉPART À 80 %
    ================================================== */

    startLoaderProgress();


    /* ==================================================
       PAGE DÉJÀ CHARGÉE
    ================================================== */

    if (
        document.readyState === "complete"
    ) {

        handlePageLoaded();

        return;

    }


    /* ==================================================
       CHARGEMENT NORMAL
    ================================================== */

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

        5000

    );

}


/* ==================================================
   BFCACHE
================================================== */

window.addEventListener(

    "pageshow",

    event => {

        if (event.persisted) {

            loaderFinished = true;
            loaderRemoved = true;


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
