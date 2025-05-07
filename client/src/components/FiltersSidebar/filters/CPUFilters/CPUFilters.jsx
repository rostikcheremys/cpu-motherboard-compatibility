import { Divider, Typography } from "@mui/material";

import { FiltersAccordion } from "../../components/FiltersAccordion/FiltersAccordion.jsx";

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
            <FiltersAccordion
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
            <FiltersAccordion
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
            <FiltersAccordion
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
            <FiltersAccordion
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
            <FiltersAccordion
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
            <FiltersAccordion
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
            <FiltersAccordion
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
            <FiltersAccordion
                title="Has Integrated GPU"
                selectedValues={hasIntegratedGpu}
                setSelectedValues={setHasIntegratedGpu}
                type="boolean"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleBooleanChange={handleBooleanChange}
            />
            <Divider />
            <FiltersAccordion
                title="Unlocked Multiplier"
                selectedValues={unlockedMultiplier}
                setSelectedValues={setUnlockedMultiplier}
                type="boolean"
                expandedAccordions={expandedAccordions}
                handleAccordionChange={handleAccordionChange}
                handleBooleanChange={handleBooleanChange}
            />
            <Divider />
            <FiltersAccordion
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
            <FiltersAccordion
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