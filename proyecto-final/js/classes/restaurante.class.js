class Restaurante{
    constructor(id, nombre, ubicacion, tipoRestaurante ,capacidad, disponibilidad, costoReserva){
        this.id = id,
        this.nombre = nombre,
        this.ubicacion = ubicacion,
        this.tipoRestaurante = tipoRestaurante,
        this.capacidad = capacidad,
        this.disponibilidad = disponibilidad,
        this.costoReserva = costoReserva
    }

    tieneDisponibilidad(disponibilidadSolicitada){
        return (this.disponibilidad > disponibilidadSolicitada)
    }
}