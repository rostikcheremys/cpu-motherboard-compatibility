import "./CompatibilityCheck.css";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Select } from "../Select/Select.jsx";

export const CompatibilityCheck = ({ setSelectedCpu, setSelectedMotherboard, filteredCpus, filteredMotherboards }) => {
    const [cpuOptions, setCpuOptions] = useState([]);
    const [motherboardOptions, setMotherboardOptions] = useState([]);
    const [selectedCpu, setLocalSelectedCpu] = useState(null);
    const [selectedMotherboard, setLocalSelectedMotherboard] = useState(null);
    const [isCompatible, setIsCompatible] = useState(null);

    useEffect(() => {
        if (filteredCpus && filteredCpus.length > 0) {
            setCpuOptions(filteredCpus);
        } else {
            fetch('http://localhost:3001/api/cpus')
                .then((response) => response.json())
                .then((data) => setCpuOptions(data))
                .catch((error) => console.error('Error fetching CPUs:', error));
        }
    }, [filteredCpus]);

    useEffect(() => {
        if (filteredMotherboards && filteredMotherboards.length > 0) {
            setMotherboardOptions(filteredMotherboards);
        } else {
            fetch('http://localhost:3001/api/motherboards')
                .then((response) => response.json())
                .then((data) => setMotherboardOptions(data))
                .catch((error) => console.error('Error fetching motherboards:', error));
        }
    }, [filteredMotherboards]);

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

    useEffect(() => {
        if (selectedCpu && filteredCpus.length > 0) {
            const isCpuStillValid = filteredCpus.some((cpu) => cpu.id === selectedCpu.id);
            if (!isCpuStillValid) {
                setLocalSelectedCpu(null);
                setSelectedCpu(null);
                setIsCompatible(null);
            }
        }
    }, [filteredCpus, selectedCpu, setSelectedCpu]);

    useEffect(() => {
        if (selectedMotherboard && filteredMotherboards.length > 0) {
            const isMotherboardStillValid = filteredMotherboards.some((mb) => mb.id === selectedMotherboard.id);
            if (!isMotherboardStillValid) {
                setLocalSelectedMotherboard(null);
                setSelectedMotherboard(null);
                setIsCompatible(null);
            }
        }
    }, [filteredMotherboards, selectedMotherboard, setSelectedMotherboard]);

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

                <div className="compatibility-check__select-wrapper">
                    <div className="compatibility-check__select">
                        <h5 className="compatibility-check__hint">Select CPU:</h5>
                        <Select
                            options={cpuOptions}
                            onSelect={handleCpuSelect}
                        />
                    </div>

                    <div className="compatibility-check__select">
                        <h5 className="compatibility-check__hint">Select motherboard</h5>
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


