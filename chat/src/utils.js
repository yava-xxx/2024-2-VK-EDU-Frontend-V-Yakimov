import {userData} from './class/users_init.js';

export const checkLocalStorageAndRedirect = () => {
    const currentUserId = localStorage.getItem('currentUserId');
    // Если данных нет, перенаправляем на index.html
    if (!currentUserId) {
        window.location.href = '../index.html';
    }
}

export const getChatName = (chat) => {
    const currentUserId = getCurrentUserId();
    const otherUsers = chat.users.filter(userId => userId !== currentUserId);
    const chatUsers = otherUsers.map(userId => userData.getUser(userId));
    return chat.title || chatUsers.map(user => `${user.lastName} ${user.firstName}`).join(', ');
}

export const getCurrentUser = (currentUserId) => {
    currentUserId = getCurrentUserId();
    return userData.getUser(currentUserId);
};

export const getCurrentUserId = () => {
    return Number(localStorage.getItem('currentUserId') ?? 0);
}

export const generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000).toString();
}

export const getRelativeDate = (dateString) => {
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

const getYearString = (years) => {
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