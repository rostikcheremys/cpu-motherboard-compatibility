import './Home.css';

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header/Header.jsx";
import { EditButton } from "../../components/EditButton/EditButton.jsx";
import { FiltersSidebar } from "../../components/FiltersSidebar/FiltersSidebar.jsx";
import { CompatibilityCheck } from "../../components/CompatibilityCheck/CompatibilityCheck.jsx";
import { TableDetails } from "../../components/TableDetails/TableDetails.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";

export const Home = ({ darkMode, setDarkMode }) => {
    const [selectedCpu, setSelectedCpu] = useState(null);
    const [selectedMotherboard, setSelectedMotherboard] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filteredCpus, setFilteredCpus] = useState([]);
    const [filteredMotherboards, setFilteredMotherboards] = useState([]);

    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate("/edit-database");
    }

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
        <div className="home__container">
            <div className="home__content">
                <Header
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                />

                <EditButton
                    isEditOpen={handleEditClick}
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