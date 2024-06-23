// export function loadComponent(elementId, url) {
//     return fetch(url)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Network responde was not ok.");
//             }
//             return response.text();
//         })
//         .then(data => {
//             document.getElementById(elementId).innerHTML = data;
//         })
//         .catch(error => {
//             console.error('There was a problem with the fetch operation: ', error);
//         });
// }

export async function loadComponent(elementId, url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        const data = await response.text();
        const container = document.getElementById(elementId);
        container.innerHTML = data;
        // executeScripts(container);
    } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
    }
}

// function executeScripts(container) {
//     const scripts = container.querySelectorAll('script');
//     scripts.forEach(script => {
//         const newScript = document.createElement('script');
//         newScript.text = script.textContent;
//         document.body.appendChild(newScript).parentNode.removeChild(newScript);
//     });
// }
