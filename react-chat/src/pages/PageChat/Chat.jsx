import React, { useEffect, useState, useRef } from 'react';
import { chatData } from '../../ExportModule/classes/chat/chats.js';
import { generateUniqueId, getCurrentUserId } from '../../ExportModule/utils/utils.js';
import { useChatContext } from '../../ExportModule/ChatContext';
import { usePageContext } from '../../ExportModule/PageContext';
import { useTheme } from '../../ExportModule/ThemeContext.jsx';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import { saveChatData } from "../../ExportModule/utils/storage.js";
import { scrollToBottom } from './ScrollToBottom.jsx';
import styles from '../../styles/chatPage.module.scss';

const Chat = () => {
    const { navigateTo } = usePageContext();
    const { currentChatId, setCurrentChatId } = useChatContext();
    const userId = getCurrentUserId();
    const [messages, setMessages] = useState([]);
    const [hoveredMessageId, setHoveredMessageId] = useState(null);
    const messagesEndRef = useRef(null);
    const { isDarkMode } = useTheme();

    const loadMessages = () => {
        const chat = chatData.getChat(currentChatId);
        if (chat) {
            const updatedMessages = chat.messages.map(message => {
                if (message.userId !== userId && (message.status === 'check' || message.status === 'sent')) {
                    message.status = 'read';
                }
                return message;
            });
            setMessages(updatedMessages);
        }
    };

    const sendMessage = (messageText) => {
        if (!messageText.trim()) return;

        const messageData = {
            id: generateUniqueId(),
            text: messageText,
            status: 'sent',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            userId: userId,
            chatId: currentChatId,
        };

        chatData.addMessage(currentChatId, messageData);
        loadMessages();
        saveChatData(chatData);
        scrollToBottom(messagesEndRef);
    };

    const deleteMessage = (messageId) => {
        chatData.deleteMessage(currentChatId, messageId);
        saveChatData(chatData);
        loadMessages();
    };

    const handleBackButtonClick = () => {
        setCurrentChatId(null);
        navigateTo('messages');
    };

    useEffect(() => {
        loadMessages();
    }, [currentChatId]);

    return (
        <div className={`${styles.chatContainer} ${isDarkMode ? styles.darkMode : ''}`}>
            <Header currentChatId={currentChatId} onBack={handleBackButtonClick} />
            <Main
                messages={messages}
                userId={userId}
                hoveredMessageId={hoveredMessageId}
                setHoveredMessageId={setHoveredMessageId}
                deleteMessage={deleteMessage}
                messagesEndRef={messagesEndRef}
            />
            <Footer sendMessage={sendMessage} />
        </div>
    );
};

export default Chat;
