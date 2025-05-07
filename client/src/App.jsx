import './App.css';
import React, { useState, useMemo } from "react";
import {ThemeProvider, createTheme, CssBaseline, Button} from '@mui/material';
import { Header } from "./components/Header/Header.jsx";
import { CompatibilityCheck } from "./components/CompatibilityCheck/CompatibilityCheck.jsx";
import { TableDetails } from "./components/TableDetails/TableDetails.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { FiltersSidebar } from "./components/FiltersSidebar/FiltersSidebar.jsx";
import {FilterButton} from "./components/FiltersSidebar/components/FilterButton/FilterButton.jsx";

export default function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [selectedCpu, setSelectedCpu] = useState(null);
    const [selectedMotherboard, setSelectedMotherboard] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filteredCpus, setFilteredCpus] = useState([]);
    const [filteredMotherboards, setFilteredMotherboards] = useState([]);

    const theme = useMemo(() =>
        createTheme({
            palette: {
                mode: darkMode ? 'dark' : 'light',
            },
        }), [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    const handleFilterChange = (filteredData) => {
        setFilteredCpus(filteredData|| []);
    };

    const handleMotherboardFilterChange = (filteredData) => {
        setFilteredMotherboards(filteredData || []);
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

                    <FilterButton setIsFilterOpen={setIsFilterOpen} />

                    <FiltersSidebar
                        open={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                        onFilterChange={handleFilterChange}
                        onMotherboardFilterChange={handleMotherboardFilterChange}
                    />

                    <CompatibilityCheck
                        setSelectedCpu={setSelectedCpu}
                        setSelectedMotherboard={setSelectedMotherboard}
                        filteredCpus={filteredCpus}
                        filteredMotherboards={filteredMotherboards}
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