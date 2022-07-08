/* VARIABLES GLOBALES*/

const navToggle = document.querySelector(".navbar-toggler");
const navMenu = document.querySelector(".navbar-nav");

const btnPromos = document.querySelector("#ver_promos");
const containPromos = document.querySelector("#promociones .row");
let listaPromociones = [];

const btnAbrirForm = document.getElementById("btn__alformulario");

const formulario = document.getElementById("data__formulario");
let btnEnviar = document.querySelector("#btnEnviar");

let listaClientes = localStorage.getItem("Clientes") || [];

const btnUs = document.querySelector("#aboutUs");
const containerUs = document.querySelector(".container__us");

/* MAIN */

/* OBJETOS Y CLASES */

class Promociones {
  constructor(id, imagen, nombre, precio) {
    this.id = id;
    this.imagen = imagen;
    this.nombre = nombre;
    this.precio = precio;
  }
}
class Cliente {
  constructor(nombre, domicilio, telefono) {
    this.nombre = nombre;
    this.domicilio = domicilio;
    this.telefono = telefono;
  }
}

/* ARRAY DE PRODUCTOS VARIOS*/

let pollos = [
  { nombre: "chico", precio: 900 },
  { nombre: "mediano", precio: 1100 },
  { nombre: "grande", precio: 1300 },
];
let sanguches = [
  { nombre: "bondiola", precio: 500 },
  { nombre: "vacio", precio: 500 },
  { nombre: "choripan", precio: 500 },
  { nombre: "morcipan", precio: 500 },
];
let cheff = [
  { nombre: "risoles", precio: 600 },
  { nombre: "tortilla", precio: 700 },
  { nombre: "fritas", precio: 500 },
];

/* MENU COMPLETO */
let menuCompleto = pollos.concat(sanguches, cheff);
console.log(menuCompleto);

/* FUNCIONES */

/* TOMA LOS DATOS INGRESADOS EN EL FORMULARIO Y CREA EL CLIENTE */
const crearCLiente = () => {
  let nombre = document.querySelector("#nombre").value.toUpperCase();
  let domicilio = document.querySelector("#domicilio").value.toUpperCase();
  let telefono = parseInt(document.querySelector("#telefono").value);

  const nuevoCliente = new Cliente(nombre, domicilio, telefono);
  /* ARRAY DENTRO DE LA FUNCION, PARA VERIFICAR SI HAY CLIENTES YA INGRESADOS EN LA LISTA */
  let listaClientes2 = [];

  /* GUARDA CLIENTES EN LA LISTA */

  if (localStorage.getItem("Clientes") != null) {
    listaClientes2 = JSON.parse(localStorage.getItem("Clientes"));
    listaClientes2.push(nuevoCliente);
    localStorage.setItem("Clientes", JSON.stringify(listaClientes2));
  } else {
    localStorage.getItem("Clientes") || "Esperando al primer cliente...";
    listaClientes.push(nuevoCliente);
    localStorage.setItem("Clientes", JSON.stringify(listaClientes));
  }
  listaClientes.push(nuevoCliente);
  return nuevoCliente;
};
/* VALIDEMOS LOS DATOS DEL FORMULARIO */

const validarDatos = () => {
  if (
    $("#nombre").val().length > 0 &&
    $("#domicilio").val().length > 0 &&
    $("#telefono").val().length >= 8
  ) {
    guardar();
    $("small").removeClass("show");
  } else {
    $("small").addClass("show");
  }
};

/* ENVIAR FORMULARIO CON DATOS DEL CLIENTE AL LOCAL */
const enviarDatos = () => {};

const verificarStorage = () => {
  let lista = [];
  if (localStorage.getItem("Clientes") != null) {
    lista = JSON.parse(localStorage.getItem("Clientes"));
    return lista;
  }
};

/* GUARDO LOS CLIENTES EN EL LOCALSTORAGE */
const guardar = () => {
  crearCLiente();
  if (verificarStorage() != undefined) {
    localStorage.setItem("Clientes", JSON.stringify(verificarStorage()));
  } else {
    localStorage.setItem("Clientes", JSON.stringify(listaClientes));
  }
};

/* TRAIGO LAS PROMOS DESDE EL ARRAY PREDEFINIDO EN JSON */

const promos = () => {
  fetch("promos.json")
    .then((response) => response.json())
    .then((result) => {
      let promos = result;
      promos.forEach((promocion) => {
        containPromos.innerHTML += `
      <card class="col-lg-6"><img src="${promocion.imagen}" class="mw-100 p-3"></img>
            <h2>${promocion.nombre}</h2>
            <small>$${promocion.precio}</small>
      </card>
      `;
      });
    })
    .catch((error) => console.log(error));
};

/* INFORMACION DEL LOCAL / REFERENCIAS / DATOS */

const renderUs = () => {
  fetch("nosotros.txt")
    .then((response) => response.text())
    .then(
      (result) =>
        (containerUs.innerHTML = `<p class="fs-2 border text-light">${result}</p>`)
    )
    .catch((error) => console.log(error));
};

/* EVENTOS BOTONES*/

/* MENU INCLUSIVO */
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("navbar-nav_visible");
  /// CUANDO MENU ESTE ABIERTO, COLOCAR ARIA-LABEL "CERRAR MENU"; DE LO CONTRARIO "ABRIR MENU"///

  if (navMenu.classList.contains("navbar-nav_visible")) {
    navToggle.setAttribute("aria-label", "MenuCerrado");
  } else {
    navToggle.setAttribute("aria-label", "MenuAbierto");
  }
});

const estadoFormulario = {
  mostrar: true,
};

/* VER PROMOCIONES */
btnPromos.addEventListener("click", (e) => {
  e.preventDefault();
  promos();
  btnPromos.style.opacity = 0;
});

/* CLICK EN ABRIR FORMULARIO */

btnAbrirForm.onclick = (e) => {
  e.preventDefault();
  if (estadoFormulario.mostrar) {
    formulario.style.opacity = 1;
    btnAbrirForm.style.opacity = 0;
  } else {
    estadoFormulario.mostrar = false;
  }
};

/* CLICK EN REALIZAR PEDIDO PARA ENVIAR LA INFO DE CONTACTO */
let datosValidos = false;

btnEnviar.addEventListener("click", () => {
  validarDatos();
  if (datosValidos) {
    guardar();
    enviarDatos();
  } else {
    formulario.innerHTML += `<div class="error text-light fs-4 bg-dark">Por favor, ingrese sus datos para enviarle el pedido.</div>`;
  }
  return datosValidos;
});

btnUs.addEventListener("mouseover", (e) => {
  e.preventDefault();
  renderUs();
});

/* QUE LOS DATOS DEL FORMULARIO JUNTO CON EL PRODUCTO ELEGIDO SE IMPRIMA EN UN DIV, MODO TEXTO */
