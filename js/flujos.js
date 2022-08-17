alert("Bienvenido al Sistema!!!")

/*Creación de array de objetos*/
const productos = [ 
    {id:1, nombre:"Vincha",precio: 250},
    {id:2, nombre:"Cartera",precio: 3000},
    {id:3, nombre:"Campera", precio:1200}
]

/*Ocultación de Botones*/
document.getElementById("agregarProductos").style.display = 'none'; 
document.getElementById("seleccionarProductos").style.display = 'none'; 
document.getElementById("incluirIVA").style.display = 'none'; 
document.getElementById("incluirEnvio").style.display = 'none'; 

/*Generación de Eventos*/

let btnMostrarProductos = document.getElementById("mostrarProductos") 
btnMostrarProductos.addEventListener("click",respuestaClick)

let btnAgregarProductos = document.getElementById("agregarProductos") 
btnAgregarProductos.addEventListener("click",respuestaClickAgregar)

let btnSeleccionarProductos = document.getElementById("seleccionarProductos") 
btnSeleccionarProductos.addEventListener("click",respuestaSeleccionar)

/*Funciones de Eventos*/

function respuestaClickAgregar(){
    document.getElementById("seleccionarProductos").style.display = ''; /*Habilito Botón Seleccionar*/
    agregarProductos()
}

function respuestaSeleccionar(){
    mostrarProductosParaSeleccion()
    document.getElementById("incluirIVA").style.display = ''; /*Habilito Botón IVA*/
}


function respuestaClick(){
    console.log(productos)
    document.getElementById("agregarProductos").style.display = ''; 

    let listado = document.getElementById("listaProductos")

    /*Muestra de Productos*/
    listado.innerText = (`Producto N°: ${productos[0].id}. Nombre: ${productos[0].nombre}. Precio: \$${productos[0].precio}. 
    Producto N°: ${productos[1].id}. Nombre: ${productos[1].nombre}. Precio: \$${productos[1].precio}.
    Producto N°: ${productos[2].id}. Nombre: ${productos[2].nombre}. Precio: \$${productos[2].precio}.`)
}

/*agregarProductos() Dicha función le permitirá al usuario agrergar productos a la 
lista para luego simular su compra. */

function agregarProductos(){

    alert("¿Desea agregar productos?")

    let respAgr = parseInt(prompt("¿Desea agregar productos? 0 Si, 1 No"))

    while (respAgr == 0){
        productos.push({id:parseInt(productos[productos.length - 1].id+1),nombre:prompt("Ingrese Nombre"),precio:parseInt(prompt("Ingrese Precio"))})
        respAgr = parseInt(prompt("¿Desea agregar otro? 0 Si, 1 No"))
    } 
    
}

/*mostrarProductos()
Dicha función mostrará al usuario cada uno de los productos 
consultandolé si desea agregarlo al "carrito" 
y la cantidad deseada mostrando el SubTotal y 
el Total de la compra simulada.*/
function mostrarProductosParaSeleccion(){
    let finalCompra = 0
    for (const producto of productos) {
        alert("Producto N°: "+producto.id +"." + " Nombre: " + producto.nombre + "." + " Precio: $" + producto.precio + ".")
        alert("¿Desea agregar a su compra: " + producto.nombre + "? "+ "Precio: $" + producto.precio +".")
    
        let resp = parseInt(prompt("0 Si, 1 No"))
    
        if (resp == 0){
            alert("¡¡Producto Agregado!!")
    
            let cantidad = parseFloat(prompt("Ingrese la cantidad de su producto"))        
            let acumulado = calcularSubTotal(producto.precio,cantidad) 
            finalCompra = finalCompra + acumulado
    
            alert("Su subTotal es de: $" + calcularSubTotal(producto.precio,cantidad))
        } 
        alert("Su TOTAL es de: $"+ finalCompra)
        let totalSinIVA = document.getElementById("totalSinIVA")
        totalSinIVA.innerText = `\$${finalCompra}`
    }

    let btnIncluirIva = document.getElementById("incluirIVA") 
    btnIncluirIva.addEventListener("click",respuestaIVA)
    
    function respuestaIVA(){
        incluirIva(finalCompra)
        document.getElementById("incluirEnvio").style.display = ''; /*Habilito Botón Envio*/

    }
}



/*incluirIva(finalCompra)
Una vez que el usuario selecciono sus productos y tiene un Total final de la compra
se le consultará si desea incluir el IVA seteado en el 21% de la compra.*/

function incluirIva(finalCompra){
    iva = parseInt(prompt("¿Desea añadir IVA? 0 Si , 1 No"))

    if (iva == 0){
        alert("Su Total incluyendo IVA es de: $" + calcularIVA(finalCompra))
    
        let finalConIva = calcularIVA(finalCompra)

        let totalConIVA = document.getElementById("totalConIVA")
        totalConIVA.innerText = `\$${finalConIva}`

        let btnIncluirEnvio = document.getElementById("incluirEnvio") 
        btnIncluirEnvio.addEventListener("click",respuestaEnvio)

        function respuestaEnvio(){
            incluirEnvio(finalConIva)
        }

    } else {
        let finalConIva = finalCompra

        let totalConIVA = document.getElementById("totalConIVA")
        totalConIVA.innerText = `\$${finalConIva}`

        let btnIncluirEnvio = document.getElementById("incluirEnvio") 
        btnIncluirEnvio.addEventListener("click",respuestaEnvio)

        function respuestaEnvio(){
            incluirEnvio(finalConIva)
        }

    }
}

/*incluirEnvio() =
Dicha función le permitirá al usuario ingresar el costo del envió*/

function incluirEnvio(finalConIva){
    envio = parseInt(prompt("¿Desea añadir envio? 0 Si , 1 No"))

    if (envio == 0){
        let precioEnvio = parseFloat(prompt("Ingrese el precio de su envio"))

        alert("Su Total Final es de: $" + parseInt(calcularEnvio(finalConIva,precioEnvio)))
        let totalConEnvio = document.getElementById("totalConEnvio")
        totalConEnvio.innerText = `\$${parseInt(calcularEnvio(finalConIva,precioEnvio))}`
    } else {
        alert("Su Total Final fue de: $" + finalConIva)
        let totalConEnvio = document.getElementById("totalConEnvio")
        totalConEnvio.innerText = `\$${finalConIva}`

    }
}

/*calcularSubTotal(precio,cantidad)
Dicha función recibirá el precio y la cantidad de los productos seleccionados
y calculará el total multiplicando el precio con la cantidad.*/

function calcularSubTotal(precio,cantidad){
    return(precio * cantidad)
}

/*calcularIVA(cont)
Dicha función recibirá el total de la compra del usuario y le incluirá el IVA 
en caso de ser llamada *0.21 representa el 21% de IVA teniendo en cuenta el índice actual
en Argentina.*/

function calcularIVA (finalCompra){
    return (finalCompra + (finalCompra* 0.21))
}

/*calcularEnvio(cont,precioEnvio)
Dicha función recibirá el total final de la compra y le añadirá el precio del envio.*/

function calcularEnvio(finalConIva,precioEnvio){
    return(finalConIva+precioEnvio)
}





