import React, { useRef, useState } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicNoneRoundedIcon from '@mui/icons-material/MicNoneRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import styles from '../../styles/chatPage.module.scss';

const Footer = ({ sendMessage }) => {
    const [messageText, setMessageText] = useState('');
    const [footerHeight, setFooterHeight] = useState(45);
    const textareaRef = useRef(null);

    const handleChange = (event) => {
        setMessageText(event.target.value);
        handleResize();
    };

    const handleResize = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const newHeight = Math.max(textareaRef.current.scrollHeight, 40);
            textareaRef.current.style.height = `${newHeight}px`;
            if (newHeight <= 150) {
                setFooterHeight(newHeight + 5);
            }
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage(messageText);
            setMessageText('');
            setFooterHeight(45);
            if (textareaRef.current) {
                textareaRef.current.style.height = '40px';
            }
        }
    };

    return (
        <footer className={styles.chatFooter} style={{ height: footerHeight }}>
            <form className={styles.messageForm} onSubmit={(e) => { e.preventDefault(); sendMessage(messageText); }}>
                <button type="button" className={styles.buttonAttach}>
                    <AttachFileIcon className={styles.attachIco} />
                </button>
                <textarea
                    ref={textareaRef}
                    className={styles.inputContain}
                    value={messageText}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Введите сообщение..."
                    rows={1}
                    style={{ lineHeight: '1' }}
                />
                <button type="submit" className={styles.buttonSubmit}>
                    <SendRoundedIcon />
                </button>
                <button type="button" className={styles.buttonVoice}>
                    <MicNoneRoundedIcon />
                </button>
                <button type="button" className={styles.buttonEmoji}>
                    <SentimentSatisfiedRoundedIcon />
                </button>
            </form>
        </footer>
    );
};

export default Footer;
