export class ChatData {
    constructor() {
        this.chats = [];
        this.loadFromLocalStorage();
    }

    // Метод для добавления нового чата
    addChat(id) {
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

    // Метод для сохранения данных в local storage
    saveToLocalStorage() {
        localStorage.setItem('chatData', JSON.stringify(this.chats));
    }

    // Метод для загрузки данных из local storage
    loadFromLocalStorage() {
        const storedChats = localStorage.getItem('chatData');
        if (storedChats) {
            this.chats = JSON.parse(storedChats);
        } else {
            this.chats = []; // Если данных нет в local storage, установите this.chats в пустой массив
        }
    }
}

const chatData = new ChatData();
export {chatData};
