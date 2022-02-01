let nombreCliente = ""
const ordenar = 'ordenar'
const reservar = 'reservar'
let costoFinal = 0
let valoresReserva = 0
const restaurantes = []
const platos = []
let restauranteSeleccionado
const listaCarrito = document.querySelector("#lista-carrito tbody");
let valorBadge = 0

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
  $("#formMesas").addClass("activo")
  $("#verMenuOrdenar").remove()
  $("#reservarMesa").remove()
})

function traerRestaurante(idRestaurante){
    const restauranteEncontrado = restaurantes.find(element => element.id === idRestaurante)
    return restauranteEncontrado
}

$("#verMenuOrdenar").click( function(){
    $("#seccionRestaurantes").addClass("activo")
    pintarRestaurantes(restaurantes, 'ordenar')
})

function pintarRestaurantes(restaurantes, tipoOperacion){
  let contenido
  let restaurante
  // Falta switch
  switch(tipoOperacion){
    case 'ordenar':
      console.log(restaurantes)
      for(restaurante of restaurantes) {
        contenido += `  <div class="card-restaurante">
                          <div class="card-restaurante-img">
                            <img src="${restaurante.imagen}" alt="${restaurante.nombre}">
                          </div>
                          <div class="card-restaurante-info">
                              <h6>${restaurante.tipoRestaurante}</h6>
                              <h2>${restaurante.nombre}</h2>
                              <h5><i class="fas fa-map-marker-alt"></i> ${restaurante.ubicacion}</h5>
                              <br>
                              <h6>${restaurante.descripcion}</h6>
                              <a class="button-ver-menu" onclick="abrirMenu('${restaurante.menuPDF}')" >Ver menú <i class="fas fa-chevron-right"></i></a>
                              <a class="button-card-restaurante" onclick="seleccionarRestaurante(${restaurante.id}, ${restaurante.costoReserva}, ${tipoOperacion})" href="#entradas">Ordenar</a>
                            </div>
                          </div>
                        `
      }
      $("#restaurantes").append(contenido) 
      break;
    case 'reservar':
      for(restaurante of restaurantes) {
        contenido += `  <div class="card-restaurante">
                          <div class="card-restaurante-img">
                            <img src="${restaurante.imagen}" alt="${restaurante.nombre}">
                          </div>
                          <div class="card-restaurante-info">
                            <div class="info-valor-reserva">
                                <span class="info-valor-reserva-texto">
                                  Valor reserva: $${restaurante.costoReserva}
                                </span>
                              </div>
                              <h6>${restaurante.tipoRestaurante}</h6>
                              <h2>${restaurante.nombre}</h2>
                              <h5><i class="fas fa-map-marker-alt"></i> ${restaurante.ubicacion}</h5>
                              <br>
                              <h6>${restaurante.descripcion}</h6>
                              <a class="button-ver-menu" onclick="abrirMenu('${restaurante.menuPDF}')" >Ver menú <i class="fas fa-chevron-right"></i></a>
                              <a class="button-card-restaurante" onclick="seleccionarRestaurante(${restaurante.id}, ${restaurante.costoReserva}, ${tipoOperacion})" href="#entradas">Reservar</a>
                            </div>
                          </div>
                        `
      }
      $("#restaurantes").append(contenido) 
      break;
    default:
      alert("Error al mostrar los restaurantes")
  }
}

function abrirMenu(path){
  window.open(path)
}

const comprobarDisponibilidad = document.getElementById('comprobarDisponibilidad')
comprobarDisponibilidad.onclick = () => {
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
  if(resultado !== "ERROR"){
    listarRestaurantesDisponibles(reservaCliente.cantidadPersonas)
  }else{
    // Se muestra mensaje indicando que hubo un error al registrar el primer paso de la reserva
  }
}

function listarRestaurantesDisponibles(cantidadDePersonas){
    let restaurantesDisponibles = []
    for(let i = 0; i < restaurantes.length; i++){
      let restauranteClass = Object.assign(new Restaurante(), restaurantes[i])
      if(restauranteClass.tieneDisponibilidad(cantidadDePersonas)){
        restaurantesDisponibles.push(restauranteClass)
      }
    }
    pintarRestaurantes(restaurantesDisponibles, 'reservar')
}

function pintarElementos(){
  const nodoMenu = document.getElementById('menu')
  nodoMenu.classList.add('activo')
  const tabEntradas = document.getElementById('boton-entradas')
  tabEntradas.classList.add('activo')
  const infoEntradas = document.getElementById('entradas')
  infoEntradas.classList.add('activo')
}

function seleccionarRestaurante(idRestaurante, costoReserva, tipoOperacion){
  restauranteSeleccionado = traerRestaurante(idRestaurante)
  switch(tipoOperacion){
    case 'ordenar':
        crearReserva()
        const buttonsRestaurante = document.querySelectorAll('.button-card-restaurante')
        buttonsRestaurante.forEach((button, i) =>{
          buttonsRestaurante[i].classList.add('disabled')
        })
        pintarElementos()
        agregarRestauranteAlStorage(restauranteSeleccionado, ordenar)
        mostrarEntradas(idRestaurante)
        mostrarPlatosPrincipales(idRestaurante)
        mostrarPostres(idRestaurante)
        break;
      case 'reservar':
        actualizarCostoReservaStorage(costoReserva)
        agregarRestauranteAlStorage(restauranteSeleccionado, reservar)
        agregarCostoReservaAlCarrito()
        mostrarEntradas(idRestaurante)
        mostrarPlatosPrincipales(idRestaurante)
        mostrarPostres(idRestaurante)
        break;
      default: 
        alert("Error inesperado al seleccionar el restaurante")
  }
}

function actualizarCostoReservaStorage(costoReserva){
  let reserva = JSON.parse(localStorage.getItem(nombreCliente))
  reserva.costoReserva = costoReserva
  localStorage.setItem(nombreCliente, JSON.stringify(reserva))
}

function crearReserva(){
  let reserva = new Reserva("", "", "", "", "", 0, [])
  localStorage.setItem('reserva', JSON.stringify(reserva))
}

function agregarRestauranteAlStorage(restaurante, tipoOperacion){
  switch(tipoOperacion){
    case 'ordenar':   
      let reservaO = JSON.parse(localStorage.getItem('reserva'))
      reservaO.restaurante = restaurante
      localStorage.setItem('reserva', JSON.stringify(reservaO))
    break;
    case 'reservar': 
    // Revisar no me está actualizando el restaurante si no que lo borra
      let reservaR = JSON.parse(localStorage.getItem(nombreCliente))
      reservaR.restaurante = restaurante
      localStorage.setItem(nombreCliente, JSON.stringify(reservaR))
    break;
  }
}

function mostrarEntradas (idRestaurante) {
  const entradasRestaurante = platos.filter(
    element => element.idRestaurante == idRestaurante && element.tipo === 'Entrada'
  )
  let contenido = ``
  for (entrada of entradasRestaurante) {
    contenido += `<div class="card-menu">
                    <div class="card-restaurante-img">
                      <img src="./assets/img/plato-gral.jpg" alt="${entrada.nombre}">
                    </div>
                    <div class="card-menu-info">
                      <div class="info-valor-menu">
                        <span class="info-valor-menu-texto">
                          Precio: $${entrada.precio}
                        </span>
                      </div>
                      <h6>${entrada.tipo}</h6>
                      <h2>${entrada.nombre}</h2>
                      <br>
                      <h6>${entrada.descripcion}</h6>
                      <a class="button-card-menu" onclick="agregarMenu(${entrada.id})" href="#entradas">Agregar</a>
                    </div>
                  </div>`
  }
  $('#entradas').append(contenido)
}

function mostrarPlatosPrincipales (idRestaurante) {
  const platosRestaurante = platos.filter(
    element =>
      element.idRestaurante == idRestaurante && element.tipo === 'Plato principal'
  )
  let contenido = ''
  for (plato of platosRestaurante) {
    contenido += `<div class="card-menu">
                    <div class="card-restaurante-img">
                      <img src="./assets/img/plato-gral.jpg" alt="${plato.nombre}">
                    </div>
                    <div class="card-menu-info">
                      <div class="info-valor-menu">
                        <span class="info-valor-menu-texto">
                          Precio: $${plato.precio}
                        </span>
                      </div>
                      <h6>${plato.tipo}</h6>
                      <h2>${plato.nombre}</h2>
                      <br>
                      <h6>${plato.descripcion}</h6>
                      <a class="button-card-menu" onclick="agregarMenu(${plato.id})" href="#entradas">Agregar</a>
                    </div>
                  </div>`
  }
  $('#platoPrincipal').append(contenido)
}

function mostrarPostres (idRestaurante) {
  const postresRestaurante = platos.filter(
    element => element.idRestaurante == idRestaurante && element.tipo === 'Postre'
  )
  let contenido = ''
  for (postre of postresRestaurante) {
    contenido += `<div class="card-menu">
                    <div class="card-restaurante-img">
                      <img src="./assets/img/plato-gral.jpg" alt="${postre.nombre}">
                    </div>
                    <div class="card-menu-info">
                      <div class="info-valor-menu">
                        <span class="info-valor-menu-texto">
                          Precio: $${postre.precio}
                        </span>
                      </div>
                      <h6>${postre.tipo}</h6>
                      <h2>${postre.nombre}</h2>
                      <br>
                      <h6>${postre.descripcion}</h6>
                      <a class="button-card-menu" onclick="agregarMenu(${postre.id})" href="#entradas">Agregar</a>
                    </div>
                  </div>`
  }
  $('#postres').append(contenido)
}

// FUNCIONES CARRITO

function agregarMenu(id){
  const plato = platos.find(element => element.id === id)
  insertarCarrito(plato)
  actualizarBadge()
}

function insertarCarrito(plato){
  const row = document.createElement('tr')
  row.innerHTML = `<td>${plato.nombre}</td>
                   <td>${plato.precio}</td>
                   <td>
                    <a href="#" class="borrar-platillo" id="${plato.id}" onclick="borrarPlatillo(${plato.id})"><i class="fas fa-trash-alt" style="font-size: 15px;"></i></a>
                   </td>
                   <br>`

  listaCarrito.appendChild(row);
  guardarPlatoEnElStorage(plato)
}

function agregarCostoReservaAlCarrito(){
  let reserva = JSON.parse(localStorage.getItem(nombreCliente))
  const row = document.createElement('tr')
  row.innerHTML = ` <td>Reserva ${reserva.restaurante.nombre}</td>
                    <td>${reserva.costoReserva}</td>
                    <td>
                      <a href="" class="borrar-platillo" id="${reserva.restaurante.id}" onclick="borrarReservaRestaurante(${reserva.restaurante.id})"><i class="fas fa-trash-alt" style="font-size: 15px;"></i></a>
                    </td>
                    <br>`
  listaCarrito.appendChild(row)
}

function guardarPlatoEnElStorage(plato){
  let reserva
  reserva = obtenerReservaDelStorage()
  reserva.platos.push(plato)
  localStorage.setItem('reserva', JSON.stringify(reserva))
}

function obtenerReservaDelStorage(){
  let reserva 
  if(localStorage.getItem('reserva') === null){
    reserva = []
  }else{
    reserva = JSON.parse(localStorage.getItem('reserva'))
  }
  return reserva
}

function borrarPlatillo(id){
  let reserva = obtenerReservaDelStorage()
  reserva.platos.forEach(function(plato, index){
    if(plato.id === id) {
        reserva.platos.splice(index, 1);
    }
  })
  localStorage.setItem('reserva', JSON.stringify(reserva));
  let plato = document.getElementById(id).parentElement.parentElement
  plato.remove()
  actualizarBadge()
}

function borrarReservaRestaurante(idRestaurante){

}

function actualizarBadge(){
  let reserva = obtenerReservaDelStorage()
  badge.textContent = reserva.platos.length
}

function vaciarLocalStorage() {
  localStorage.clear();
  const buttonsRestaurante = document.querySelectorAll('.button-card-restaurante')
  buttonsRestaurante.forEach((button, i) =>{
    buttonsRestaurante[i].classList.remove('.disabled')
  })
  
}

function confirmarReserva(){
  let costoFinal = 0
  let reserva = obtenerReservaDelStorage()
  reserva.platos.forEach(function(plato){
    costoFinal+= plato.precio
  })
  alert("La reserva ha sido confirmada. El valor total de su pedido es: $" + costoFinal)
  vaciarLocalStorage()
}


// let ubicacionPrincipal = window.pageYOffset

// AOS.init()

// window.addEventListener('scroll', function () {
//   let desplazamientoActual = window.pageYOffset
//   if (ubicacionPrincipal >= desplazamientoActual) {
//     document.getElementsByTagName('nav')[0].style.top = '0px'
//   } else {
//     document.getElementsByTagName('nav')[0].style.top = '-100px'
//   }
//   ubicacionPrincipal = desplazamientoActual
// })

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