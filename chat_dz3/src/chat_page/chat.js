import { chatData } from '../class/chats.js';
import { userData } from '../class/default_users.js';
import { GetChatName } from '../utils.js';

document.addEventListener('DOMContentLoaded', function () {
    const messages = document.getElementById('messages');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');

    chatData.loadFromLocalStorage();
    userData.loadFromLocalStorage();


    let currentChatId = parseInt(window.location.search.split('?chatId=')[1]);
    let userId = parseInt(localStorage.getItem('currentUserId'));
    let currentChat = chatData.getChat(currentChatId);

    const partnerNameElement = document.getElementById('partner-name');
    partnerNameElement.textContent = GetChatName(currentChat);

    const addMessage = (message, status) => {
        const messageData = {
            id: generateUniqueId(),
            text: message,
            status: status,
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            userId: userId,
            chatId: currentChatId
        };

        chatData.addMessage(currentChatId, messageData);
        const chat = chatData.getChat(currentChatId);
        const messageElement = createMessageElement(messageData);
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
        chatData.saveToLocalStorage();
        console.log(localStorage.getItem('chatData'));
    };

    const deleteMessage = (id) => {
        const messageElement = document.getElementById(id);
        messageElement.classList.add('destroy');
        setTimeout(() => {
            messageElement.remove();
            const chat = chatData.getChat(currentChatId);
            chat.messages = chat.messages.filter((message) => message.id !== id);
            chatData.saveToLocalStorage();
        }, 500);
    };

    const loadMessagesFromLocalStorage = () => {
        const chat = chatData.getChat(currentChatId);
        if (chat) {
            messages.innerHTML = '';
            chat.messages.forEach((message) => {
                if (message.userId !== userId && (message.status === 'check' || message.status === 'sent')) {
                    message.status = 'read';
                }
                const messageElement = createMessageElement(message);
                messages.appendChild(messageElement);
            });
            messages.scrollTop = messages.scrollHeight;
            chatData.saveToLocalStorage();
        }
    };


    const generateUniqueId = () => {
        return Math.floor(Math.random() * 1000000).toString();
    }

    const sendMessage = (messageInput) => {
        const message = messageInput.value.trim().replace(/</g,"<").replace(/>/g,">").replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");
        if (!message) {
            return;
        }
        addMessage(message, 'sent');
        messageInput.value = '';
        messageInput.style.height = '5vh';
        messageInput.style.overflowY = 'hidden';
        messageInput.setSelectionRange(0, 0);
    }

    const createMessageElement =(message) =>{
        const messageElement = document.createElement('li');
        messageElement.id = message.id;
        messageElement.classList.add('message', userId === message.userId ? 'sent' : 'received');

        const senderName = document.createElement('span');
        senderName.classList.add('sender-name');

        const user = userData.getUser(message.userId);
        if (user) {
            senderName.textContent = userId === message.userId ? 'Вы' : user.lastName + ' ' + user.firstName;
        } else {
            senderName.textContent = 'Пользователь не найден';
        }

        messageElement.appendChild(senderName);

        const messageText = document.createElement('span');
        messageText.classList.add('message-text');
        messageText.innerHTML = message.text.replace(/\n/g, '<br>');
        messageElement.appendChild(messageText);

        const timestamp = document.createElement('span');
        timestamp.classList.add('timestamp');
        timestamp.textContent = message.timestamp;
        messageElement.appendChild(timestamp);

        const statusIcon = document.createElement('i');
        statusIcon.classList.add('material-icons', 'message-status-icon');
        if (message.status === 'read') {
            statusIcon.textContent = 'done_all';
        } else {
            statusIcon.textContent = 'done';
        }
        messageElement.appendChild(statusIcon);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = '<i class="material-icons">delete</i>';
        messageElement.appendChild(deleteButton);

        deleteButton.addEventListener('click', () => {
            deleteMessage(message.id);
        });

        return messageElement;
    }

    loadMessagesFromLocalStorage();

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        sendMessage(messageInput);
        messageInput.dispatchEvent(new Event('input'));
        messageInput.scrollTop = messageInput.scrollHeight
    });

    messageInput.addEventListener ('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (e.shiftKey) {
                const cursorPos = messageInput.selectionStart;
                messageInput.value = messageInput.value
                messageInput.value = messageInput.value.slice(0, cursorPos) + '\n' + messageInput.value.slice(cursorPos);
                messageInput.selectionStart = messageInput.selectionEnd = cursorPos + 1;
            } else {
                sendMessage(messageInput);
            }
            messageInput.dispatchEvent(new Event('input'));
            messageInput.scrollTop = messageInput.scrollHeight
        }
    });

    messageInput.addEventListener ('input', () => {
        const textarea = messageInput;
        textarea.style.height = 'auto';
        textarea.style.minHeight = '5vh';
        textarea.style.height = textarea.scrollHeight + 'px';
        textarea.style.overflowY = "auto"
    });
});