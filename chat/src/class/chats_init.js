import {ChatData} from './chats.js';
import {DEFAULT_CHATS} from './default_chats.js';

const initializeChatData = (chatData) =>{
    console.log('Initialized ChatData');
    DEFAULT_CHATS.forEach((chat) => {
        let existingChat = chatData.getChat(chat.id) || chatData.addChat();
        chat.users.forEach((userId) => {
            chatData.addUser(existingChat.id, userId);
        });
        chat.messages.forEach((message) => {
            chatData.addMessage(existingChat.id, message);
        });
    });
    chatData.saveToLocalStorage();
}

let chatData = new ChatData();

if (!localStorage.getItem('chatData')) {
    initializeChatData(chatData);
} else {
    chatData = new ChatData();
    chatData.loadFromLocalStorage();
}

export {chatData};
