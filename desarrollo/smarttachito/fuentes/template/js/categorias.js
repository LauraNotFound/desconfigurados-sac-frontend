const productContainer = document.getElementById('categoria-container');
let allProducts = [];
let categories = new Set();

const fetchProducts = async () => {
    try {
        const url = 'https://dolphin-app-lll72.ondigitalocean.app/categorias/';
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
    productElement.classList.add('categoria-card');
    const nombre = product.nombre;
    const imagen = product.imagen || 'https://via.placeholder.com/150';

    const productInnerHTML = `
        <div class="product text-center">
            <div class="mb-3 position-relative">
                <img class="img-fluid w-100" src="${imagen}" alt="${nombre}">
                <a class="d-block" href="/html/shop.html">
                    <strong class="category-item-title">${nombre}</strong>
                </a>
            </div>
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