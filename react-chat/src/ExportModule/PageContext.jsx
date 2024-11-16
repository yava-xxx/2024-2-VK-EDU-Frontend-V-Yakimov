import React, { createContext, useContext, useState } from 'react';

const PageContext = createContext();

export const PageProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState('entry');

    const navigateTo = (page) => {
        setCurrentPage(page);
    };

    return (
        <PageContext.Provider value={{ currentPage, navigateTo }}>
            {children}
        </PageContext.Provider>
    );
};

export const usePageContext = () => {
    return useContext(PageContext);
};