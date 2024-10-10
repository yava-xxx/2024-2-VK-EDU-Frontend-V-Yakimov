import { userData } from './class/default_users.js';
import { chatData } from './class/default_chats.js';

userData.loadFromLocalStorage();
chatData.loadFromLocalStorage();

const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nickname = document.getElementById('nickname').value;
    const password = document.getElementById('password').value;
    const user = userData.getUserByNickname(nickname);
    if (user && user.password === password) {
        localStorage.setItem('currentUserId', user.id);
        window.location.href = 'messages_page/messenger.html';
    } else {
        errorMessage.textContent = 'Такого пользователя нет в базе!';
        errorMessage.style.opacity = 1;
        setTimeout(() => {
            errorMessage.style.opacity = 0;
        }, 3000);
    }
});