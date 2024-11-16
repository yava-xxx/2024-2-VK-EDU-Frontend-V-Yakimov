import React, {useEffect, useState} from 'react';
import {userData} from '../../ExportModule/classes/user/users.js';
import {chatData} from '../../ExportModule/classes/chat/chats.js';
import {saveChatData} from '../../ExportModule/utils/storage.js';
import {areArraysEqual, getCurrentUserId} from '../../ExportModule/utils/utils.js';
import styles from '../../styles/messagesPage.module.scss';
import DrawIcon from '@mui/icons-material/Draw';

const NewChatButton = ({updateUserChats}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserListOpen, setIsUserListOpen] = useState(false);
    const [chatTitle, setChatTitle] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const allUsers = userData.getAllUsers();
        const currentUserId = String(getCurrentUserId());
        const filteredUsers = allUsers.filter(user => String(user.id) !== currentUserId);
        setUsers(filteredUsers);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const toggleUserList = () => {
        setIsUserListOpen(prev => !prev);
    };

    const handleUserSelect = (userId) => {
        setSelectedUsers(prev => {
            if (prev.includes(userId)) {
                return prev.filter(id => id !== userId);
            } else {
                return [...prev, userId];
            }
        });
    };

    const handleCreateChat = () => {
        const currentUserId = String(getCurrentUserId());
        const newChatUsers = [...selectedUsers, currentUserId];
        const existingChat = chatData.chats.find(chat => {
            const chatUsers = chat.users;
            return areArraysEqual(chatUsers.sort(), newChatUsers.sort());
        });
        if (existingChat) {
            console.log('Чат с такими пользователями уже существует');
            return;
        }
        const newChat = chatData.addChat();
        newChat.title = chatTitle;
        newChat.users = newChatUsers;
        saveChatData(chatData);
        updateUserChats();
    };

    return (
        <div className={styles.divNewChat}>

            {isMenuOpen && (
                <div className={styles.newChatMenu}>
                    <input
                        type="text"
                        placeholder="Введите название чата"
                        value={chatTitle}
                        onChange={(e) => setChatTitle(e.target.value)}
                        disabled={selectedUsers.length === 1}
                    />
                    <div className={styles.userSelect}>
                        <div className={styles.userSelectInput} onClick={toggleUserList}>
                            Выберите пользователей
                        </div>
                        {isUserListOpen && (
                            <ul className={styles.show}>
                                {users.map(user => (
                                    <li
                                        key={user.id}
                                        onClick={() => handleUserSelect(user.id)}
                                        className={selectedUsers.includes(user.id) ? styles.selected : ''}
                                    >
                                        {user.nickname}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button className={styles.buttonNewChat} onClick={handleCreateChat}
                            disabled={selectedUsers.length === 0}>
                        Создать чат
                    </button>
                </div>
            )}
            <button className={styles.newChatButton} onClick={toggleMenu}>
                <DrawIcon/>
            </button>
        </div>
    );
};

export default NewChatButton;