import { delete_producto_del_carrito, get_lista_producto_carrito } from "./controllers/carrito.js";
import { get_cantidad_productos_en_carrito } from "./controllers/carrito.js";
import { set_trigger_para_modificacion_localstorage } from "./controllers/custom-triggers.js";


// -------------------------------- functions --------------------------------------
// esta función se encargará de cargar las vistas de los productos en la lista en el html
// además de establecer el comportamiento de algunos elementos como boton de eliminado
const managerToDrawProductList = () => {
    // Este es el contenedor que funcionará como lista, aquí se incrustará las plantillas 
    // con los datos de los productos en el carrito
    const listaCarritoHtml = document.getElementById('lista-carrito');
    listaCarritoHtml.innerHTML = '';

    // Esta es la lista de porductos en el carrito (localstorage)
    // la función get_lista_producto_carrito te devuelve la lista
    // de los productos en el localstorage pero estos solo tienen dos campos
    // id y cantidad, luego los otros atributos se obtendrán de la petición usando el 
    // id del producto específico
    const listaProductosCarrito = get_lista_producto_carrito();

    try {

        // se itera en todos los productos{id, producto, cantidad} que están en el localstorage
        listaProductosCarrito.forEach(element => {
            
            if (element.producto) {
                // obtenemos la plantilla pasando el diccionario "producto" y la cantidad de este producto
                const plantillaHTMLProductoCarrito = prepararPlantillaProductoCarrito(element);
                
                // añadimos la plantilla html (ya tiene los datos del producto específico) en la lista en el html
                listaCarritoHtml.appendChild(plantillaHTMLProductoCarrito);
            }
        });

    } catch (error) {
        console.error("Error al cargar los productos: ", error);
    }
}


// función intermedia que retorna la plantilla, solo se usa para ingresar los atributos uno a uno
const prepararPlantillaProductoCarrito = (productoCarrito) => {

    // creamos el contenedor del slide
    const slideProductoCarrito = document.createElement('tr');

    // añadimos atributos e incrustamos la plantilla del slider con datos específicos de producto
    slideProductoCarrito.innerHTML = htmlCartProducto(
        productoCarrito.id,
        productoCarrito.producto.nombre,
        productoCarrito.producto.imagen_principal,
        productoCarrito.producto.precio,
        productoCarrito.amount
    )

    // retornamos le nodo para ser añadido al elemento padre 
    return slideProductoCarrito;
}

// retorna la plantilla html con los datos del producto pasados
const htmlCartProducto = (
    id_url,
    nombre,
    imagen,
    precio,
    cantidad
) => {
    
    return `
        <th class="ps-0 py-3 border-light" scope="row">
            <div class="d-flex align-items-center"><a class="reset-anchor d-block animsition-link" href="detail.html"><img id="imagen-principal" src="${imagen}" alt="${nombre}-imagen" width="70"></a>
            <div class="ms-3"><strong class="h6"><a class="reset-anchor animsition-link" href="detail.html" id="nombre-producto">${nombre}</a></strong></div>
            </div>
        </th>
        <td class="p-3 align-middle border-light">
            <p class="mb-0 small" id="precio-unitario">S/. ${precio}</p>
        </td>
        <td class="p-3 align-middle border-light">
            <div class="border d-flex align-items-center justify-content-between px-3"><span class="small text-uppercase text-gray headings-font-family">Quantity</span>
            <div class="quantity">
                <button class="dec-btn p-0"><i class="fas fa-caret-left"></i></button>
                <input class="form-control form-control-sm border-0 shadow-0 p-0 cantidad-producto" type="text" value="${cantidad}">
                <button class="inc-btn p-0"><i class="fas fa-caret-right"></i></button>
            </div>
            </div>
        </td>
        <td class="p-3 align-middle border-light">
            <p class="mb-0 small" id="precio-total">S/. ${(precio * cantidad).toFixed(2)}</p>
        </td>
            <td class="p-3 align-middle border-light"><a class="reset-anchor" onclick="delete_producto_del_carrito(${id_url})" href="#!"><i class="fas fa-trash-alt small text-muted"></i></a>
        </td>
    `
}

// funcion para realiar los calculos totales y mostrarlos
function calcularTotaSubTotal () {
    // obtener la lista de productos en el carrito
    const listCarrito = get_lista_producto_carrito()

    // varable inicial para el precio total
    let subTotal = 0;

    // recorremos en todos los productos
    for (let i = 0; i < listCarrito.length; i++) {
        subTotal += listCarrito[i].producto.precio * listCarrito[i].amount;
    }

    // refrescar el resultado en el html
    const subTotalElemnt = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    subTotalElemnt.innerHTML = '';
    totalElement.innerHTML = '';
    subTotalElemnt.innerHTML = `S/. ${subTotal.toFixed(2)}`;
    totalElement.innerHTML = `S/. ${subTotal.toFixed(2)}`;
}

function actualizarContadorCantidadProducto() {
    const contadorProductosCarrito = document.getElementById('contenedor-cantidad-carrito');
    contadorProductosCarrito.innerHTML = '';
    contadorProductosCarrito.innerHTML = `(${get_cantidad_productos_en_carrito()})`;
}

// ------------------- listeners ------------------------------------------
// refrescar el estado de la lista cuando sucede un cambio en el campo cart del localstorage
// osea cuando se modifica la lista del carrito
window.addEventListener('storageChange', (event) => {
    if (event.detail.key === 'cart') {
        actualizarContadorCantidadProducto();
        managerToDrawProductList();
        calcularTotaSubTotal();
    }
});

// ejecución inicial al cargar cuando el DOM a cargado por completo
document.addEventListener('DOMContentLoaded', () => {
    // mostrar la lista inicial
    set_trigger_para_modificacion_localstorage();
    actualizarContadorCantidadProducto();
    managerToDrawProductList();
    calcularTotaSubTotal();
});

// DESCRIPCIÓN TOTAL
// cuando se ejecuta por primera vez este script, se solicitará a la API los datos de los productos, 
// que hemos seleccionado para el carrito de compras. Esto para almacenarlo en la locastorage y no realzar multiples peticiones luego. Luego nuestra listCarrito pasa de tener una lista de diccionario con dos campos

// listCarrito = [
//     {
//         id_url: "url/1",
//         amount: 2
//     },
//     {
//         id_url: "url/3",
//         amount: 4
//     },
//     {
//         id_url: "url/5",
//         amount: 1
//     },
//     {
//         id_url: "url/13"
//         amount: 2
//     }
// ]

// a tener 3 campos, añadiendo el campo producto que contiene el producto que respondió la petición a la API.

// uso 
// 1) tienes que incluir el id lista-carrito en el contenedor donde quieras que se incluyan
//    los slides de producto en el carrito
// 2) para el total y subtotal solo añadir el id total y subtotal respectivamente