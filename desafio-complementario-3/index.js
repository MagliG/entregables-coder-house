function mostrarEntradas() {
    const nodoMenu = document.getElementById('entradas')
    const entradasRestaurante = platos.filter(
      element => element.tipo === 'Entrada'
    )
    console.log(entradasRestaurante)
    let contenido = ''
    for (entrada of entradasRestaurante) {
      contenido += `<div class="elemento" data-aos="zoom-in-down">
                      <i class="fas fa-calendar-day"></i>
                      <h3>${entrada.nombre}</h3>
                      <p>${entrada.descripcion}</p>
                      <p>Precio $ ${entrada.precio}</p>
                      <a href="#">Agregar ---></a>
                      </div>`
    }  
    nodoMenu.innerHTML += contenido
  }

  function mostrarPlatosPrincipales () {
    const nodoMenu = document.getElementById('platosPrincipales')
    const platosRestaurante = platos.filter(
      element => element.tipo === 'Plato principal'
    )
    console.log(platosRestaurante)
    let contenido = ''
    for (plato of platosRestaurante) {
      contenido += `<div class="elemento" data-aos="zoom-in-down">
                      <i class="fas fa-calendar-day"></i>
                      <h3>${plato.nombre}</h3>
                      <p>${plato.descripcion}</p>
                      <p>Precio $ ${plato.precio}</p>
                      <a href="#">Agregar ---></a>
                      </div>`
    }
    nodoMenu.innerHTML += contenido
  }

  function mostrarPostres () {
    const nodoMenu = document.getElementById('postres')
    const postresRestaurante = platos.filter(
      element => element.tipo === 'Postre'
    )
    console.log(postresRestaurante)
    let contenido = ''
    for (postre of postresRestaurante) {
      contenido += `<div class="elemento" data-aos="zoom-in-down">
                        <i class="fas fa-calendar-day"></i>
                        <h3>${postre.nombre}</h3>
                        <p>${postre.descripcion}</p>
                        <p>Precio $ ${postre.precio}</p>
                        <a href="#">Agregar ---></a>
                        </div>`
    }
    nodoMenu.innerHTML += contenido
  }