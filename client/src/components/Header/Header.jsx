import "./Header.css";

import React from "react";

import {ThemeSwitch} from "./ThemeSwitch.jsx";

export const Header = ({ darkMode, toggleDarkMode }) => {
    return (
        <header className="header">
            <div className="header__label-wrapper">
                <span className="header__label">coreplank</span>
            </div>

            <div className="header__theme-switcher">
                <ThemeSwitch checked={darkMode} onChange={toggleDarkMode}/>
            </div>
        </header>
    );
}
