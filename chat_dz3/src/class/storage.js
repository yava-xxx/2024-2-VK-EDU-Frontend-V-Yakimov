const saveToLocalStorage = (data, key) => {
    localStorage.setItem(key, JSON.stringify(data));
}

const loadFromLocalStorage = (key) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
}

const saveChatData = (chatData) => {
    saveToLocalStorage(chatData.chats, 'chatData');
}

const loadChatData = () => {
    return loadFromLocalStorage('chatData');
}

const saveUserData = (userData) => {
    saveToLocalStorage(userData.users, 'userData');
}

const loadUserData = () => {
    return loadFromLocalStorage('userData');
}


export {
    saveToLocalStorage,
    loadFromLocalStorage,
    saveChatData,
    loadChatData,
    saveUserData,
    loadUserData
};