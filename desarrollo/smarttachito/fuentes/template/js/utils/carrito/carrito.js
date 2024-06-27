export const add_carrito = (id) => {
    // obtener lista de ids de productos en el carrito
    let listCarrito = get_lists_carrito();

    // añadir producto a la lista
    listCarrito.push(id);

    // hacer persistente la lista
    localStorage.setItem('cart', JSON.stringify(listCarrito));
}

export const get_lists_carrito = () => {
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

export const get_cantidad_productos_carrito = () => {
    let listCarrito = get_lists_carrito();

    return listCarrito.length;
}

