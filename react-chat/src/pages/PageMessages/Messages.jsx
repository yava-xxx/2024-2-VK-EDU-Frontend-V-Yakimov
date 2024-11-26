import React, {useState, useRef, useEffect} from "react";
import {usePageContext} from '../../ExportModule/PageContext.jsx';
import {useChatContext} from '../../ExportModule/ChatContext.jsx';
import {useTheme} from '../../ExportModule/ThemeContext.jsx';
import Menu from "./Menu";
import styles from '../../styles/messagesPage.module.scss';
import Header from './Header.jsx';
import {getChatName, getRelativeDate, getCurrentUserId} from "../../ExportModule/utils/utils.js";
import {chatData} from "../../ExportModule/classes/chat/chats.js";
import ChatList from "./Chatlist.jsx";
import NewChatButton from './NewChatButton.jsx';
import { saveChatData} from "../../ExportModule/utils/storage.js";

const Messages = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const {navigateTo} = usePageContext();
    const {isDarkMode} = useTheme();
    const [userChats, setUserChats] = useState([]);
    const { setCurrentChatId } = useChatContext();

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    const handleDocumentClick = (event) => {
        if (isMenuOpen) {
            handleClickOutside(event);
        }
    };

    useEffect(() => {
        const currentUserId = getCurrentUserId();
        const chats = chatData.getChatsForUser(currentUserId);
        setUserChats(chats);
    }, []);

    const handleChatClick = (chatId) => {
        console.log(chatId);
        setCurrentChatId(chatId);
    };
    const handleDeleteChat = (chatId) => {
        const confirmDelete = window.confirm('Вы точно хотите удалить данный чат?');
        if (confirmDelete) {
            chatData.chats = chatData.chats.filter(c => c.id !== chatId);
            setUserChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
            saveChatData(chatData);
        }
    };

    const updateUserChats = () => {
        const currentUserId = getCurrentUserId();
        const chats = chatData.getChatsForUser (currentUserId);
        setUserChats(chats);
    };


    return (
        <div className={`${styles.messagesPage} ${isDarkMode ? styles.darkMode : ''}`} onClick={handleDocumentClick}>
            <Header toggleMenu={toggleMenu} navigateTo={navigateTo}/>
            <main className={styles.messagesMain}>
                <div className={styles.chatsContainer}>
                    <ChatList userChats={userChats} handleChatClick={handleChatClick}
                              handleDeleteChat={handleDeleteChat}/>
                </div>
            </main>
            <Menu
                ref={menuRef}
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
            />
            <NewChatButton updateUserChats={updateUserChats}/>
        </div>
    );
};

export default Messages;