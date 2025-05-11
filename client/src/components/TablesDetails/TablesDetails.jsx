import "./TablesDetails.css";

import { useEffect, useState } from "react";

import { CPUTable } from "./components/Tables/CPUTable.jsx";
import { MotherboardTable } from "./components/Tables/MotherboardTable.jsx";

export const TablesDetails = ({ selectedCpu, selectedMotherboard }) => {
    const [cpuData, setCpuData] = useState(null);
    const [motherboardData, setMotherboardData] = useState(null);

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

    return (
        <div className="table-details">
            {cpuData && (
                <div className="table-details__tables">
                    <h3 className="table-details__label">
                        CPU: <span className="table-details__label-value">{cpuData.name}</span>
                    </h3>
                    <CPUTable cpuData={cpuData}/>
                </div>
            )}
            {motherboardData && (
                <div className="table-details__tables">
                    <h3 className="table-details__label">
                        Motherboard: <span className="table-details__label-value">{motherboardData.name}</span>
                    </h3>
                    <MotherboardTable motherboardData={motherboardData}/>
                </div>
            )}
        </div>
    );
};