import "./FiltersSidebar.css";
import React, { useState, useEffect, useCallback } from "react";
import {
    Drawer,
    Box,
    Typography,
    FormControlLabel,
    Checkbox,
    Slider,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";

export const FiltersSidebar = ({ open, onClose, onFilterChange, onMotherboardFilterChange }) => {
    const [filterOptions, setFilterOptions] = useState({
        manufacturers: [],
        sockets: [],
        architectures: [],
        families: [],
        generations: [],
        memoryTypes: [],
        chipsets: [],
        formFactors: [],
        ranges: {
            coreCount: { min: 1, max: 64 },
            threadCount: { min: 1, max: 128 },
            frequency: { min: 1, max: 6, step: 0.1 },
            cacheL3: { min: 1, max: 128 },
            memoryMaxGb: { min: 1, max: 256 },
            processNm: { min: 1, max: 100 },
            tdp: { min: 1, max: 200 },
            ramSlots: { min: 1, max: 8 },
            ramChannels: { min: 1, max: 4 },
            maxRamCapacity: { min: 1, max: 256 },
            minRamFrequency: { min: 1600, max: 6000 },
            maxRamFrequency: { min: 1600, max: 6000 }
        }
    });

    const [selectedManufacturers, setSelectedManufacturers] = useState([]);
    const [selectedSockets, setSelectedSockets] = useState([]);
    const [coreCountRange, setCoreCountRange] = useState([1, 64]);
    const [threadCountRange, setThreadCountRange] = useState([1, 128]);
    const [frequencyRange, setFrequencyRange] = useState([1, 6]);
    const [cacheL3Range, setCacheL3Range] = useState([1, 128]);
    const [selectedArchitectures, setSelectedArchitectures] = useState([]);
    const [selectedFamilies, setSelectedFamilies] = useState([]);
    const [selectedGenerations, setSelectedGenerations] = useState([]);
    const [hasIntegratedGpu, setHasIntegratedGpu] = useState(null);
    const [unlockedMultiplier, setUnlockedMultiplier] = useState(null);
    const [selectedMemoryTypes, setSelectedMemoryTypes] = useState([]);
    const [memoryMaxGbRange, setMemoryMaxGbRange] = useState([1, 256]);
    const [processNmRange, setProcessNmRange] = useState([1, 100]);
    const [tdpRange, setTdpRange] = useState([1, 200]);
    const [selectedChipsets, setSelectedChipsets] = useState([]);
    const [selectedFormFactors, setSelectedFormFactors] = useState([]);
    const [ramSlotsRange, setRamSlotsRange] = useState([1, 8]);
    const [ramChannelsRange, setRamChannelsRange] = useState([1, 4]);
    const [maxRamCapacityRange, setMaxRamCapacityRange] = useState([1, 256]);
    const [minRamFrequencyRange, setMinRamFrequencyRange] = useState([1600, 6000]);
    const [maxRamFrequencyRange, setMaxRamFrequencyRange] = useState([1600, 6000]);
    const [xmpSupport, setXmpSupport] = useState(null);
    const [shouldFetch, setShouldFetch] = useState(false);

    useEffect(() => {
        if (open) {
            const fetchFilterOptions = async () => {
                try {
                    const response = await fetch('http://localhost:3001/api/filter-options');
                    const data = await response.json();

                    setFilterOptions((prev) => ({
                        ...prev,
                        manufacturers: data.manufacturers || prev.manufacturers,
                        sockets: data.sockets || prev.sockets,
                        architectures: data.architectures || prev.architectures,
                        families: data.families || prev.families,
                        generations: data.generations || prev.generations,
                        memoryTypes: data.memoryTypes || prev.memoryTypes,
                        chipsets: data.chipsets || prev.chipsets,
                        formFactors: data.formFactors || prev.formFactors,
                        ranges: {
                            ...prev.ranges,
                            coreCount: data.ranges?.coreCount || prev.ranges.coreCount,
                            threadCount: data.ranges?.threadCount || prev.ranges.threadCount,
                            frequency: data.ranges?.frequency || prev.ranges.frequency,
                            cacheL3: data.ranges?.cacheL3 || prev.ranges.cacheL3,
                            memoryMaxGb: data.ranges?.memoryMaxGb || prev.ranges.memoryMaxGb,
                            processNm: data.ranges?.processNm || prev.ranges.processNm,
                            tdp: data.ranges?.tdp || prev.ranges.tdp,
                            ramSlots: data.ranges?.ramSlots || prev.ranges.ramSlots,
                            ramChannels: data.ranges?.ramChannels || prev.ranges.ramChannels,
                            maxRamCapacity: data.ranges?.maxRamCapacity || prev.ranges.maxRamCapacity,
                            minRamFrequency: data.ranges?.minRamFrequency || prev.ranges.minRamFrequency,
                            maxRamFrequency: data.ranges?.maxRamFrequency || prev.ranges.maxRamFrequency
                        }
                    }));

                    setCoreCountRange([
                        data.ranges?.coreCount?.min || filterOptions.ranges.coreCount.min,
                        data.ranges?.coreCount?.max || filterOptions.ranges.coreCount.max
                    ]);
                    setThreadCountRange([
                        data.ranges?.threadCount?.min || filterOptions.ranges.threadCount.min,
                        data.ranges?.threadCount?.max || filterOptions.ranges.threadCount.max
                    ]);
                    setFrequencyRange([
                        data.ranges?.frequency?.min || filterOptions.ranges.frequency.min,
                        data.ranges?.frequency?.max || filterOptions.ranges.frequency.max
                    ]);
                    setCacheL3Range([
                        data.ranges?.cacheL3?.min || filterOptions.ranges.cacheL3.min,
                        data.ranges?.cacheL3?.max || filterOptions.ranges.cacheL3.max
                    ]);
                    setMemoryMaxGbRange([
                        data.ranges?.memoryMaxGb?.min || filterOptions.ranges.memoryMaxGb.min,
                        data.ranges?.memoryMaxGb?.max || filterOptions.ranges.memoryMaxGb.max
                    ]);
                    setProcessNmRange([
                        data.ranges?.processNm?.min || filterOptions.ranges.processNm.min,
                        data.ranges?.processNm?.max || filterOptions.ranges.processNm.max
                    ]);
                    setTdpRange([
                        data.ranges?.tdp?.min || filterOptions.ranges.tdp.min,
                        data.ranges?.tdp?.max || filterOptions.ranges.tdp.max
                    ]);
                    setRamSlotsRange([
                        data.ranges?.ramSlots?.min || filterOptions.ranges.ramSlots.min,
                        data.ranges?.ramSlots?.max || filterOptions.ranges.ramSlots.max
                    ]);
                    setRamChannelsRange([
                        data.ranges?.ramChannels?.min || filterOptions.ranges.ramChannels.min,
                        data.ranges?.ramChannels?.max || filterOptions.ranges.ramChannels.max
                    ]);
                    setMaxRamCapacityRange([
                        data.ranges?.maxRamCapacity?.min || filterOptions.ranges.maxRamCapacity.min,
                        data.ranges?.maxRamCapacity?.max || filterOptions.ranges.maxRamCapacity.max
                    ]);
                    setMinRamFrequencyRange([
                        data.ranges?.minRamFrequency?.min || filterOptions.ranges.minRamFrequency.min,
                        data.ranges?.minRamFrequency?.max || filterOptions.ranges.minRamFrequency.max
                    ]);
                    setMaxRamFrequencyRange([
                        data.ranges?.maxRamFrequency?.min || filterOptions.ranges.maxRamFrequency.min,
                        data.ranges?.maxRamFrequency?.max || filterOptions.ranges.maxRamFrequency.max
                    ]);

                    setShouldFetch(true);
                } catch (error) {
                    console.error('Error fetching filter options:', error);
                }
            };
            fetchFilterOptions();
        } else {
            setShouldFetch(false);
        }
    }, [open]);

    const buildQueryParams = useCallback(() => {
        const params = new URLSearchParams();

        if (selectedManufacturers.length > 0) params.append('manufacturers', selectedManufacturers.join(','));
        if (selectedSockets.length > 0) params.append('sockets', selectedSockets.join(','));
        if (coreCountRange[0] !== filterOptions.ranges.coreCount.min) params.append('coreCountMin', coreCountRange[0]);
        if (coreCountRange[1] !== filterOptions.ranges.coreCount.max) params.append('coreCountMax', coreCountRange[1]);
        if (threadCountRange[0] !== filterOptions.ranges.threadCount.min) params.append('threadCountMin', threadCountRange[0]);
        if (threadCountRange[1] !== filterOptions.ranges.threadCount.max) params.append('threadCountMax', threadCountRange[1]);
        if (frequencyRange[0] !== filterOptions.ranges.frequency.min) params.append('frequencyMin', frequencyRange[0]);
        if (frequencyRange[1] !== filterOptions.ranges.frequency.max) params.append('frequencyMax', frequencyRange[1]);
        if (cacheL3Range[0] !== filterOptions.ranges.cacheL3.min) params.append('cacheL3Min', cacheL3Range[0]);
        if (cacheL3Range[1] !== filterOptions.ranges.cacheL3.max) params.append('cacheL3Max', cacheL3Range[1]);
        if (selectedArchitectures.length > 0) params.append('architectures', selectedArchitectures.join(','));
        if (selectedFamilies.length > 0) params.append('families', selectedFamilies.join(','));
        if (selectedGenerations.length > 0) params.append('generations', selectedGenerations.join(','));
        if (hasIntegratedGpu !== null) params.append('hasIntegratedGpu', hasIntegratedGpu);
        if (unlockedMultiplier !== null) params.append('unlockedMultiplier', unlockedMultiplier);
        if (selectedMemoryTypes.length > 0) params.append('memoryTypes', selectedMemoryTypes.join(','));
        if (memoryMaxGbRange[0] !== filterOptions.ranges.memoryMaxGb.min) params.append('memoryMaxGbMin', memoryMaxGbRange[0]);
        if (memoryMaxGbRange[1] !== filterOptions.ranges.memoryMaxGb.max) params.append('memoryMaxGbMax', memoryMaxGbRange[1]);
        if (processNmRange[0] !== filterOptions.ranges.processNm.min) params.append('processNmMin', processNmRange[0]);
        if (processNmRange[1] !== filterOptions.ranges.processNm.max) params.append('processNmMax', processNmRange[1]);
        if (tdpRange[0] !== filterOptions.ranges.tdp.min) params.append('tdpMin', tdpRange[0]);
        if (tdpRange[1] !== filterOptions.ranges.tdp.max) params.append('tdpMax', tdpRange[1]);
        if (selectedChipsets.length > 0) params.append('chipsets', selectedChipsets.join(','));
        if (selectedFormFactors.length > 0) params.append('formFactors', selectedFormFactors.join(','));
        if (ramSlotsRange[0] !== filterOptions.ranges.ramSlots.min) params.append('ramSlotsMin', ramSlotsRange[0]);
        if (ramSlotsRange[1] !== filterOptions.ranges.ramSlots.max) params.append('ramSlotsMax', ramSlotsRange[1]);
        if (ramChannelsRange[0] !== filterOptions.ranges.ramChannels.min) params.append('ramChannelsMin', ramChannelsRange[0]);
        if (ramChannelsRange[1] !== filterOptions.ranges.ramChannels.max) params.append('ramChannelsMax', ramChannelsRange[1]);
        if (maxRamCapacityRange[0] !== filterOptions.ranges.maxRamCapacity.min) params.append('maxRamCapacityMin', maxRamCapacityRange[0]);
        if (maxRamCapacityRange[1] !== filterOptions.ranges.maxRamCapacity.max) params.append('maxRamCapacityMax', maxRamCapacityRange[1]);
        if (minRamFrequencyRange[0] !== filterOptions.ranges.minRamFrequency.min) params.append('minRamFrequencyMin', minRamFrequencyRange[0]);
        if (minRamFrequencyRange[1] !== filterOptions.ranges.minRamFrequency.max) params.append('minRamFrequencyMax', minRamFrequencyRange[1]);
        if (maxRamFrequencyRange[0] !== filterOptions.ranges.maxRamFrequency.min) params.append('maxRamFrequencyMin', maxRamFrequencyRange[0]);
        if (maxRamFrequencyRange[1] !== filterOptions.ranges.maxRamFrequency.max) params.append('maxRamFrequencyMax', maxRamFrequencyRange[1]);
        if (xmpSupport !== null) params.append('xmpSupport', xmpSupport);

        return params;
    }, [
        selectedManufacturers,
        selectedSockets,
        coreCountRange,
        threadCountRange,
        frequencyRange,
        cacheL3Range,
        selectedArchitectures,
        selectedFamilies,
        selectedGenerations,
        hasIntegratedGpu,
        unlockedMultiplier,
        selectedMemoryTypes,
        memoryMaxGbRange,
        processNmRange,
        tdpRange,
        selectedChipsets,
        selectedFormFactors,
        ramSlotsRange,
        ramChannelsRange,
        maxRamCapacityRange,
        minRamFrequencyRange,
        maxRamFrequencyRange,
        xmpSupport,
        filterOptions
    ]);

    const fetchFilteredComponents = useCallback(async () => {
        const params = buildQueryParams();
        try {
            const response = await fetch(`http://localhost:3001/api/components/filter?${params.toString()}`);
            const data = await response.json();
            onFilterChange(data.cpus);
            onMotherboardFilterChange(data.motherboards);
        } catch (error) {
            console.error('Error fetching filtered components:', error);
        }
    }, [buildQueryParams, onFilterChange, onMotherboardFilterChange]);

    useEffect(() => {
        if (open && shouldFetch) {
            fetchFilteredComponents();
            setShouldFetch(false);
        }
    }, [open, shouldFetch, fetchFilteredComponents]);

    const handleCheckboxChange = (setState, state, value) => {
        setState((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
        setShouldFetch(true);
    };

    const handleBooleanChange = (setState, value) => {
        setState((prev) => (prev === value ? null : value));
        setShouldFetch(true);
    };

    const handleRangeChange = (setState) => (event, newValue) => {
        setState(newValue);
    };

    const handleRangeChangeCommitted = () => {
        setShouldFetch(true);
    };

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <Box p={2} width={300} role="presentation">
                <div className="filters-sidebar__title">
                    <div className="filters-sidebar__title-icon">
                        <FilterListIcon className="filters-sidebar__icon" />
                    </div>
                    <Typography className="filters-sidebar__typography">Filters</Typography>
                </div>

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Manufacturer</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {filterOptions.manufacturers.length > 0 ? (
                            filterOptions.manufacturers.map((manufacturer) => (
                                <FormControlLabel
                                    key={manufacturer}
                                    control={
                                        <Checkbox
                                            checked={selectedManufacturers.includes(manufacturer)}
                                            onChange={() => handleCheckboxChange(setSelectedManufacturers, selectedManufacturers, manufacturer)}
                                        />
                                    }
                                    label={manufacturer}
                                />
                            ))
                        ) : (
                            <Typography>No manufacturers available</Typography>
                        )}
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Socket</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {filterOptions.sockets.length > 0 ? (
                            filterOptions.sockets.map((socket) => (
                                <FormControlLabel
                                    key={socket}
                                    control={
                                        <Checkbox
                                            checked={selectedSockets.includes(socket)}
                                            onChange={() => handleCheckboxChange(setSelectedSockets, selectedSockets, socket)}
                                        />
                                    }
                                    label={socket}
                                />
                            ))
                        ) : (
                            <Typography>No sockets available</Typography>
                        )}
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Core Count</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Slider
                            value={coreCountRange}
                            onChange={handleRangeChange(setCoreCountRange)}
                            onChangeCommitted={handleRangeChangeCommitted}
                            valueLabelDisplay="auto"
                            min={filterOptions.ranges.coreCount.min}
                            max={filterOptions.ranges.coreCount.max}
                            step={1}
                        />
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Thread Count</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Slider
                            value={threadCountRange}
                            onChange={handleRangeChange(setThreadCountRange)}
                            onChangeCommitted={handleRangeChangeCommitted}
                            valueLabelDisplay="auto"
                            min={filterOptions.ranges.threadCount.min}
                            max={filterOptions.ranges.threadCount.max}
                            step={1}
                        />
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Frequency (GHz)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Slider
                            value={frequencyRange}
                            onChange={handleRangeChange(setFrequencyRange)}
                            onChangeCommitted={handleRangeChangeCommitted}
                            valueLabelDisplay="auto"
                            min={filterOptions.ranges.frequency.min}
                            max={filterOptions.ranges.frequency.max}
                            step={filterOptions.ranges.frequency.step}
                        />
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Cache L3 (MB)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Slider
                            value={cacheL3Range}
                            onChange={handleRangeChange(setCacheL3Range)}
                            onChangeCommitted={handleRangeChangeCommitted}
                            valueLabelDisplay="auto"
                            min={filterOptions.ranges.cacheL3.min}
                            max={filterOptions.ranges.cacheL3.max}
                            step={1}
                        />
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Architecture</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {filterOptions.architectures.length > 0 ? (
                            filterOptions.architectures.map((architecture) => (
                                <FormControlLabel
                                    key={architecture}
                                    control={
                                        <Checkbox
                                            checked={selectedArchitectures.includes(architecture)}
                                            onChange={() => handleCheckboxChange(setSelectedArchitectures, selectedArchitectures, architecture)}
                                        />
                                    }
                                    label={architecture}
                                />
                            ))
                        ) : (
                            <Typography>No architectures available</Typography>
                        )}
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Family</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {filterOptions.families.length > 0 ? (
                            filterOptions.families.map((family) => (
                                <FormControlLabel
                                    key={family}
                                    control={
                                        <Checkbox
                                            checked={selectedFamilies.includes(family)}
                                            onChange={() => handleCheckboxChange(setSelectedFamilies, selectedFamilies, family)}
                                        />
                                    }
                                    label={family}
                                />
                            ))
                        ) : (
                            <Typography>No families available</Typography>
                        )}
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Generation</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {filterOptions.generations.length > 0 ? (
                            filterOptions.generations.map((generation) => (
                                <FormControlLabel
                                    key={generation}
                                    control={
                                        <Checkbox
                                            checked={selectedGenerations.includes(generation)}
                                            onChange={() => handleCheckboxChange(setSelectedGenerations, selectedGenerations, generation)}
                                        />
                                    }
                                    label={generation}
                                />
                            ))
                        ) : (
                            <Typography>No generations available</Typography>
                        )}
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Has Integrated GPU</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={hasIntegratedGpu === true}
                                    onChange={() => handleBooleanChange(setHasIntegratedGpu, true)}
                                />
                            }
                            label="Yes"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={hasIntegratedGpu === false}
                                    onChange={() => handleBooleanChange(setHasIntegratedGpu, false)}
                                />
                            }
                            label="No"
                        />
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Unlocked Multiplier</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={unlockedMultiplier === true}
                                    onChange={() => handleBooleanChange(setUnlockedMultiplier, true)}
                                />
                            }
                            label="Yes"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={unlockedMultiplier === false}
                                    onChange={() => handleBooleanChange(setUnlockedMultiplier, false)}
                                />
                            }
                            label="No"
                        />
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Memory Type</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {filterOptions.memoryTypes.length > 0 ? (
                            filterOptions.memoryTypes.map((memoryType) => (
                                <FormControlLabel
                                    key={memoryType}
                                    control={
                                        <Checkbox
                                            checked={selectedMemoryTypes.includes(memoryType)}
                                            onChange={() => handleCheckboxChange(setSelectedMemoryTypes, selectedMemoryTypes, memoryType)}
                                        />
                                    }
                                    label={memoryType}
                                />
                            ))
                        ) : (
                            <Typography>No memory types available</Typography>
                        )}
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Memory Max GB</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Slider
                            value={memoryMaxGbRange}
                            onChange={handleRangeChange(setMemoryMaxGbRange)}
                            onChangeCommitted={handleRangeChangeCommitted}
                            valueLabelDisplay="auto"
                            min={filterOptions.ranges.memoryMaxGb.min}
                            max={filterOptions.ranges.memoryMaxGb.max}
                            step={1}
                        />
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Process (nm)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Slider
                            value={processNmRange}
                            onChange={handleRangeChange(setProcessNmRange)}
                            onChangeCommitted={handleRangeChangeCommitted}
                            valueLabelDisplay="auto"
                            min={filterOptions.ranges.processNm.min}
                            max={filterOptions.ranges.processNm.max}
                            step={1}
                        />
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>TDP (Watts)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Slider
                            value={tdpRange}
                            onChange={handleRangeChange(setTdpRange)}
                            onChangeCommitted={handleRangeChangeCommitted}
                            valueLabelDisplay="auto"
                            min={filterOptions.ranges.tdp.min}
                            max={filterOptions.ranges.tdp.max}
                            step={5}
                        />
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Chipset</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {filterOptions.chipsets.length > 0 ? (
                            filterOptions.chipsets.map((chipset) => (
                                <FormControlLabel
                                    key={chipset}
                                    control={
                                        <Checkbox
                                            checked={selectedChipsets.includes(chipset)}
                                            onChange={() => handleCheckboxChange(setSelectedChipsets, selectedChipsets, chipset)}
                                        />
                                    }
                                    label={chipset}
                                />
                            ))
                        ) : (
                            <Typography>No chipsets available</Typography>
                        )}
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Form Factor</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {filterOptions.formFactors.length > 0 ? (
                            filterOptions.formFactors.map((formFactor) => (
                                <FormControlLabel
                                    key={formFactor}
                                    control={
                                        <Checkbox
                                            checked={selectedFormFactors.includes(formFactor)}
                                            onChange={() => handleCheckboxChange(setSelectedFormFactors, selectedFormFactors, formFactor)}
                                        />
                                    }
                                    label={formFactor}
                                />
                            ))
                        ) : (
                            <Typography>No form factors available</Typography>
                        )}
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>RAM Slots</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Slider
                            value={ramSlotsRange}
                            onChange={handleRangeChange(setRamSlotsRange)}
                            onChangeCommitted={handleRangeChangeCommitted}
                            valueLabelDisplay="auto"
                            min={filterOptions.ranges.ramSlots.min}
                            max={filterOptions.ranges.ramSlots.max}
                            step={1}
                        />
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>RAM Channels</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Slider
                            value={ramChannelsRange}
                            onChange={handleRangeChange(setRamChannelsRange)}
                            onChangeCommitted={handleRangeChangeCommitted}
                            valueLabelDisplay="auto"
                            min={filterOptions.ranges.ramChannels.min}
                            max={filterOptions.ranges.ramChannels.max}
                            step={1}
                        />
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Max RAM Capacity (GB)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Slider
                            value={maxRamCapacityRange}
                            onChange={handleRangeChange(setMaxRamCapacityRange)}
                            onChangeCommitted={handleRangeChangeCommitted}
                            valueLabelDisplay="auto"
                            min={filterOptions.ranges.maxRamCapacity.min}
                            max={filterOptions.ranges.maxRamCapacity.max}
                            step={1}
                        />
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Min RAM Frequency (MHz)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Slider
                            value={minRamFrequencyRange}
                            onChange={handleRangeChange(setMinRamFrequencyRange)}
                            onChangeCommitted={handleRangeChangeCommitted}
                            valueLabelDisplay="auto"
                            min={filterOptions.ranges.minRamFrequency.min}
                            max={filterOptions.ranges.minRamFrequency.max}
                            step={100}
                        />
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Max RAM Frequency (MHz)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Slider
                            value={maxRamFrequencyRange}
                            onChange={handleRangeChange(setMaxRamFrequencyRange)}
                            onChangeCommitted={handleRangeChangeCommitted}
                            valueLabelDisplay="auto"
                            min={filterOptions.ranges.maxRamFrequency.min}
                            max={filterOptions.ranges.maxRamFrequency.max}
                            step={100}
                        />
                    </AccordionDetails>
                </Accordion>

                <Divider />

                <Accordion className="filters-sidebar__accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>XMP Support</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={xmpSupport === true}
                                    onChange={() => handleBooleanChange(setXmpSupport, true)}
                                />
                            }
                            label="Yes"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={xmpSupport === false}
                                    onChange={() => handleBooleanChange(setXmpSupport, false)}
                                />
                            }
                            label="No"
                        />
                    </AccordionDetails>
                </Accordion>

                <Divider />
            </Box>
        </Drawer>
    );
};