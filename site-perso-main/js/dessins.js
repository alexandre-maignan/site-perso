/* ==================================================
   APPARITION PROGRESSIVE DES IMAGES
================================================== */

const drawingCards = document.querySelectorAll(".drawing-card");

drawingCards.forEach((card, index) => {

    card.style.transitionDelay = `calc(${index} * var(--gallery-stagger))`;

    requestAnimationFrame(() => {
        card.classList.add("visible");
    });

});




/* ==================================================
   LAZY LOADING DES IMAGES DE LA GALERIE
================================================== */

const galleryImages = document.querySelectorAll(".gallery img");

const imagesToLoadImmediately = window.innerWidth <= 600 ? 1 : 3;

galleryImages.forEach((image, index) => {

    if (index >= imagesToLoadImmediately) {
        image.loading = "lazy";
    }

});


































document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       LIGHTBOX
    ========================= */

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxClose = document.getElementById("lightbox-close");

    const galleryImages = document.querySelectorAll(".drawing-card img");

    if (!lightbox || !lightboxImage || !lightboxClose) {
        return;
    }


    /* =========================
       ZOOM
    ========================= */

    let scale = 1;
    let targetScale = 1;

    const minScale = 1;
    const maxScale = 4;

    let animationFrame = null;


    /* =========================
       DÉPLACEMENT
    ========================= */

    let translateX = 0;
    let translateY = 0;

    let isDragging = false;

    let startX = 0;
    let startY = 0;

    let initialX = 0;
    let initialY = 0;


    /* =========================
       PINCH MOBILE
    ========================= */

    let isPinching = false;

    let initialPinchDistance = 0;
    let initialPinchScale = 1;


    /* =========================
       POSITION IMAGE
    ========================= */

    function updateImage() {

        lightboxImage.style.transform =
            `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;

    }


    /* =========================
       ANIMATION ZOOM
    ========================= */

    function animateZoom() {

        scale += (targetScale - scale) * 0.12;

        updateImage();

        if (Math.abs(targetScale - scale) > 0.001) {

            animationFrame =
                requestAnimationFrame(animateZoom);

        } else {

            scale = targetScale;

            updateImage();

            animationFrame = null;

        }

    }


    function startZoomAnimation() {

        if (!animationFrame) {

            animationFrame =
                requestAnimationFrame(animateZoom);

        }

    }


    /* =========================
       DISTANCE ENTRE 2 DOIGTS
    ========================= */

    function getTouchDistance(touch1, touch2) {

        const dx =
            touch2.clientX - touch1.clientX;

        const dy =
            touch2.clientY - touch1.clientY;

        return Math.sqrt(
            dx * dx + dy * dy
        );

    }


    /* =========================
       BLOQUER LE SCROLL
    ========================= */

    function lockScroll() {

        document.body.classList.add("lightbox-open");

        if (typeof lenis !== "undefined") {
            lenis.stop();
        }

    }


    /* =========================
       RÉACTIVER LE SCROLL
    ========================= */

    function unlockScroll() {

        document.body.classList.remove("lightbox-open");

        if (typeof lenis !== "undefined") {
            lenis.start();
        }

    }


    /* =========================
       OUVRIR
    ========================= */

    galleryImages.forEach(image => {

        image.addEventListener("click", () => {

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            scale = 1;
            targetScale = 1;

            translateX = 0;
            translateY = 0;

            updateImage();

            lightbox.classList.add("active");

            lockScroll();

        });

    });


    /* =========================
       ZOOM DESKTOP
       MOLETTE
    ========================= */

    lightboxImage.addEventListener("wheel", event => {

        event.preventDefault();
        event.stopPropagation();

        if (event.deltaY < 0) {

            targetScale += 0.15;

        } else {

            targetScale -= 0.15;

        }

        targetScale = Math.max(
            minScale,
            Math.min(maxScale, targetScale)
        );


        if (targetScale === minScale) {

            translateX = 0;
            translateY = 0;

        }

        startZoomAnimation();

    }, { passive: false });


    /* =========================
       TOUCH START
    ========================= */

    lightboxImage.addEventListener("touchstart", event => {

        event.preventDefault();

        /* PINCH */

        if (event.touches.length === 2) {

            isPinching = true;

            initialPinchDistance =
                getTouchDistance(
                    event.touches[0],
                    event.touches[1]
                );

            initialPinchScale = scale;

            return;
        }


        /* DRAG */

        if (
            event.touches.length === 1 &&
            scale > 1
        ) {

            isDragging = true;

            startX = event.touches[0].clientX;
            startY = event.touches[0].clientY;

            initialX = translateX;
            initialY = translateY;

        }

    }, { passive: false });


    /* =========================
       TOUCH MOVE
    ========================= */

    lightboxImage.addEventListener("touchmove", event => {

        event.preventDefault();
        event.stopPropagation();


        /* =========================
           PINCH
        ========================= */

        if (
            isPinching &&
            event.touches.length === 2
        ) {

            const currentDistance =
                getTouchDistance(
                    event.touches[0],
                    event.touches[1]
                );


            const ratio =
                currentDistance /
                initialPinchDistance;


            targetScale =
                initialPinchScale * ratio;


            targetScale = Math.max(
                minScale,
                Math.min(maxScale, targetScale)
            );


            scale = targetScale;

            updateImage();

            return;
        }


        /* =========================
           DRAG
        ========================= */

        if (
            isDragging &&
            event.touches.length === 1 &&
            scale > 1
        ) {

            translateX =
                initialX +
                (
                    event.touches[0].clientX -
                    startX
                );


            translateY =
                initialY +
                (
                    event.touches[0].clientY -
                    startY
                );


            updateImage();

        }

    }, { passive: false });


    /* =========================
       TOUCH END
    ========================= */

    lightboxImage.addEventListener("touchend", event => {

        if (event.touches.length < 2) {

            isPinching = false;

        }

        if (event.touches.length === 0) {

            isDragging = false;

        }


        /* Retour à 100 % */

        if (scale <= minScale) {

            scale = minScale;
            targetScale = minScale;

            translateX = 0;
            translateY = 0;

            updateImage();

        }

    });


    /* =========================
       COMMENCER LE DÉPLACEMENT
       SOURIS
    ========================= */

    lightboxImage.addEventListener("mousedown", event => {

        if (scale <= 1) {
            return;
        }

        isDragging = true;

        startX = event.clientX;
        startY = event.clientY;

        initialX = translateX;
        initialY = translateY;

        lightboxImage.style.cursor = "grabbing";

        event.preventDefault();

    });


    /* =========================
       DÉPLACER L'IMAGE
       SOURIS
    ========================= */

    document.addEventListener("mousemove", event => {

        if (!isDragging) {
            return;
        }

        translateX =
            initialX +
            (event.clientX - startX);

        translateY =
            initialY +
            (event.clientY - startY);

        updateImage();

    });


    /* =========================
       ARRÊTER DRAG
       SOURIS
    ========================= */

    document.addEventListener("mouseup", () => {

        if (!isDragging) {
            return;
        }

        isDragging = false;

        lightboxImage.style.cursor =
            scale > 1
                ? "grab"
                : "default";

    });


    /* =========================
       FERMER
    ========================= */

    function closeLightbox() {

        lightbox.classList.remove("active");

        scale = 1;
        targetScale = 1;

        translateX = 0;
        translateY = 0;

        isDragging = false;
        isPinching = false;

        if (animationFrame) {

            cancelAnimationFrame(animationFrame);

            animationFrame = null;

        }

        updateImage();

        lightboxImage.style.cursor = "default";

        unlockScroll();

    }


    /* =========================
       BOUTON FERMER
    ========================= */

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );


    /* =========================
       CLIC SUR LE FOND
    ========================= */

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    /* =========================
       ESC
    ========================= */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains("active")
        ) {

            closeLightbox();

        }

    });

});