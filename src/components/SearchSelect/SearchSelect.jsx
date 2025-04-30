import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './SearchSelect.css';

export const SearchSelect = ({ options, onSelect }) => {
    const handleChange = (event, newValue) => {
        onSelect(newValue);
    };

    return (
        <div className="search-select">
            <Autocomplete
                options={options}
                getOptionLabel={(option) => option.name}
                onChange={handleChange}
                renderInput={(params) =>
                    <TextField {...params} variant="outlined" />
                }
            />
        </div>
    );
};
