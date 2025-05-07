import "./FilterButton.css"

import { Button } from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";

export const FilterButton = ({ setIsFilterOpen }) => {
    return(
        <div className="filters-button">
            <Button
                className="filters-button__button"
                variant="contained"
                onClick={() => setIsFilterOpen(true)}
            >
                <div className="filters-button__content">
                    <FilterListIcon className="filters-button__icon" />
                </div>
            </Button>
        </div>
    );
}