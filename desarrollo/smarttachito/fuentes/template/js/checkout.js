import { requestProduct } from "./cart.js";
import { get_lista_producto_carrito } from "./controllers/carrito-controller.js";

// ------------------- resumen del carrito -------------------------------------------
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

// ----------------------------------------------------------------------------------------
// ----------------------------- formulario del checkout -------------------------------------
// ----------- validación de campos ----------------------------------------------------------
const setValidacionCampos = () => {
    const firstLastNameRegex = /^[A-Za-z\s]*$/; // patron para validar nombres
    const phoneRegex = /^\d+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // validamos que el nombre y apellido no contenga número ni caracteres especiales
    ['firstName', 'firstName2'].forEach(idFirstName => {
        document.getElementById(idFirstName).addEventListener('input', function (e) {
        
            // verificamos si cumple el patrón
            if (!firstLastNameRegex.test(e.target.value)) {
                
                // eliminamos la última entrada si no cumple el patrón
                e.target.value = e.target.value.slice(0, -1);
        
                e.target.classList.add('error-border');
        
                setTimeout(() => {
                    e.target.classList.add('fade-out');
                }, 100);
        
                setTimeout(() => {
                    e.target.classList.remove('error-border');
                    e.target.classList.remove('fade-out');
                }, 4100);
            }
        });
    });

    ['lastName', 'lastName2'].forEach(idLastName => {
        document.getElementById(idLastName).addEventListener('input', function (e) {
        
            // verficamos si cumple el patrón
            if (!firstLastNameRegex.test(e.target.value)) {
        
                // eliminamos la última entrada si no cumple el patrón
                e.target.value = e.target.value.slice(0, -1);
        
                e.target.classList.add('error-border');
        
                setTimeout(() => {
                    e.target.classList.add('fade-out');
                }, 100);
        
                setTimeout(() => {
                    e.target.classList.remove('error-border');
                    e.target.classList.remove('fade-out');
                }, 4100);
            }
        });
    });

    // formateamos la entrada cuando el input pierde el foco
    ['firstName', 'firstName2'].forEach(idFirstName => {
        document.getElementById(idFirstName).addEventListener('blur', function (e) {
            e.target.value = formatName(e.target.value);
        });
    });

    ['lastName', 'lastName2'].forEach(idLastName => {
        document.getElementById(idLastName).addEventListener('blur', function (e) {
            e.target.value = formatName(e.target.value);
        });
    });

    // con esta función damos formato a los nombres
    function formatName(name) {
        "".trim()
        return name
        .trim() // elimina espacios en blanco al inicio y al final
        .replace(/\s+/g, ' ') // reemplaza múltiples espacios con uno solo
        .split(' ') // divide la cadena en palabras
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // colocamos la primera letra de la palabra en mayúsculas
        .join(' '); // volvemos a unir todo con solo un espacio entre los elementos
    }


    // validamos número de teléfono
    ['phone', 'phone2'].forEach(idPhone => {
        document.getElementById(idPhone).addEventListener('input', function (e) {

            if (!phoneRegex.test(e.target.value)) {
                e.target.value = e.target.value.slice(0, -1);
        
                e.target.classList.add('error-border');
        
                setTimeout(() => {
                    e.target.classList.add('fade-out');
                }, 100);
        
                setTimeout(() => {
                    e.target.classList.remove('error-border');
                    e.target.classList.remove('fade-out');
                }, 4100);
            }
        });
    });

    // validadmos dirección email
    ['email', 'email2'].forEach(idEmail => {
        document.getElementById(idEmail).addEventListener('blur', function (e) {
            if (!emailRegex.test(e.target.value) && e.target.value != '') {
                e.target.focus();
                e.target.classList.add('error-border');
        
                setTimeout(() => {
                    e.target.classList.add('fade-out');
                }, 100);
        
                setTimeout(() => {
                    e.target.classList.remove('error-border');
                    e.target.classList.remove('fade-out');
                }, 4100);
            }
        });
    });
}

// ------------------------------------------------------------------------------------
// ----------- Establecer el comportamiento al presionar Place Order ------------------
const setSubmit = () => {
    const formulario = document.getElementById('billing-details');

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();

        const inputsFormulario = document.querySelectorAll('input');
        const datosFormularioObject = {};

        inputsFormulario.forEach(input => {
            console.log(`${input.id}: ${input.value}`);
            datosFormularioObject[input.id] = input.value;
        });

        console.log(datosFormularioObject);
    });
}
// ------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {

    // establecemos el resumen de productos
    setProductosSummary();

    // configurar la validación de campos
    setValidacionCampos();
    
    // establecer el comportamiento del boton place-order
    setSubmit();

});

