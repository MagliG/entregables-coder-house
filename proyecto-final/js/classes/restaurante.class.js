class Restaurante{
    constructor(id, nombre, ubicacion, tipoRestaurante, descripcion ,capacidad, disponibilidad, costoReserva, imagen, menuPDF){
        this.id = id,
        this.nombre = nombre,
        this.ubicacion = ubicacion,
        this.tipoRestaurante = tipoRestaurante,
        this.descripcion = descripcion,
        this.capacidad = capacidad,
        this.disponibilidad = disponibilidad,
        this.costoReserva = costoReserva,
        this.imagen = imagen,
        this.menuPDF = menuPDF
    }

    tieneDisponibilidad(disponibilidadSolicitada){
        return (this.disponibilidad >= disponibilidadSolicitada)
    }
}