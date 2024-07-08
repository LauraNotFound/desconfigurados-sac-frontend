const getQueryParams = () => {
    const params = {};
    const queryString = window.location.search.slice(1);
    const queryArray = queryString.split('&');
    queryArray.forEach(query => {
        const [key, value] = query.split('=');
        params[key] = decodeURIComponent(value);
    });
    return params;
};

const getProductDetails = async (nombre) => {
    try {
        const response = await fetch(`https://dolphin-app-lll72.ondigitalocean.app/productos?nombre=${encodeURIComponent(nombre)}`); 
        const products = await response.json();
        return products.length > 0 ? products[0] : null;
    } catch (error) {
        console.error('Error fetching product details:', error);
        return null;
    }
};

const getCategoryDetails = async (categoryUrl) => {
    try {
        const response = await fetch(categoryUrl); 
        const category = await response.json();
        return category;
    } catch (error) {
        console.error('Error fetching category details:', error);
        return null;
    }
};

const renderProductDetails = (product, category) => {
    if (!product) {
        document.getElementById('nombre-producto').innerText = "Nombre de producto";
        document.getElementById('precio-producto').innerText = "Precio de producto";
        document.getElementById('descripcion-corta-producto').innerText = "Descripción corta";
        document.getElementById('categoria-producto').innerText = "stock";
        document.getElementById('categoria-nombre').innerText = "categoryName";
        document.getElementById('descripcion-larga-producto').innerText = "descripcion_extendida";
        document.getElementById('imagen-principal').innerText = "imagen_principal";
        document.getElementById('imagen-secundaria-1').innerText = "imagen_secundaria_1";
        document.getElementById('imagen-secundaria-2').innerText = "imagen_secundaria_2";
        document.getElementById('imagen-secundaria-3').innerText = "imagen_secundaria_3";
        document.getElementById('imagen-360').innerText = "imagen_360";        return;
    }
    const { nombre, descripcion_breve, descripcion_extendida, precio, imagen_principal, imagen_secundaria_1, imagen_secundaria_2, imagen_secundaria_3, imagen_360, stock } = product;
    const categoryName = category ? category.nombre : 'Categoría no encontrada';
    document.getElementById('nombre-producto').textContent = nombre;
    document.getElementById('precio-producto').textContent = precio;
    document.getElementById('descripcion-corta-producto').textContent = descripcion_breve;
    document.getElementById('cantidad-producto').value = 1;
    document.getElementById('categoria-producto').textContent = stock;
    document.getElementById('categoria-nombre').textContent = categoryName;
    document.getElementById('descripcion-larga-producto').textContent = descripcion_extendida;
    const updateImage = (linkId, imgId, href, src) => {
        const linkElement = document.getElementById(linkId);
        const imgElement = document.getElementById(imgId);
        if (linkElement && imgElement) {
            linkElement.href = href;
            imgElement.src = src;
        }
    };
    updateImage('imagen-principal-link', 'imagen-principal', imagen_principal, imagen_principal);
    updateImage('imagen-secundaria-1-link', 'imagen-secundaria-1', imagen_secundaria_1, imagen_secundaria_1);
    updateImage('imagen-secundaria-2-link', 'imagen-secundaria-2', imagen_secundaria_2, imagen_secundaria_2);
    updateImage('imagen-secundaria-3-link', 'imagen-secundaria-3', imagen_secundaria_3, imagen_secundaria_3);
    updateImage('imagen-360-link', 'imagen-360', imagen_360, imagen_360);
    document.getElementById('img-p').src = imagen_principal;
    document.getElementById('img-1').src = imagen_secundaria_1;
    document.getElementById('img-2').src = imagen_secundaria_2;
    document.getElementById('img-3').src = imagen_secundaria_3;
    document.getElementById('img-360').src = imagen_360;
};
const queryParams = getQueryParams();
const productName = queryParams.nombre;
if (productName) {
    getProductDetails(productName).then(product => {
        if (product) {
            getCategoryDetails(product.categoria).then(category => {
                renderProductDetails(product, category);
            });
        } else {
            renderProductDetails(null, null);
        }
    });
} else {
    document.getElementById('nombre-producto').innerText = "Nombre de producto";
    document.getElementById('precio-producto').innerText = "Precio de producto";
    document.getElementById('descripcion-corta-producto').innerText = "Descripción corta";
    document.getElementById('categoria-producto').innerText = "stock";
    document.getElementById('categoria-nombre').innerText = "categoryName";
    document.getElementById('descripcion-larga-producto').innerText = "descripcion_extendida";
    document.getElementById('imagen-principal').innerText = "imagen_principal";
    document.getElementById('imagen-secundaria-1').innerText = "imagen_secundaria_1";
    document.getElementById('imagen-secundaria-2').innerText = "imagen_secundaria_2";
    document.getElementById('imagen-secundaria-3').innerText = "imagen_secundaria_3";
    document.getElementById('imagen-360').innerText = "imagen_360";
}