import { loadComponent } from "./loadComponents.js";

const main = document.getElementById('contenido-principal');

const productoEjemplo = {
    name: 'Tacho para oficina',
    description: 'Este tacho para oficina es perfecto para mantener tu espacio de trabajo limpio y ordenado. Fabricado con materiales de alta calidad, es duradero y fácil de limpiar.',
    price: 149.99,
    image: '/assets/tacho-prueba.png', // URL de una imagen real del producto
    dimensions: ['Alto: 60 cm', 'Ancho: 40 cm', 'Largo: 40 cm'],
    containers: [
        { icon: 'https://example.com/iconos/papel.png', name: 'Papel' },
        { icon: 'https://example.com/iconos/plastico.png', name: 'Plástico' },
        { icon: 'https://example.com/iconos/organico.png', name: 'Orgánico' }
    ]
};


async function initDetallesProducto(contenedor, producto) {
    contenedor.innerHTML = '';
    contenedor.innerHTML = '<section id="detalles-producto-seccion" data-content-path="/html/producto-detalles.html" class="loaded"></section>';
    await loadComponent("detalles-producto-seccion", "/html/producto-detalles.html");
    cargarDetallesProducto();
}

function cargarDetallesProducto() {
    document.getElementById('imagen-principal').src = productoEjemplo.image;
    console.log(document.getElementById('imagen-principal'));
    document.getElementById('titulo-producto').innerText = productoEjemplo.name;
    document.getElementById('descripcion-producto').innerText = productoEjemplo.description;
    document.getElementById('precio-producto').innerText = `s/. ${productoEjemplo.price.toFixed(2)}`;
    
    const medidasProducto = document.getElementById('medidas-producto');
    medidasProducto.innerHTML = productoEjemplo.dimensions.map(dimension => `<li>${dimension}</li>`).join('');
    
    const contenedoresProducto = document.getElementById('contenedores-producto');
    contenedoresProducto.innerHTML = productoEjemplo.containers.map(contenedor => `<img src='${contenedor.icon}' alt='${contenedor.name}'>`).join('');
}

export function launchProductoDetalles(producto) {
    initDetallesProducto(main, producto);
}