import {chatData} from '../class/chats.js';
import {userData} from '../class/default_users.js';
import {GetChatName} from "../utils";
import {getRelativeDate} from "../utils";

const currentUserId = Number(localStorage.getItem('currentUserId'));
const currentUser = userData.getUser(currentUserId);

chatData.loadFromLocalStorage();
const userChats = chatData.chats.filter(chat => chat.users.includes(Number(currentUser.id)));

if (userChats.length > 0) {
    const chatsList = document.getElementById('chats');
    userChats.forEach((chat) => {
        const chatElement = document.createElement('li');
        chatElement.classList.add('chat');

        const otherUsers = chat.users.filter(userId => userId !== currentUserId);
        const chatUsers = otherUsers.map(userId => userData.getUser(userId));

        const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
        let chatName = GetChatName(chat);

        chatElement.innerHTML = `
          <div class="chat-avatar"></div>
          <div class="chat-info">
            <div class="chat-name">${chatName}</div>
            <div class="chat-last-message">${lastMessage ? lastMessage.text : 'Нет сообщений'}</div>
          </div>
          <div class="chat-status ${lastMessage ? (lastMessage.userId === currentUserId ? 'sent' : '') : ''} ${lastMessage ? (lastMessage.status === 'read' ? 'read' : '') : ''}">
            <i class="material-icons">${lastMessage ? (lastMessage.status === 'read' ? 'done_all' : 'done') : ''}</i>
          </div>
          <div class="chat-timestamp">
            <div class="timestamp-date">${lastMessage ? getRelativeDate(lastMessage.date) : ''}</div>
            <div class="timestamp-time">${lastMessage ? lastMessage.timestamp.substring(0, 5) : ''}</div>
          </div>
          <button class="material-icons delete-chat-button" data-chat-id="${chat.id}">delete_forever</button>
          <div data-chat-id="${chat.id}"></div>
        `;

        chatElement.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-chat-button')) {
                const chatId = e.target.dataset.chatId;
                const confirmDelete = confirm('Вы точно хотите удалить данный чат?');
                if (confirmDelete) {
                    chatData.chats = chatData.chats.filter(c => c.id !== Number(chatId));
                    chatData.saveToLocalStorage();
                    chatElement.remove();
                }
            } else {
                const screenWidth = window.innerWidth;
                const chatId = e.target.closest('.chat').querySelector('[data-chat-id]').dataset.chatId;
                if (screenWidth >= 1400) {
                    showChatPage(chatId);
                } else {
                    window.location.href = `../chat_page/chat.html?chatId=${chatId}`;
                    window.open(url, '_blank');
                }
            }
        });

        chatsList.appendChild(chatElement);
    });
} else {
    const chatsList = document.getElementById('chats');
    const noChatsMessage = document.createElement('p');
    noChatsMessage.textContent = 'У вас нет чатов';
    chatsList.appendChild(noChatsMessage);
}

// функция для отображения страницы chat.js
const showChatPage = (chatId) =>{
    const screenWidth = window.innerWidth;
    if (screenWidth < 1400) {
        // Открываем чат на новой странице
        window.location.href = `../chat_page/chat.html?chatId=${chatId}`;
    } else {
        // Открываем чат в iframe
        const chatPage = document.getElementById('chat-page');
        const chatPageContent = `
      <iframe src="../chat_page/chat.html?chatId=${chatId}" frameborder="0" width="100%" height="100%"></iframe>
    `;
        chatPage.innerHTML = chatPageContent;
    }
}