const productContainer = document.getElementById('product-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const sortSelect = document.getElementById('sort-select');
const priceRangeMin = document.getElementById('price-range-min');
const priceRangeMax = document.getElementById('price-range-max');
const priceOutputMin = document.getElementById('price-output-min');
const priceOutputMax = document.getElementById('price-output-max');
const categoryFilters = document.getElementById('category-filters');

let allProducts = [];
let categories = new Set();

const fetchProducts = async () => {
    const url = 'https://fake-store-api.mock.beeceptor.com/api/products';
    const res = await fetch(url);
    allProducts = await res.json();
    allProducts.forEach(product => categories.add(product.category));
    populateCategoryFilters();
    updateProductContainer(allProducts);
};
const createProductCard = (product) => {
    const productElement = document.createElement('div');
    productElement.classList.add('product-card');

    const nombre = product.nombre;
    const precio = product.precio;
    const imagen = product.imagen || 'https://via.placeholder.com/150';

    const productInnerHTML = `
        <img src="${imagen}" alt="${nombre}">
        <h3>${nombre}</h3>
        <p>Precio: $${precio}</p>
        <button class="btn-decrease" style="cursor: pointer">-</button>
        <button class="btn-buy" style="cursor: pointer">Comprar</button>
        <button class="btn-increase" style="cursor: pointer">+</button>
    `;

    productElement.innerHTML = productInnerHTML;

    productElement.querySelector('.btn-decrease').addEventListener('click', () => decreaseProductQuantity(product));
    productElement.querySelector('.btn-buy').addEventListener('click', () => addToCart(product));
    productElement.querySelector('.btn-increase').addEventListener('click', () => increaseProductQuantity(product));

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

const filterAndSortProducts = () => {
    const query = searchInput.value.trim().toLowerCase();
    const selectedCategories = Array.from(document.querySelectorAll('.category-checkbox'))
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
    const sortOption = sortSelect.value;
    const precioMin = parseInt(precioRangeMin.value);
    const precioMax = parseInt(precioRangeMax.value);

    let filteredProducts = allProducts;

    if (query) {
        filteredProducts = filteredProducts.filter(product => product.nombre.toLowerCase().includes(query));
    }

    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
            selectedCategories.includes(product.category)
        );
    }

    filteredProducts = filteredProducts.filter(product =>
        product.precio >= precioMin && product.precio <= precioMax
    );

    switch (sortOption) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.precio - b.precio);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.precio - a.precio);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
    }
    updateProductContainer(filteredProducts);
};

const populateCategoryFilters = () => {
    categoryFilters.innerHTML = '';
    categories.forEach(category => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" class="category-checkbox" value="${category}"> ${category}`;
        categoryFilters.appendChild(label);
    });

    document.querySelectorAll('.category-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', filterAndSortProducts);
    });
};

searchButton.addEventListener('click', filterAndSortProducts);
searchInput.addEventListener('input', filterAndSortProducts);
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        filterAndSortProducts();
    }
});

sortSelect.addEventListener('change', filterAndSortProducts);

precioRangeMin.addEventListener('input', () => {
    precioOutputMin.textContent = precioRangeMin.value;
    filterAndSortProducts();
});
precioRangeMax.addEventListener('input', () => {
    precioOutputMax.textContent = precioRangeMax.value;
    filterAndSortProducts();
});

fetchProducts();