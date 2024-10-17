import { UserData } from './users.js';
import { DEFAULT_USERS } from './default_users.js';

let userData;

if (!localStorage.getItem('userData')) {
    userData = new UserData();
    DEFAULT_USERS.forEach(user => {
        userData.addUser (user);
    });
} else {
    userData = new UserData();
    userData.loadFromLocalStorage();
}

export { userData };
