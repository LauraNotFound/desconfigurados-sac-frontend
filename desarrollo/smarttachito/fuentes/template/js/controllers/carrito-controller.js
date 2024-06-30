
/*
listCarrito = [
    {
        id: "1",
        amount: 2
    },
    {
        id: "3",
        amount: 4
    },
    {
        id: "5",
        amount: 1
    },
    {
        id: "13"
        amount: 2
    }
]
*/

// obtener la lista que maneja el carrito del localstorage
export function get_lista_producto_carrito() {
    // obtener lista de ids de productos en el carrito
    let listCarrito = localStorage.getItem('cart');
    
    // verificar si existe la lista para crear una o para parsearla
    if (!listCarrito) {
        listCarrito = [];
    } else {
        listCarrito = JSON.parse(listCarrito);
    }
    
    return listCarrito;
}

// esta función hace persistente la lista de productos en el carrito en la localstorage
export function set_lista_producto_carrito(lista_carrito) {
    localStorage.setItem('cart', JSON.stringify(lista_carrito))
}

// introducir nuevos valores al localstorage
function refresh_lista_producto_carrito(id, amount) {
    
    // obtener lista del localstorage
    let lista_producto_carrito = get_lista_producto_carrito();

    // introducir nuevo valor o adicionar el existente
    // productStorage es igual a {id: "algun-id", amout: "cantidad-producto"}
    let index = 0;
    while (index < lista_producto_carrito.length && id != lista_producto_carrito[index].id) {
        index++;
    }

    // si se cumple la igualdad quiere decir que 
    // recorrimos toda la lista sin hallar el valor
    // osea no existe ese producto en el carrito
    if (index == lista_producto_carrito.length) {
        lista_producto_carrito.push({
            "id": id,
            "amount": amount
        });
    } else { // caso contrario solo aumentamos el valor 
        lista_producto_carrito[index].amount += amount;
    }

    // añadir los cambios al localstorage
    set_lista_producto_carrito(lista_producto_carrito);
}

// eliminar un producto del carrito de compras
export function delete_producto_del_carrito(id) {
    let lista_carrito = get_lista_producto_carrito();
    lista_carrito = lista_carrito.filter(producto => producto.id != id);

    set_lista_producto_carrito(lista_carrito);
}

// Obtiene la lista completa del carrito
// calcula la cantidad total de productos
// modifica el valor en el html
function actualizarCantidadCarrito() {
    const contenedorCantidadCarrito = document.getElementById('contenedor-cantidad-carrito');
    let cantidadProductosCarrito = 0;

    get_lista_producto_carrito().forEach(productoCarrito => cantidadProductosCarrito += productoCarrito.amount)
    
    contenedorCantidadCarrito.innerHTML = `(${cantidadProductosCarrito})`;
}


document.addEventListener('DOMContentLoaded', () => {
    // actualizar el contador del carrito al iniciar
    actualizarCantidadCarrito();
    
    // establecer el comportamiento añadir al carrito de los producto mostrados
    document.querySelectorAll('.contenedor-producto').forEach(productContainer => {

        // encontrar el botón add to cart asociarle el evento click
        productContainer.querySelector('.button-add-to-cart').addEventListener('click', () => {
            const id_product = productContainer.getAttribute('data-producto-id');
            let amount_product = productContainer.querySelector('#cantidad-producto') ? parseInt(productContainer.querySelector('#cantidad-producto').value) : 1;
            
            refresh_lista_producto_carrito(id_product, amount_product);
        });
    });
});

// manejar los cambios en el local storage específicamente la lista del cart
window.addEventListener('storageChange', (event) => {
    if (event.detail.key === 'cart') {
        actualizarCantidadCarrito();
    }
});

// documentacion
// para usar el controlador:
// 1) colocar la clase "contenedor-producto" en el div o contenedor padre de cada producto (incluyendo el modal)
//    y ademas colocar el atributo data-producto-id con el id correspondiente a ese producto.
// 2) en el input de cantidad de producto del modal colocar el id cantidad-producto. Ejemplo (<input class="form-control border-0 shadow-0 p-0" id="cantidad-producto" type="text" value="1">)
// 3) y en todos los botones add-to-cart colocar la clase button-add-to-cart