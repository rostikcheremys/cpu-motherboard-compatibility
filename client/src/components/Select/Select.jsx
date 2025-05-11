import './Select.css';

import { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const Select = ({ options, onSelect, onChange }) => {
    const [value, setValue] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (options.length === 0 && value !== null) {
            setValue(null);
            onSelect?.(null);
        }
    }, [options, value, onSelect]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onSelect?.(newValue);

        if (onChange) onChange(event, newValue);

        setOpen(false);
    };

    return (
        <div className="select">
            <Autocomplete
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                options={options}
                getOptionLabel={(option) => option.name || ''}
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
            />
        </div>
    );
};