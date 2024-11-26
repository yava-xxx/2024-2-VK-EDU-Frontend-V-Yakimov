import {initUserData} from "./users_init";

export class UserData {
    constructor() {
        this.users = {};
    }

    addUser({lastName, firstName, patronymic, nickname, password, about, avatar}) {
        const id = (Object.keys(this.users).length + 1).toString();
        this.users[id] = {
            id,
            lastName,
            firstName,
            patronymic,
            nickname,
            password,
            about,
            avatar
        };
    }

    getUser(id) {
        return this.users[id];
    }

    getAllUsers() {
        return Object.values(this.users);
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

const userData = initUserData();
export {userData};