import { defaultMessages } from './defaultMessages.js';

document.addEventListener('DOMContentLoaded', function () {
    const messages = document.getElementById('messages');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');

    const addMessage = (message, sentOrReceived, status) => {
        const messageData = {
            id: generateUniqueId(),
            text: message,
            sentOrReceived: sentOrReceived,
            status: status,
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            senderName: sentOrReceived === 'sent' ? 'Вы' : 'Иван Иванов'
        };

        const addMessageToChat = () => {
            const messageElement = createMessageElement(messageData);
            messages.appendChild(messageElement);
            messages.scrollTop = messages.scrollHeight;
        };

        const saveMessageToLocalStorage = () => {
            const storedMessages = localStorage.getItem('messages');
            const messagesArray = storedMessages ? JSON.parse(storedMessages) : [];
            messagesArray.push(messageData);
            localStorage.setItem('messages', JSON.stringify(messagesArray));
        };

        addMessageToChat();
        saveMessageToLocalStorage();
    };

    const deleteMessage = (id) => {
        const messageElement = document.getElementById(id);
        messageElement.classList.add('destroy');
        setTimeout(() => {
            messageElement.remove();

            const messages = document.querySelectorAll('.message');
            const messagesArray = [];

            messages.forEach((message) => {
                const messageObject = {
                    id: message.id,
                    senderName: message.querySelector('.sender-name').textContent,
                    text: message.querySelector('.message-text').innerHTML,
                    timestamp: message.querySelector('.timestamp').textContent,
                    status: message.querySelector('.message-status-icon').textContent,
                    sentOrReceived: message.classList.contains('sent') ? 'sent' : 'received'
                };
                messagesArray.push(messageObject);
            });

            localStorage.setItem('messages', JSON.stringify(messagesArray));
        }, 500);
    };



    const loadMessagesFromLocalStorage = () => {
        const messagesArray = parseMessages(getMessageStorage());
        messagesArray.push(...defaultMessages);
        messages.innerHTML = '';

        messagesArray.forEach((message) => {
            addMessage(message.text, message.sentOrReceived, message.status);
        });

        messages.scrollTop = messages.scrollHeight;

        localStorage.setItem('messages', JSON.stringify(messagesArray));
    };


    const getMessageStorage = () => {
        const storedMessages = localStorage.getItem('messages');
        return storedMessages ? JSON.parse(storedMessages) : [];
    };

    const parseMessages = (messages) => {
        return messages.map((message) => ({
            id: message.id,
            senderName: message.senderName,
            text: message.text,
            timestamp: message.timestamp,
            status: message.status,
            sentOrReceived: message.sentOrReceived,
        }));
    };

    const generateUniqueId = () => {
        return Math.floor(Math.random() * 1000000).toString();
    }

    const sendMessage = (messageInput) => {
        const message = messageInput.value.trim().replace(/</g,"&lt;").replace(/^\s*\n+|\n+\s*$/g, '').replace(/\n+/g, '\n');
        if (!message) {
            return;
        }
        addMessage(message, 'sent', 'read');
        messageInput.value = '';
        messageInput.style.height = '5vh';
        messageInput.style.overflowY = 'hidden';
        messageInput.setSelectionRange(0, 0);
    }

    const createMessageElement =(message) =>{
        const messageElement = document.createElement('li');
        messageElement.id = message.id;
        messageElement.classList.add('message', message.sentOrReceived);

        const senderName = document.createElement('span');
        senderName.classList.add('sender-name');
        senderName.textContent = message.senderName;
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
        if (message.status === 'check') {
            statusIcon.textContent = 'check';
        } else {
            statusIcon.textContent = 'done_all';
        }
        messageElement.appendChild(statusIcon);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = '<i class="material-icons">delete</i>';
        messageElement.appendChild(deleteButton);

        if (message.id === '1' || message.id === '0') {
            deleteButton.style.display = 'none';
        } else {
            deleteButton.addEventListener('click', () => {
                deleteMessage(message.id);
            });
        }
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
