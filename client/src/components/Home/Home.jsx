import './Home.css';

import { useState } from "react";

import { Header } from "../Header/Header.jsx";
import { FiltersSidebar } from "../FiltersSidebar/FiltersSidebar.jsx";
import { CompatibilityCheck } from "../CompatibilityCheck/CompatibilityCheck.jsx";
import { TableDetails } from "../TableDetails/TableDetails.jsx";
import { Footer } from "../Footer/Footer.jsx";

export const Home = ({ darkMode, setDarkMode }) => {
    const [selectedCpu, setSelectedCpu] = useState(null);
    const [selectedMotherboard, setSelectedMotherboard] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filteredCpus, setFilteredCpus] = useState([]);
    const [filteredMotherboards, setFilteredMotherboards] = useState([]);

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    const handleFilterChange = (filteredData) => {
        setFilteredCpus(filteredData || []);
    };

    const handleMotherboardFilterChange = (filteredData) => {
        setFilteredMotherboards(filteredData || []);
    };

    return (
        <div className="home-container">
            <div className="home-container__content">
                <Header
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                />
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
                    setIsFilterOpen={setIsFilterOpen}
                />
                <TableDetails
                    selectedCpu={selectedCpu}
                    selectedMotherboard={selectedMotherboard}
                />
            </div>
            <Footer/>
        </div>
    );
}