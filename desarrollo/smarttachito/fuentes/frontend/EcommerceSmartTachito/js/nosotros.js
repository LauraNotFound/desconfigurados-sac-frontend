export const nosotrosController = async () => {
    const equipoGrid = document.getElementById('equipo-grid');
    const equipoItems = [
        {
            name: 'Jorge Jesús',
            role: 'Desarrollador',
            nickname: 'jorgektch',
            image: '/assets/equipo/jorge.png'
        },
        {
            name: 'Pedro Josué',
            role: 'Desarrollador',
            nickname: 'anycodef',
            image: '/assets/equipo/pedro.png'
        },
        {
            name: 'Laura Cecilia',
            role: 'Desarrolladora',
            nickname: 'LauraNotFound',
            image: '/assets/equipo/laura.png'
        },
        {
            name: 'Asthri Joanne',
            role: 'Desarrolladora',
            nickname: 'AsthriPardave',
            image: '/assets/equipo/asthri.png'
        },
        {
            name: 'Luiz Ignacio',
            role: 'Desarrollador',
            nickname: 'LuizIgnacio2002',
            image: '/assets/equipo/luiz.png'
        },
        {
            name: 'Hugo Sebastián',
            role: 'Desarrollador',
            nickname: 'catac4',
            image: '/assets/equipo/hugo.png'
        },
        {
            name: 'José Luis',
            role: 'Desarrollador',
            nickname: 'adminLTR',
            image: '/assets/equipo/luis.png'
        },
        {
            name: 'Renzo Jeanpier',
            role: 'Desarrollador',
            nickname: 'jhordanfree',
            image: '/assets/equipo/renzo.png'
        },
        {
            name: 'Jhordan Jhovany',
            role: 'Desarrollador',
            nickname: 'johdanfree',
            image: '/assets/equipo/jhordan.png'
        }
    ];

    equipoItems.forEach(item => {
        const equipoElement = document.createElement('div');
        equipoElement.classList.add('equipo-item');
        equipoElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>${item.role}</p>
            <p>(${item.nickname})</p>
        `;
        equipoGrid.appendChild(equipoElement);
    });  
}