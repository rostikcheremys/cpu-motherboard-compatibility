import React, { useEffect, useState } from "react";
import { SearchSelect } from "../SearchSelect/SearchSelect.jsx";
import "./CompatibilityCheck.css";

export const CompatibilityCheck = ({ setSelectedCpu, setSelectedMotherboard }) => {
    const [cpuOptions, setCpuOptions] = useState([]);
    const [motherboardOptions, setMotherboardOptions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/cpus')
            .then((response) => response.json())
            .then((data) => setCpuOptions(data))
            .catch((error) => console.error('Error fetching CPUs:', error));

        fetch('http://localhost:3001/api/motherboards')
            .then((response) => response.json())
            .then((data) => setMotherboardOptions(data))
            .catch((error) => console.error('Error fetching Motherboards:', error));
    }, []);

    const handleCpuSelect = (cpu) => {
        setSelectedCpu(cpu);
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

                    <div className="сompatibility-сheck__select">
                        <span className="сompatibility-сheck__hint">Select motherboard:</span>
                        <SearchSelect
                            options={motherboardOptions}
                            onSelect={handleMotherboardSelect}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
