const main = document.getElementById('contenido-principal');


function initDetallesProducto(contenedor, producto) {
    contenedor.innerHTML = '';
    contenedor.innerHTML = '<section id="detalles-producto-seccion" data-content-path="/html/producto-detalles.html"></section> \
                            <script type="module" sr="/js/producto-detalles.js"></script>';
    
}

export function launchProductoDetalles(producto) {
    initDetallesProducto(main, producto);
}