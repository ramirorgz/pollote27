const navToggle = document.querySelector(".nav-toggler");
const navMenu = document.querySelector(".navbar-nav");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("navbar-nav_visible");
  if (navMenu.classList.contains("nav-menu_visible")) {
    navToggle.setAttribute("aria-label", "CerrarMenu");
  } else {
    navToggle.setAttribute("aria-label", "AbrirMenu");
  }
});
