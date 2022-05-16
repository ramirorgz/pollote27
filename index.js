/* VARIABLE */
const navToggle = document.querySelector(".navbar-toggler");
const navMenu = document.querySelector(".navbar-nav");
let listaClientes = [];
let btnGuardar = document.querySelector("#btnGuardar");
let btnComprar = document.getElementsByClassName(".btnComprar");
const containerData = document.querySelector(".containerDatos");

/* CUANDO SE COMPLETE FORMULARIO, ENVIAR EL PEDIDO DESEADO AL LOCAL*/
const btnPedidoRealizado = document.querySelector("#enviarPedido");

/* MAIN */

/* CREA EL CLIENTE */
class Cliente {
  constructor(nombre, domicilio, telefono, pago) {
    this.nombre = nombre;
    this.domicilio = domicilio;
    this.telefono = telefono;
    this.pago = pago;
  }
}
/* CREA ARRAY DE PRODUCTOS */

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

/* ESTE ES EL MENU COMPLETO */
let menuCompleto = pollos.concat(sanguches, cheff);

/* FUNCIONES */

/* FORMULARIO */

const crearCLiente = () => {
  let nombre = document.querySelector("#nombre").value;
  let domicilio = document.querySelector("#domicilio").value;
  let telefono = document.querySelector("#telefono").value;
  let pago = document.querySelector("#pago").value;

  const nuevoCliente = new Cliente(nombre, domicilio, telefono, pago);
  console.log(nuevoCliente);

  let listaClientes2 = [];

  /* GUARDA CLIENTES EN LA LISTA */

  if (localStorage.getItem("Clientes") != null) {
    listaClientes2 = JSON.parse(localStorage.getItem("Clientes"));
    listaClientes2.push(nuevoCliente);
    localStorage.setItem("Clientes", JSON.stringify(listaClientes2));
  } else {
    listaClientes.push(nuevoCliente);
    localStorage.setItem("Clientes", JSON.stringify(listaClientes));
  }
  listaClientes.push(nuevoCliente);
  return nuevoCliente;
};

const verificarStorage = () => {
  let lista = [];
  if (localStorage.getItem("Clientes") != null) {
    lista = JSON.parse(localStorage.getItem("Clientes"));
    return lista;
  }
};

const guardar = () => {
  crearCLiente();
  if (verificarStorage() != undefined) {
    localStorage.setItem("Clientes", JSON.stringify(verificarStorage()));
  } else {
    localStorage.setItem("Clientes", JSON.stringify(listaClientes));
  }
};

/* TRAIGO LAS PROMOS DESDE EL ARRAY JSON */

const promos = () => {
  fetch("promos.json")
    .then((response) => response.json())
    .then((result) => {
      let data = result;
      /*console.log(data);*/
      data.forEach((promo) => {
        containerData.innerHTML += `
              <h4>${promo.nombre}</h4>
              <p>${promo.precio}</p>
              
            `;
      });
    })
    .catch((error) => console.log(error));
  /* (containerData.innerHTML += `<div>Por favor, ingrese sus datos para enviarle el pedido.</div>`) */
};
console.log(promos());
/* EVENTOS */
/* CLICK EN COMPRAR, ABRIR FORMULARIO */

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("navbar-nav_visible");
  ///////// CUANDO MENU ESTE ABIERTO, COLOCAR ARIA-LABEL "CERRAR MENU"; DE LO CONTRARIO "ABRIR MENU"/////

  if (navMenu.classList.contains("navbar-nav_visible")) {
    navToggle.setAttribute("aria-label", "CerrarMenu");
  } else {
    navToggle.setAttribute("aria-label", "AbrirMenu");
  }
});

/*btnComprar.addEventListener("click", () => {
  e.preventDefault();
  datosClientes();
});*/

btnGuardar.addEventListener("click", (e) => {
  e.preventDefault();
  guardar();
});

// OPTIMIZACION CON OPERADORES AVANZADOS///

console.log(
  localStorage.getItem("Clientes") || "Estamos esperando el primer cliente..."
);

/* QUE LOS DATOS DEL FORMULARIO JUNTO CON EL PRODUCTO ELEGIDO SE IMPRIMA EN UN DIV, MODO TEXTO */
/* ENVIAR ESE DIV POR WHATSAPP O MAIL */
