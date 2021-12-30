class Reserva{
    constructor(nombre, cantidadPersonas, fecha, hora, restaurante, costoReserva){
        this.nombre = nombre,
        this.cantidadPersonas = cantidadPersonas,
        this.fecha = fecha, 
        this.hora = hora, 
        this.restaurante = restaurante,
        this.costoReserva = costoReserva
    }

    registrarReserva(){
        if(this.nombre !== ""){
            localStorage.setItem(this.nombre, JSON.stringify(this));
            return "OK"
        }else{
            console.log("No se pudo registrar reserva")
            return "ERROR"
        }
    }

}