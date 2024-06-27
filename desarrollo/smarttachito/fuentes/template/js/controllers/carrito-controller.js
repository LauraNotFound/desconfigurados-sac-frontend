
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
    }
]
*/



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
    const contenedorCantidadCarrito = document.getElementById('contenedor-cantidad-carrito');
    let cantidadProductosCarrito = 0;

    get_lista_producto_carrito().forEach(productoCarrito => cantidadProductosCarrito += productoCarrito.amount)
    
    contenedorCantidadCarrito.innerHTML = `(${cantidadProductosCarrito})`;
}

document.addEventListener('DOMContentLoaded', () => {

    // actualizar el contador del carrito al iniciar
    actualizarCantidadCarrito();
    
    // establecer el comportamiento del boton add to cart  
    document.querySelectorAll('.button-add-to-cart').forEach(buttonAddToCart => {
        buttonAddToCart.addEventListener('click', () => {

            // obtener lista de diccionarios keys[id, amount] de productos en el carrito
            let listCarrito = get_lista_producto_carrito();
    
            let cantidadProducto = this.closest('.cantidad-producto').getAttribute('value');
            const idProducto = this.closest('.contenedor-producto').getAttribute('data-producto-id');

            // si no se tiene el dato de la cantidad ingresada entonces se asume el predeterminado que es uno
            if(!cantidadProducto) {
                cantidadProducto = 1;
            }
            
            // verificamos si ya existe el producto en el carrito para adicionar la cantidad al producto en el carrito existente
            let estaEnCarro = false;
            let index = 0;
            while(!estaEnCarro && index < listCarrito.length) {
                estaEnCarro = listCarrito[index].id === idProducto; 
                index++;
            }

            // adicionamos o cremos un producto en el carrito según sea el caso
            if ( estaEnCarro ) {
                listCarrito[index - 1].amount += cantidadProducto;
            } else {
                listCarrito.push({
                    id: idProducto,
                    amount: cantidadProducto
                });    
            }

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

