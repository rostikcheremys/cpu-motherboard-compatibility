import { Divider, Typography } from "@mui/material";

import { FilterAccordion } from "../../components/FilterAccordion/FilterAccordion.jsx";

export const CpuFilters = ({
                        filterOptions,
                        selectedManufacturersCpu,
                        setSelectedManufacturersCpu,
                        coreCountRange,
                        setCoreCountRange,
                        threadCountRange,
                        setThreadCountRange,
                        cacheL3Range,
                        setCacheL3Range,
                        selectedArchitectures,
                        setSelectedArchitectures,
                        selectedFamilies,
                        setSelectedFamilies,
                        selectedGenerations,
                        setSelectedGenerations,
                        hasIntegratedGpu,
                        setHasIntegratedGpu,
                        unlockedMultiplier,
                        setUnlockedMultiplier,
                        processNmRange,
                        setProcessNmRange,
                        tdpRange,
                        setTdpRange,
                        expandedAccordions,
                        handleAccordionChange,
                        handleCheckboxChange,
                        handleBooleanChange,
                        handleRangeChange,
                        handleRangeChangeCommitted
                    }) => {
    return (
        <>
            <div className="filters-sidebar__label">
                <Typography className="filters-sidebar__typography-component">CPU</Typography>
            </div>
            <FilterAccordion
                title="Manufacturer"
                options={filterOptions.manufacturers.cpu}
                selectedValues={selectedManufacturersCpu}
                setSelectedValues={setSelectedManufacturersCpu}
                type="checkbox"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleCheckboxChange={handleCheckboxChange}
            />
            <Divider />
            <Divider />
            <FilterAccordion
                title="Core Count"
                range={coreCountRange}
                setRange={setCoreCountRange}
                options={filterOptions.ranges.coreCount}
                type="range"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleRangeChange={handleRangeChange}
                handleRangeChangeCommitted={handleRangeChangeCommitted}
            />
            <Divider />
            <FilterAccordion
                title="Thread Count"
                range={threadCountRange}
                setRange={setThreadCountRange}
                options={filterOptions.ranges.threadCount}
                type="range"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleRangeChange={handleRangeChange}
                handleRangeChangeCommitted={handleRangeChangeCommitted}
            />
            <Divider />
            <FilterAccordion
                title="Cache L3 (MB)"
                range={cacheL3Range}
                setRange={setCacheL3Range}
                options={filterOptions.ranges.cacheL3}
                type="range"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleRangeChange={handleRangeChange}
                handleRangeChangeCommitted={handleRangeChangeCommitted}
            />
            <Divider />
            <FilterAccordion
                title="Architecture"
                options={filterOptions.architectures}
                selectedValues={selectedArchitectures}
                setSelectedValues={setSelectedArchitectures}
                type="checkbox"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleCheckboxChange={handleCheckboxChange}
            />
            <Divider />
            <FilterAccordion
                title="Family"
                options={filterOptions.families}
                selectedValues={selectedFamilies}
                setSelectedValues={setSelectedFamilies}
                type="checkbox"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleCheckboxChange={handleCheckboxChange}
            />
            <Divider />
            <FilterAccordion
                title="Generation"
                options={filterOptions.generations}
                selectedValues={selectedGenerations}
                setSelectedValues={setSelectedGenerations}
                type="checkbox"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleCheckboxChange={handleCheckboxChange}
            />
            <Divider />
            <FilterAccordion
                title="Has Integrated GPU"
                selectedValues={hasIntegratedGpu}
                setSelectedValues={setHasIntegratedGpu}
                type="boolean"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleBooleanChange={handleBooleanChange}
            />
            <Divider />
            <FilterAccordion
                title="Unlocked Multiplier"
                selectedValues={unlockedMultiplier}
                setSelectedValues={setUnlockedMultiplier}
                type="boolean"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleBooleanChange={handleBooleanChange}
            />
            <Divider />
            <FilterAccordion
                title="Process (nm)"
                range={processNmRange}
                setRange={setProcessNmRange}
                options={filterOptions.ranges.processNm}
                type="range"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleRangeChange={handleRangeChange}
                handleRangeChangeCommitted={handleRangeChangeCommitted}
            />
            <Divider />
            <FilterAccordion
                title="TDP (Watts)"
                range={tdpRange}
                setRange={setTdpRange}
                options={filterOptions.ranges.tdp}
                type="range"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleRangeChange={handleRangeChange}
                handleRangeChangeCommitted={handleRangeChangeCommitted}
            />
        </>
    );
};