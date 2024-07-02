import { get_cantidad_productos_en_carrito } from "./controllers/carrito.js";
import { set_trigger_para_modificacion_localstorage } from "./controllers/custom-triggers.js";

document.addEventListener('DOMContentLoaded', () => {

    // establecer el trigger para detectar cuando se modifica el localstorage
    set_trigger_para_modificacion_localstorage();

    // actualizar valor de la cantidad de productos en el carrito al iniciar la página
    const contadorProductosCarrito = document.getElementById('contenedor-cantidad-carrito');
    contadorProductosCarrito.innerHTML = '';
    contadorProductosCarrito.innerHTML = `(${get_cantidad_productos_en_carrito()})`;

    // actualizar valor de la cantidad cada vez que se modifica el localstorage
    document.addEventListener('storageChange', function (e) {
        if (e.target.value === 'cart') {
            contadorProductosCarrito.innerHTML = '';
            contadorProductosCarrito.innerHTML = `(${get_cantidad_productos_en_carrito()})`;
        }
    });
});
