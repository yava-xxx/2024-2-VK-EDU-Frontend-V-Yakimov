import React, { useRef, useState, useEffect } from 'react';
import { handleFormSubmit } from './formValidation.jsx';
import styles from '../../styles/entryPage.module.scss';
import { usePageContext } from '../../ExportModule/PageContext.jsx';
import {useTheme} from '../../ExportModule/ThemeContext.jsx';

const Main = () => {
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const { navigateTo } = usePageContext();
    const { isDarkMode } = useTheme();

    const registerNicknameRef = useRef();
    const registerPasswordRef = useRef();
    const registerFirstNameRef = useRef();
    const registerLastNameRef = useRef();
    const registerPatronymicRef = useRef();

    const loginNicknameRef = useRef();
    const loginPasswordRef = useRef();

    const handleRegister = (e) => {
        e.preventDefault();
        const registerData = {
            nickname: registerNicknameRef.current.value,
            password: registerPasswordRef.current.value,
            firstName: registerFirstNameRef.current.value,
            lastName: registerLastNameRef.current.value,
            patronymic: registerPatronymicRef.current.value,
        };
        handleFormSubmit('register', registerData, setMessage, navigateTo);
        resetForm();
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const loginData = {
            nickname: loginNicknameRef.current.value,
            password: loginPasswordRef.current.value,
        };
        handleFormSubmit('login', loginData, setMessage, navigateTo);
        resetForm();
    };

    const resetForm = () => {
        registerNicknameRef.current.value = '';
        registerPasswordRef.current.value = '';
        registerFirstNameRef.current.value = '';
        registerLastNameRef.current.value = '';
        registerPatronymicRef.current.value = '';
        loginNicknameRef.current.value = '';
        loginPasswordRef.current.value = '';
    };

    useEffect(() => {
        if (message) {
            setShowMessage(true);
            const timer = setTimeout(() => {
                setShowMessage(false);
                setMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <main className={`${styles.mainEntry} ${isDarkMode ? styles['dark-mode'] : ''}`}>
            <input aria-hidden="true" id="chk" className={styles.chk} type="checkbox"/>
            <div className={styles.signup}>
                <form onSubmit={handleRegister}>
                    <label aria-hidden="true" htmlFor="chk" className={styles.registrationlabelEntry}>Регистрация</label>
                    <input ref={registerNicknameRef} name="nickname" placeholder="Никнейм" required type="text"
                           className={styles.dataEntry}/>
                    <input ref={registerPasswordRef} name="password" placeholder="Пароль" required type="password"
                           className={styles.dataEntry}/>
                    <input ref={registerFirstNameRef} name="firstName" placeholder="Имя" required type="text"
                           className={styles.dataEntry}/>
                    <input ref={registerLastNameRef} name="lastName" placeholder="Фамилия" required type="text"
                           className={styles.dataEntry}/>
                    <input ref={registerPatronymicRef} name="patronymic" placeholder="Отчество" required type="text"
                           className={styles.dataEntry}/>
                    <button>Зарегистрироваться</button>
                </form>
            </div>
            <div className={styles.login}>
                <form onSubmit={handleLogin}>
                    <label aria-hidden="true" htmlFor="chk" className={styles.loginlabelEntry}>Войти</label>
                    <input ref={loginNicknameRef} name="nickname" placeholder="Никнейм" required type="text"
                           className={styles.dataEntry}/>
                    <input ref={loginPasswordRef} name="password" placeholder="Пароль" required type="password"
                           className={styles.dataEntry}/>
                    <button>Войти</button>
                </form>
            </div>
            {message && (
                <p className={`${message.includes("успешно") ? styles.message : styles.error} ${showMessage ? styles.show : ''}`}>
                    {message}
                </p>
            )}
        </main>
    );
};

export default Main;
