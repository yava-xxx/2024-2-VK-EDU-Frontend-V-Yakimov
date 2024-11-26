import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import Background from './Background.jsx';
import '../../styles/style.scss';
import '../../styles/darkmode.scss';

const Entry = () => {

    return (
        <>
            <Background />
            <Header />
            <Main />
            <Footer />
        </>
    );
};

export default Entry;
