import {UserData} from './users.js';
import {DEFAULT_USERS} from './default_users.js';
import {loadUserData, saveUserData} from '../../utils/storage.js';

const initUserData = () => {
    const userData = new UserData();

    if (!loadUserData()) {
        DEFAULT_USERS.forEach(user => {
            userData.addUser(user);
        });
        saveUserData(userData);
    } else {
        userData.users = loadUserData() || [];
    }

    return userData;
};

export {initUserData};