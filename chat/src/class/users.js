import {StorageManager} from "./storage";

class UserData {
    constructor() {
        this.users = {};
        this.storageManager = new StorageManager('userData');
        this.loadFromLocalStorage();
    }

    addUser({lastName, firstName, patronymic, nickname, password, about}) {
        const id = (Object.keys(this.users).length + 1).toString();
        this.users[id] = {
            id,
            lastName,
            firstName,
            patronymic,
            nickname,
            password,
            about
        };
        this.saveToLocalStorage();
    }

    getUser(id) {
        return this.users[id];
    }

    getAllUsers() {
        return Object.values(this.users);
    }

    saveToLocalStorage() {
        this.storageManager.save(this.users);
    }

    loadFromLocalStorage() {
        const storedData = this.storageManager.load();
        if (storedData)
            this.users = storedData;
    }

    getUserByNickname(nickname) {
        for (const userId in this.users) {
            if (this.users[userId].nickname === nickname) {
                return this.users[userId];
            }
        }
        return null;
    }
}

export { UserData };
