import { ChatData } from './chats.js';

let chatData;
if (!localStorage.getItem('chatData')) {
    chatData = new ChatData();
    const defaultChats = [
        {
            id: 1,
            messages: [
                {
                    id: 1,
                    text: 'Привет!',
                    sentOrReceived: 'sent',
                    status: 'read',
                    date: '2022-07-25',
                    timestamp: '12:00:00',
                    senderName: 'Вы',
                    userId: 1,
                    chatId: 1
                },
                {
                    id: 2,
                    text: 'Привет!',
                    sentOrReceived: 'received',
                    status: 'read',
                    date: '2022-07-25',
                    timestamp: '12:01:00',
                    senderName: 'Иван Иванов',
                    userId: 2,
                    chatId: 1
                }
            ],
            users: [1, 2]
        },
        {
            id: 2,
            messages: [
                {
                    id: 1,
                    text: 'Привет!',
                    status: 'read',
                    date: '2022-07-25',
                    timestamp: '12:00:00',
                    userId: 3,
                    chatId: 2
                },
                {
                    id: 2,
                    text: 'Здравствуй!',
                    status: 'sent',
                    date: '2022-07-25',
                    timestamp: '12:01:00',
                    userId: 1,
                    chatId: 2
                }
            ],
            users: [1, 3]
        }
    ];

    defaultChats.forEach((chat) => {
        chatData.addChat(chat.id);
        chat.users.forEach((userId) => {
            chatData.addUser (chat.id, userId);
        });
        chat.messages.forEach((message) => {
            chatData.addMessage(chat.id, message);
        });
    });
} else {
    chatData = new ChatData();
    chatData.loadFromLocalStorage();
}
chatData.saveToLocalStorage();
export { chatData };