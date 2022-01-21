let nombreCliente = ""
let costoFinal = 0
let valoresReserva = 0
const restaurantes = []
const platos = []
let restauranteSeleccionado
const listaPlatillos = document.querySelector("#lista-carrito tbody");
const valorBadge = 10

$("#reservarMesa").click(function (){
  $("#formMesas").addClass("activo")
})

$.get("./js/data/platos.json", function(data){
  for(let i = 0; i < data.length; i++){
    platos.push(data[i])
  }
})

function traerRestaurante(idRestaurante){
  const restauranteEncontrado = restaurantes.find(element => element.id === idRestaurante)
  return restauranteEncontrado
}

$("#verMenuOrdenar").click( function(){
  $.get("./js/data/restaurantes.json", function(data){
    $("#seccionRestaurantes").addClass("activo")
    let contenido = ''
    for (restaurante of data) {
      restaurantes.push(restaurante)
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
                            <a class="button-card-restaurante" onclick="seleccionarRestaurante(${restaurante.id})" href="#entradas">Ordenar</a>
                          </div>
                        </div>
                      `
    }
    $("#restaurantes").append(contenido)    
  })
})

function abrirMenu(path){
  window.open(path)
}

// const comprobarDisponibilidad = document.getElementById('comprobarDisponibilidad')
// comprobarDisponibilidad.onclick = () => {
//   const nodoRestaurantes = document.querySelector('.restaurante')
//   nodoRestaurantes.classList.add('activo')
//   nuevaReserva = new Reserva(document.getElementById("nombreReserva").value,
//                               document.getElementById("cantPersonas").value,
//                               document.getElementById("date").value,
//                               document.getElementById("time").value,
//                               new Restaurante(),
//                               0)
//   nombreCliente = document.getElementById("nombreReserva").value
//   let reservaCliente = new Reserva()
//   reservaCliente = nuevaReserva 
//   const resultado = reservaCliente.registrarReserva()
//   if(resultado !== "ERROR"){
//     listarRestaurantes(reservaCliente.cantidadPersonas)
//   }else{
//     // Se muestra mensaje indicando que hubo un error al registrar el primer paso de la reserva
//   }
// }

function pintarElementos(){
  const nodoMenu = document.getElementById('menu')
  nodoMenu.classList.add('activo')
  const tabEntradas = document.getElementById('boton-entradas')
  tabEntradas.classList.add('activo')
  const infoEntradas = document.getElementById('entradas')
  infoEntradas.classList.add('activo')
}

function seleccionarRestaurante(idRestaurante){
  crearReserva()
  const buttonsRestaurante = document.querySelectorAll('.button-card-restaurante')
  buttonsRestaurante.forEach((button, i) =>{
    buttonsRestaurante[i].classList.add('disabled')
  })
  // $("#seccionRestaurantes").fadeOut()
  pintarElementos()
  restauranteSeleccionado = traerRestaurante(idRestaurante)
  agregarRestauranteAlStorage(restauranteSeleccionado)
  // const reserva = JSON.parse(localStorage.getItem(nombreCliente))
  // reserva.restaurante = restauranteSeleccionado
  // localStorage.setItem(reserva.nombre, JSON.stringify(reserva))
  mostrarEntradas(idRestaurante)
  mostrarPlatosPrincipales(idRestaurante)
  mostrarPostres(idRestaurante)
}

function crearReserva(){
  let reserva = new Reserva("", "", "", "", "", "", [])
  localStorage.setItem('reserva', JSON.stringify(reserva))
}

function agregarRestauranteAlStorage(restaurante){
  let reserva = JSON.parse(localStorage.getItem('reserva'))
  reserva.restaurante = restaurante
  localStorage.setItem('reserva', JSON.stringify(reserva))
}


// function calcularTotalValorReserva(){
//   const reserva = JSON.parse(localStorage.getItem(nombreCliente))
//   const costoTotal = valoresReserva + reserva.restaurante.costoReserva
//   costoFinal = costoTotal
//   let plantillaCostoTotal = `<div class="infoReserva">
//                             <p style="color: #1f1f1f; text-align:center">El costo total de su reserva es: $ ${costoTotal}</p>
//                             </div>`
//   const mostrarTotal = document.getElementById('mostrarTotal')
//   mostrarTotal.innerHTML+=plantillaCostoTotal
// }

// function confirmarReserva(){
//   const reservaFinal = JSON.parse(localStorage.getItem(nombreCliente))
//   reservaFinal.costoReserva = costoFinal
//   localStorage.setItem(nombreCliente, JSON.stringify(reservaFinal))
//   const mensajeExito = document.getElementById('confirmacionReserva')
//   const plantillaExito = `<div class="infoReserva">
//                           <p style="color: #1f1f1f; text-align:center">Reserva realizada con éxito!!!</p>
//                           </div>`
//   mensajeExito.innerHTML+= plantillaExito
// }

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
  // contenido -> falta implementar boton para agregar menu
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
  // contenido -> falta implementar boton para agregar menu
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
  // contenido -> falta implementar boton para agregar menu
  }
  $('#postres').append(contenido)
}

// FUNCIONES CARRITO

function agregarMenu(id){
  const plato = platos.find(element => element.id === id)
  insertarCarrito(plato)
}

function insertarCarrito(plato){
  // Inserto el plato en el carrito
  const row = document.createElement('tr')
  row.innerHTML = `<td>${plato.nombre}</td>
                   <td>${plato.precio}</td>
                   <td>
                    <a href="#" class="borrar-platillo" id="${plato.id}" onclick="borrarPlatillo(${plato.id})"><i class="fas fa-trash-alt" style="font-size: 15px;"></i></a>
                   </td>
                   <br>`

  listaPlatillos.appendChild(row);
  guardarPlatoEnElStorage(plato)
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
}

function vaciarLocalStorage() {
  localStorage.clear();
  const buttonsRestaurante = document.querySelectorAll('.button-card-restaurante')
  buttonsRestaurante.forEach((button, i) =>{
    buttonsRestaurante[i].classList.remove('.disabled')
  })
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