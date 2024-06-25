import { loadSection, loadSections } from "../utils/loadSection.js"

export const headerController = async () => {

    // load header
    const headerContaner = document.getElementById('header-placeholder');
	await loadSection(headerContaner);

    document.getElementById('header-placeholder').addEventListener('click', async (event) => {

        // verificar si es un a del header y si tiene un data-section
        if (event.target.tagName === 'A' && event.target.dataset.section) {

            // invalidamos el comportamiento predeterminado del a
            event.preventDefault();
            
            // obtener section segun el id
            var section = document.getElementById(event.target.dataset.section);

            // verificar si es null
            if (!section) {

                // obtenemos el contenedor principal, lo vaciamos y removemos la clase loaded (reiniciamos el contenedor) 
                const contenedorPrincipal = document.getElementById('contenido-principal');
                contenedorPrincipal.innerHTML = ' ';
                contenedorPrincipal.classList.remove('loaded');
                
                // cargamos la estructura inicial del spa
                await loadSection(contenedorPrincipal);

                // cargamos las secciones del contenedor principal
                await loadSections(contenedorPrincipal);

                section = document.getElementById(event.target.dataset.section);

            } else {
                await loadSections(section);
            }

            section.scrollIntoView( { behavior: "smooth" });
        }
    });
}