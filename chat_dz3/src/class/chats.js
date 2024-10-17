import {StorageManager} from "./storage.js";

export class ChatData {
    constructor() {
        this.chats = [];
        this.storageManager = new StorageManager('chatData');
        this.loadFromLocalStorage();
    }

    // Метод для добавления нового чата
    addChat() {
        const id = (this.chats.length + 1).toString();
        const chat = {
            id: id,
            title: '',
            messages: [],
            users: []
        };
        this.chats.push(chat);
        return chat;
    }

    // Метод для получения чата по его id
    getChat(id) {
        // return this.chats.find(chat => chat.id === id) || null;
        return this.chats.find(chat => chat.id === id) || null;
    }


    // Метод для добавления нового сообщения в чат
    addMessage(chatId, message) {
        const chat = this.getChat(chatId);
        if (chat) {
            chat.messages.push(message);
        }
    }

    // Метод для установки названия чата
    setTitle(chatId, title) {
        const chat = this.getChat(chatId);
        if (chat) {
            chat.title = title;
        }
    }

    // Метод для добавления нового пользователя в чат
    addUser(chatId, userId) {
        const chat = this.getChat(chatId);
        if (chat) {
            chat.users.push(userId);
        }
    }

    getChatsForUser (userId) {
        return this.chats.filter(chat => chat.users.includes(Number(userId)));
    }

    // Метод для сохранения данных в local storage
    saveToLocalStorage() {
        this.storageManager.save(this.chats);
    }

    loadFromLocalStorage() {
        const storedChats = this.storageManager.load();
        if (storedChats) {
            this.chats = storedChats;
        }
    }
}

const chatData = new ChatData();
export {chatData};