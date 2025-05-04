import React, { useEffect, useState } from "react";
import { Select } from "../Select/Select.jsx";
import "./CompatibilityCheck.css";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export const CompatibilityCheck = ({ setSelectedCpu, setSelectedMotherboard }) => {
    const [cpuOptions, setCpuOptions] = useState([]);
    const [motherboardOptions, setMotherboardOptions] = useState([]);
    const [selectedCpu, setLocalSelectedCpu] = useState(null);
    const [selectedMotherboard, setLocalSelectedMotherboard] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isCompatible, setIsCompatible] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/api/cpus')
            .then((response) => response.json())
            .then((data) => setCpuOptions(data))
            .catch((error) => console.error('Error fetching CPUs:', error));
    }, []);

    useEffect(() => {
        if (selectedCpu) {
            fetch(`http://localhost:3001/api/motherboards/compatible/${selectedCpu.id}`)
                .then((response) => response.json())
                .then((data) => setMotherboardOptions(data))
                .catch((error) => console.error('Error fetching compatible motherboards:', error));
        } else {
            setMotherboardOptions([]);
            setIsHovered(false);
        }
    }, [selectedCpu]);

    // Логіка перевірки сумісності
    useEffect(() => {
        if (selectedCpu && selectedMotherboard) {
            fetch(`http://localhost:3001/api/motherboards/compatible/${selectedCpu.id}`)
                .then((response) => response.json())
                .then((data) => {
                    const compatible = data.some((mb) => mb.id === selectedMotherboard.id);
                    setIsCompatible(compatible);
                })
                .catch((error) => console.error('Error checking compatibility:', error));
        } else {
            setIsCompatible(false);
        }
    }, [selectedCpu, selectedMotherboard]);

    const handleCpuSelect = (cpu) => {
        setLocalSelectedCpu(cpu);
        setSelectedCpu(cpu);

        if (!cpu) {
            setSelectedMotherboard(null);
            setLocalSelectedMotherboard(null);
        }
    };

    const handleMotherboardSelect = (motherboard) => {
        setLocalSelectedMotherboard(motherboard);
        setSelectedMotherboard(motherboard);
    };

    return (
        <div className="compatibility-check">
            <div className="compatibility-check__wrapper">
                <div className="compatibility-check__label-wrapper">
                    <h3 className="compatibility-check__label">Check compatibility:</h3>
                    {selectedCpu && selectedMotherboard && (
                        isCompatible ? (
                            <FaCheckCircle className="faCheckCircle" />
                        ) : (
                            <FaTimesCircle className="faTimesCircle" />
                        )
                    )}
                </div>

                <div className="compatibility-check__select-wrapper">
                    <div className="compatibility-check__select">
                        <h5 className="compatibility-check__hint">Select CPU:</h5>
                        <Select
                            options={cpuOptions}
                            onSelect={handleCpuSelect}
                        />
                    </div>

                    <div
                        className="compatibility-check__select"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <h5 className="compatibility-check__hint">
                            {selectedCpu === null && isHovered
                                ? "Choose a CPU before selecting a motherboard!"
                                : "Select motherboard:"}
                        </h5>
                        <Select
                            options={motherboardOptions}
                            onSelect={handleMotherboardSelect}
                            disabled={selectedCpu === null}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};