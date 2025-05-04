import "./Header.css";

import {ThemeSwitch} from "../ThemeSwitch/ThemeSwitch.jsx";

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
