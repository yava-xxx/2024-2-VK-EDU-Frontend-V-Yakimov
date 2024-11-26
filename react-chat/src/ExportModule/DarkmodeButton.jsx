import React from 'react';

const DarkmodeButton = ({ isDarkMode, toggleDarkMode, className })=>  {
    return (
        <div className={`darkmode-toggle ${className}`}>
            <input
                id="hide-checkbox"
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
            />
            <label className="toggle" htmlFor="hide-checkbox">
                        <span className="toggle-button">
                            <span className="crater crater-1"></span>
                            <span className="crater crater-2"></span>
                            <span className="crater crater-3"></span>
                            <span className="crater crater-4"></span>
                            <span className="crater crater-5"></span>
                            <span className="crater crater-6"></span>
                            <span className="crater crater-7"></span>
                        </span>
                <span className="star star-1"></span>
                <span className="star star-2"></span>
                <span className="star star-3"></span>
                <span className="star star-4"></span>
                <span className="star star-5"></span>
                <span className="star star-6"></span>
                <span className="star star-7"></span>
                <span className="star star-8"></span>
            </label>
        </div>
    )
}

export default DarkmodeButton;