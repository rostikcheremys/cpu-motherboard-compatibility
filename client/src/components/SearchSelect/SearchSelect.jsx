import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './SearchSelect.css';

export const SearchSelect = ({ options, onSelect, disabled }) => {
    const [value, setValue] = useState(null);

    useEffect(() => {
        if (disabled) {
            setValue(null);
            onSelect(null);
        }
    }, [disabled, onSelect]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onSelect(newValue);
    };

    return (
        <div className="search-select">
            <Autocomplete
                options={options}
                getOptionLabel={(option) => option.name}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                renderInput={(params) =>
                    <TextField {...params} variant="outlined" />
                }
            />
        </div>
    );
};