
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios


function ocultarSecciones(){
  document.getElementById("clientes").classList.remove("activa");
  document.getElementById("parametros").classList.remove("activa");

}

function mostrarSeccion(id){
  ocultarSecciones();
  document.getElementById(id).classList.add("activa");
}

function guardarTasa(){
  let tasa = document.getElementById("tasaInteres").value
  let mensajeTasa = document.getElementById("mensajeTasa")
  if(tasa < 21 & tasa > 9){
    mensajeTasa.innerHTML = "<h5>✔ Si es válido:</h5>"+
    "<p><h5>Tasa configurada correctamente: 15%</h5></p>" 
  }else{
    mensajeTasa.innerHTML = "<h5> La tasa debe estar entre 10% y 20%</h5>"
  }
}