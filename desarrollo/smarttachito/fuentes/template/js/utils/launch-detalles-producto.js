// en el catalogo colocar al div padre del producto la clase 'product' y un atributo 'data-product-id' con su valor id
// en los links con la página details colocar la clase 'product-link'

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.product-link').forEach(link => {
        link.addEventListener('click', function(event) {
            const productId = this.closest('.product-container').getAttribute('data-product-id');
            localStorage.setItem('product-id-show-detail', productId);
        });
    });
});