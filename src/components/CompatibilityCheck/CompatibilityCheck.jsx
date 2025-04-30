import React, { useState, useEffect } from "react";
import { SearchSelect } from "../SearchSelect/SearchSelect.jsx";
import "./CompatibilityCheck.css";

export const CompatibilityCheck = () => {
    const [cpuOptions, setCpuOptions] = useState([]);
    const [motherboardOptions, setMotherboardOptions] = useState([]);
    const [selectedCpu, setSelectedCpu] = useState(null);
    const [selectedMotherboard, setSelectedMotherboard] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/api/cpu')
            .then((response) => response.json())
            .then((data) => setCpuOptions(data))
            .catch((error) => console.error('Error fetching CPUs:', error));

        fetch('http://localhost:3001/api/motherboard')
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

    const checkCompatibility = () => {
        if (selectedCpu && selectedMotherboard) {
            console.log(`Перевірка сумісності між ${selectedCpu.name} та ${selectedMotherboard.name}`);
        } else {
            console.log('Будь ласка, виберіть процесор та материнську плату для перевірки сумісності.');
        }
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

                <button onClick={checkCompatibility}>Check Compatibility</button>
            </div>
        </div>
    );
};
