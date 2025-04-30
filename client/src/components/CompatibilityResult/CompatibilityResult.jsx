import "./CompatibilityResult.css";
import React, { useEffect, useState } from "react";
import { ResultTable } from "../ResultTable/ResultTable.jsx";

export const CompatibilityResult = ({ selectedCpu, selectedMotherboard }) => {
    const [compatibilityData, setCompatibilityData] = useState(null);

    useEffect(() => {
        if (selectedCpu && selectedMotherboard) {
            fetch(`http://localhost:3001/api/compatibility?cpu_id=${selectedCpu.id}&motherboard_id=${selectedMotherboard.id}`)
                .then((response) => response.json())
                .then((data) => {
                if (data.length > 0) {
                    setCompatibilityData(data[0]);
                } else {
                    setCompatibilityData(null);
                }
            })
                .catch((error) => console.error('Error fetching compatibility data:', error));

        }
    }, [selectedCpu, selectedMotherboard]);

    return (
        <div className="сompatibility-result">
            <div className="сompatibility-result__wrapper">
                <div className="сompatibility-result__label-wrapper">
                    <span className="сompatibility-result__label">Result:</span>
                </div>

                <div className="сompatibility-result__result-table-wrapper">
                    <ResultTable compatibilityData={compatibilityData} />
                </div>
            </div>
        </div>
    );
};
