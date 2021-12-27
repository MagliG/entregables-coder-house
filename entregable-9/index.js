class Reserva {
  constructor (nombreCliente, menu, cantidadPersonas) {
    ;(this.nombreCliente = nombreCliente),
      (this.menu = menu),
      (this.cantidadPersonas = cantidadPersonas)
  }

  cargarReserva () {
    if (this.nombreCliente !== '') {
      localStorage.setItem(this.nombreCliente, JSON.stringify(this))
      return 'Reserva cargada'
    } else {
      return 'ERROR'
    }
  }
}

function definirEventos () {
  function mostrarReservas () {
    let date = new Date()
    const listaReservas = document.createElement('ul')
    const reservas = document.getElementById('reservas')
    for (let i = 0; i < localStorage.length; i++) {
      const llave = localStorage.key(i)
      let reserva = JSON.parse(localStorage.getItem(llave))
      let plantilla = `<p>Nombre del cliente: ${reserva.nombreCliente}</p>
      <p>Menú: ${reserva.menu}</p>
      <p>Cantidad de personas: ${reserva.cantidadPersonas}</p>
      <hr>`
      listaReservas.innerHTML += 'Hora de actualización: ' + date
      let itemReserva = document.createElement('li')
      itemReserva.innerHTML = plantilla
      listaReservas.appendChild(itemReserva)
    }
    reservas.appendChild(listaReservas)
  }
  const cargarReserva = document.getElementById('cargarReserva')
  cargarReserva.onclick = e => {
    e.preventDefault()
    const nuevaReserva = new Reserva(
      document.getElementById('nombreCliente').value,
      document.getElementById('menu').value,
      document.getElementById('cantPersonas').value
    )
    const respuesta = nuevaReserva.cargarReserva()
    if (respuesta === 'Reserva cargada') {
      alert('Reserva realizada con exito')
    } else {
      alert('ERROR')
    }
    mostrarReservas()
  }
}
