import './App.css';
import React, { useState, useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Header } from "./components/Header/Header.jsx";
import { CompatibilityCheck } from "./components/CompatibilityCheck/CompatibilityCheck.jsx";
import { TableDetails } from "./components/TableDetails/TableDetails.jsx";
import {Footer} from "./components/Footer/Footer.jsx";

export default function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [selectedCpu, setSelectedCpu] = useState(null);
    const [selectedMotherboard, setSelectedMotherboard] = useState(null);

    const theme = useMemo(() =>
        createTheme({
            palette: {
                mode: darkMode ? 'dark' : 'light',
            },
        }), [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="app-container">
                <div className="app-container__content">
                    <Header
                        darkMode={darkMode}
                        toggleDarkMode={toggleDarkMode}
                    />
                    <CompatibilityCheck
                        setSelectedCpu={setSelectedCpu}
                        setSelectedMotherboard={setSelectedMotherboard}
                    />
                    <TableDetails
                        selectedCpu={selectedCpu}
                        selectedMotherboard={selectedMotherboard}
                    />
                </div>
                <Footer/>
            </div>
        </ThemeProvider>
    );
}
