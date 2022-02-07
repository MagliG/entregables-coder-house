function agregarMenu(id){
    //agregar efecto rebote
    // TODO revisar efecto
    // $("#"+id).toggle()
    // $("#"+id).fadeOut(100).fadeIn(100)
    const plato = platos.find(element => element.id === id)
    insertarCarrito(plato, id)
    actualizarBadge()
  }
  
function insertarCarrito(plato, id){
    const row = document.createElement('tr')
    row.innerHTML = `<td>${plato.nombre}</td>
                     <td>$${plato.precio}</td>
                     <td>
                      <a class="borrar-platillo" id="${plato.id}" onclick="borrarPlatillo(${plato.id})"><i class="fas fa-trash-alt" style="font-size: 15px;"></i></a>
                     </td>
                     <br>`
  
    listaCarrito.appendChild(row);
    guardarPlatoEnElStorage(plato)
  }
  
function agregarCostoReservaAlCarrito(){
    let reserva = JSON.parse(localStorage.getItem(nombreCliente))
    const row = document.createElement('tr')
    row.innerHTML = ` <td>Reserva ${reserva.restaurante.nombre}</td>
                      <td>$${reserva.costoReserva}</td>
                      <td>
                        <a class="borrar-platillo" id="${reserva.restaurante.id}" onclick="borrarReservaRestaurante(${reserva.restaurante.id})"><i class="fas fa-trash-alt" style="font-size: 15px;"></i></a>
                      </td>
                      <br>`
    listaCarrito.appendChild(row)
    badge.textContent = 1
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
    let indiceBorrar = reserva.platos.findIndex(element => element.id == id)
    reserva.platos.splice(indiceBorrar, 1)
    localStorage.setItem('reserva', JSON.stringify(reserva));
    let plato = document.getElementById(id).parentElement.parentElement
    plato.remove()
    actualizarBadge()
  }
  
function borrarReservaRestaurante(idRestaurante){
    let reserva = JSON.parse(localStorage.getItem(nombreCliente))
    reserva.restaurante = {}
    let restauranteCarrito = document.getElementById(`${idRestaurante}`)
    localStorage.setItem(nombreCliente, JSON.stringify(reserva))
    restauranteCarrito.parentElement.parentElement.remove()
    badge.textContent = 0
    let botonReserva = document.querySelectorAll(".button-card-restaurante")
    for(let i = 0; i < botonReserva.length; i++){
        botonReserva[i].classList.remove('disabled')
    }
  }
  
function actualizarBadge(tipoOperacion){
    let reserva = obtenerReservaDelStorage()
    if(tipoOperacion == "reservar"){
      badge.textContent = 1
    }else{
      badge.textContent = reserva.platos.length
    }
  }
  
function vaciarLocalStorage() {
    localStorage.clear();
    const buttonsRestaurante = document.querySelectorAll('.button-card-restaurante')
    buttonsRestaurante.forEach((button, i) =>{
      buttonsRestaurante[i].classList.remove('.disabled')
    })
    location.reload()
  }
  
function confirmarReserva(){
    let costoFinal = 0
    let reserva
    switch(tipoDeOperacion){
      case 'ordenar':
        reserva = obtenerReservaDelStorage()
        reserva.platos.forEach(function(plato){
        costoFinal+= plato.precio
        })
        swal("Orden realizada con éxito!", "El valor de la misma es: $" + costoFinal , "success").then(() =>{
          location.reload()
          vaciarLocalStorage()
        })
        break;
      case 'reservar':
        reserva = JSON.parse(localStorage.getItem(nombreCliente))
        console.log(reserva)
        costoFinal = reserva.restaurante.costoReserva
        swal("Felicitaciones!", nombreCliente + ", su reserva ha sido confirmada con éxito. El valor de la misma es: $" + costoFinal + ". Lo esperamos!", "success").then(() =>{
          location.reload()
          vaciarLocalStorage()
        })
        break;
      default:
    } 
}

function actualizarCostoReservaStorage(costoReserva){
    let reserva = JSON.parse(localStorage.getItem(nombreCliente))
    reserva.costoReserva = costoReserva
    localStorage.setItem(nombreCliente, JSON.stringify(reserva))
  }