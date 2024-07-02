import { set_trigger_para_modificacion_localstorage } from "./controllers/custom-triggers.js";
import { get_cantidad_productos_en_carrito, guardar_producto_en_carrito } from "./controllers/carrito.js";

function actualizarContadorCantidadProducto() {
    const contadorProductosCarrito = document.getElementById('contenedor-cantidad-carrito');
    contadorProductosCarrito.innerHTML = '';
    contadorProductosCarrito.innerHTML = `(${get_cantidad_productos_en_carrito()})`;
}

window.addEventListener('storageChange', function (e) {
    if (e.target.value === 'cart') {
        actualizarContadorCantidadProducto();
    }
});

function cargarContenidoDetallesProducto() {
    // recuperamos el producto a representar en los detalles
    const producto = localStorage.getItem('detailsProduct');

    // imágenes
    const listImages = [
        producto.imagen_principal,
        producto.imagen_secundaria_1,
        producto.imagen_secundaria_2,
        producto.imagen_secundaria_3,
        producto.imagen_360
    ]

    // load imagenes del left nav
    const listImgElements = document.querySelectorAll('.w-100');
    let index = 0;
    listImgElements.forEach(imgE => {
        imgE.src = listImages[index++];
    });

    // load imagenes auto-slide
    const listImgFluid = document.querySelectorAll('.img-fluid');
    index = 0;
    listImgFluid.forEach(imgE => {
        imgE.src = listImages[index++];
    });

    // load nombre del producto
    const nombreProducto = document.getElementById('nombre-producto');
    nombreProducto.innerHTML = '';
    nombreProducto.innerHTML = producto.nombre;

    // load precio del producto
    const precioProducto = document.getElementById('precio-producto');
    precioProducto.innerHTML = '';
    precioProducto.innerHTML = `S/. ${producto.precio}`;

    // load descripción corta
    const descripcionCortaProducto = document.getElementById('descripcion-corta-producto');
    descripcionCortaProducto.innerHTML = '';
    descripcionCortaProducto.innerHTML = descripcion_breve;

    // load categoría
    const categoriaProducto = document.getElementById('categoria-producto');
    categoriaProducto.innerHTML = '';
    categoriaProducto.innerHTML = producto.categoria;

    // load nombre del producto (descripción larga)
    const nombreProducto2 = document.getElementById('nombre-producto-2');
    nombreProducto2.innerHTML = '';
    nombreProducto2.innerHTML = producto.nombre;

    // load descripción larga del producto
    const descripcionLargaProducto = document.getElementById('descripcion-larga-producto');
    descripcionLargaProducto.innerHTML = '';
    descripcionLargaProducto.innerHTML = producto.descripcion_extendida;

}

// configurar el boton para que guarde en el carrito el producto si se presiona en añadir
function setButtonBehavior() {
    document.getElementById('agregar-al-carrito').addEventListener('click', function (e) {
        const producto = localStorage.getItem('detailsProduct');
        const cantidadProducto = document.getElementById('cantidad-producto').value;
        guardar_producto_en_carrito(producto.url, producto, cantidadProducto);
    });
}

document.addEventListener('DOMContentLoaded', function () {

    // establecer algunos triggers (en este caso storageChange osea cuando el localstorage cambia)
    set_trigger_para_modificacion_localstorage();

    // actualizar el contador de prodcutos en el carrito en el header
    actualizarContadorCantidadProducto();

    // cargar todo el contenido del producto seleccionado para ver sus detalles
    cargarContenidoDetallesProducto();

    // establecer el comportamiento del boton agregar al carrito
    setButtonBehavior();
});


/*
{
    "nombre": "",
    "descripcion_breve": "",
    "descripcion_extendida": "",
    "precio": null,
    "imagen_principal": null,
    "imagen_secundaria_1": null,
    "imagen_secundaria_2": null,
    "imagen_secundaria_3": null,
    "imagen_360": null,
    "stock": null,
    "categoria": null
}
*/