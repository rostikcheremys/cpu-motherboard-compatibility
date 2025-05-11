import { SpecsTable } from '../SpecsTable/SpecsTable.jsx';

export const MotherboardTable = ({ motherboardData }) => {
    const fields = [
        { label: 'Manufacturer', key: 'manufacturer' },
        { label: 'Name', key: 'name' },
        { label: 'Socket', key: 'socket' },
        { label: 'Chipset', key: 'chipset' },
        { label: 'Form Factor', key: 'form_factor' },
        { label: 'Memory Type', key: 'memory_type' },
        { label: 'RAM Slots', key: 'ram_slots' },
        { label: 'RAM Channels', key: 'ram_channels' },
        { label: 'Max RAM Capacity', key: 'max_ram_capacity', unit: 'GB' },
        { label: 'Min RAM Frequency', key: 'min_ram_frequency', unit: 'MHz' },
        { label: 'Max RAM Frequency', key: 'max_ram_frequency', unit: 'MHz' },
        { label: 'XMP Support', key: 'xmp_support', boolean: true }
    ];

    return <SpecsTable title="Motherboard" data={motherboardData} fields={fields} />;
};
