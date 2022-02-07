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
                        <a id="${entrada.id}" class="button-card-menu" onclick="agregarMenu(${entrada.id})">Agregar</a>
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
                        <a class="button-card-menu" onclick="agregarMenu(${plato.id})">Agregar</a>
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
                        <a class="button-card-menu" onclick="agregarMenu(${postre.id})">Agregar</a>
                      </div>
                    </div>`
    }
    $('#postres').append(contenido)
  }

function comprobarPreviaCargaDePlatos(){
    let platos = document.querySelectorAll('.card-menu')
    if(platos.length > 0){
      for(plato of platos){
        plato.remove()
      }
    }
    let itemsCarrito = document.getElementById("items-carrito")
    var child = itemsCarrito.lastElementChild
    while(child){
        itemsCarrito.removeChild(child)
        child = itemsCarrito.lastElementChild
    }
    badge.textContent = 0
  }