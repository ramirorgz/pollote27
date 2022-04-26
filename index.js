const navToggle = document.querySelector(".nav-toggler");
const navMenu = document.querySelector(".navbar-nav");

///////// CUANDO MENU ESTE ABIERTO, COLOCAR ARIA-LABEL "CERRAR MENU"; DE LO CONTRARIO "ABRIR MENU"/////
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("navbar-nav_visible");
  if (navMenu.classList.contains("nav-menu_visible")) {
    navToggle.setAttribute("aria-label", "CerrarMenu");
  } else {
    navToggle.setAttribute("aria-label", "AbrirMenu");
  }
});
