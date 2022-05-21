/* VARIABLES GLOBALES*/

const navToggle = document.querySelector(".navbar-toggler");
const navMenu = document.querySelector(".navbar-nav");

let listaPromociones = [];
const containPromos = document.querySelector("#cont__promos");
const btnAbrirForm = document.getElementById("btn__abrirForm");
const formulario = document.getElementById("data__form");
let btnEnviar = document.querySelector("#btnEnviar");

let listaClientes = [];
let nombre = document.getElementById("nombre").value;
let domicilio = document.getElementById("domicilio").value;
let telefono = document.getElementById("telefono").value;

/* MAIN */

/* OBJETOS */
class Cliente {
  constructor(nombre, domicilio, telefono) {
    this.nombre = nombre;
    this.domicilio = domicilio;
    this.telefono = telefono;
  }
}
class Promociones {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
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
let datosValidos = false;

const validarDatos = () => {
  let nombre = document.querySelector("#nombre").value.toUpperCase();
  if (nombre != "" && nombre.length > 3) {
    datosValidos = true;
  }
  let domicilio = document.querySelector("#domicilio").value.toUpperCase();
  if (domicilio != "" && domicilio != null) {
    datosValidos = true;
  }
  let telefono = parseInt(document.querySelector("#telefono").value);
  if (telefono != "" && telefono.length >= 8 && telefono != isNaN()) {
    datosValidos = true;
  } else {
    datosValidos = false;
  }
};

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
/* JSON */
/* TRAIGO LAS PROMOS DESDE EL ARRAY PREDEFINIDO EN JSON */

const promos = () => {
  fetch("promos.json")
    .then((response) => response.json())
    .then((result) => {
      let data = result;
      console.log(data);
      data.forEach((promo) => {
        let listapromo = document.createElement("card");
        listapromo.innerHTML += `
              <h4>${promo.nombre}</h4>
              <p>Precio $${promo.precio}</p>
              <img>${promo.imagen}</img>
              
            `;
        document.querySelector(containPromos).appendChild(listapromo);
      });
    })
    .catch((error) => console.log(error));
};
/* console.log(promos()); */

/* EVENTOS */

/* ABRIR EL MENU NAV */
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("navbar-nav_visible");
  /// CUANDO MENU ESTE ABIERTO, COLOCAR ARIA-LABEL "CERRAR MENU"; DE LO CONTRARIO "ABRIR MENU"///

  if (navMenu.classList.contains("navbar-nav_visible")) {
    navToggle.setAttribute("aria-label", "CerrarMenu");
  } else {
    navToggle.setAttribute("aria-label", "AbrirMenu");
  }
});

/* BOTONES */
const estadoFormulario = {
  mostrar: true,
};

/* CLICK EN COMPRAR, ABRIR FORMULARIO */

btnAbrirForm.onclick = (e) => {
  e.preventDefault();
  if (estadoFormulario.mostrar) {
    formulario.style.opacity = 1;
    estadoFormulario.mostrar = false;
    btnAbrirForm.style.opacity = 0;
  } else {
    formulario.style.opacity = 0;
    estadoFormulario.mostrar = true;
    btnAbrirForm.style.opacity = 1;
  }
};

/* CLICK EN REALIZAR PEDIDO PARA ENVIAR LA INFO DE CONTACTO */

btnEnviar.addEventListener("click", (e) => {
  validarDatos();
  if (datosValidos) {
    guardar();
  } else {
    formulario.innerHTML += `<div>Por favor, ingrese sus datos para enviarle el pedido.</div>`;
  }
});

// OPTIMIZACION CON OPERADORES AVANZADOS///

/* QUE LOS DATOS DEL FORMULARIO JUNTO CON EL PRODUCTO ELEGIDO SE IMPRIMA EN UN DIV, MODO TEXTO */
/* ENVIAR ESE DIV POR WHATSAPP O MAIL */
