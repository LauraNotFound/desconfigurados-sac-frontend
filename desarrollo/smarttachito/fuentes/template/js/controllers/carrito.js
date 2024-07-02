
/*
listCarrito = [
    {
        id_url: url,
        amount: 2
    },
    {
        id_url: url,
        amount: 4
    },
    {
        id_url: url,
        amount: 1
    },
    {
        id_url: url,
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

// Obtiene la lista completa del carrito
// calcula la cantidad total de productos
export function get_cantidad_productos_en_carrito() {
    let cantidadProductosCarrito = 0;

    get_lista_producto_carrito().forEach(productoCarrito => cantidadProductosCarrito += productoCarrito.amount)
    
    return cantidadProductosCarrito;
}



// eliminar un producto del carrito de compras
export function delete_producto_del_carrito(id_url) {
    let lista_carrito = get_lista_producto_carrito();
    lista_carrito = lista_carrito.filter(producto => producto.id_url != id_url);

    set_lista_producto_carrito(lista_carrito);
}


// este procedimiento modifica la cantidad de un producto en el carrito dado la nueva cantidad y el id
export function modificar_cantidad_productos_del_carrito(nueva_cantidad, id_url) {
    let  lista_carrito = get_lista_producto_carrito();

    lista_carrito.forEach(producto => {
        if (producto.id_url === id_url) {
            producto.amount = nueva_cantidad;
        }
    });

    set_lista_producto_carrito(lista_carrito);
}





// esta función hace persistente la lista de productos en el carrito en la localstorage
export function set_lista_producto_carrito(lista_carrito) {
    localStorage.setItem('cart', JSON.stringify(lista_carrito))
}

// introducir nuevos valores al localstorage
export async function guardar_producto_en_carrito(id_url, producto, amount) {
    
    // obtener lista del localstorage
    let lista_producto_carrito = get_lista_producto_carrito();

    // introducir nuevo valor o adicionar el existente
    // productStorage es igual a {id: "algun-id", amout: "cantidad-producto"}
    let index = 0;
    while (index < lista_producto_carrito.length && id_url != lista_producto_carrito[index].id_url) {
        index++;
    }

    // si se cumple la igualdad quiere decir que 
    // recorrimos toda la lista sin hallar el valor
    // osea no existe ese producto en el carrito
    if (index == lista_producto_carrito.length) {
        
        lista_producto_carrito.push({
            "id_url": id_url,
            "producto": producto,
            "amount": amount
        });
    } else { // caso contrario solo aumentamos el valor 
        lista_producto_carrito[index].amount += amount;
    }

    // añadir los cambios al localstorage
    set_lista_producto_carrito(lista_producto_carrito);
}