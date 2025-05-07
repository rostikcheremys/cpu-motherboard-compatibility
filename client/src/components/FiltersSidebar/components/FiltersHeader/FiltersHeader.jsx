import "./FiltersHeader.css"
import "../../FiltersSidebar.css"

import React from "react";

import { Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";

import { FiltersReset } from "../FiltersReset/FiltersReset.jsx";


export const FiltersHeader = ({ handleCloseSidebar, resetFilters }) => {
    return (
        <div className="filters-header">
            <div className="filters-header__title">
                <div className="filters-header__filters-icon">
                    <FilterListIcon className="filters-header__icon"/>
                    <Typography className="filters-sidebar__typography">Filters</Typography>
                </div>
                <div className="filters-header__close-icon" onClick={handleCloseSidebar}>
                    <CloseIcon className="filters-header__icon"/>
                </div>
            </div>

            <FiltersReset resetFilters={resetFilters} />
        </div>
    );
};