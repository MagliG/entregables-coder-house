class Restaurante{
    constructor(nombre, direccion, cantidadDeMesas, tipoComida){
        this.nombre = nombre,
        this.direccion = direccion,
        this.cantidadDeMesas = cantidadDeMesas,
        this.tipoComida = tipoComida
    }

    ocuparMesa(cantidadDeMesas){
        if(cantidadDeMesas <= this.cantidadDeMesas){
            this.cantidadDeMesas = this.cantidadDeMesas - cantidadDeMesas
        } else {
            alert("El restaurante no dispone la cantidad de mesas requerida")
            
        }
    }
}

const restauranteUno = new Restaurante("La Bricciola", "Av. Corrientes 1650", 20, "Pizzeria")
const restauranteDos = new Restaurante("La Birra Bar", "Av. Alvarez Thomas 540", 12, "Hamburgueseria")

console.log(restauranteUno)
console.log(restauranteDos)

const restauranteSeleccionado = parseInt(prompt("Seleccione uno de los siguientes restaurantes: \n" + "1. " +restauranteUno.nombre + "\n" + "2. " + restauranteDos.nombre + "\n"))

function reservarMesas(){
    switch(restauranteSeleccionado){
        case 1: {
            const cantidadDeMesas = parseInt(prompt("Ingrese la cantidad de mesas a reservar: "))
            restauranteUno.ocuparMesa(cantidadDeMesas)
            console.log("Cantidad de mesas restante: " + restauranteUno.cantidadDeMesas)
            break;
        }
        case 2: {
            const cantidadDeMesas = parseInt(prompt("Ingrese la cantidad de mesas a reservar: "))
            restauranteDos.ocuparMesa(cantidadDeMesas)
            console.log("Cantidad de mesas restante: " + restauranteDos.cantidadDeMesas)
            break;
        }
        default:{
            alert("No existe el restaurante")
        }
    }
}

reservarMesas()