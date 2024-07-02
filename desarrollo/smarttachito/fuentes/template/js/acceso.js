document.getElementById('loginBtn').addEventListener('click', openLoginModal);
document.getElementById('registerBtn').addEventListener('click', openRegisterModal);
document.getElementById('userDetailBtn').addEventListener('click', checkLoginAndRedirect);
document.getElementById('logoutBtn').addEventListener('click', logout)
document.addEventListener('DOMContentLoaded', function(){
    updateUIBasedOnLoginStatus();
})

document.querySelector('.acceso').addEventListener('click', function() {
    document.getElementById('mainModal').style.display = 'block';
});

document.getElementById('closeMainModal').addEventListener('click', function() {
    document.getElementById('mainModal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    const mainModal = document.getElementById('mainModal');
    if (event.target == mainModal) {
        mainModal.style.display = 'none';
    }
});

function openLoginModal() {
    const modal = document.getElementById('login-modal');
    const modalContent = document.getElementById('login-modal-content');

    fetch('/html/ingresar.html')
        .then(response => response.text())
        .then(html => {
            modalContent.innerHTML = html;
            modal.style.display = "block";
            setupLoginForm();
        })
        .catch(error => {
            console.error('Error loading the login form:', error);
        });
}

function openRegisterModal() {
    const modal = document.getElementById('register-modal');
    const modalContent = document.getElementById('register-modal-content');

    fetch('/html/registrar.html')
        .then(response => response.text())
        .then(html => {
            modalContent.innerHTML = html;
            modal.style.display = "block";
            setupRegisterForm();
        })
        .catch(error => {
            console.error('Error loading the register form:', error);
        });
}

window.onclick = function (event) {
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const carritoModal = document.getElementById('carrito-modal');
    if (event.target == loginModal) {
        loginModal.style.display = "none";
    }
    if (event.target == registerModal) {
        registerModal.style.display = "none";
    }
    if (event.target === carritoModal) {
        carritoModal.style.display = 'none';
    }
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('close-modal')) {
        const loginModal = document.getElementById('login-modal');
        const registerModal = document.getElementById('register-modal');
        if (loginModal) loginModal.style.display = "none";
        if (registerModal) registerModal.style.display = "none";
    }
});

function checkLoginAndRedirect() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        window.location.href = '/html/detalle_usuario.html';
    } else {
        openLoginModal();
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    updateUIBasedOnLoginStatus();
}

function updateUIBasedOnLoginStatus() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const logginButton = document.getElementById('loginBtn');
    const registerButton = document.getElementById('registerBtn');
    const userDetailButton = document.getElementById('userDetailBtn');
    const logoutButton = document.getElementById('logoutBtn');
    if (loggedInUser) {
        logginButton.style.display = 'none';
        registerButton.style.display = 'none';
        userDetailButton.style.display = 'inline-block';
        logoutButton.style.display = 'inline-block';
    }
    else {
        logginButton.style.display = 'inline-block';
        registerButton.style.display = 'inline-block';
        userDetailButton.style.display = 'none';
        logoutButton.style.display = 'none';
    }
}

function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const loginMessage = document.getElementById('login-message');

        try {
            const response = await fetch('https://dolphin-app-lll72.ondigitalocean.app/usuarios/');
            const users = await response.json();

            const user = users.find(user => user.email === email && user.username === password);

            if (user) {
                loginMessage.style.color = 'green';
                loginMessage.textContent = 'Login exitoso';
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = '/html/detalle_usuario.html';
            } else {
                loginMessage.style.color = 'red';
                loginMessage.textContent = 'Email o contraseña incorrectos';
            }
        } catch (error) {
            loginMessage.style.color = 'red';
            loginMessage.textContent = 'Error al intentar loguearse';
            console.error('Error:', error);
        }
    });
}

function setupRegisterForm() {
    const registerForm = document.getElementById('registroForm');
    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const passwordValue = document.getElementById('password').value;

        const data = {
            username: passwordValue, 
            email: document.getElementById('email').value,
            nombres: document.getElementById('nombres').value,
            apellido_p: document.getElementById('apellido_p').value,
            apellido_m: document.getElementById('apellido_m').value,
            numero_documento: document.getElementById('numero_documento').value,
            celular: document.getElementById('celular').value,
            password: passwordValue, 
            usuario_administrador: false,
            usuario_activo: true
        };

        fetch('https://dolphin-app-lll72.ondigitalocean.app/usuarios/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errData => {
                        console.log('Error Data:', errData);
                        throw new Error(`Error ${response.status}: ${errData.detail || 'Datos inválidos'}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                alert('Registro exitoso. Ahora puedes iniciar sesión.');
                window.location.href = '/index.html';
            })
            .catch(error => {
                console.error('Error:', error.message);
                alert(error.message);
            });
    });
}