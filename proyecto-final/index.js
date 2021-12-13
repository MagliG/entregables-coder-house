class Restaurante{
    constructor(nombre, ubicacion, tipoRestaurante ,totalMesas, mesasDisponibles, entrada, menuPrincipal, postre){
        this.nombre = nombre,
        this.ubicacion = ubicacion,
        this.tipoRestaurante = tipoRestaurante,
        this.totalMesas = totalMesas,
        this.mesasDisponibles = mesasDisponibles,
        this.entrada = entrada,
        this.menuPrincipal = menuPrincipal,
        this.postre = postre
    }
}

class Entrada{
    constructor(nombre, descripcion, precio){
        this.nombre = nombre,
        this.descripcion = descripcion
        this.precio = precio
    }
}

class MenuPrincipal{
    constructor(nombre, descripcion, precio){
        this.nombre = nombre,
        this.descripcion = descripcion
        this.precio = precio
    }
}

class Postre{
    constructor(nombre, descripcion, precio){
        this.nombre = nombre,
        this.descripcion = descripcion
        this.precio = precio
    }
}


// const entradasBirra = []
// const menuPrincipalBirra = []
// const postresBirra = []
// const birraBar = new Restaurante("La Birra Bar", "Gurruchaga 729, CABA", "Hamburguesería", 26, 18, entradasBirra, menuPrincipalBirra, postresBirra)


// Francisca del Fuego
const tablaQuesos = new Entrada("Tabla de Quesos", "Quesos artesanales selccionados", 550)
const berenjenaAhumada = new Entrada("Berenjena Ahumada", "Berenjena ahumada con eucalipto, straciatella, alioli de perejil, alcaparras secas, y pickle de pasas de uva.", 550)
const carpaccioZucchini = new Entrada("Carpaccio de Zucchini", "Finas láminas de zucchini, tzatziki -salsa de pepino, yogurt y menta-, eneldo, remolacha bra-seada, pistachos, tierra de alcaparras, quinoa crocante.", 550)
const margherita = new MenuPrincipal("Margherita", "Salsa de tomates biodinámicos infusionados con albahaca y ajo, muzzarella, parmesano albahaca, y oliva. 4 porciones", 840)
const funghi = new MenuPrincipal("Funghi", "Salsa de tomates biodinámicos infusionados con albahaca y ajo, muzzarella, parmesano, mix de hongos (girgolas y portobellos con cebolla de verdeo), aceite de trufas y perejil. 4 porciones.", 1000)
const pancetaHuevo = new MenuPrincipal("Panceta & Huevo", "Salsa de tomates biodinámicos infusionados con albahaca y ajo, muzzarella, panceta, huevo de campo, perejil. 4 porciones.", 1100)
const tiramisu = new Postre("Tiramisú", "Postre a base de queso crema, pionono de café, almíbar de ron, cacao en polvo.", 520)
const flanDDL = new Postre("Flan de Dulce de Leche", "Flan de dulce de leche, vainilla y crema de cardamomo.", 520)
const entradasFrancisca = [tablaQuesos, berenjenaAhumada, carpaccioZucchini]
const menuPrincipalFrancisca = [margherita, funghi, pancetaHuevo]
const postresFrancisca = [tiramisu, flanDDL]
const franciscaDelFuego = new Restaurante("Francisca del Fuego", "Av. Corrientes 1368", "Pizzería", 40, 11, entradasFrancisca, menuPrincipalFrancisca, postresFrancisca)

// const restaurantes = [birraBar, franciscaDelFuego]


let ubicacionPrincipal = window.pageYOffset;

  AOS.init();

window.addEventListener("scroll", function(){
    let desplazamientoActual = window.pageYOffset;
    if(ubicacionPrincipal >= desplazamientoActual){
        document.getElementsByTagName("nav")[0].style.top = "0px"
    }else{
        document.getElementsByTagName("nav")[0].style.top = "-100px"
    }
    ubicacionPrincipal= desplazamientoActual;

})