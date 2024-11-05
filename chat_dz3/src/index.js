import { userData } from './class/users.js';
import { chatData } from './class/chats.js';
import {saveToLocalStorage} from './class/storage.js';

const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nickname = document.getElementById('nickname').value;
    const password = document.getElementById('password').value;
    const user = userData.getUserByNickname(nickname);
    if (user && user.password === password) {
        saveToLocalStorage(user.id, 'currentUserId');
        window.location.href = 'messages_page/messenger.html';
    }
    errorMessage.textContent = 'Такого пользователя нет в базе!';
    errorMessage.style.opacity = 1;
    setTimeout(() => {
        errorMessage.style.opacity = 0;
    }, 3000);
});