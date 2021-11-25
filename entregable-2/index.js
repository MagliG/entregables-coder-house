//Consigna 1
var numeroPedido = prompt("Ingrese un numero: ")
var esMayorAMil = parseFloat(numeroPedido) > 1000

if(esMayorAMil){
    alert("Su numero es mayor a 1000")
} else {
    alert("Su numero es menor o igual a 1000")
}

//Consigna 2
var textoPedido = prompt("Ingrese un texto: ")
var textoHola = "Hola"

if( textoPedido === textoHola){
    console.log("Su texto es igual a 'Hola'")
}else {
    console.log("Su texto NO es igual a 'Hola'")
}

//Consigna 3
var otroNumeroPedido = parseFloat(prompt("Ingrese otro numero: "))
var esMayorADiez = otroNumeroPedido >= 10
var esMenorACincuenta = otroNumeroPedido <= 50

if( esMayorADiez && esMenorACincuenta){
    alert("Su numero esta entre 10 y 50")
}

