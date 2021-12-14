const arrayParaOrdenar = []

let manzana = {
    nombre: "Manzana",
    precio: 0
}

let pera = {
    nombre: "Peras",
    precio: 0
}

let frutilla = {
    nombre: "Frutillas",
    precio: 0
}

let banana = {
    nombre: "Bananas",
    precio: 0
}
manzana.precio = parseInt(prompt("Ingrese el precio de las MANZANAS: "))
arrayParaOrdenar.push(manzana)
pera.precio = parseInt(prompt("Ingrese el precio de las PERAS: "))
arrayParaOrdenar.push(pera)
frutilla.precio = parseInt(prompt("Ingrese el precio de las FRUTILLAS: "))
arrayParaOrdenar.push(frutilla)
banana.precio = parseInt(prompt("Ingrese el precio de las BANANAS: "))
arrayParaOrdenar.push(banana)

console.log(arrayParaOrdenar)

const metodoOrdenamiento = parseInt(prompt("Seleccionar metodo de ordenamiento: \n" + "1. De menor a mayor precio. \n" + "2. De mayor a menor precio. \n" ))

function ordenarArray(){
    switch(metodoOrdenamiento){
        case 1: {
            arrayParaOrdenar.sort(function(a, b){return a.precio - b.precio})
            console.log("El array ordenado queda de la siguiente manera: ", arrayParaOrdenar)
            break;
        }
        case 2: {
            arrayParaOrdenar.sort(function(a, b){return b.precio - a.precio})
            console.log("El array ordenado queda de la siguiente manera: ", arrayParaOrdenar)
            break;
        }
    }
}

ordenarArray()

