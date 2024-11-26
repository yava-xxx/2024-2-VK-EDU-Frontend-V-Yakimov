import React, { useEffect, useState } from 'react';
import Entry from "./pages/PageEntry/Entry.jsx";
import Messages from "./pages/PageMessages/Messages.jsx";
import Chat from "./pages/PageChat/Chat.jsx";
import ChatNull from "./pages/PageChat/ChatNull.jsx";
import { PageProvider, usePageContext } from './ExportModule/PageContext.jsx';
import { ThemeProvider } from './ExportModule/ThemeContext.jsx';
import { ChatProvider, useChatContext } from './ExportModule/ChatContext';

const App = () => {
    return (
        <ThemeProvider>
            <PageProvider>
                <ChatProvider>
                    <MainComponent />
                </ChatProvider>
            </PageProvider>
        </ThemeProvider>
    );
};

const MainComponent = () => {
    const { currentPage } = usePageContext();
    const { currentChatId } = useChatContext();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 700);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const renderPage = () => {
        if (currentPage === 'entry') {
            return <Entry />;
        }

        if (currentPage === 'messages') {
            if (isMobile) {
                return currentChatId ? <Chat /> : <Messages />;
            } else {
                return (
                    <div style={{ display: 'flex', height: '100vh' }}>
                        <div style={{ flex: 1 }}>
                            <Messages />
                        </div>
                        <div style={{ flex: 1 }}>
                            {currentChatId ? <Chat /> : <ChatNull />}
                        </div>
                    </div>
                );
            }
        }

        if (currentPage === 'chat') {
            return currentChatId ? <Chat /> : <ChatNull />;
        }

        return <Entry />;
    };

    return (
        <>
            {renderPage()}
        </>
    );
};

export default App;
