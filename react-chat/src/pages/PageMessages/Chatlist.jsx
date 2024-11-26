import { userData } from '../../ExportModule/classes/user/users.js';
import {getChatName, getRelativeDate, getCurrentUserId, getChatTitle, getChatAvatar} from "../../ExportModule/utils/utils.js";
import React from 'react';
import styles from '../../styles/messagesPage.module.scss';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllSharpIcon from '@mui/icons-material/DoneAllSharp';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';

const ChatList = ({ userChats, handleChatClick, handleDeleteChat }) => {
    return (
        <ul className={styles.chats}>
            {userChats.length > 0 ? userChats.map(chat => {
                const lastMessage = chat.messages[chat.messages.length - 1] || {};
                const lastMessageText = lastMessage.text || 'Нет сообщений';
                const relativeDate = getRelativeDate(lastMessage.date);
                const chatAvatar = getChatAvatar(chat);
                const chatTitle = getChatTitle(chat);

                const isSentByCurrentUser  = lastMessage.sentOrReceived === 'sent';
                const isMessageRead = lastMessage.status === 'read';
                const MessageIcon = isMessageRead ? DoneAllSharpIcon : CheckSharpIcon;
                const messageStatusClass = isSentByCurrentUser  ? styles.messageStatusSent : styles.messageStatusReceived;

                return (
                    <li key={chat.id} className={styles.chat} onClick={() => handleChatClick(chat.id)}>
                        <div className={styles.chatInfo}>
                            <div className={styles.chatName}>{chatTitle}</div>
                            <div className={styles.chatDetails}>
                                <img src={chatAvatar} alt="Avatar" className={styles.chatAvatar}/>
                                <div className={styles.chatLastMessage}>{lastMessageText}</div>
                            </div>
                        </div>
                        <div className={styles.chatTimestamp}>
                            <div className={styles.time}>{relativeDate}</div>
                            <IconButton className={styles.deleteButton} onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteChat(chat.id);
                            }}>
                                <DeleteIcon className={styles.deleteButtonIco} />
                            </IconButton>
                            <MessageIcon className={`${messageStatusClass} ${styles.messageStatusIcon}`} style={{ fontSize: '16px', marginLeft: '5px' }} />
                        </div>
                    </li>
                );
            }) : (
                <p>У вас нет чатов</p>
            )}
        </ul>
    );
};
export default ChatList;