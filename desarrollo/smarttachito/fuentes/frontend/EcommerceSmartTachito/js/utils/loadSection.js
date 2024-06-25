import { loadComponent } from "./loadComponents.js";

export const loadSections = async (parent) => {
	const sections = parent.querySelectorAll('section');
	for (const section of sections) {
		await loadSection(section);
	}
}

export async function loadSection(section) {

	// obtener el rectangulo asociado a la sección
	const rect = section.getBoundingClientRect();

	// cargar si no está cargado y si está dentro del campo de visualización
	if (!section.classList.contains('loaded') && rect.top >= 0 && rect.bottom <= window.innerHeight) {
		const contentPath = section.dataset.contentPath;

		// cargar component
		await loadComponent(section.id, contentPath);

		// establecer como cargado
		section.classList.add('loaded');
	}
}



/*
// cada sección tiene su propio script asociado quedeberá ser cargado cuando
// el contenido de la sección es cargado
const loadAllScriptInSection = async (sectionE) => {

	// buscamos la sección que contiene a todas las scripts de las secciones
	const scriptContainer = document.getElementById('scripts-sections');

	// encontramos todas los scripts
	sectionE.querySelectorAll('script').forEach(script => {

		scriptContainer.querySelectorAll('script').forEach(oldScript => {
			if (oldScript.id === script.id) {
				scriptContainer.removeChild(oldScript);
			}
		});

		// crear un nuevo elemento script
		const newScript = document.createElement('script');

		// pasarle todos sus atributos asociados
		newScript.src = script.src;
		newScript.type = script.type || 'text/javascript';
		newScript.id = script.id;

		// incluirlo dentrodel apartado de scripts
		scriptContainer.appendChild(newScript);
	});
}*/