const showUno = "1. Maroon 5 \n"
const showDos = "2. John Mayer \n"
const showTres = "3. The Beatles \n"

const precioShowUno = 5600
const precioShowDos = 8700
const precioShowTres = 9800

const costoPorServicios = 740

const precioTotalShowUno = precioShowUno + costoPorServicios
const precioTotalShowDos = precioShowDos + costoPorServicios
const precioTotalShowTres = precioShowTres + costoPorServicios

function seleccionarShow() {
    let showSeleccionado = parseInt(prompt("Ingrese el numero del show: \n" + showUno + showDos + showTres))
    const noExisteShow = showSeleccionado != 1 && showSeleccionado != 2 && showSeleccionado != 3
    if( noExisteShow ){
        alert("El numero de show ingresado NO EXISTE")
        return false
    }
    return showSeleccionado
}

function calcularPrecioTotalEntradas(cantidadEntradas, precioTotalUnitarioShow){
    precioFinal = precioTotalUnitarioShow * cantidadEntradas

    alert("El precio final de la compra es de: "+ precioFinal + " para una cantidad de " + cantidadEntradas + "entradas. Nos pondremos en contacto via mail para continuar con la forma de pago.")

}

function calcularValorShow (showSeleccionado){
    switch(showSeleccionado){
        case 1: {
            alert("Usted selecciono el show de: " + showUno + "El precio unitario del show es: " + precioTotalShowUno)
            let cantidadEntradas = parseInt(prompt("Ingrese la cantidad de entradas a comprar: "))
            calcularPrecioTotalEntradas(cantidadEntradas, precioTotalShowUno)
            break;
        }
        case 2: {
            alert("Usted selecciono el show de: " + showDos + "El precio unitario del show es: " + precioTotalShowDos)
            let cantidadEntradas = parseInt(prompt("Ingrese la cantidad de entradas a comprar: "))
            calcularPrecioTotalEntradas(cantidadEntradas, precioTotalShowDos)
            break;
        }
        case 3: {
            alert("Usted selecciono el show de: " + showTres + "El precio unitario del show es: " + precioTotalShowTres)
            let cantidadEntradas = parseInt(prompt("Ingrese la cantidad de entradas a comprar: "))
            calcularPrecioTotalEntradas(cantidadEntradas, precioTotalShowTres)
            break;
        }
    }
}

const show = seleccionarShow()
calcularValorShow(show)