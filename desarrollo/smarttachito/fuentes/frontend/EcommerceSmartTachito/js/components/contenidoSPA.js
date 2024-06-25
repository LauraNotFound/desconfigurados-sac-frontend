import { loadSection, loadSections } from "../utils/loadSection.js";
import { landingController } from '../landing.js';
import { catalogoController } from '../catalogo.js';
import { novedadesController } from '../novedades.js';
import { nosotrosController } from '../nosotros.js';
import { contactoController } from '../contacto.js';

// controlador de todas las secciones iniciales del spa
const controllers = {
    'landing-seccion' : landingController,
    'catalogo-seccion' : catalogoController,
    'novedades-seccion' : novedadesController,
    'nosotros-seccion' : nosotrosController,
    'contacto-seccion' : contactoController
}

// ejecutaremos los controladores si la secciones a cargado y no tiene la clase controller-initialized osea
// no a sido cargado su controlador correspondiente
const executeControllerSections = async (patherContainer) => {
    
    // iteramos en todas las secciones del contenedor
    patherContainer.querySelectorAll('section').forEach(section => {

        // verificamos si ha cargado pero su controlador aun no y si existe el controlador
        if (section.classList.contains('loaded') && !section.classList.contains('controller-initialized') &&
            Object.prototype.hasOwnProperty.call(controllers, section.id)) {

            // ejecutamos su controlador
            controllers[section.id]();

            // registramos como controlador inicializado
            section.classList.add('controller-initialized');
        }
    });
}


export const spaController = async () => {

    // load spa
    const mainContainer = document.getElementById('contenido-principal');
    await loadSection(mainContainer);
    await loadSections(mainContainer);
    await executeControllerSections(mainContainer);

    window.addEventListener('scroll', async () => {
        await loadSections(mainContainer);
        await executeControllerSections(mainContainer);
    });

}