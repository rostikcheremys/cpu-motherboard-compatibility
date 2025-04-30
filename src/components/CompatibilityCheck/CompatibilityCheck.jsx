import "./CompatibilityCheck.css"

import React from "react";
import {SearchSelect} from "../SearchSelect/SearchSelect.jsx";


export const CompatibilityCheck = () => {
    return (
        <div className="сompatibility-сheck">
            <div className="сompatibility-сheck__wrapper">
                <div className="сompatibility-сheck__label-wrapper">
                    <span className="сompatibility-сheck__label">Check compatibility:</span>
                </div>

                <div className="сompatibility-сheck__select-wrapper">
                    <div className="сompatibility-сheck__select">
                        <span className="сompatibility-сheck__hint">Select processor:</span>
                        <SearchSelect/>
                    </div>

                    <div className="сompatibility-сheck__select">
                        <span className="сompatibility-сheck__hint">Select motherboard:</span>
                        <SearchSelect/>
                    </div>
                </div>
            </div>
        </div>
    );
}
