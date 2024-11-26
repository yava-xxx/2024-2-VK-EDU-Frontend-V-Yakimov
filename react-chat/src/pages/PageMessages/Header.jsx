import React from 'react';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../../styles/messagesPage.module.scss';

const Header = ({ toggleMenu, navigateTo }) => {
    const prevPage =() =>{
        navigateTo('entry');
    }

    return (
        <header className={styles.messagesPage_header}>
            <button className={styles.menuButton} onClick={toggleMenu}>
                <MenuSharpIcon />
            </button>
            <button className={styles.backbutton} onClick={prevPage}>
                <ArrowBackSharpIcon />
            </button>
            <div className={`${styles.searchField}`}>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Поиск"
                />
                <button className={styles.findButton}>
                    <SearchIcon className={styles.searchIcon} />
                </button>
            </div>
        </header>
    );
};

export default Header;
