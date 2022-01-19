let nombreCliente = ""
let costoFinal = 0
let valoresReserva = 0

// $("#verMenuOrdenar").click( function (){
//   listarRestaurantes(0)
// })

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
      contenido += `  <div class="card-restaurante" id="${restaurante.id}">
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
                            <a class="button-card-restaurante" onclick="animarRestaurante(${restaurante.id})" href="#entradas">Ver animación</a>
                          </div>
                        </div>
                      `
    }
    $('#restaurantes').append(contenido)
}

listarRestaurantes(0)

function abrirMenu(path){
  window.open(path)
}

function animarRestaurante(idRestaurante){
  $("#"+idRestaurante).slideUp(1500).slideDown(1500, function(){
    $("#"+idRestaurante).animate({opacity: '1'}, 1000)
  })
}








