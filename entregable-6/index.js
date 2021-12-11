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


let menuesRestaurante = [new Menu(1, "Rabas", "Langosta Americana", "Pie de limón con alemndreas", 1500, "Pescado"), 
                        new Menu(2, "Lasaña bolognesa", "Pollo al ajillo", "Soufflé de chocolate", 1200, "Carne"),
                        new Menu(3, "Pastel de berenjena", "Risotto de vegetales con calabaza", "Frutillas rellenas", 1100, "Vegetariano")]


let tipoMenuIngresado = prompt("Ingresar el tipo de menu: (opciones disponibles) \n" + "1. Pescado \n 2. Carne \n 3. Vegetariano")

const menuExiste = menuesRestaurante.find( elemento => elemento.tipoMenu === tipoMenuIngresado)

if( menuExiste !== undefined){
    console.log(menuExiste)
}else{
    alert("El menu ingresado no existe")
}