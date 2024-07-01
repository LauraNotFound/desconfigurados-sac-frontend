import { requestProduct } from "./cart.js";
import { get_lista_producto_carrito } from "./controllers/carrito-controller.js";

// esta función te devuelve el nodo (slide con el nombre y precio-total del producto), 
// este nodo devuelto se incluye en la lista-resumen
const getNodeSlideSummary = (nombreProducto, costoTotal) => {

    // creamos un li que contendrá el nombre y precio
    const slideProductoSummary = document.createElement('li');
    // añadimos las clases
    slideProductoSummary.classList.add(["d-flex", "align-items-center", "justify-content-between"]);
    
    // elemento para el nombre
    const strongNombre = document.createElement('strong');
    strongNombre.classList.add(["small", "fw-bold", "nombre-producto"]);
    strongNombre.innerHTML = nombreProducto;

    // elemento para el precio
    const spanPrecio = document.createElement('span');
    spanPrecio.classList.add(["text-muted", "small", "total-producto"]);
    spanPrecio.innerHTML = `S/. ${costoTotal.toFixed(2)}`;

    // tanto nombre como precio lo añadimos al slide del producto creado
    slideProductoSummary.appendChild(strongNombre);
    slideProductoSummary.appendChild(spanPrecio);

    // devolvemos el nodo slide
    return slideProductoSummary;
}

// Con esta función obtenemos la lista de productos en el carrito
// iteramos sobre ellos, creamos el nodo con los datos correspondientes y
// lo añadimos a la lista-resumen
const setProductosSummary = () => {
    // insertar productos del carrito en el resumen
    const listaResumenCarrito = document.getElementById('lista-resumen');

    // obtenemos el elemento para el precio-total
    const precioTotalElemento = document.getElementById('precio-total');

    // obtenemos la lista de los produtos en el carrito
    const listaProductosCarrito = get_lista_producto_carrito();
    requestProduct(); // nos aseguramos que la información de los productos han sido recolectados de la API (en otras palabras que en el localstorage exista el campo producto en cada diccionario de la lista {id, producto, amount})

    // inicializamos un contador para la suma de precios totales
    let precioTotal = 0;

    // iteramos sobre la lista
    for (let i = 0; i < listaProductosCarrito.length; i++) {

        // creamos un elemento que sirve como separador de nodos-producto y tiene que ser insertado intercaladamente con el nodo-producto
        const spaceBetween = document.createElement('li');
        spaceBetween.classList.add(["border-bottom", "my-2"]);

        // calculamos el costo total por producto
        const precioTotalProducto = listaProductosCarrito[i].amount * listaProductosCarrito[i].producto.precio;

        // acumulamos el precio en el total
        precioTotal += precioTotalProducto;
        
        // obtenemos el nodo del producto con la información específica del producto
        const nodeProducto = getNodeSlideSummary(listaProductosCarrito[i].producto.nombre, precioTotalProducto);

        // incluimos el nodo y su correspondiente separador en la lista resumen de productos
        listaResumenCarrito.appendChild(nodeProducto);
        listaResumenCarrito.appendChild(spaceBetween);
    }

    // al final actualizamos el precio total en el DOM
    precioTotalElemento.innerHTML = `S/. ${precioTotal.toFixed(2)}`;

}



document.addEventListener('DOMContentLoaded', () => {

    // establecemos el resumen de productos
    setProductosSummary();
    
    // crear un objeto Billing details
});

