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

let comensal = new Cliente("", "", "", new Menu(0, "", "", "", 0, ""))

let tipoMenuIngresado = 0

const cantidadClientes = parseInt(prompt("Ingrese la cantidad de comensales (maximo 5 por mesa): "))
const clientes = []

function guardarComensales(){
    for(let i= 0; i < cantidadClientes; i++){
        comensal.nombre = prompt("Ingrese el nombre: ")
        comensal.apellido = prompt("Ingrese el apellido: ")
        comensal.dni = parseInt(prompt("Ingrese el DNI: "))
        tipoMenuIngresado = parseInt(prompt("Ingresar el tipo de menu: (opciones disponibles) \n" + "1. Pescado \n 2. Carne \n 3. Vegetariano"))
        comensal.menu = traerMenu(tipoMenuIngresado)
        clientes.push(comensal)
        localStorage.setItem("Clientes", JSON.stringify(clientes))
    }
}

const datos = JSON.parse(localStorage.getItem("Clientes"))

function listarClientesIngresados(){

    const nodoParaLista = document.getElementById("listadoClientes")
    console.log(datos)
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
    totalesActualizado = `Total clientes: ${datos.length}`
    totales.replaceWith(totalesActualizado)
}

guardarComensales()
listarClientesIngresados()
mostrarTotalClientes()