import { loadComponent } from "../loadComponents.js";

// estructura de producto esperado
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

// inicializar la pagina para cargar el detalles dle producto escogido
async function initDetallesProducto(producto) {

    // obtenemos e iniciamos nuevo contenido en la seccion de contenido principal
    const contenidoPrincipal = document.getElementById('contenido-principal');
    contenidoPrincipal.innerHTML = '';
    contenidoPrincipal.innerHTML = '<section id="detalles-producto-seccion" data-content-path="/html/producto-detalles.html" class="loaded"></section>';

    // cargamos la estructura base de la pagina de producto detalles
    await loadComponent("detalles-producto-seccion", "/html/producto-detalles.html");

    // cargamos la informacion del producto en la estructura base
    cargarDetallesProducto(producto);
}

// definimos la funcion para cargar la informacion en la estructura base
function cargarDetallesProducto(producto) {

    document.getElementById('imagen-principal').src = productoEjemplo.image;
    document.getElementById('titulo-producto').innerText = productoEjemplo.name;
    document.getElementById('descripcion-producto').innerText = productoEjemplo.description;
    document.getElementById('precio-producto').innerText = `s/. ${productoEjemplo.price.toFixed(2)}`;
    
    const medidasProducto = document.getElementById('medidas-producto');
    medidasProducto.innerHTML = productoEjemplo.dimensions.map(dimension => `<li>${dimension}</li>`).join('');
    
    const contenedoresProducto = document.getElementById('contenedores-producto');
    contenedoresProducto.innerHTML = productoEjemplo.containers.map(contenedor => `<img src='${contenedor.icon}' alt='${contenedor.name}'>`).join('');
}

// exportamos la funcion para iniciar la pagina ver detalles con la informacion 
// del producto seleccinado
export function launchProductoDetalles(producto) {
    initDetallesProducto(producto);
}