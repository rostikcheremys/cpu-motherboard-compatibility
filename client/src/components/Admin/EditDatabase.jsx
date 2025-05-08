import '../Home/Home.css';

import { Header } from "../Header/Header.jsx";
import { Footer } from "../Footer/Footer.jsx";

export const EditDatabase = ({ darkMode, setDarkMode }) => {

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    return (
        <div className="home-container">
            <div className="home-container__content">
                <Header
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                />
            </div>
            <Footer/>
        </div>
    );
}