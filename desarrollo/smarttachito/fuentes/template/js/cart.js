// Variables
const baseDeDatos = [];
const carrito = [];
const divisa = 'S/';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#lista-carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMsubtotal = document.querySelector('#subtotal');
const obtenerProductos = async () => {
    try {
        const response = await fetch('https://dolphin-app-lll72.ondigitalocean.app/productos/');
        baseDeDatos.push(...await response.json());
        renderizarProductos();
    } catch (error) {
        console.error('Error obteniendo los productos:', error);
    }
};
const renderizarProductos = () => {
    DOMitems.innerHTML = baseDeDatos.map(info => `
        <div class="card col-sm-4">
            <div class="card-body">
                <img src="${info.imagen_principal}" class="img-fluid" alt="${info.nombre}">
                <h5 class="card-title">${info.nombre}</h5>
                <p class="card-text">${divisa}${info.precio}</p>
                <button class="btn btn-primary" marcador="${info.nombre}">+</button>
                <button class="btn btn-danger" marcador="${info.nombre}">-</button>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', anyadirProductoAlCarrito);
    });
    document.querySelectorAll('.btn-danger').forEach(button => {
        button.addEventListener('click', quitarProductoAlCarrito);
    });
};

// Añadir producto al carrito
const anyadirProductoAlCarrito = (evento) => {
    carrito.push(evento.target.getAttribute('marcador'));
    renderizarCarrito();
};

// Quitar una unidad de un producto del carrito
const quitarProductoAlCarrito = (evento) => {
    const nombreProducto = evento.target.getAttribute('marcador');
    const index = carrito.indexOf(nombreProducto);
    if (index > -1) {
        carrito.splice(index, 1);
    }
    renderizarCarrito();
};

// Renderizar el carrito
const renderizarCarrito = () => {
    const carritoSinDuplicados = [...new Set(carrito)];
    DOMcarrito.innerHTML = carritoSinDuplicados.map(item => {
        const miItem = baseDeDatos.find(producto => producto.nombre === item);
        const numeroUnidadesItem = carrito.filter(itemNombre => itemNombre === item).length;
        return `
            <tr>
                <td class="p-3">${miItem.nombre}</td>
                <td class="p-3">${miItem.precio}${divisa}</td>
                <td class="p-3">${numeroUnidadesItem}</td>
                <td class="p-3">${(miItem.precio * numeroUnidadesItem).toFixed(2)}${divisa}</td>
                <td class="p-3"><button class="btn btn-danger" data-item="${item}">X</button></td>
            </tr>
        `;
    }).join('');

    document.querySelectorAll('.btn-danger').forEach(button => {
        button.addEventListener('click', borrarItemCarrito);
    });

    const total = calcularTotal();
    DOMsubtotal.textContent = `${total}${divisa}`;
    DOMtotal.textContent = `${total}${divisa}`;
};

// Borrar un elemento del carrito
const borrarItemCarrito = (evento) => {
    const nombre = evento.target.dataset.item;
    carrito = carrito.filter(carritoNombre => carritoNombre !== nombre);
    renderizarCarrito();
};

// Calcular el precio total
const calcularTotal = () => {
    return carrito.reduce((total, item) => {
        const miItem = baseDeDatos.find(producto => producto.nombre === item);
        return total + miItem.precio;
    }, 0).toFixed(2);
};

// Vaciar el carrito
const vaciarCarrito = () => {
    carrito.length = 0;
    renderizarCarrito();
};

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
obtenerProductos();
renderizarCarrito();