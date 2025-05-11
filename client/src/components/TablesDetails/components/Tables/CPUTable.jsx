import { SpecsTable } from '../SpecsTable/SpecsTable.jsx';

export const CPUTable = ({ cpuData }) => {
    const fields = [
        { label: 'Manufacturer', key: 'manufacturer' },
        { label: 'Name', key: 'name' },
        { label: 'Socket', key: 'socket' },
        { label: 'Core Count', key: 'core_count' },
        { label: 'Thread Count', key: 'thread_count' },
        { label: 'Base Frequency', key: 'base_frequency', unit: 'GHz' },
        { label: 'Max Frequency', key: 'max_frequency', unit: 'GHz' },
        { label: 'Cache L3', key: 'cache_l3', unit: 'MB' },
        { label: 'Architecture', key: 'architecture' },
        { label: 'Family', key: 'family' },
        { label: 'Generation', key: 'generation' },
        { label: 'Has Integrated GPU', key: 'has_integrated_gpu', boolean: true },
        { label: 'Unlocked Multiplier', key: 'unlocked_multiplier', boolean: true },
        { label: 'Memory Type', key: 'memory_type' },
        { label: 'Memory Max GB', key: 'memory_max_gb', unit: 'GB' },
        { label: 'Process (nm)', key: 'process_nm', unit: 'nm' },
        { label: 'TDP (Watts)', key: 'tdp_watts', unit: 'W' }
    ];

    return <SpecsTable title="CPU" data={cpuData} fields={fields} />;
};
