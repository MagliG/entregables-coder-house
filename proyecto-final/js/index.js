let nombreCliente = ""
let costoFinal = 0
let valoresReserva = 0

$("#reservarMesa").click(function (){
  $("#formMesas").addClass("activo")
})

$("#verMenuOrdenar").click( function (){
  listarRestaurantes(0)
})

function traerRestaurante(idRestaurante){
  const restauranteEncontrado = restaurantes.find(element => element.id === idRestaurante)
  return restauranteEncontrado
}

function listarRestaurantes (cantidadPersonas) {
  const seccionRestaurantes = document.getElementById('seccionRestaurantes')
  seccionRestaurantes.classList.add('activo')
  const restaurantesDisponibles = []
  for(restaurante of restaurantes){
    let restauranteClase = new Restaurante(restaurante.id, restaurante.nombre, restaurante.ubicacion, restaurante.tipoRestaurante, restaurante.descripcion, restaurante.capacidad, restaurante.disponibilidad, restaurante.costoReserva, restaurante.imagen, restaurante.menuPDF)
    if(restauranteClase.tieneDisponibilidad(cantidadPersonas)){
      restaurantesDisponibles.push(restauranteClase)
    }
  }
    
    if(restaurantesDisponibles.length == 0){
      let plantilla = `<h3 style="text-align:center; color: #1f1f1f; "><i>No hay restaurantes disponibles para la cantidad de personas ingresada. Por favor reincia la página e intenta nuevamente.</i></h3>`
      $('#restaurantes').append(plantilla)
    }
    let contenido = ''
    for (restaurante of restaurantesDisponibles) {
      contenido += `<div class="courses-container">
                      <div class="course">
                        <div class="course-preview">
                          <img src="${restaurante.imagen}" alt="${restaurante.nombre}">
                        </div>
                        <div class="course-info">
                          <div class="progress-container">
                              <span class="progress-text">
                                Valor reserva: $${restaurante.costoReserva}
                              </span>
                            </div>
                            <h6>${restaurante.tipoRestaurante}</h6>
                            <h2>${restaurante.nombre}</h2>
                            <h5><i class="fas fa-map-marker-alt"></i> ${restaurante.ubicacion}</h5>
                            <br>
                            <h6>${restaurante.descripcion}</h6>
                            <a class="button-ver-menu" onclick="abrirMenu('${restaurante.menuPDF}')" >Ver menú <i class="fas fa-chevron-right"></i></a>
                            <a class="button-card-restaurante" onclick="seleccionarRestaurante(${restaurante.id})" href="#entradas">Ordenar</a>
                          </div>
                        </div>
                      </div>`
    }
    $('#restaurantes').append(contenido)
}

function abrirMenu(path){
  window.open(path)
}

const comprobarDisponibilidad = document.getElementById('comprobarDisponibilidad')
comprobarDisponibilidad.onclick = () => {
  const nodoRestaurantes = document.querySelector('.restaurante')
  nodoRestaurantes.classList.add('activo')
  nuevaReserva = new Reserva(document.getElementById("nombreReserva").value,
                              document.getElementById("cantPersonas").value,
                              document.getElementById("date").value,
                              document.getElementById("time").value,
                              new Restaurante(),
                              0)
  nombreCliente = document.getElementById("nombreReserva").value
  let reservaCliente = new Reserva()
  reservaCliente = nuevaReserva 
  const resultado = reservaCliente.registrarReserva()
  if(resultado !== "ERROR"){
    listarRestaurantes(reservaCliente.cantidadPersonas)
  }else{
    // Se muestra mensaje indicando que hubo un error al registrar el primer paso de la reserva
  }
}

function pintarElementos(){
  const nodoMenu = document.getElementById('menu')
  nodoMenu.classList.add('activo')
  const tabEntradas = document.getElementById('boton-entradas')
  tabEntradas.classList.add('activo')
  const infoEntradas = document.getElementById('entradas')
  infoEntradas.classList.add('activo')
}

function seleccionarRestaurante(idRestaurante){
  pintarElementos()
  restauranteSeleccionado = traerRestaurante(idRestaurante)
  // const reserva = JSON.parse(localStorage.getItem(nombreCliente))
  // reserva.restaurante = restauranteSeleccionado
  // localStorage.setItem(reserva.nombre, JSON.stringify(reserva))
  mostrarEntradas(idRestaurante)
  mostrarPlatosPrincipales(idRestaurante)
  mostrarPostres(idRestaurante)
}

function agregarMenu(menuPrecio){
  valoresReserva+=menuPrecio
  const seccionReserva = document.getElementById('reserva')
  seccionReserva.classList.add('activo')
}

function calcularTotalValorReserva(){
  const reserva = JSON.parse(localStorage.getItem(nombreCliente))
  const costoTotal = valoresReserva + reserva.restaurante.costoReserva
  costoFinal = costoTotal
  let plantillaCostoTotal = `<div class="infoReserva">
                            <p style="color: #1f1f1f; text-align:center">El costo total de su reserva es: $ ${costoTotal}</p>
                            </div>`
  const mostrarTotal = document.getElementById('mostrarTotal')
  mostrarTotal.innerHTML+=plantillaCostoTotal
}

function confirmarReserva(){
  const reservaFinal = JSON.parse(localStorage.getItem(nombreCliente))
  reservaFinal.costoReserva = costoFinal
  localStorage.setItem(nombreCliente, JSON.stringify(reservaFinal))
  const mensajeExito = document.getElementById('confirmacionReserva')
  const plantillaExito = `<div class="infoReserva">
                          <p style="color: #1f1f1f; text-align:center">Reserva realizada con éxito!!!</p>
                          </div>`
  mensajeExito.innerHTML+= plantillaExito
}

function mostrarEntradas (idRestaurante) {
  const nodoMenu = document.getElementById('entradas')
  const entradasRestaurante = platos.filter(
    element => element.idRestaurante == idRestaurante && element.tipo === 'Entrada'
  )
  console.log(entradasRestaurante)
  let contenido = ``
  for (entrada of entradasRestaurante) {
    contenido += `<div class="card">
                    <div class="banner">
                    </div>
                    <h2 class="name">${entrada.nombre}</h2>
                    <h6>${entrada.descripcion}</h6>
                    <h6><b>Precio: $${entrada.precio}</h6>
                  </div>`
  // contenido -> falta implementar boton para agregar menu
  }
  nodoMenu.innerHTML += contenido
}

function mostrarPlatosPrincipales (idRestaurante) {
  const nodoMenu = document.getElementById('platoPrincipal')
  const platosRestaurante = platos.filter(
    element =>
      element.idRestaurante == idRestaurante && element.tipo === 'Plato principal'
  )
  console.log(platosRestaurante)
  let contenido = ''
  for (plato of platosRestaurante) {
    contenido += `<div class="card">
                    <div class="banner">
                    </div>
                    <h2 class="name">${plato.nombre}</h2>
                    <h6>${plato.descripcion}</h6>
                    <h6><b>Precio: $${plato.precio}</h6>
                  </div>`
  // contenido -> falta implementar boton para agregar menu
  }
  nodoMenu.innerHTML += contenido
}

function mostrarPostres (idRestaurante) {
  const nodoMenu = document.getElementById('postres')
  const postresRestaurante = platos.filter(
    element => element.idRestaurante == idRestaurante && element.tipo === 'Postre'
  )
  console.log(postresRestaurante)
  let contenido = ''
  for (postre of postresRestaurante) {
    contenido += `<div class="card">
                    <div class="banner">
                    </div>
                    <h2 class="name">${postre.nombre}</h2>
                    <h6>${postre.descripcion}</h6>
                    <h6><b>Precio: $${postre.precio}</h6>
                  </div>`
  // contenido -> falta implementar boton para agregar menu
  }
  nodoMenu.innerHTML += contenido
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