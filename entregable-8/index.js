class Menu{
    constructor(id, entrada, platoPrincipal, postre, precio, tipoMenu){
        this.id = id,
        this.entrada = entrada,
        this.platoPrincipal = platoPrincipal,
        this.postre = postre,
        this.precio = precio,
        this.tipoMenu = tipoMenu
    }

    mostrarPrecio(menu){
        console.log(menu.precio)
    }
}

class Cliente{
    constructor(nombre, apellido, dni, menu){
        this.nombre = nombre,
        this.apellido = apellido, 
        this.dni = dni,
        this.menu = menu
    }
}

let menuExiste = ""

function traerMenu(tipoMenuIngresado){
    return (menuExiste = menuesRestaurante.find( elemento => elemento.id === tipoMenuIngresado))
}


let menuesRestaurante = [new Menu(1, "Rabas", "Langosta Americana", "Pie de limón con alemndreas", 1500, "Pescado"), 
                        new Menu(2, "Lasaña bolognesa", "Pollo al ajillo", "Soufflé de chocolate", 1200, "Carne"),
                        new Menu(3, "Pastel de berenjena", "Risotto de vegetales con calabaza", "Frutillas rellenas", 1100, "Vegetariano")]

let tipoMenuIngresado = 0
const cantidadClientes = parseInt(prompt("Ingrese la cantidad de comensales (maximo 5 por mesa): "))
let clientes = []

function guardarComensales(){
    if(cantidadClientes > 5){
        alert("Supera la cantidad de personas por mesa")
    }else{
        for(let i= 0; i < cantidadClientes; i++){
            let comensal = new Cliente(prompt("Ingrese el nombre: "), 
                                        prompt("Ingrese el apellido: "), 
                                        parseInt(prompt("Ingrese el DNI: ")), 
                                        traerMenu(parseInt(prompt("Ingresar el tipo de menu: (opciones disponibles) \n" + "1. Pescado \n 2. Carne \n 3. Vegetariano"))) )
            clientes.push(comensal)
            localStorage.setItem("Clientes", JSON.stringify(clientes))
        }
    }
}

function listarClientesIngresados(){

    const datos = JSON.parse(localStorage.getItem("Clientes"))
    const nodoParaLista = document.getElementById("listadoClientes")
    for(let i = 0; i < datos.length; i++){

        const plantilla = `<li> 
                    <p>${datos[i].nombre}, ${datos[i].apellido} DNI: ${datos[i].dni}</p>                    
                    <p>Menú elegido:</p>
                    <p>Entrada: ${datos[i].menu.entrada}</p>
                    <p>Plato principal: ${datos[i].menu.platoPrincipal}</p>
                    <p>Postre: ${datos[i].menu.postre}</p>
                    <hr>
                    </li>`
        nodoParaLista.innerHTML+=plantilla
    }
}

function mostrarTotalClientes(){
    let totales = document.getElementById("totalClientes")
    console.log(totales)
    totalesActualizado = `Total clientes: ${JSON.parse(localStorage.getItem("Clientes")).length}`
    totales.replaceWith(totalesActualizado)
}

guardarComensales()
listarClientesIngresados()
mostrarTotalClientes()