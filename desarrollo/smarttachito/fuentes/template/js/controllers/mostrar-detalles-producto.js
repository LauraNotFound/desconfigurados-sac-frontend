document.addEventListener('DOMContentLoaded', async () => {

    // obtener id del localstorage
    const productIdSelected = localStorage.getItem('product-id-show-detail');

    // verificar si la id del producto almacenado en el localstorage no es null
    if (productIdSelected) {

        // consultar el json (esto se tiene que reemplazar por la consulta al api)
        // fetch('url_api/${productIdSelected}')
        const res = await fetch('/db/productos.json');  

        // Resivir la lista de diccionarios
        const productos = await res.json();

        // Escoger el producto seleccionado
        const producto = productos.find(p => p.id === productIdSelected);
        
        // verificar que no se null
        if (producto) {
            
            // obtener referencia a los contenedores en el html
            const contenedorNombre = document.getElementById('nombre');
            const contenedorPrecio = document.getElementById('precio');
            const contenedorDescripcionBreve = document.getElementById('descripcion_breve');
            const contenedorDescripcionExtendida = document.getElementById('descripcion_extendida');
            
            const contenedorImagenPrincipal = document.getElementById('imagen-principal');
            const contenedorImagen1 = document.getElementById('imagen-secundaria-1');
            const contenedorImagen2 = document.getElementById('imagen-secundaria-2');
            const contenedorImagen3 = document.getElementById('imagen-secundaria-3');
            const contenedorImagen360 = document.getElementById('imagen-360');
            
            const contenedorImagenPrincipal_product_view = document.getElementById('imagen-principal-product-view');
            const contenedorImagen1_product_view = document.getElementById('imagen-secundaria-1-product-view');
            const contenedorImagen2_product_view = document.getElementById('imagen-secundaria-2-product-view');
            const contenedorImagen3_product_view = document.getElementById('imagen-secundaria-3-product-view');
            const contenedorImagen360_product_view = document.getElementById('imagen-360-product-view');

            const productView = document.querySelectorAll(".product-view")

            // Colocar contenido del producto al html
            contenedorNombre.textContent = producto.nombre;
            contenedorPrecio.textContent = `S/. ${producto.precio}`;
            contenedorDescripcionBreve.textContent = producto.descripcion_breve;
            contenedorDescripcionExtendida.textContent = producto.descripcion_extendida;
            
            contenedorImagenPrincipal.src = producto.imagen_principal
            contenedorImagen1.src = producto.imagen_secundaria_1;
            contenedorImagen2.src = producto.imagen_secundaria_2;
            contenedorImagen3.src = producto.imagen_secundaria_3;
            contenedorImagen360.src = producto.imagen_360;
            
            contenedorImagenPrincipal_product_view.src = producto.imagen_principal;
            contenedorImagen1_product_view.src = producto.imagen_secundaria_1;
            contenedorImagen2_product_view.src = producto.imagen_secundaria_2;
            contenedorImagen3_product_view.src = producto.imagen_secundaria_3;
            contenedorImagen360_product_view.src = producto.imagen_360;

            productView[0].href = producto.imagen_principal;
            productView[1].href = producto.imagen_secundaria_1;
            productView[2].href = producto.imagen_secundaria_2;
            productView[3].href = producto.imagen_secundaria_3;
            productView[4].href = producto.imagen_360;

        } else {
            // enviar alguna notificacion (sería bueno customizarla)
            alert('Producto no encontrado.');
        }
            
    }
});