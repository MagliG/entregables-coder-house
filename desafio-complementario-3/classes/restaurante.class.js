class Restaurante{
    constructor(id, nombre, ubicacion, tipoRestaurante ,totalMesas, mesasDisponibles, entrada, menuPrincipal, postre){
        this.id = id,
        this.nombre = nombre,
        this.ubicacion = ubicacion,
        this.tipoRestaurante = tipoRestaurante,
        this.totalMesas = totalMesas,
        this.mesasDisponibles = mesasDisponibles,
        this.entrada = entrada,
        this.menuPrincipal = menuPrincipal,
        this.postre = postre
    }

    tieneMesasDisponibles(){
        return (this.mesasDisponibles > 0)
    }
}