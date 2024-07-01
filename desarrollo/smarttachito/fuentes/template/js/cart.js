import { delete_producto_del_carrito, get_lista_producto_carrito, set_lista_producto_carrito } from "./controllers/carrito-controller.js";

// -------------------------------- functions --------------------------------------
// función para realzar la petición a la API y obtener el producto
export const requestProduct = async () => {

    // obtener la lista de {id, cantidad} de producto del locastorage
    const listCarrito = get_lista_producto_carrito();
    
    // iterar en toda esta lista
    for (let i = 0; i < listCarrito.length; i++) {

        // is no existe el atributo producto entonces es porque necesitamos encontrar esa
        // información en la respuesta de la API y escribirla en la listCarrito en el campo
        // producto 
        if (!listCarrito[i].producto) { 

            // petición a la api
            const response = await fetch(url);
            const producto = await response.json();

            // creamos un atributo producto y le añadimos el encontrado
            listCarrito[i].producto = producto;
        }
    }

    // preservamos el nuevo estado de la listCarrito en el localstorage
    // sobreescribiendo el anterior
    set_lista_producto_carrito(listCarrito);    
}

// esta función se encargará de cargar las vistas de los productos en la lista en el html
// además de establecer el comportamiento de algunos elementos como boton de eliminado
const managerToDrawProductList = async () => {
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

        // funcion que establece le comportameinto del boton de eliminado
        establecerFuncionamientoDelBotonDeEliminado();

    } catch (error) {
        console.error("Error al cargar los productos: ", error);
    }
}

// establecer el eliminado de productos del carrito
const establecerFuncionamientoDelBotonDeEliminado = () => {
    // eliminar un elemento del carrito
    // obtenemos todos los elementos vista del producto en el carrito
    document.querySelectorAll('.contenedor-producto').forEach(producto_carrito => {

        // obtenemos el boton de eliminado de cada uno y escuchamos el click
        producto_carrito.querySelector('.borrar-producto-del-carrito').addEventListener('click', () => {

            // obtenemos el id del producto a eliminar 
            const idProduct = producto_carrito.getAttribute('data-producto-id_url');

            // eliminamos el producto del carrito
            delete_producto_del_carrito(idProduct);
        });
    });
}


// función intermedia que retorna la plantilla, solo se usa para ingresar los atributos uno a uno
const prepararPlantillaProductoCarrito = (productoCarrito) => {

    // creamos el contenedor del slide
    const slideProductoCarrito = document.createElement('tr');

    // añadimos atributos e incrustamos la plantilla del slider con datos específicos de producto
    slideProductoCarrito.classList.add('contenedor-producto');
    slideProductoCarrito.setAttribute('data-producto-id', productoCarrito.id);
    slideProductoCarrito.innerHTML = htmlCartProducto(
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
            <td class="p-3 align-middle border-light"><a class="reset-anchor" href="#!"><i class="fas fa-trash-alt small text-muted borrar-producto-del-carrito"></i></a>
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
    subTotalElemnt.innerHTML = subTotal.toFixed(2);
    totalElement.innerHTML = subTotal.toFixed(2);
}


// ------------------- listeners ------------------------------------------
// refrescar el estado de la lista cuando sucede un cambio en el campo cart del localstorage
// osea cuando se modifica la lista del carrito
window.addEventListener('storageChange', async (event) => {
    if (event.detail.key === 'cart') {
        await managerToDrawProductList();
        calcularTotaSubTotal();
    }
});

// ejecución inicial al cargar cuando el DOM a cargado por completo
document.addEventListener('DOMContentLoaded', async () => {
    // mostrar la lista inicial
    await requestProduct();
    await managerToDrawProductList();
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