//Consigna 1

let numeroPedido = parseInt(prompt("Ingrese un numero: "))
const numeroASumar = 5

for(let i = 0; i < 9; i++){
    numeroPedido = numeroPedido + numeroASumar
    console.log(numeroPedido)
}

//Consigna 2

let textoPedido = "Texto Inicial"
const textoConcatenar = "'concateno esto'"
let textoConcatenado = "Texto Inicial"

do {
    textoPedido = prompt("Ingrese un texto (ingresa 'ESC' para finalizar): ")
    textoConcatenado = textoPedido + " " + textoConcatenar

    if(textoPedido != "ESC"){
        console.log(textoConcatenado)
    }

}while( textoPedido != "ESC")



//Consigna 3

const cantidadHola = parseInt(prompt("Ingrese un numero para indicar la cantidad de veces que se logueara 'Hola'"))

for(let i = 0; i < cantidadHola; i++){
    console.log("Hola")
}

