import {chatData} from '../class/chats.js';
import {userData} from '../class/users.js';
import {getChatName, getRelativeDate, getCurrentUser, getCurrentUserId} from "../utils";
import {saveChatData} from '../class/storage.js';

let currentUserId = getCurrentUserId();
const currentUser = getCurrentUser(currentUserId);
const userChats = chatData.getChatsForUser(currentUser.id);

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

if (userChats.length > 0) {
    const chatsList = document.getElementById('chats');
    userChats.forEach((chat) => {
        const chatElement = document.createElement('li');
        chatElement.classList.add('chat');

        const otherUsers = chat.users.filter(userId => userId !== currentUserId);
        const chatUsers = otherUsers.map(userId => userData.getUser(userId));

        const lastMessage = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1] : null;
        let chatName = getChatName(chat);

        const isLastMessageSent = lastMessage && lastMessage.userId === currentUserId;
        const isLastMessageRead = lastMessage && lastMessage.status === 'read';
        const lastMessageText = lastMessage ? lastMessage.text : 'Нет сообщений';
        const relativeDate = lastMessage ? getRelativeDate(lastMessage.date) : '';
        const timestampTime = lastMessage ? lastMessage.timestamp.substring(0, 5) : '';
        const chatStatusClass = `${lastMessage ? (lastMessage.userId === currentUserId ? 'sent' : '') : ''} ${lastMessage ? (lastMessage.status === 'read' ? 'read' : '') : ''}`;
        const messageIcon = lastMessage ? (lastMessage.status === 'read' ? 'done_all' : 'done') : '';

        chatElement.innerHTML = `
          <div class="chat-avatar"></div>
          <div class="chat-info">
            <div class="chat-name">${chatName}</div>
            <div class="chat-last-message">${lastMessageText}</div>
          </div>
          <div class="chat-status ${chatStatusClass}">
            <i class="material-icons">${messageIcon}</i>
          </div>
          <div class="chat-timestamp">
            <div class="timestamp-date">${relativeDate}</div>
            <div class="timestamp-time">${timestampTime}</div>
          </div>
          <button class="material-icons delete-chat-button" data-chat-id="${chat.id}">delete_forever</button>
          <div data-chat-id="${chat.id}"></div>
        `;

        const handleDeleteChat = (chatId) => {
            const confirmDelete = confirm('Вы точно хотите удалить данный чат?');
            if (confirmDelete) {
                chatData.chats = chatData.chats.filter(c => c.id !== chatId);
                chatData.saveToLocalStorage();
                chatElement.remove();
            }
        };

        const handleChatClick = (chatId) => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1400) {
                showChatPage(chatId);
            } else {
                const url = `../chat_page/chat.html?chatId=${chatId}`;
                window.location.href = url;
                window.open(url, '_blank');
            }
        };

        chatElement.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-chat-button')) {
                const chatId = e.target.dataset.chatId;
                handleDeleteChat(chatId);
            } else {
                const chatId = e.target.closest('.chat').querySelector('[data-chat-id]').dataset.chatId;
                handleChatClick(chatId);
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