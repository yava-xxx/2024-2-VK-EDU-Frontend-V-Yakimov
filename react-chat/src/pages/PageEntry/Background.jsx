import React from 'react';
import styles from '../../styles/background.module.scss';
import { useTheme } from '../../ExportModule/ThemeContext.jsx';

const Background = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className={isDarkMode ? styles.backgroundDark : styles.backgroundLight}>
            <div className={`${styles.light} ${styles.x1}`}></div>
            <div className={`${styles.light} ${styles.x2}`}></div>
            <div className={`${styles.light} ${styles.x3}`}></div>
            <div className={`${styles.light} ${styles.x4}`}></div>
            <div className={`${styles.light} ${styles.x5}`}></div>
            <div className={`${styles.light} ${styles.x6}`}></div>
            <div className={`${styles.light} ${styles.x7}`}></div>
            <div className={`${styles.light} ${styles.x8}`}></div>
            <div className={`${styles.light} ${styles.x9}`}></div>
        </div>
    );
}

export default Background;

