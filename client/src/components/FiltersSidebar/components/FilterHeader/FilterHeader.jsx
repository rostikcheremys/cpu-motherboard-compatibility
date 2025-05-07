import React from "react";

import { Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";


export const FilterHeader = ({ handleCloseSidebar }) => {
    return (
        <div className="filters-sidebar__title" role="heading" aria-level="1">
            <div className="filters-sidebar__filters-icon">
                <FilterListIcon className="filters-sidebar__icon" />
                <Typography className="filters-sidebar__typography">Filters</Typography>
            </div>
            <div className="filters-sidebar__close-icon" onClick={handleCloseSidebar} aria-label="Close sidebar">
                <CloseIcon className="filters-sidebar__icon" />
            </div>
        </div>
    );
};