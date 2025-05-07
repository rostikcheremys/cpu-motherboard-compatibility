import { Divider, Typography } from "@mui/material";

import { FiltersAccordion } from "../../components/FiltersAccordion/FiltersAccordion.jsx";

export const MotherboardFilters = ({
                                filterOptions,
                                selectedManufacturersMotherboard,
                                setSelectedManufacturersMotherboard,
                                selectedChipsets,
                                setSelectedChipsets,
                                selectedFormFactors,
                                setSelectedFormFactors,
                                selectedRamSlots,
                                setSelectedRamSlots,
                                selectedRamChannels,
                                setSelectedRamChannels,
                                selectedMaxRamCapacity,
                                setSelectedMaxRamCapacity,
                                selectedMinRamFrequency,
                                setSelectedMinRamFrequency,
                                selectedMaxRamFrequency,
                                setSelectedMaxRamFrequency,
                                xmpSupport,
                                setXmpSupport,
                                expandedAccordions,
                                handleAccordionChange,
                                handleCheckboxChange,
                                handleBooleanChange
                            }) => {
    return (
        <>
            <div className="filters-sidebar__label">
                <Typography className="filters-sidebar__typography-component">Motherboard</Typography>
            </div>
            <FiltersAccordion
                title="Manufacturer"
                options={filterOptions.manufacturers.motherboard}
                selectedValues={selectedManufacturersMotherboard}
                setSelectedValues={setSelectedManufacturersMotherboard}
                type="checkbox"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleCheckboxChange={handleCheckboxChange}
            />
            <Divider />
            <FiltersAccordion
                title="Chipset"
                options={filterOptions.chipsets}
                selectedValues={selectedChipsets}
                setSelectedValues={setSelectedChipsets}
                type="checkbox"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleCheckboxChange={handleCheckboxChange}
            />
            <Divider />
            <FiltersAccordion
                title="Form Factor"
                options={filterOptions.formFactors}
                selectedValues={selectedFormFactors}
                setSelectedValues={setSelectedFormFactors}
                type="checkbox"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleCheckboxChange={handleCheckboxChange}
            />
            <Divider />
            <FiltersAccordion
                title="RAM Slots"
                options={filterOptions.ranges.ramSlots}
                selectedValues={selectedRamSlots}
                setSelectedValues={setSelectedRamSlots}
                type="checkbox"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleCheckboxChange={handleCheckboxChange}
            />
            <Divider />
            <FiltersAccordion
                title="RAM Channels"
                options={filterOptions.ranges.ramChannels}
                selectedValues={selectedRamChannels}
                setSelectedValues={setSelectedRamChannels}
                type="checkbox"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleCheckboxChange={handleCheckboxChange}
            />
            <Divider />
            <FiltersAccordion
                title="RAM Capacity (GB)"
                options={filterOptions.ranges.maxRamCapacity}
                selectedValues={selectedMaxRamCapacity}
                setSelectedValues={setSelectedMaxRamCapacity}
                type="checkbox"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleCheckboxChange={handleCheckboxChange}
            />
            <Divider />
            <FiltersAccordion
                title="Min RAM Frequency (MHz)"
                options={filterOptions.ranges.minRamFrequency}
                selectedValues={selectedMinRamFrequency}
                setSelectedValues={setSelectedMinRamFrequency}
                type="checkbox"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleCheckboxChange={handleCheckboxChange}
            />
            <Divider />
            <FiltersAccordion
                title="Max RAM Frequency (MHz)"
                options={filterOptions.ranges.maxRamFrequency}
                selectedValues={selectedMaxRamFrequency}
                setSelectedValues={setSelectedMaxRamFrequency}
                type="checkbox"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleCheckboxChange={handleCheckboxChange}
            />
            <Divider />
            <FiltersAccordion
                title="XMP Support"
                selectedValues={xmpSupport}
                setSelectedValues={setXmpSupport}
                type="boolean"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleBooleanChange={handleBooleanChange}
            />
        </>
    );
};