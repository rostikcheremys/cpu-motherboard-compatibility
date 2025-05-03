import React, { useEffect, useState } from "react";
import { SearchSelect } from "../SearchSelect/SearchSelect.jsx";
import "./CompatibilityCheck.css";

export const CompatibilityCheck = ({ setSelectedCpu, setSelectedMotherboard }) => {
    const [cpuOptions, setCpuOptions] = useState([]);
    const [motherboardOptions, setMotherboardOptions] = useState([]);
    const [selectedCpu, setLocalSelectedCpu] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

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
        }
    }, [selectedCpu]);

    const handleCpuSelect = (cpu) => {
        setLocalSelectedCpu(cpu);
        setSelectedCpu(cpu);

        if (!cpu) setSelectedMotherboard(null);

        console.log('Вибрано процесор:', cpu);
    };

    const handleMotherboardSelect = (motherboard) => {
        setSelectedMotherboard(motherboard);
        console.log('Вибрана материнська плата:', motherboard);
    };

    return (
        <div className="сompatibility-сheck">
            <div className="сompatibility-сheck__wrapper">
                <div className="сompatibility-сheck__label-wrapper">
                    <span className="сompatibility-сheck__label">Check compatibility:</span>
                </div>

                <div className="сompatibility-сheck__select-wrapper">
                    <div className="сompatibility-сheck__select">
                        <span className="сompatibility-сheck__hint">Select processor:</span>
                        <SearchSelect
                            options={cpuOptions}
                            onSelect={handleCpuSelect}
                        />
                    </div>

                    <div className="сompatibility-сheck__select" onMouseEnter={() => setIsHovered(true)}
                         onMouseLeave={() => setIsHovered(false)}>
                        <span className="сompatibility-сheck__hint">
                            {selectedCpu === null && isHovered
                                ? "Choose a processor before selecting a motherboard!"
                                : "Select motherboard:"}
                        </span>
                        <SearchSelect
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