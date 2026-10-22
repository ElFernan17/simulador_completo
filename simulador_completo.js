
let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;


//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios


function ocultarSecciones() {
  document.getElementById("clientes").classList.remove("activa");
  document.getElementById("parametros").classList.remove("activa");

}

function mostrarSeccion(id) {
  ocultarSecciones();
  document.getElementById(id).classList.add("activa");
}

function guardarTasa() {
  let tasa = document.getElementById("tasaInteres").value
  let mensajeTasa = document.getElementById("mensajeTasa")
  if (tasa < 21 & tasa > 9) {
    mensajeTasa.innerHTML = "<h5>✔ Si es válido:</h5>" +
      "<p><h5>Tasa configurada correctamente: 15%</h5></p>"
  } else {
    mensajeTasa.innerHTML = "<h5> La tasa debe estar entre 10% y 20%</h5>"
  }
}

function guardarCliente() {

  let cedulaCliente = document.getElementById("txtCedula").value

  let clienteBuscado = buscarCliente(cedulaCliente);

  if (clienteBuscado != null) {

    let valorNombre = document.getElementById("txtNombre").value
    let valorApellido = document.getElementById("txtApellido").value
    let valorIngresos = parseInt(document.getElementById("txtIngresos").value)
    let ValorEgresos = parseInt(document.getElementById("txtEgresos").value)

    clienteBuscado.nombre = valorNombre
    clienteBuscado.apellido = valorApellido
    clienteBuscado.ingresos = valorIngresos
    clienteBuscado.egresos = ValorEgresos

  } else if (clienteBuscado == null) {
    
    let valorNombre = document.getElementById("txtNombre").value
    let valorApellido = document.getElementById("txtApellido").value
    let valorCedula = document.getElementById("txtCedula").value
    let valorIngresos = parseInt(document.getElementById("txtIngresos").value)
    let ValorEgresos = parseInt(document.getElementById("txtEgresos").value)

    let clienteNuevo = {}

    clienteNuevo.nombre = valorNombre
    clienteNuevo.apellido = valorApellido
    clienteNuevo.cedula = valorCedula
    clienteNuevo.ingresos = valorIngresos
    clienteNuevo.egresos = ValorEgresos

    clientes.push(clienteNuevo)
  }

  pintarClientes();
}

function pintarClientes() {
  let cmpTabla = document.getElementById("tablaClientes")
  let contenidoTabla = "<table>"

  let cliente
  for (i = 0; i < clientes.length; i++) {
    cliente = clientes[i]
    contenidoTabla += "<tr>" +
      "<td>" + cliente.cedula + "</td>" +
      "<td>" + cliente.nombre + "</td>" +
      "<td>" + cliente.apellido + "</td>" +
      "<td>" + cliente.ingresos + "</td>" +
      "<td>" + cliente.egresos + "</td>" +
      "<td>" +
      "<button onclick=" +
      "seleccionarCliente('" + cliente.cedula + "');>" +
      "Actualizar</button>" +
      "<button>Eliminar</button>" +
      "</td>" +
      "</tr>"
  }

  contenidoTabla += "</table>"

  cmpTabla.innerHTML = contenidoTabla
}

function buscarCliente(cedula) {
  let elementoCliente;
  let clienteEncontrado = null;

  for (i = 0; i < clientes.length; i++) {
    elementoCliente = clientes[i]

    if (elementoCliente.cedula == cedula) {
      clienteEncontrado = elementoCliente;
      break
    }
  }
  return clienteEncontrado

}

function seleccionarCliente(cedula) {
  let clienteSeleccionado = buscarCliente(cedula);

  document.getElementById("txtNombre").value = clienteSeleccionado.nombre
  document.getElementById("txtApellido").value = clienteSeleccionado.apellido
  document.getElementById("txtCedula").value = clienteSeleccionado.cedula
  document.getElementById("txtIngresos").value = clienteSeleccionado.ingresos
  document.getElementById("txtEgresos").value = clienteSeleccionado.egresos
}

function limpiar(){
  document.getElementById("txtNombre").value = ""
  document.getElementById("txtApellido").value = ""
  document.getElementById("txtCedula").value = ""
  document.getElementById("txtIngresos").value = ""
  document.getElementById("txtEgresos").value = ""
}