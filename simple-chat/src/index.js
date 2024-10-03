document.addEventListener('DOMContentLoaded', function () {
    const messages = document.getElementById('messages');
    const messageForm = document.getElementById('messageForm');
    const messageInput = document.getElementById('messageInput');

    function saveMessagesToLocalStorage() {
        const messages = document.querySelectorAll('.message');
        let messagesArray = [];

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
        const storedMessages = localStorage.getItem('messages');
        if (storedMessages) {
            const oldMessagesArray = JSON.parse(storedMessages);
            oldMessagesArray.forEach((oldMessage) => {
                let newMessage = messagesArray.find((newMessage) => newMessage.id === oldMessage.id);
                if (!newMessage) {
                    messagesArray = messagesArray.filter((message) => message.id !== oldMessage.id);
                }
            });
        }
        const ids = messagesArray.map((message) => message.id);
        if (ids.length !== new Set(ids).size) {
            messagesArray = messagesArray.map((message, index) => {
                if (ids.indexOf(message.id) !== index) {
                    message.id = generateUniqueId();
                }
                return message;
            });
        }
        localStorage.setItem('messages', JSON.stringify(messagesArray));
    }

    function generateUniqueId() {
        return Math.floor(Math.random() * 1000000).toString();
    }

    function sendMessage(messageInput) {
        const message = messageInput.value.trim().replace(/</g,"&lt;").replace(/^\s*\n+|\n+\s*$/g, '').replace(/\n+/g, '\n');
        if (message) {
            addMessageToChat(message, 'sent', 'read');
            messageInput.value = '';
            messageInput.style.height = '5vh';
            messageInput.style.overflowY = 'hidden';
            messageInput.setSelectionRange(0, 0);
            saveMessagesToLocalStorage();
        } else {
            alert('Сообщение не может быть пустым!');
        }
    }

    function createMessageElement(message) {
        const messageElement = document.createElement('div');
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
                messageElement.classList.add('destroy');
                setTimeout(() => {
                    messageElement.remove();
                    saveMessagesToLocalStorage();
                }, 500);
            });
        }
        return messageElement;
    }

    function loadMessagesFromLocalStorage() {
        const storedMessages = localStorage.getItem('messages');
        const defaultMessages = [
            {
                id: 1,
                text: 'Привет! Как дела???',
                sentOrReceived: 'received',
                status: '',
                timestamp: '10:00',
                senderName: 'Иван Иванов',
                isDefault: true
            },
            {
                id: 0,
                text: 'Ты сделал домашку по VK Frontend?????',
                sentOrReceived: 'received',
                status: '',
                timestamp: '10:05',
                senderName: 'Иван Иванов',
                isDefault: true
            }
        ];
        const defaultMessagesAdded = localStorage.getItem('defaultMessagesAdded');

        let messagesArray = storedMessages ? JSON.parse(storedMessages) : [];

        if (!defaultMessagesAdded) {
            const messageIdExists = (id) => messagesArray.some((message) => message.id === id);
            defaultMessages.forEach((defaultMessage) => {
                if (!messageIdExists(defaultMessage.id)) {
                    messagesArray.push(defaultMessage);
                }
            });
            localStorage.setItem('defaultMessagesAdded', 'true');
        }

        messages.innerHTML = '';

        messagesArray.forEach((message) => {
            const messageElement = createMessageElement(message);
            messages.appendChild(messageElement);
        });

        localStorage.setItem('messages', JSON.stringify(messagesArray));
    }

    loadMessagesFromLocalStorage();

    messageForm.addEventListener('submit', function (e) {
        e.preventDefault();
        sendMessage(messageInput);
    });

    messageInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(messageInput);
        } else if (e.key === 'Enter' && e.shiftKey) {
            messageInput.value = messageInput.value.slice(0, messageInput.selectionStart) + '\n';
            e.preventDefault();
            messageInput.dispatchEvent(new Event('input'));
        }
    });

    messageInput.addEventListener('input', function () {
        const textarea = this;
        const twoLineHeight = 5;
        const messagesContainer = document.getElementById('messages');

        if (textarea.value.trim() !== '') {
            if (textarea.scrollHeight > twoLineHeight) {
                textarea.style.height = textarea.scrollHeight + 'px';
                textarea.style.overflowY = 'auto';
            } else {
                textarea.style.height = twoLineHeight + 'vh';
                textarea.style.overflowY = 'hidden';
            }
        } else {
            textarea.style.height = '5vh';
            textarea.style.overflowY = 'hidden';
            textarea.setSelectionRange(0, 0);
        }
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';

        const lastMessage = messagesContainer.lastChild;
        if (lastMessage && lastMessage.offsetTop + lastMessage.offsetHeight > messagesContainer.scrollTop + messagesContainer.offsetHeight) {
            messagesContainer.scrollTop = lastMessage.offsetTop + lastMessage.offsetHeight - messagesContainer.offsetHeight - 50;

        }
    });

    function addMessageToChat(message, sentOrReceived, status) {
        const messageElement = createMessageElement({
            id: generateUniqueId(),
            text: message,
            sentOrReceived: sentOrReceived,
            status: status,
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            senderName: sentOrReceived === 'sent' ? 'Вы' : 'Иван Иванов'
        });
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
    }
});