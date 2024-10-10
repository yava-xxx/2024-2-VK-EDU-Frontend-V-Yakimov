import { UserData } from './users.js';

let userData;
if (!localStorage.getItem('userData')) {
    userData = new UserData();
    userData.addUser ('1', 'Иванов', 'Иван', 'Иванович', 'ivan_ivanov', 'password123', 'Hello, I am Ivan!');
    userData.addUser ('2', 'Петров', 'Петр', 'Петрович', 'petr_petrov', 'password456', 'Hello, I am Petr!');
    userData.addUser ('3', 'Баранников', 'Роман', 'Романович', 'rbarannikov', 'roman', 'Hello, I am Roma!');
} else {
    userData = new UserData();
    userData.loadFromLocalStorage();
}
export { userData };
