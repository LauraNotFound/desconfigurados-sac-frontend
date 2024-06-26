export const nosotrosController = async () => {
    const novedadesGrid = document.getElementById('novedades-grid');
    const novedadesItems = [
        {
            title: 'Nuevo Smartachito Pro',
            description: 'Descubre la nueva versión del Smartachito Pro con más funcionalidades.',
            image: '/assets/novedades/smartachito-pro.png'
        },
        {
            title: 'Actualización de Smartachito Mini',
            description: 'Ahora con mayor capacidad y mejor eficiencia.',
            image: '/assets/novedades/smartachito-mini.png'
        },
        {
            title: 'Lanzamiento del Smartachito Ultimate',
            description: 'La solución definitiva para la gestión de residuos.',
            image: '/assets/novedades/smartachito-ultimate.png'
        },
        {
            title: 'Edición Limitada de Smartachito Básico',
            description: 'Obtén el Smartachito Básico en nuevos colores y acabados.',
            image: '/assets/novedades/smartachito-basic.png'
        }
    ];

    novedadesItems.forEach(item => {
        const novedadesElement = document.createElement('div');
        novedadesElement.classList.add('novedades-item');
        novedadesElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;
        novedadesGrid.appendChild(novedadesElement);
    }); 
}