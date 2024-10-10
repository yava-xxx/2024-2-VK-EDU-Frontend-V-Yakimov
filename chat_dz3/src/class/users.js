class UserData {
    constructor() {
        this.users = {};
        this.loadFromLocalStorage();
    }

    addUser(id, lastName, firstName, patronymic, nickname, password, about) {
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
        localStorage.setItem('userData', JSON.stringify(this.users));
    }

    loadFromLocalStorage() {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            this.users = JSON.parse(storedData);
        }
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
