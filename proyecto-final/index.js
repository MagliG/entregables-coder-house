class Restaurante{
    constructor(nombre, ubicacion, tipoRestaurante ,totalMesas, mesasDisponibles, menu){
        this.nombre = nombre,
        this.ubicacion = ubicacion,
        this.tipoRestaurante = tipoRestaurante,
        this.totalMesas = totalMesas,
        this.mesasDisponibles = mesasDisponibles,
        this.menu = menu
    }
}

class Menu{
    constructor(entrada, platoPrincipal, postre, bebida, cafe){
        this.entrada = entrada,
        this.platoPrincipal = platoPrincipal,
        this.postre = postre,
        this.bebida = bebida,
        this.cafe = cafe
    }
}

const restaurantes = [] //definir por lo menos 3 restaurantes


let ubicacionPrincipal = window.pageYOffset; //0

  AOS.init();

window.addEventListener("scroll", function(){
    let desplazamientoActual = window.pageYOffset; //180
    if(ubicacionPrincipal >= desplazamientoActual){ // 200 > 180
        document.getElementsByTagName("nav")[0].style.top = "0px"
    }else{
        document.getElementsByTagName("nav")[0].style.top = "-100px"
    }
    ubicacionPrincipal= desplazamientoActual; //200

})