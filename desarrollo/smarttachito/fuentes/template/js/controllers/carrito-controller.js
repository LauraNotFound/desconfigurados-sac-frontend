
function get_lista_producto_carrito() {
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

function actualizarCantidadCarrito() {
    const cantidadCarrito = document.getElementById('contenedor-cantidad-carrito');
    cantidadCarrito.innerHTML = `(${get_lista_producto_carrito().length})`;
}

document.addEventListener('DOMContentLoaded', () => {

    // actualizar el contador del carrito al iniciar
    actualizarCantidadCarrito();
    
    // establecer el comportamiento del boton add to cart  
    document.querySelectorAll('.button-add-to-cart').forEach(buttonAddToCart => {
        buttonAddToCart.addEventListener('click', () => {
            // obtener lista de ids de productos en el carrito
            let listCarrito = get_lista_producto_carrito();
    
            // añadir producto a la lista
            listCarrito.push("id");
    
            // hacer persistente la lista
            localStorage.setItem('cart', JSON.stringify(listCarrito));
            
        });
    });
});

// manejar los cambios en el local storage específicamente la lista del cart
window.addEventListener('storageChange', (event) => {
    if (event.detail.key === 'cart') {
        actualizarCantidadCarrito();
    }
});

