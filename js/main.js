/* ==================================================
   ANNÉE DU FOOTER
================================================== */

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}