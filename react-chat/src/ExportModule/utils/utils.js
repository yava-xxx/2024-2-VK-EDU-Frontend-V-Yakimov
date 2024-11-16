import {userData} from '../classes/user/users.js';
import {loadFromLocalStorage} from './storage.js';

export const getChatName = (chat) => {
    const currentUserId = getCurrentUserId();
    const otherUsers = chat.users.filter(userId => userId !== currentUserId);
    const chatUsers = otherUsers.map(userId => userData.getUser(userId));
    return chat.title || chatUsers.map(user => `${user.lastName} ${user.firstName}`).join(', ');
}

export const getCurrentUser  = (currentUserId) => {
    currentUserId = getCurrentUserId();
    return userData.getUser(currentUserId);
};

export const getCurrentUserId = () => {
    return Number(loadFromLocalStorage('currentUser') ?? 0);
}

export const generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000).toString();
}

export const getRelativeDate = (dateString) =>{
    const currentDate = new Date();
    const messageDate = new Date(dateString);
    const diffInMilliseconds = currentDate.getTime() - messageDate.getTime();

    if (isNaN(diffInMilliseconds)) {
        return 'Сегодня';
    }

    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays === 0) return 'Сегодня';
    if (diffInDays === 1) return 'Вчера';

    const years = Math.floor(diffInDays / 365);
    const months = Math.floor((diffInDays % 365) / 30);
    const days = diffInDays % 30;

    if (years > 0) {
        return `${years} ${getYearString(years)} и ${months} ${getMonthString(months)} назад`;
    } else if (months > 0) {
        return `${months} ${getMonthString(months)} назад`;
    } else {
        return `${days} ${getDayString(days)} назад`;
    }
}

const getYearString = (years) =>{
    if (years === 1) return 'год';
    if (years < 5) return 'года';
    return 'лет';
}

const getMonthString = (months) => {
    if (months === 1) return 'месяц';
    if (months < 5) return 'месяца';
    return 'месяцев';
}

const getDayString = (days) => {
    if (days === 1) return 'день';
    if (days < 5) return 'дня';
    return 'дней';
}


export const areArraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value) => arr2.includes(value));
}
export const getChatTitle = (chat) => {
    const currentUserId = getCurrentUserId();
    const otherUsers = chat.users.filter(userId => userId !== String(currentUserId));

    if (otherUsers.length === 1) {
        const otherUser  = userData.getUser (otherUsers[0]);
        return `${otherUser .lastName} ${otherUser .firstName}`;
    } else {
        const otherUserNames = otherUsers.map(userId => {
            const user = userData.getUser (userId);
            return `${user.lastName} ${user.firstName}`;
        });
        return otherUserNames.join(', ');
    }
};

export const getChatAvatar = (chat) => {
    const currentUserId = getCurrentUserId();
    const otherUsers = chat.users.filter(userId => userId !== String(currentUserId));

    if (otherUsers.length === 1) {
        const otherUser  = userData.getUser (otherUsers[0]);
        return otherUser .avatar;
    } else {
        return './svg/logotab.svg';
    }
};