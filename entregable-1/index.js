//Consigna 1
var nombre = prompt("Ingrese su nombre: ")
console.log("Hola "+nombre+", buenas tardes!")

//Consigna 2
var numeroDefinido = 400
var numeroPedido = prompt("Ingrese un número para ser sumado a "+numeroDefinido+" (podés poner decimales, por ejemplo 200.37 ;) )")
var resultadoSuma = numeroDefinido + parseFloat(numeroPedido)
console.log("La suma entre "+numeroPedido+" y "+numeroDefinido+" es "+resultadoSuma)

//Consigna 3
var textoA = prompt("Ingrese un texto: ")
var textoB = prompt("Ingrese otro texto: ")
var textoConcatenado = textoA + " " + textoB
alert("El texto concatenado quedaría así: "+textoConcatenado)