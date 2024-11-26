import React from 'react';
import styles from '../../styles/chatnullPage.module.scss'
import { useTheme } from '../../ExportModule/ThemeContext.jsx';

const ChatNull = () => {
    const { isDarkMode } = useTheme();
    return (
    <div className={`${styles.chatNullPage} ${isDarkMode ? styles.darkMode : ''}`}>
        <h2 className={styles.string}>Выберите чат</h2>
    </div>
    );
};

export default ChatNull;
