document.addEventListener("DOMContentLoaded", function() {
    const mainContent = document.getElementById("mainContent");

    async function loadContent(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const content = await response.text();
            mainContent.innerHTML = content;
        } catch (error) {
            console.error('Error fetching the content:', error);
            mainContent.innerHTML = '<p>Error cargando el contenido.</p>';
        }
    }

    document.getElementById('homeLink').addEventListener('click', function(e) {
        e.preventDefault();
        loadContent('/html/home.html');
    });

    document.getElementById('shopLink').addEventListener('click', function(e) {
        e.preventDefault();
        loadContent('/html/shop.html'); 
    });

    document.getElementById('cartLink').addEventListener('click', function(e) {
        e.preventDefault();
        loadContent('/html/cart.html'); 
    });

    document.getElementById('loginLink').addEventListener('click', function(e) {
        e.preventDefault();
        loadContent('/html/login.html'); 
    });

    loadContent('/html/home.html');
});
