import "./FiltersSidebar.css";

import { useState, useEffect, useCallback } from "react";

import { Drawer, Box } from "@mui/material";

import { FiltersHeader } from "./components/FiltersHeader/FiltersHeader.jsx";
import { CommonFilters } from "./filters/CommonFilters/CommonFilters.jsx";
import { CpuFilters } from "./filters/CPUFilters/CPUFilters.jsx";
import { MotherboardFilters } from "./filters/MotherboardFilters/MotherboardFilters.jsx";

export const FiltersSidebar = ({ open, onClose, onFilterChange, onMotherboardFilterChange }) => {
    const [filterOptions, setFilterOptions] = useState({
        manufacturers: { cpu: [], motherboard: [] },
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
            cacheL3: { min: 1, max: 128 },
            memoryMaxGb: { min: 1, max: 256 },
            processNm: { min: 1, max: 100 },
            tdp: { min: 1, max: 200 },
            ramSlots: [],
            ramChannels: [],
            maxRamCapacity: [],
            minRamFrequency: [],
            maxRamFrequency: []
        }
    });

    const [selectedManufacturersCpu, setSelectedManufacturersCpu] = useState([]);
    const [selectedManufacturersMotherboard, setSelectedManufacturersMotherboard] = useState([]);
    const [selectedSockets, setSelectedSockets] = useState([]);
    const [coreCountRange, setCoreCountRange] = useState([1, 64]);
    const [threadCountRange, setThreadCountRange] = useState([1, 128]);
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
    const [selectedRamSlots, setSelectedRamSlots] = useState([]);
    const [selectedRamChannels, setSelectedRamChannels] = useState([]);
    const [selectedMaxRamCapacity, setSelectedMaxRamCapacity] = useState([]);
    const [selectedMinRamFrequency, setSelectedMinRamFrequency] = useState([]);
    const [selectedMaxRamFrequency, setSelectedMaxRamFrequency] = useState([]);
    const [xmpSupport, setXmpSupport] = useState(null);
    const [shouldFetch, setShouldFetch] = useState(false);
    const [expandedAccordions, setExpandedAccordions] = useState(new Set());

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/filter-options');
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();

                const ramSlots = Array.isArray(data.ranges?.ramSlots)
                    ? [...new Set(data.ranges.ramSlots.map(Number))]
                    : [];
                const ramChannels = Array.isArray(data.ranges?.ramChannels)
                    ? [...new Set(data.ranges.ramChannels.map(Number))]
                    : [];
                const maxRamCapacity = Array.isArray(data.ranges?.maxRamCapacity)
                    ? [...new Set(data.ranges.maxRamCapacity.map(Number))]
                    : [];
                const minRamFrequency = Array.isArray(data.ranges?.minRamFrequency)
                    ? [...new Set(data.ranges.minRamFrequency.map(Number))]
                    : [];
                const maxRamFrequency = Array.isArray(data.ranges?.maxRamFrequency)
                    ? [...new Set(data.ranges.maxRamFrequency.map(Number))]
                    : [];

                setFilterOptions((prev) => ({
                    ...prev,
                    manufacturers: {
                        cpu: data.manufacturers.cpu || prev.manufacturers.cpu,
                        motherboard: data.manufacturers.motherboard || prev.manufacturers.motherboard
                    },
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
                        cacheL3: data.ranges?.cacheL3 || prev.ranges.cacheL3,
                        memoryMaxGb: data.ranges?.memoryMaxGb || prev.ranges.memoryMaxGb,
                        processNm: data.ranges?.processNm || prev.ranges.processNm,
                        tdp: data.ranges?.tdp || prev.ranges.tdp,
                        ramSlots,
                        ramChannels,
                        maxRamCapacity,
                        minRamFrequency,
                        maxRamFrequency
                    }
                }));

                if (coreCountRange[0] === filterOptions.ranges.coreCount.min && coreCountRange[1] === filterOptions.ranges.coreCount.max) {
                    setCoreCountRange([
                        data.ranges?.coreCount?.min || filterOptions.ranges.coreCount.min,
                        data.ranges?.coreCount?.max || filterOptions.ranges.coreCount.max
                    ]);
                }
                if (threadCountRange[0] === filterOptions.ranges.threadCount.min && threadCountRange[1] === filterOptions.ranges.threadCount.max) {
                    setThreadCountRange([
                        data.ranges?.threadCount?.min || filterOptions.ranges.threadCount.min,
                        data.ranges?.threadCount?.max || filterOptions.ranges.threadCount.max
                    ]);
                }
                if (cacheL3Range[0] === filterOptions.ranges.cacheL3.min && cacheL3Range[1] === filterOptions.ranges.cacheL3.max) {
                    setCacheL3Range([
                        data.ranges?.cacheL3?.min || filterOptions.ranges.cacheL3.min,
                        data.ranges?.cacheL3?.max || filterOptions.ranges.cacheL3.max
                    ]);
                }
                if (memoryMaxGbRange[0] === filterOptions.ranges.memoryMaxGb.min && memoryMaxGbRange[1] === filterOptions.ranges.memoryMaxGb.max) {
                    setMemoryMaxGbRange([
                        data.ranges?.memoryMaxGb?.min || filterOptions.ranges.memoryMaxGb.min,
                        data.ranges?.memoryMaxGb?.max || filterOptions.ranges.memoryMaxGb.max
                    ]);
                }
                if (processNmRange[0] === filterOptions.ranges.processNm.min && processNmRange[1] === filterOptions.ranges.processNm.max) {
                    setProcessNmRange([
                        data.ranges?.processNm?.min || filterOptions.ranges.processNm.min,
                        data.ranges?.processNm?.max || filterOptions.ranges.processNm.max
                    ]);
                }
                if (tdpRange[0] === filterOptions.ranges.tdp.min && tdpRange[1] === filterOptions.ranges.tdp.max) {
                    setTdpRange([
                        data.ranges?.tdp?.min || filterOptions.ranges.tdp.min,
                        data.ranges?.tdp?.max || filterOptions.ranges.tdp.max
                    ]);
                }

                const cpuParams = new URLSearchParams({ type: 'cpu' });
                const motherboardParams = new URLSearchParams({ type: 'motherboard' });
                const [cpuResponse, motherboardResponse] = await Promise.all([
                    fetch(`http://localhost:3001/api/components/filter?${cpuParams.toString()}`),
                    fetch(`http://localhost:3001/api/components/filter?${motherboardParams.toString()}`)
                ]);
                if (!cpuResponse.ok) throw new Error(`CPU fetch error: ${cpuResponse.status}`);
                if (!motherboardResponse.ok) throw new Error(`Motherboard fetch error: ${motherboardResponse.status}`);
                const cpuData = await cpuResponse.json();
                const motherboardData = await motherboardResponse.json();
                console.log('Initial CPU Data:', cpuData);
                console.log('Initial Motherboard Data:', motherboardData);
                onFilterChange(cpuData.cpus);
                onMotherboardFilterChange(motherboardData.motherboards);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (!open) {
            const currentExpanded = new Set();
            Array.from(document.querySelectorAll('.filters-sidebar__accordion')).forEach((accordion) => {
                if (accordion.querySelector('.Mui-expanded')) {
                    currentExpanded.add(accordion.querySelector('button').textContent.trim());
                }
            });
            setExpandedAccordions(currentExpanded);
            setShouldFetch(false);
        }
    }, [open]);

    const buildQueryParams = useCallback((type) => {
        const params = new URLSearchParams();
        params.append('type', type);

        if (type === 'cpu') {
            if (selectedManufacturersCpu.length > 0) params.append('manufacturers', selectedManufacturersCpu.join(','));
            if (selectedSockets.length > 0) params.append('sockets', selectedSockets.join(','));
            if (coreCountRange[0] !== filterOptions.ranges.coreCount.min) params.append('coreCountMin', coreCountRange[0]);
            if (coreCountRange[1] !== filterOptions.ranges.coreCount.max) params.append('coreCountMax', coreCountRange[1]);
            if (threadCountRange[0] !== filterOptions.ranges.threadCount.min) params.append('threadCountMin', threadCountRange[0]);
            if (threadCountRange[1] !== filterOptions.ranges.threadCount.max) params.append('threadCountMax', threadCountRange[1]);
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
        } else if (type === 'motherboard') {
            if (selectedManufacturersMotherboard.length > 0) params.append('manufacturers', selectedManufacturersMotherboard.join(','));
            if (selectedSockets.length > 0) params.append('sockets', selectedSockets.join(','));
            if (selectedChipsets.length > 0) params.append('chipsets', selectedChipsets.join(','));
            if (selectedFormFactors.length > 0) params.append('formFactors', selectedFormFactors.join(','));
            if (selectedMemoryTypes.length > 0) params.append('memoryTypes', selectedMemoryTypes.join(','));
            if (selectedRamSlots.length > 0) params.append('ramSlots', selectedRamSlots.join(','));
            if (selectedRamChannels.length > 0) params.append('ramChannels', selectedRamChannels.join(','));
            if (selectedMaxRamCapacity.length > 0) params.append('maxRamCapacity', selectedMaxRamCapacity.join(','));
            if (selectedMinRamFrequency.length > 0) params.append('minRamFrequency', selectedMinRamFrequency.join(','));
            if (selectedMaxRamFrequency.length > 0) params.append('maxRamFrequency', selectedMaxRamFrequency.join(','));
            if (xmpSupport !== null) params.append('xmpSupport', xmpSupport);
        }

        return params;
    }, [
        selectedManufacturersCpu,
        selectedManufacturersMotherboard,
        selectedSockets,
        coreCountRange,
        threadCountRange,
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
        selectedRamSlots,
        selectedRamChannels,
        selectedMaxRamCapacity,
        selectedMinRamFrequency,
        selectedMaxRamFrequency,
        xmpSupport,
        filterOptions
    ]);

    const fetchFilteredComponents = useCallback(async () => {
        const cpuParams = buildQueryParams('cpu');
        const motherboardParams = buildQueryParams('motherboard');
        try {
            const [cpuResponse, motherboardResponse] = await Promise.all([
                fetch(`http://localhost:3001/api/components/filter?${cpuParams.toString()}`),
                fetch(`http://localhost:3001/api/components/filter?${motherboardParams.toString()}`)
            ]);
            if (!cpuResponse.ok) throw new Error(`CPU fetch error: ${cpuResponse.status}`);
            if (!motherboardResponse.ok) throw new Error(`Motherboard fetch error: ${motherboardResponse.status}`);
            const cpuData = await cpuResponse.json();
            const motherboardData = await motherboardResponse.json();
            console.log('CPU Data:', cpuData);
            console.log('Motherboard Data:', motherboardData);
            onFilterChange(cpuData.cpus);
            onMotherboardFilterChange(motherboardData.motherboards);
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
        const isNumeric = !isNaN(value) && !isNaN(parseFloat(value));
        const processedValue = isNumeric ? Number(value) : value;

        setState((prev) =>
            prev.includes(processedValue)
                ? prev.filter((item) => item !== processedValue)
                : [...prev, processedValue]
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

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        const newExpanded = new Set(expandedAccordions);
        if (isExpanded) {
            newExpanded.add(panel);
        } else {
            newExpanded.delete(panel);
        }
        setExpandedAccordions(newExpanded);
    };

    const handleCloseSidebar = () => {
        onClose();
    };

    const resetFilters = () => {
        setSelectedManufacturersCpu([]);
        setSelectedManufacturersMotherboard([]);
        setSelectedSockets([]);
        setCoreCountRange([filterOptions.ranges.coreCount.min, filterOptions.ranges.coreCount.max]);
        setThreadCountRange([filterOptions.ranges.threadCount.min, filterOptions.ranges.threadCount.max]);
        setCacheL3Range([filterOptions.ranges.cacheL3.min, filterOptions.ranges.cacheL3.max]);
        setSelectedArchitectures([]);
        setSelectedFamilies([]);
        setSelectedGenerations([]);
        setHasIntegratedGpu(null);
        setUnlockedMultiplier(null);
        setSelectedMemoryTypes([]);
        setMemoryMaxGbRange([filterOptions.ranges.memoryMaxGb.min, filterOptions.ranges.memoryMaxGb.max]);
        setProcessNmRange([filterOptions.ranges.processNm.min, filterOptions.ranges.processNm.max]);
        setTdpRange([filterOptions.ranges.tdp.min, filterOptions.ranges.tdp.max]);
        setSelectedChipsets([]);
        setSelectedFormFactors([]);
        setSelectedRamSlots([]);
        setSelectedRamChannels([]);
        setSelectedMaxRamCapacity([]);
        setSelectedMinRamFrequency([]);
        setSelectedMaxRamFrequency([]);
        setXmpSupport(null);
        setShouldFetch(true);
    };

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <Box p={2} width={300} role="presentation">
                <FiltersHeader handleCloseSidebar={handleCloseSidebar} resetFilters={resetFilters} />
                <CommonFilters
                    filterOptions={filterOptions}
                    selectedSockets={selectedSockets}
                    setSelectedSockets={setSelectedSockets}
                    selectedMemoryTypes={selectedMemoryTypes}
                    setSelectedMemoryTypes={setSelectedMemoryTypes}
                    expandedAccordions={expandedAccordions}
                    handleAccordionChange={handleAccordionChange}
                    handleCheckboxChange={handleCheckboxChange}
                />
                <CpuFilters
                    filterOptions={filterOptions}
                    selectedManufacturersCpu={selectedManufacturersCpu}
                    setSelectedManufacturersCpu={setSelectedManufacturersCpu}
                    selectedSockets={selectedSockets}
                    setSelectedSockets={setSelectedSockets}
                    coreCountRange={coreCountRange}
                    setCoreCountRange={setCoreCountRange}
                    threadCountRange={threadCountRange}
                    setThreadCountRange={setThreadCountRange}
                    cacheL3Range={cacheL3Range}
                    setCacheL3Range={setCacheL3Range}
                    selectedArchitectures={selectedArchitectures}
                    setSelectedArchitectures={setSelectedArchitectures}
                    selectedFamilies={selectedFamilies}
                    setSelectedFamilies={setSelectedFamilies}
                    selectedGenerations={selectedGenerations}
                    setSelectedGenerations={setSelectedGenerations}
                    hasIntegratedGpu={hasIntegratedGpu}
                    setHasIntegratedGpu={setHasIntegratedGpu}
                    unlockedMultiplier={unlockedMultiplier}
                    setUnlockedMultiplier={setUnlockedMultiplier}
                    selectedMemoryTypes={selectedMemoryTypes}
                    setSelectedMemoryTypes={setSelectedMemoryTypes}
                    memoryMaxGbRange={memoryMaxGbRange}
                    setMemoryMaxGbRange={setMemoryMaxGbRange}
                    processNmRange={processNmRange}
                    setProcessNmRange={setProcessNmRange}
                    tdpRange={tdpRange}
                    setTdpRange={setTdpRange}
                    expandedAccordions={expandedAccordions}
                    handleAccordionChange={handleAccordionChange}
                    handleCheckboxChange={handleCheckboxChange}
                    handleBooleanChange={handleBooleanChange}
                    handleRangeChange={handleRangeChange}
                    handleRangeChangeCommitted={handleRangeChangeCommitted}
                />
                <MotherboardFilters
                    filterOptions={filterOptions}
                    selectedManufacturersMotherboard={selectedManufacturersMotherboard}
                    setSelectedManufacturersMotherboard={setSelectedManufacturersMotherboard}
                    selectedSockets={selectedSockets}
                    setSelectedSockets={setSelectedSockets}
                    selectedChipsets={selectedChipsets}
                    setSelectedChipsets={setSelectedChipsets}
                    selectedFormFactors={selectedFormFactors}
                    setSelectedFormFactors={setSelectedFormFactors}
                    selectedMemoryTypes={selectedMemoryTypes}
                    setSelectedMemoryTypes={setSelectedMemoryTypes}
                    selectedRamSlots={selectedRamSlots}
                    setSelectedRamSlots={setSelectedRamSlots}
                    selectedRamChannels={selectedRamChannels}
                    setSelectedRamChannels={setSelectedRamChannels}
                    selectedMaxRamCapacity={selectedMaxRamCapacity}
                    setSelectedMaxRamCapacity={setSelectedMaxRamCapacity}
                    selectedMinRamFrequency={selectedMinRamFrequency}
                    setSelectedMinRamFrequency={setSelectedMinRamFrequency}
                    selectedMaxRamFrequency={selectedMaxRamFrequency}
                    setSelectedMaxRamFrequency={setSelectedMaxRamFrequency}
                    xmpSupport={xmpSupport}
                    setXmpSupport={setXmpSupport}
                    expandedAccordions={expandedAccordions}
                    handleAccordionChange={handleAccordionChange}
                    handleCheckboxChange={handleCheckboxChange}
                    handleBooleanChange={handleBooleanChange}
                    handleRangeChange={handleRangeChange}
                    handleRangeChangeCommitted={handleRangeChangeCommitted}
                />
            </Box>
        </Drawer>
    );
};