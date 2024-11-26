import React, { useState } from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import AssistantIcon from '@mui/icons-material/Assistant';
import '../styles/searchfield.scss';

const SearchField = ({ isDarkMode, isFocused, setIsFocused }) => {
    const [searchInput, setSearchInput] = useState('');

    return (
        <div className={`search-container ${isFocused ? 'focused' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
            <AssistantIcon className="assistant-icon" />
            <input
                type="text"
                className="search-input"
                placeholder="Поиск..."
                value={searchInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <SearchIcon className="search-icon" />
            <AppsIcon className="app-icon" />
        </div>
    );
};

export default SearchField;
