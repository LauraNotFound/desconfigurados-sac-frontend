import { headerController } from './components/header.js';
import { spaController } from './components/contenidoSPA.js';
import { footerController } from './components/footer.js';

/*
export const initSPA = async () => {
	const bodyInitIndexStructure = `
		<!-- aquí se incrusta el hearder -->
		<section id="header-placeholder" data-content-path="/html/components/header.html"></section>

		<!-- aquí se incrusta las secciones de contenido -->
		<section id="contenido-principal" data-content-path="/html/components/contenido_spa.html"></section>
		
		<!-- aquí se incrusta el footer -->
		<section id="footer-placeholder" data-content-path="/html/components/footer.html"></section>

		<scripts id="scripts-sections"></scripts>
		<script id='app-script' type='module' src="./js/app.js"></script>
	`

	document.querySelector('body').innerHTML = "";
	document.querySelector('body').innerHTML = bodyInitIndexStructure;

	
	await loadSections(document);

	// Inicializar la carga del contenido principal
	await loadSections(document.getElementById('contenido-principal'));
}


// cuando los componentes del index esten completamente cargados
document.addEventListener("DOMContentLoaded", async function () {

	// inicializar la carga de las secciones iniciales
	initSPA();

	// Manejar la carga de contenido dinámico basado en el scroll
	window.addEventListener('scroll', async () => {
		await loadSections(document);
	});
	
});

*/

document.addEventListener("DOMContentLoaded", async function () {

	headerController();
	footerController();
	spaController();
	
});

