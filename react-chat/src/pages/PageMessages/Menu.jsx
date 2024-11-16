import React, {useEffect, useRef} from 'react';
import DarkmodeButton from "../../ExportModule/DarkmodeButton.jsx";
import Logo from "../../ExportModule/Logo.jsx";
import {userData} from "../../ExportModule/classes/user/users.js";
import styles from '../../styles/messagesPage.module.scss';
import {useTheme} from "../../ExportModule/ThemeContext.jsx";
import {getCurrentUserId} from "../../ExportModule/utils/utils.js";

const Menu = React.forwardRef(({ isMenuOpen, toggleMenu}, ref) => {
    const currentUserId = getCurrentUserId();
    const currentUser = userData.getUser(currentUserId);
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <div ref={ref} className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : styles.menuClosed}`}>
            {currentUser && (
                <div className={styles.userInfo}>
                    <img src={currentUser.avatar} alt="Avatar" className={styles.avatar}/>
                    <div className={styles.userDetails}>
                        <span
                            className={styles.fullName}>{`${currentUser.lastName} ${currentUser.firstName} ${currentUser.patronymic}`}</span>
                        <span className={styles.username}>@{currentUser.nickname}</span>
                    </div>
                </div>
            )}
            <ul className={styles.menuList}>
                <li>Настройки</li>
                <li>Лента</li>
                <li>Группы</li>
            </ul>
            <div className={styles.darkmodeMessages}>
                <DarkmodeButton isDarkMode={isDarkMode}
                                toggleDarkMode={toggleDarkMode}/>
            </div>
            <footer className={styles.footerMessages}>
                <div className={styles.logoMessages}>
                    <Logo isDarkMode={isDarkMode}/>
                </div>
                <div className={styles.footerTextMessages}>
                    Учебный проект VK Frontend<br/>
                    2024 Все права защищены.&copy;
                </div>
            </footer>
        </div>
    );
});

export default Menu;
