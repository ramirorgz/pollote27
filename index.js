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
/* COMENZAMOS */

class Promos {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

let listaPromos = [];

const agregarPromo = () => {
  let promo = new Promos(nombre, precio);
  listaPromos.push(promo);
};

listaPromos.push(new Promos("promo1", 1400));
listaPromos.push(new Promos("promo2", 1500));
listaPromos.push(new Promos("promo3", 1700));

console.log(listaPromos);
