import "./CompatibilityResult.css";
import React, { useEffect, useState } from "react";
import { CPUTable } from "../Table/CPUTable.jsx";
import { MBTable } from "../Table/MBTable.jsx";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';


export const CompatibilityResult = ({ selectedCpu, selectedMotherboard }) => {
    const [cpuData, setCpuData] = useState(null);
    const [motherboardData, setMotherboardData] = useState(null);
    const [isCompatible, setIsCompatible] = useState(false);

    useEffect(() => {
        if (selectedCpu) {
            fetch(`http://localhost:3001/api/cpu/${selectedCpu.id}`)
                .then((response) => response.json())
                .then((data) => setCpuData(data))
                .catch((error) => console.error('Error fetching CPU data:', error));
        } else {
            setCpuData(null);
        }
    }, [selectedCpu]);

    useEffect(() => {
        if (selectedMotherboard) {
            fetch(`http://localhost:3001/api/motherboard/${selectedMotherboard.id}`)
                .then((response) => response.json())
                .then((data) => setMotherboardData(data))
                .catch((error) => console.error('Error fetching motherboard data:', error));
        } else {
            setMotherboardData(null);
        }
    }, [selectedMotherboard]);

    useEffect(() => {
        if (cpuData && motherboardData) {
            fetch(`http://localhost:3001/api/motherboards/compatible/${cpuData.id}`)
                .then((response) => response.json())
                .then((data) => {
                    const compatible = data.some((mb) => mb.id === motherboardData.id);
                    setIsCompatible(compatible);
                })
                .catch((error) => console.error('Error checking compatibility:', error));
        } else {
            setIsCompatible(false);
        }
    }, [cpuData, motherboardData]);

    return (
        <div className="сompatibility-result">
            <div className="сompatibility-result__wrapper">
                <div className="сompatibility-result__label-wrapper">
                    <div className="сompatibility-result__status">
                        <span className="сompatibility-сheck__label">Compatibility:</span>
                        {cpuData && motherboardData && (
                            <>
                                {isCompatible ? (
                                    <FaCheckCircle className="faCheckCircle" />
                                ) : (
                                    <FaTimesCircle className="faTimesCircle" />
                                )}
                            </>
                        )}
                    </div>
                </div>

                <div className="сompatibility-result__result-table-wrapper">

                    {cpuData && (
                        <div>
                            <h3>Processor Details</h3>
                            <CPUTable cpuData={cpuData} />
                        </div>
                    )}
                    {motherboardData && (
                        <div>
                            <h3>Motherboard Details</h3>
                            <MBTable motherboardData={motherboardData} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};