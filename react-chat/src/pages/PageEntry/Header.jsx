import React, {useState} from 'react';
import Logo from "../../ExportModule/Logo.jsx";
import DarkmodeButton from "../../ExportModule/DarkmodeButton.jsx";
import SearchField from "../../ExportModule/SearchField.jsx";
import styles from '../../styles/entryPage.module.scss';
import {useTheme} from '../../ExportModule/ThemeContext.jsx';

const Header = () => {
    const [isFocused, setIsFocused] = useState(false);
    const { isDarkMode, toggleDarkMode } = useTheme();
    return (
        <header className={styles.headerEntry}>
            <div className={styles.logoEntry}>
                <Logo isDarkMode={isDarkMode}/>
            </div>
            <div className={styles.darkmodeEntry}>
                <DarkmodeButton isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
            </div>
            <div
                className={`${styles.searchEntry} ${isFocused ? styles.focused : ''}`}>
                <SearchField isDarkMode={isDarkMode} isFocused={isFocused} setIsFocused={setIsFocused}/>
            </div>
        </header>
    )
}

export default Header;
