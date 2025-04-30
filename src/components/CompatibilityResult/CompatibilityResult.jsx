import "./CompatibilityResult.css"

import React from "react";

import {ResultTable} from "../ResultTable/ResultTable.jsx";


export const CompatibilityResult = () => {
    return (
        <div className="сompatibility-result">
            <div className="сompatibility-result__wrapper">
                <div className="сompatibility-result__label-wrapper">
                    <span className="сompatibility-result__label">Result:</span>
                </div>

                <div className="сompatibility-result__result-table-wrapper">
                    <ResultTable />
                </div>
            </div>
        </div>
    );
}
