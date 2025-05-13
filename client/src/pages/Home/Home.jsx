import './Home.css';

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header/Header.jsx";
import { EditDialog } from  "../../components/Dialog/EditDialog.jsx"
import { EditButton } from "../../components/Buttons/EditButton/EditButton.jsx";
import { FiltersSidebar } from "../../components/FiltersSidebar/FiltersSidebar.jsx";
import { CompatibilityCheck } from "../../components/CompatibilityCheck/CompatibilityCheck.jsx";
import { TablesDetails } from "../../components/TablesDetails/TablesDetails.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";

export const Home = ({ darkMode, setDarkMode }) => {
    const [selectedCpu, setSelectedCpu] = useState(null);
    const [selectedMotherboard, setSelectedMotherboard] = useState(null);
    const [filteredCpus, setFilteredCpus] = useState([]);
    const [filteredMotherboards, setFilteredMotherboards] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const navigate = useNavigate();

    const handleEditClick = () => {
        setIsEditDialogOpen(true);
    };

    const handleEditConfirm = () => {
        setIsEditDialogOpen(false);
        navigate("/edit-database");
    };

    const handleEditCancel = () => {
        setIsEditDialogOpen(false);
    };

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

                <TablesDetails
                    selectedCpu={selectedCpu}
                    selectedMotherboard={selectedMotherboard}
                />

                <EditDialog
                    open={isEditDialogOpen}
                    onCancel={handleEditCancel}
                    onConfirm={handleEditConfirm}
                    title="Confirm Edit"
                    description="All current selections and filters will be reset when proceeding to edit the database. Are you sure you want to continue?"
                    confirmText="Yes"
                    cancelText="Cancel"
                />
            </div>
            <Footer/>
        </div>
    );
}