import { Divider, Typography } from "@mui/material";

import { FiltersAccordion } from "../../components/FiltersAccordion/FiltersAccordion.jsx";

export const CommonFilters = ({
                           filterOptions,
                           selectedSockets,
                           setSelectedSockets,
                           selectedMemoryTypes,
                           setSelectedMemoryTypes,
                           expandedAccordions,
                           handleAccordionChange,
                           handleCheckboxChange
                       }) => {
    return (
        <>
            <div className="filters-sidebar__label">
                <Typography className="filters-sidebar__typography-component">Common</Typography>
            </div>
            <FiltersAccordion
                title="Socket"
                options={filterOptions.sockets}
                selectedValues={selectedSockets}
                setSelectedValues={setSelectedSockets}
                type="checkbox"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleCheckboxChange={handleCheckboxChange}
            />
            <Divider />
            <FiltersAccordion
                title="Memory Type"
                options={filterOptions.memoryTypes}
                selectedValues={selectedMemoryTypes}
                setSelectedValues={setSelectedMemoryTypes}
                type="checkbox"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleCheckboxChange={handleCheckboxChange}
            />
        </>
    );
};