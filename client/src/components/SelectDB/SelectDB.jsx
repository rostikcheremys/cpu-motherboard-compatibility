import './SelectDB.css';

import { Select } from "../Select/Select.jsx";

export const SelectDB = ({ options, onChange }) => {
    return (
        <div className="select-db">
            <h5 className="select-db__hint">Select table:</h5>
            <Select
                options={options}
                onChange={onChange}
            />
        </div>
    );
}