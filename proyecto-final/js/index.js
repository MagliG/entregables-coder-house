let nombreCliente = ""
const ordenar = 'ordenar'
const reservar = 'reservar'
const restaurantes = []
const platos = []
let tipoDeOperacion

$(document).ready(function(){
  // Me traigo todos los restaurantes del sitio
  $.get("./js/data/restaurantes.json", function(data){
      for(let i = 0; i < data.length; i++){
          let restauranteClass = Object.assign(new Restaurante(), data[i])
          restaurantes.push(restauranteClass)
      }
  })
  // Me traigo todos los platos del sitio
  $.get("./js/data/platos.json", function(data){
    for(let j = 0; j < data.length; j++){
      platos.push(data[j])
    }
  })
})

$("#reservarMesa").click(function (){
  limpiarSecciones()
  vaciarCarrito()
  $("#formMesas").addClass("activo")
})


$("#verMenuOrdenar").click( function(){
  limpiarSecciones()
  vaciarCarrito()
  $("#seccionRestaurantes").addClass("activo")
  pintarRestaurantes(restaurantes, 'ordenar')
})

function limpiarSecciones(){
  let cardRestaurantes = document.querySelectorAll(".card-restaurante")
  for(let i = 0; i < cardRestaurantes.length; i++){
    cardRestaurantes[i].remove()
  }
  $("#seccionRestaurantes").removeClass("activo")
  if($("#formMesas").hasClass("activo")){
    $("#formMesas").removeClass("activo")
  }
  if($("#menu").hasClass("activo")){
    $("#menu").removeClass("activo")
  }
}

// FORMULARIO 

function comprobarDisponibilidad(){
  comprobarPreviaCargaDeRestaurantes()
  const nodoRestaurantes = document.querySelector('.restaurante')
  nodoRestaurantes.classList.add('activo')
  let reservaCliente = new Reserva(document.getElementById("nombreReserva").value,
                              document.getElementById("cantPersonas").value,
                              document.getElementById("date").value,
                              document.getElementById("time").value,
                              new Restaurante(),
                              0)
  nombreCliente = document.getElementById("nombreReserva").value
  const resultado = reservaCliente.registrarReserva()
  window.scroll(0, 2500)
  if(resultado !== "ERROR"){
    listarRestaurantesDisponibles(reservaCliente.cantidadPersonas)
  }else{
  }
}

function comprobarPreviaCargaDeRestaurantes(){
  let restaurantes = document.querySelectorAll('.card-restaurante')
  if(restaurantes.length > 0){
    for(restaurante of restaurantes){
      restaurante.remove()
    }
  }
}

const formulario = document.getElementById("form-register")
formulario.addEventListener("submit", function(e){
  e.preventDefault()

  comprobarPrevioMensajeError()

  var hayError = false
  var mensajesError = []
  var nombreReserva = document.getElementById("nombreReserva").value
  var cantPersonas = document.getElementById("cantPersonas").value
  var fecha = document.getElementById("date").value
  var hora = document.getElementById("time").value
  if(nombreReserva === null || nombreReserva === '' || !nombreReserva || nombreReserva === undefined){
    mensajesError.push('Ingrese su nombre')
    hayError = true
  }
  if(cantPersonas === null || cantPersonas === '' || !cantPersonas){
    mensajesError.push('Ingrese la cantidad de personas')
    hayError = true
  }
  if(fecha === null || fecha === ''){
    mensajesError.push('Ingrese la fecha de reserva')
    hayError = true
  }
  if(hora === null || hora === ''){
    mensajesError.push('Ingrese la hora de reserva')
    hayError = true
  }
  if(mensajesError.length > 0){
    let contenido = ``
    for(let i = 0; i<mensajesError.length; i++){
      contenido += ` <p class="mensaje-error"> * ${mensajesError[i]} </p>`
    }
    $('#mensajes-error').append(contenido)
  }
  if(!hayError){
    comprobarDisponibilidad()
  }
})

function comprobarPrevioMensajeError(){
  let mensajesError = document.querySelectorAll('.mensaje-error')
  if(mensajesError.length > 0){
    for(let i = 0; i < mensajesError.length; i++){
      mensajesError[i].remove()
    }
  }
}

// FIN FORMULARIO 

function pintarElementos(){
  const nodoMenu = document.getElementById('menu')
  nodoMenu.classList.add('activo')
  const tabEntradas = document.getElementById('boton-entradas')
  tabEntradas.classList.add('activo')
  const infoEntradas = document.getElementById('entradas')
  infoEntradas.classList.add('activo')
}

function crearReserva(){
  let reserva = new Reserva("", "", "", "", "", 0, [])
  localStorage.setItem('reserva', JSON.stringify(reserva))
}

const buttonsTab = document.querySelectorAll('.button-tab')
const elementosMenu = document.querySelectorAll('.contenedor-menu')

buttonsTab.forEach((button, i) => {
  buttonsTab[i].addEventListener('click', () => {
    buttonsTab.forEach((button, i) =>{
      buttonsTab[i].classList.remove('activo')
      elementosMenu[i].classList.remove('activo')
    })
    buttonsTab[i].classList.add('activo')
    elementosMenu[i].classList.add('activo')
  })
})
