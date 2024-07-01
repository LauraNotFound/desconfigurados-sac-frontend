const productContainer = document.getElementById('product-container');
        let allProducts = [];
        let categories = new Set();

        const fetchProducts = async () => {
            try {
                const url = 'https://dolphin-app-lll72.ondigitalocean.app/productos/';
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                allProducts = await res.json();
                console.log('Productos obtenidos:', allProducts);
                allProducts.forEach(product => categories.add(product.categoria));
                updateProductContainer(allProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
                productContainer.innerHTML = '<p>Error al obtener los productos. Por favor, intenta de nuevo.</p>';
            }
        };
        const createProductCard = (product) => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-card');
            const nombre = product.nombre;
            const precio = product.precio;
            const imagen_principal = product.imagen_principal || 'https://via.placeholder.com/150';

            const productInnerHTML = `
                <div class="product text-center">
                    <div class="mb-3 position-relative">
                        <div class="badge text-white bg-"></div>
                        <a class="d-block" href="detail.html">
                            <img class="img-fluid w-100" src="${imagen_principal}" alt="${nombre}">
                        </a>
                        <div class="product-overlay">
                            <ul class="mb-0 list-inline">
                                <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-outline-dark" href="#!"><i class="far fa-heart"></i></a></li>
                                <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-dark" href="cart.html">Add to cart</a></li>
                                <li class="list-inline-item mr-0"><a class="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal"><i class="fas fa-expand"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <h6><a class="reset-anchor" href="detail.html">${nombre}</a></h6>
                    <p class="small text-muted">${precio}</p>
                </div>
            `;
            productElement.innerHTML = productInnerHTML;
            productContainer.appendChild(productElement);
        };

        const updateProductContainer = (filteredProducts) => {
            productContainer.innerHTML = '';
            if (filteredProducts.length > 0) {
                filteredProducts.forEach(product => createProductCard(product));
            } else {
                productContainer.innerHTML = '<p>Producto no encontrado. Por favor, intenta de nuevo.</p>';
            }
        };

        fetchProducts();