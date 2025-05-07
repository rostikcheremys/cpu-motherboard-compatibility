import './Select.css';

import { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const Select = ({ options, onSelect }) => {
    const [value, setValue] = useState(null);

    useEffect(() => {
        if (options.length === 0 && value !== null) {
            setValue(null);
            onSelect(null);
        }
    }, [options, value, onSelect]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        onSelect(newValue);
    };

    return (
        <div className="select">
            <Autocomplete
                options={options}
                getOptionLabel={(option) => option.name}
                value={value}
                onChange={handleChange}
                renderInput={(params) =>
                    <TextField {...params} variant="outlined" />
                }
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
            />
        </div>
    );
};