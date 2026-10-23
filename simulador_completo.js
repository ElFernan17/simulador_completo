
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
  document.getElementById("creditos").classList.remove("activa");
  document.getElementById("listaCreditos").classList.remove("activa");

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

function limpiar() {
  document.getElementById("txtNombre").value = ""
  document.getElementById("txtApellido").value = ""
  document.getElementById("txtCedula").value = ""
  document.getElementById("txtIngresos").value = ""
  document.getElementById("txtEgresos").value = ""
}


//taller de simulacion de creadito PARTE 2
function buscarClienteCredito() {
  let cmpCedula = document.getElementById("buscarCedulaCredito").value
  let clienteBuscado = buscarCliente(cmpCedula);
  let cmpDivDatos = document.getElementById("datosClienteCredito")

  if (clienteBuscado != null) {

    cmpDivDatos.innerHTML = "<table> <tr><th>Cédula</th><th>Nombre</th><th>Apellido</th><th>Ingresos</th><th>Egresos</th></tr>" +
      "<td>" + clienteBuscado.cedula + "</td>" +
      "<td>" + clienteBuscado.nombre + "</td>" +
      "<td>" + clienteBuscado.apellido + "</td>" +
      "<td>" + clienteBuscado.ingresos + "</td>" +
      "<td>" + clienteBuscado.egresos + "</td>" +
      "</tr>"


  } else if (clienteBuscado == null) {

    cmpDivDatos.innerHTML = "<h5>Cliente no Encontrado verifique su cedula</h5>"

  }

}

//funciones reutilizadas de simulador de Credito

function calcularDisponible(ingresos, egresos) {
  let disponible = ingresos - egresos;

  if (disponible < 0) {
    return 0;
  }

  return disponible;
}

function calcular() {

  let cmpCedula = document.getElementById("buscarCedulaCredito").value
  let clienteBuscado = buscarCliente(cmpCedula);

  //disponible
  let ingresos = clienteBuscado.ingresos
  let egresos = clienteBuscado.egresos

  let disponible = calcularDisponible(ingresos, egresos);

  let capacidadDePago = calcularCapacidadPago(disponible);

  //intereses simple
  let monto = recuperarFloat("montoCredito");
  let tasa = recuperarFloat("tasaInteres");
  let plazo = recuperarFloat("plazoCredito");

  let interes = calcularInteresSimple(monto, tasa, plazo);

  mostrarTextoSpan("spnInteresPagar", interes)

  //total a pagar
  let totalPagar = calcularTotalPagar(monto, interes);

  mostrarTextoSpan("spnTotalPrestamo", totalPagar)

  //calcular cuota mensual
  let cuotaMensual = calcularCuotaMensual(totalPagar, plazo).toFixed(2)

  cuotaFinal = cuotaMensual

  mostrarTextoSpan("spnCuotaMensual", cuotaMensual)

  let aprobado = aprobarCredito(capacidadDePago, cuotaMensual);

  document.getElementById("btnSolicitarCredito").disabled

  if (aprobado == true) {

    mostrarTextoSpan("spnEstadoCredito", "CREDITO APROBADO")
    resultadoCredito.className = "aprobado"
    document.getElementById("btnSolicitarCredito").disabled = false

  } else {

    mostrarTextoSpan("spnEstadoCredito", "CREDITO RECHAZADO")
    resultadoCredito.className = "rechazado"
    document.getElementById("btnSolicitarCredito").disabled = true

  }
}


//funciones matematicas
function calcularCapacidadPago(montoDisponible) {

  return montoDisponible / 3;
}

function calcularInteresSimple(monto, tasa, plazo) {
  return plazo * monto * (tasa / 100);
}

function calcularTotalPagar(monto, interes) {
  return monto + interes;
}

function calcularCuotaMensual(total, plazo) {
  let meses = plazo * 12;
  return total / meses;
}

function aprobarCredito(capacidadPago, cuotaMensual) {
  return capacidadPago > cuotaMensual;
}


//funciones de utilidades

function recuperarTexto(idComponente) {

  let componente = document.getElementById(idComponente);
  let valor = componente.value;

  return valor
}

function recuperarFloat(idComponente) {

  let valorTexto = recuperarTexto(idComponente);
  let valorFloat = parseFloat(valorTexto);

  return valorFloat;
}

function mostrarTextoSpan(idSpan, texto) {
  const span = document.getElementById(idSpan);
  if (span) {
    span.textContent = texto;
  } else {
    console.error(`No se encontró un elemento con id "${idSpan}"`);
  }
}

let cuotaFinal

function asignarCredito() {

  let cmpCedula = document.getElementById("buscarCedulaCredito").value
  let clienteBuscado = buscarCliente(cmpCedula);

  let montoCalculado = recuperarFloat("montoCredito");
  let tasaInteres = recuperarFloat("tasaInteres");
  let plazoIngresado = recuperarFloat("plazoCredito");

  let credito = {
    cedula: clienteBuscado.cedula,
    nombre: clienteBuscado.nombre,
    apellido: clienteBuscado.apellido,
    monto: montoCalculado,
    tasa: tasaInteres,
    plazo: plazoIngresado,
    cuota: cuotaFinal
  };

  creditos.push(credito)
}

function buscarCreditos(cedula) {
  let elementoCliente;
  let arregloCreditos = []

  for (i = 0; i < creditos.length; i++) {
    elementoCliente = creditos[i]

    if (elementoCliente.cedula == cedula) {

      arregloCreditos.push(elementoCliente);

    }
  }
  return arregloCreditos
}

function pintarCreditos(creditos) {
  let cmpTabla = document.getElementById("tablaCreditos")
  let contenidoTabla = ""

  let credito
  for (i = 0; i < creditos.length; i++) {
    credito = creditos[i]
    contenidoTabla += "<tr>" +
      "<td>"+credito.cedula+"</td>" +
      "<td>"+credito.nombre+"</td>" +
      "<td>"+credito.apellido+"</td>" +
      "<td>"+credito.monto+"</td>" +
      "<td>"+credito.tasa+"</td>" +
      "<td>"+credito.plazo+"</td>" +
      "<td>"+credito.cuota+"</td>" +
      "<td><button>Eliminar</button></td>" +
      "</tr>"
  }

  cmpTabla.innerHTML = contenidoTabla
}

function buscarCreditosCliente(){
  let cajaCedula = document.getElementById("buscarCedulaListado").value

  let creditoBuscado = buscarCreditos(cajaCedula);

  pintarCreditos(creditoBuscado);
}