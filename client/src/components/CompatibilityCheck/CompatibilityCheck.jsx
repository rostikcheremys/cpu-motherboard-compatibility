import "./CompatibilityCheck.css";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Select } from "../Select/Select.jsx";
import {FiltersButton} from "../FiltersSidebar/components/FiltersButton/FiltersButton.jsx";

export const CompatibilityCheck = ({ setSelectedCpu, setSelectedMotherboard, filteredCpus, filteredMotherboards, setIsFilterOpen }) => {
    const [cpuOptions, setCpuOptions] = useState([]);
    const [motherboardOptions, setMotherboardOptions] = useState([]);
    const [selectedCpu, setLocalSelectedCpu] = useState(null);
    const [selectedMotherboard, setLocalSelectedMotherboard] = useState(null);
    const [isCompatible, setIsCompatible] = useState(null);

    useEffect(() => {
        if (filteredCpus !== undefined) {
            setCpuOptions(filteredCpus.length > 0 ? filteredCpus : []);
            if (filteredCpus.length === 0 && selectedCpu !== null) {
                setLocalSelectedCpu(null);
                setSelectedCpu(null);
                setIsCompatible(null);
            }
        }
    }, [filteredCpus, selectedCpu, setSelectedCpu]);

    useEffect(() => {
        if (filteredMotherboards !== undefined) {
            setMotherboardOptions(filteredMotherboards.length > 0 ? filteredMotherboards : []);
            if (filteredMotherboards.length === 0 && selectedMotherboard !== null) {
                setLocalSelectedMotherboard(null);
                setSelectedMotherboard(null);
                setIsCompatible(null);
            }
        }
    }, [filteredMotherboards, selectedMotherboard, setSelectedMotherboard]);

    useEffect(() => {
        if (selectedCpu && selectedMotherboard) {
            fetch(`http://localhost:3001/api/motherboards/compatible/${selectedCpu.id}`)
                .then((response) => response.json())
                .then((data) => {
                    const compatible = data.some((mb) => mb.id === selectedMotherboard.id);
                    setIsCompatible(compatible);
                })
                .catch((error) => {
                    console.error('Error checking compatibility:', error);
                    setIsCompatible(false);
                });
        } else {
            setIsCompatible(null);
        }
    }, [selectedCpu, selectedMotherboard]);

    const handleCpuSelect = (cpu) => {
        setLocalSelectedCpu(cpu);
        setSelectedCpu(cpu);
    };

    const handleMotherboardSelect = (motherboard) => {
        setLocalSelectedMotherboard(motherboard);
        setSelectedMotherboard(motherboard);
    };

    return (
        <div className="compatibility-check">
            <div className="compatibility-check__wrapper">
                <div className="compatibility-check__filters-button-wrapper">
                    <div className="compatibility-check__label-wrapper">
                        <h3 className="compatibility-check__label">Check compatibility:</h3>
                        {selectedCpu && selectedMotherboard && (
                            isCompatible ? (
                                <FaCheckCircle className="faCheckCircle"/>
                            ) : (
                                <FaTimesCircle className="faTimesCircle"/>
                            )
                        )}
                    </div>

                    <FiltersButton setIsFilterOpen={setIsFilterOpen}/>
                </div>

                <div className="compatibility-check__select-wrapper">
                    <div className="compatibility-check__select">
                        <h5 className="compatibility-check__hint">Select CPU:</h5>
                        <Select
                            options={cpuOptions}
                            onSelect={handleCpuSelect}
                        />
                    </div>

                    <div className="compatibility-check__select">
                        <h5 className="compatibility-check__hint">Select motherboard:</h5>
                        <Select
                            options={motherboardOptions}
                            onSelect={handleMotherboardSelect}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};