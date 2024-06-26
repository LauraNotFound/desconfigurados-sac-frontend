export const contactoController = async () => {
    const contactoForm = document.getElementById('contacto-form');
    const successMessage = document.getElementById('success-message');

    contactoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validación simple del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            // Simular envío de formulario
            setTimeout(() => {
                successMessage.style.display = 'block';
                contactoForm.reset();

                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
            }, 1000);
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });
}