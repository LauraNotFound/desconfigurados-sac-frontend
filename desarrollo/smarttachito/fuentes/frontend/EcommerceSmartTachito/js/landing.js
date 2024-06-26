export const landingController = async () => {
    const slider = document.getElementById('trending-products-slider');
    let isHovered = false;

    // Clonar el primer hijo y agregarlo al final para crear continuidad
    function cloneFirstChild() {
        const firstChild = slider.firstElementChild.cloneNode(true);
        slider.appendChild(firstChild);
    }

    // Verificar y reubicar los hijos del slider
    function checkAndRepositionSlideChilds() {
        const children = Array.from(slider.children);
        children.forEach(child => {
            const rectSlider = child.getBoundingClientRect();
            const containerRect = slider.parentElement.getBoundingClientRect();

            if (rectSlider.right < containerRect.left) {
                const firstChild = slider.firstElementChild;
                slider.appendChild(firstChild.cloneNode(true));
                slider.removeChild(firstChild);
                slider.style.transition = 'none';
                slider.style.transform = 'translateX(0)';
            }
        });
    }

    // Desplazamiento automático de los productos
    function autoScroll() {
        if (!isHovered) {
            slider.style.transition = 'transform 0.05s linear';
            const currentTransform = getComputedStyle(slider).transform;
            const matrix = currentTransform.match(/^matrix\((.+)\)$/);
            const x = matrix ? parseFloat(matrix[1].split(', ')[4]) : 0;
            slider.style.transform = `translateX(${x - 5}px)`;
            checkAndRepositionSlideChilds();
        }
    }

    cloneFirstChild();

    // Establecer intervalo para desplazamiento automático
    setInterval(autoScroll, 20);

    // Pausar animación cuando el ratón está sobre el slider
    slider.addEventListener('mouseenter', () => {
        isHovered = true;
    });

    // Reanudar animación cuando el ratón sale del slider
    slider.addEventListener('mouseleave', () => {
        isHovered = false;
    });
}
