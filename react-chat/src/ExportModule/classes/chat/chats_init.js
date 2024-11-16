import {ChatData} from './chats.js';
import {DEFAULT_CHATS} from './default_chats.js';
import {loadChatData, saveChatData} from '../../utils/storage.js';

const initChatData = () => {
    const chatData = new ChatData();

    if (!loadChatData()) {
        DEFAULT_CHATS.forEach((chat) => {
            let existingChat = chatData.getChat(chat.id) || chatData.addChat();
            chat.users.forEach((userId) => {
                chatData.addUser(existingChat.id, userId);
            });
            chat.messages.forEach((message) => {
                chatData.addMessage(existingChat.id, message);
            });
        });
        saveChatData(chatData);
    } else {
        chatData.chats = loadChatData() || [];
    }

    return chatData;
};

export {initChatData};