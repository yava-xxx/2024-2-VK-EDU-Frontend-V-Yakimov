import React from 'react';
import styles from '../../styles/entryPage.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footerEntry}>
                <span className={styles.footerTitleEntry}>
                    Учебный проект VK Frontend<br/>
                    2024 Все права защищены.&copy;
                </span>
        </footer>
    )
}

export default Footer;