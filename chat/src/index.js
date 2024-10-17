import { userData } from './class/users_init.js';
import { chatData } from './class/chats_init.js';

userData.loadFromLocalStorage();
chatData.loadFromLocalStorage();

const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');
const registrationForm = document.getElementById('registration-form');
const registerButton = document.getElementById('register-button');
const registrationErrorMessage = document.getElementById('registration-error-message');
const nicknameInput = document.getElementById('nickname');
const passwordInput = document.getElementById('password');
const welcomeMessage = document.getElementById('welcome-message');

function toggleForms(showLoginForm) {
    loginForm.style.display = showLoginForm ? 'block' : 'none';
    registrationForm.style.display = showLoginForm ? 'none' : 'block';
}

function showErrorMessage(message) {
    errorMessage.textContent = message;
    errorMessage.style.opacity = 1;
    setTimeout(() => {
        errorMessage.style.opacity = 0;
    }, 3000);
}

function handleLogin() {
    const nickname = nicknameInput.value;
    const password = passwordInput.value;
    const user = userData.getUserByNickname(nickname);
    if (user && user.password === password) {
        localStorage.setItem('currentUserId', user.id);
        welcomeMessage.style.display = 'block';
        welcomeMessage.classList.remove('fade-out');
        welcomeMessage.classList.add('fade-in');

        setTimeout(() => {
            welcomeMessage.classList.remove('fade-in');
            welcomeMessage.classList.add('fade-out');

            setTimeout(() => {
                window.location.href = 'messages_page/messenger.html';
                welcomeMessage.style.display = 'none';
            }, 1000);
        }, 3000);
    } else {
        showErrorMessage('Такого пользователя нет в базе! Пожалуйста, зарегистрируйтесь.');
        toggleForms(false);
    }
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleLogin();
});

registerButton.addEventListener('click', (e) => {
    e.preventDefault();
    const regNickname = document.getElementById('reg-nickname').value;
    const regPassword = document.getElementById('reg-password').value;
    const regLastName = document.getElementById('reg-lastname').value;
    const regFirstName = document.getElementById('reg-firstname').value;
    const regPatronymic = document.getElementById('reg-patronymic').value;

    if (!regNickname || !regPassword || !regLastName || !regFirstName || !regPatronymic) {
        toggleForms(true);
        showErrorMessage('Пожалуйста, заполните все поля!');
        return;
    }

    const existingUser  = userData.getUser (regNickname);
    if (existingUser ) {
        registrationErrorMessage.textContent = 'Пользователь с таким никнеймом уже существует!';
        registrationErrorMessage.style.opacity = 1;
        setTimeout(() => {
            registrationErrorMessage.style.opacity = 0;
        }, 3000);
        return;
    }

    userData.addUser ({lastName: regLastName, firstName: regFirstName, patronymic: regPatronymic, nickname: regNickname, password: regPassword, about: ''});
    alert('Регистрация прошла успешно! Теперь вы можете войти.');
    toggleForms(true);
});

document.getElementById('registration-button').addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms(false);
});
