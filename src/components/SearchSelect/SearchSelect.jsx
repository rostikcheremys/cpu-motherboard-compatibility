import "./SearchSelect.css";

import React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const options = [
    { label: 'Київ', id: 1 },
    { label: 'Львів', id: 2 },
    { label: 'Одеса', id: 3 },
];

export const SearchSelect = () => {
    return (
        <div className="search-select">
            <Autocomplete
                options={options}
                getOptionLabel={(option) => option.label}
                renderInput={(params) =>
                    <TextField {...params} variant="outlined" />}
            />
        </div>
    );
}
