import './TextFieldsDB.css';

import TextField from "@mui/material/TextField";

import { EditButtonDB } from "../Buttons/EditButtonDB/EditButtonDB.jsx";

export const TextFieldsDB = ({
                                 selectedTable,
                                 columns,
                                 newRowForAdd,
                                 setNewRowForAdd,
                                 addErrors,
                                 setAddErrors,
                                 handleAdd
                            }) => {
    return (
        <div className="text-fields-db">
            {selectedTable && columns.length > 0 && (
                <div className="text-fields-db__wrapper">
                    <h3 className="text-fields-db__label">Add new record:</h3>
                    <div className="text-fields-db__container">
                        {columns
                            .filter(column => column !== 'id')
                            .map((column) => (
                                <TextField
                                    className="text-fields-db__text-field"
                                    variant="outlined"
                                    key={column}
                                    label={column}
                                    value={newRowForAdd[column] || ''}
                                    onChange={(e) => {
                                        setNewRowForAdd({...newRowForAdd, [column]: e.target.value});
                                        setAddErrors(prev => {
                                            const newErrors = {...prev};
                                            delete newErrors[column];
                                            return newErrors;
                                        });
                                    }}
                                    error={!!addErrors[column]}
                                    helperText={addErrors[column]}
                                />
                            ))}
                    </div>

                    <EditButtonDB
                        name="Add"
                        style="add"
                        editClick={handleAdd}
                    />
                </div>
            )}
        </div>
    );
}