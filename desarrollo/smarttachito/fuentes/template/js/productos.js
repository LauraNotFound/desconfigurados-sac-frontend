const productContainer = document.getElementById('product-container');
const categoryContainer = document.getElementById('category-container');
const priceSlider = document.getElementById('price-slider');
const minPriceLabel = document.getElementById('min-price');
const maxPriceLabel = document.getElementById('max-price');

let allProducts = [];
let categories = new Set();
let selectedCategories = new Set();
let maxPrice = 1000;
let minPrice = 0;

const fetchProducts = async () => {
    try {
        const url = 'https://dolphin-app-lll72.ondigitalocean.app/productos/';
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        allProducts = await res.json();
        console.log('Productos obtenidos:', allProducts);
        const categoryUrls = Array.from(new Set(allProducts.map(product => product.categoria)));
        await fetchCategories(categoryUrls);
        updateProductContainer(allProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        productContainer.innerHTML = '<p>Error al obtener los productos. Por favor, intenta de nuevo.</p>';
    }
};

const fetchCategories = async (categoryUrls) => {
    try {
        const categoryPromises = categoryUrls.map(async (url) => {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        });
        const categoryData = await Promise.all(categoryPromises);
        categoryData.forEach(category => {
            categories.add(category);
            createCategoryFilter(category);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const createCategoryFilter = (category) => {
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('form-check', 'mb-1');
    categoryElement.innerHTML = `
        <input class="form-check-input" type="checkbox" name="categoryCheckbox" id="category_${category.url}" value="${category.url}">
        <label class="form-check-label" for="category_${category.url}">${category.nombre}</label>
    `;
    categoryElement.querySelector('input').addEventListener('change', filterProducts);
    categoryContainer.appendChild(categoryElement);
};

const filterProducts = () => {
    const selectedCheckboxes = Array.from(document.querySelectorAll('input[name="categoryCheckbox"]:checked'));
    selectedCategories = new Set(selectedCheckboxes.map(checkbox => checkbox.value));
    const filteredProducts = allProducts.filter(product => 
        (selectedCategories.size === 0 || selectedCategories.has(product.categoria)) &&
        product.precio >= minPrice && product.precio <= maxPrice
    );
    updateProductContainer(filteredProducts);
};

const handlePriceSliderChange = () => {
    maxPrice = priceSlider.value;
    maxPriceLabel.textContent = maxPrice;
    filterProducts();
};

priceSlider.addEventListener('input', handlePriceSliderChange);

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

// Ordenamiento de los productos según su precio o nombre
const sortProducts = (sortType) => {
    let sortedProducts = [...allProducts];
    switch (sortType) {
        case 'name-asc':
            sortedProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'name-desc':
            sortedProducts.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
        case 'price-asc':
            sortedProducts.sort((a, b) => a.precio - b.precio);
            break;
        case 'price-desc':
            sortedProducts.sort((a, b) => b.precio - a.precio);
            break;
        default:
            return;
    }
    updateProductContainer(sortedProducts);
};

document.getElementById('sort-select').addEventListener('change', (event) => {
    sortProducts(event.target.value);
});

fetchProducts();
