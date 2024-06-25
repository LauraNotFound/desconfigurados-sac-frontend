import { loadSection } from "../utils/loadSection.js";


export const footerController = async () => {
    // load footer
	const footerContainer = document.getElementById('footer-placeholder');
	loadSection(footerContainer);
}