const restauranteUno = "La Bricciola"
const restauranteDos = "Gusto Ibérico"

let cantidadMesasDisponiblesUno = 12
let cantidadMesasDisponiblesDos = 0

const precioPorComensal = 1200

const restauranteElegido = parseInt(prompt("Elegir el restaurante para realizar su reserva: \n"+ "1. " + restauranteUno + "\n" + "2. " + restauranteDos))


function verificarCuposMesa(cantidadMesas){
    if( cantidadMesas > 0 ){
       let nombreCliente =  prompt("El restaurante tiene mesas disponibles. Ingrese su nombre de reserva: ")
       console.log(nombreCliente + " su reserva fue realizada con éxito.")
       cantidadMesas--
       console.log("Quedan " + cantidadMesas + " mesas disponibles.")
       precioCantidadComensales()
    } else {
        alert("No hay mesas disponibles para el restaurante seleccionado.")
    }
}

if( restauranteElegido != null){
    switch(restauranteElegido){
        case 1: {
            verificarCuposMesa(cantidadMesasDisponiblesUno)
            break;
        }
        case 2: {
            verificarCuposMesa(cantidadMesasDisponiblesDos)
            break;
        }
    }
}

function precioCantidadComensales(){
    let cantidadComensales = parseInt(prompt("Ingrese la cantidad de comensales: "))
    let precioTotal = cantidadComensales * precioPorComensal
    alert("El precio total de la resera es: $" + precioTotal)
}