import "./FiltersReset.css"

import { Button } from "@mui/material";

export const FiltersReset = ({ resetFilters }) => {
    return(
        <div className="filters-reset">
            <Button
                className="filters-reset__button"
                variant="contained"
                onClick={resetFilters}
            >
                Reset
            </Button>
        </div>
    );
}