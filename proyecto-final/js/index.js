function onInit () {
  console.log(restaurantes)
  listarRestaurantes()
}

function listarRestaurantes () {
  const nodoRestaurantes = document.getElementById('restaurantes')
  let contenido = ''
  for (restaurante of restaurantes) {
    contenido += `<div class="elemento" data-aos="zoom-in-down">
                    <i class="fas fa-utensils"></i>
                    <h3>${restaurante.nombre}</h3>
                    <p>${restaurante.ubicacion}</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus maxime eius quo
                    consequuntur magni. Quis voluptate repudiandae soluta quod mollitia!</p>
                    <a onclick="listarEntrada(${restaurante.id})" href="#menu">Reservar</a>
                    </div>`
  }
  nodoRestaurantes.innerHTML += contenido
}

function mostrarEntradas (idMenu) {
  const nodoMenu = document.getElementById('entradas')
  const entradasRestaurante = platos.filter(
    element => element.idRestaurante == idMenu && element.tipo === 'Entrada'
  )
  console.log(entradasRestaurante)
  let contenido = ''
  for (entrada of entradasRestaurante) {
    contenido += `<div class="elemento" data-aos="zoom-in-down">
                    <i class="fas fa-calendar-day"></i>
                    <h3>${entrada.nombre}</h3>
                    <p>${entrada.descripcion}</p>
                    <a href="#">Agregar ---></a>
                    </div>`
  }
  nodoMenu.innerHTML += contenido
}

function mostrarPlatosPrincipales (idMenu) {
  const nodoMenu = document.getElementById('platoPrincipal')
  const platosRestaurante = platos.filter(
    element =>
      element.idRestaurante == idMenu && element.tipo === 'Plato principal'
  )
  console.log(platosRestaurante)
  let contenido = ''
  for (plato of platosRestaurante) {
    contenido += `<div class="elemento" data-aos="zoom-in-down">
                    <i class="fas fa-calendar-day"></i>
                    <h3>${plato.nombre}</h3>
                    <p>${plato.descripcion}</p>
                    <a href="#">Agregar ---></a>
                    </div>`
  }
  nodoMenu.innerHTML += contenido
}

function mostrarPostres (idMenu) {
  const nodoMenu = document.getElementById('postres')
  const postresRestaurante = platos.filter(
    element => element.idRestaurante == idMenu && element.tipo === 'Postre'
  )
  console.log(postresRestaurante)
  let contenido = ''
  for (postre of postresRestaurante) {
    contenido += `<div class="elemento" data-aos="zoom-in-down">
                      <i class="fas fa-calendar-day"></i>
                      <h3>${postre.nombre}</h3>
                      <p>${postre.descripcion}</p>
                      <a href="#">Agregar ---></a>
                      </div>`
  }
  nodoMenu.innerHTML += contenido
}

// Para cada botón hago un evento onclick que cuando lo apreto llama a la funcion mostrarPlato,
// mostrarEntrada, mostrarPostre.
// Para saber el id del Restaurante previamente lo guardo en el localstorage.
// Necesito ver en dónde el usuario coloca la cantidad de comensales para luego
// poder limitar la cantidad de menues elegidos, es decir, 2 comensales serían
// 2 postres, 2 platos principales, 2 entradas y no se debería poder agregar más.
// Cada vez que hago click en uno de los botones de los tab hay que hacer un
// display: none del resto de los div que se abren con
let ubicacionPrincipal = window.pageYOffset

AOS.init()

window.addEventListener('scroll', function () {
  let desplazamientoActual = window.pageYOffset
  if (ubicacionPrincipal >= desplazamientoActual) {
    document.getElementsByTagName('nav')[0].style.top = '0px'
  } else {
    document.getElementsByTagName('nav')[0].style.top = '-100px'
  }
  ubicacionPrincipal = desplazamientoActual
})

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