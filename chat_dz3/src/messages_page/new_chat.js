import { chatData } from '../class/chats.js';
import { userData } from '../class/users.js';
import {areArraysEqual, getCurrentUserId} from "../utils";
import {saveChatData} from "../class/storage";


const createNewChat = () => {
    const newChatButton = document.querySelector('.new-chat-button');
    const newChatMenu = document.createElement('div');
    newChatMenu.classList.add('new-chat-menu');
    newChatMenu.innerHTML = `
      <input id="chat-title-input" type="text" placeholder="Введите название чата">
      <div class="user-select">
        <div class="user-select-input" id="user-select-input">Выберите пользователей</div>
        <ul id="user-list"></ul>
      </div>
      <button id="create-chat-button">Создать чат</button>
    `;

    document.body.appendChild(newChatMenu);
    newChatMenu.style.display = 'none';

    const userList = document.getElementById('user-list');
    const users = userData.getAllUsers();
    users.forEach((user) => {
        const listItem = document.createElement('li');
        listItem.textContent = user.nickname;
        listItem.dataset.userId = user.id;
        userList.appendChild(listItem);
    });

    const userSelectInput = document.getElementById('user-select-input');
    userSelectInput.addEventListener('click', () => {
        userList.classList.toggle('show');
    });

    userList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            e.target.classList.toggle('selected');
            const selectedUsers = Array.from(userList.children).filter(li => li.classList.contains('selected')).length;
            const chatTitleInput = document.getElementById('chat-title-input');
            chatTitleInput.disabled = selectedUsers <= 1;
        }
    });

    newChatButton.addEventListener('click', () => {
        newChatMenu.style.display = newChatMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.getElementById('create-chat-button').addEventListener('click', () => {
        const chatTitle = document.getElementById('chat-title-input').value;
        const selectedUsers = Array.from(userList.children).filter(li => li.classList.contains('selected'));
        const currentUserId = getCurrentUserId();

        const newChatUsers = selectedUsers.map(li => {
            if (li instanceof HTMLElement) {
                return parseInt(li.dataset.userId, 10);
            } else {
                return null;
            }
        }).concat([currentUserId]);

        const existingChat = chatData.chats.find((chat) => {
            const chatUsers = chat.users;
            return areArraysEqual(chatUsers.sort((a, b) => a - b), newChatUsers.sort((a, b) => a - b));
        });

        if (existingChat) {
            console.log('Чат с такими пользователями уже существует');
            window.location.href = `../chat_page/chat.html?chatId=${existingChat.id}`;
            return;
        }
        let newChatId = chatData.chats.length + 1;
        let newChat = chatData.addChat(newChatId);
        newChat.title = chatTitle;
        newChat.users = newChatUsers;
        saveChatData(chatData);
        window.location.href = `../chat_page/chat.html?chatId=${newChatId}`;

    });

}

document.addEventListener('DOMContentLoaded', createNewChat);