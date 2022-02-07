let restauranteSeleccionado

function traerRestaurante(idRestaurante){
    const restauranteEncontrado = restaurantes.find(element => element.id === idRestaurante)
    return restauranteEncontrado
}

function pintarRestaurantes(restaurantes, tipoOperacion){
    tipoDeOperacion = tipoOperacion
    let contenido = ''
    let restaurante
    switch(tipoOperacion){
      case 'ordenar':
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
                                <a class="button-ver-menu" onclick="abrirMenu('${restaurante.menuPDF}')" >Ver carta <i class="fas fa-chevron-right"></i></a>
                                <a class="button-card-restaurante" onclick="seleccionarRestaurante(${restaurante.id}, ${restaurante.costoReserva}, ${tipoOperacion})" href="#menu">Ordenar</a>
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

function seleccionarRestaurante(idRestaurante, costoReserva, tipoOperacion){
    restauranteSeleccionado = traerRestaurante(idRestaurante)
    const buttonsRestaurante = document.querySelectorAll('.button-card-restaurante')
    switch(tipoOperacion){
      case 'ordenar':
          crearReserva()
          comprobarPreviaCargaDePlatos()
          pintarElementos()
          agregarRestauranteAlStorage(restauranteSeleccionado, ordenar)
          mostrarEntradas(idRestaurante)
          mostrarPlatosPrincipales(idRestaurante)
          mostrarPostres(idRestaurante)
          break;
        case 'reservar':
          buttonsRestaurante.forEach((button, i) =>{
            buttonsRestaurante[i].classList.add('disabled')
          })
          actualizarCostoReservaStorage(costoReserva)
          agregarRestauranteAlStorage(restauranteSeleccionado, reservar)
          agregarCostoReservaAlCarrito()
          break;
        default: 
          alert("Error inesperado al seleccionar el restaurante")
    }
  }

function agregarRestauranteAlStorage(restaurante, tipoOperacion){
  switch(tipoOperacion){
    case 'ordenar':   
      let reservaO = JSON.parse(localStorage.getItem('reserva'))
      reservaO.restaurante = restaurante
      localStorage.setItem('reserva', JSON.stringify(reservaO))
    break;
    case 'reservar': 
      let reservaR = JSON.parse(localStorage.getItem(nombreCliente))
      reservaR.restaurante = restaurante
      localStorage.setItem(nombreCliente, JSON.stringify(reservaR))
    break;
  }
}