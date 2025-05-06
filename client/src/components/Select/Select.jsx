import './Select.css';

import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const Select = ({ options, onSelect }) => {
    const [value, setValue] = useState(null);

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
            />
        </div>
    );
};