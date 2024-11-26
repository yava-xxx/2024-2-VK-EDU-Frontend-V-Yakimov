import React from 'react';
import { userData } from '../../ExportModule/classes/user/users.js';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import DoneAllSharpIcon from '@mui/icons-material/DoneAllSharp';
import styles from '../../styles/chatPage.module.scss';

const CreateMessage = ({ messages, userId, hoveredMessageId, setHoveredMessageId, deleteMessage }) => {
    const createMessageElement = (message, index) => {
        const isSentByCurrentUser  = userId === message.userId;
        const MessageIcon = message.status === 'read' ? <DoneAllSharpIcon /> : <CheckSharpIcon />;
        const isLastReceived = !isSentByCurrentUser  && (index === messages.length - 1 || messages[index + 1].userId === userId);

        return (
            <li
                key={message.id}
                className={`${styles.message} ${isSentByCurrentUser  ? styles.sent : styles.received}`}
                onMouseEnter={() => setHoveredMessageId(message.id)}
                onMouseLeave={() => setHoveredMessageId(null)}
            >
                {isLastReceived && (
                    <img src={userData.getUser (message.userId).avatar} alt="Avatar" className={styles.avatar} />
                )}
                <div className={styles.messageContent} style={{ marginLeft: isLastReceived ? '0' : '50px' }}>
                    <span className={styles.messageText}
                          dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br>') }} />
                    {hoveredMessageId === message.id && (
                        <button
                            onClick={() => deleteMessage(message.id)}
                            className={`${styles.deleteButton} ${hoveredMessageId === message.id ? styles.show : ''} ${isLastReceived ? styles.receivedLast : ''}`}
                        >
                            <DeleteForeverIcon />
                        </button>
                    )}
                </div>
                <span className={styles.timestamp}>{message.timestamp}</span>
                <span className={styles.messageStatusIcon}>{MessageIcon}</span>
            </li>
        );
    };

    return (
        <>
            {messages.map((message, index) => createMessageElement(message, index))}
        </>
    );
};

export default CreateMessage;
