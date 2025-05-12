import './TableDB.css';

import {
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField
} from "@mui/material";

import { EditButtonDB } from "../Buttons/EditButtonDB/EditButtonDB.jsx";

export const TableDB = ({
                            selectedTable,
                            tableData,
                            columns,
                            editRow,
                            newRowForEdit,
                            setNewRowForEdit,
                            editErrors,
                            setEditErrors,
                            handleSave,
                            handleCancel,
                            handleEdit,
                            handleDelete
                        }) => {
    return(
        <div className="table-db">
            {selectedTable && tableData.length > 0 && (
                <div className="table-db__container">
                    <Paper className="table-db__paper">
                        <Table className="table-db__table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell className="table-db__table-cell">
                                            {column}
                                        </TableCell>
                                    ))}
                                    <TableCell className="table-db__table-cell">
                                        actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row) => (
                                    <TableRow key={row.id || row.name}>
                                        {columns.map((column) => (
                                            <TableCell key={column} className="table-db__table-cell">
                                                {editRow === row ? (
                                                    column !== 'id' ? (
                                                        <div>
                                                            <TextField
                                                                className="table-db__text-fields"
                                                                variant="outlined"
                                                                value={newRowForEdit[column] != null ? newRowForEdit[column].toString() : ''}
                                                                onChange={(e) => {
                                                                    setNewRowForEdit({...newRowForEdit, [column]: e.target.value });
                                                                    setEditErrors(prev => {
                                                                        const newEditErrors = { ...prev };
                                                                        delete newEditErrors[column];
                                                                        return newEditErrors;
                                                                    });
                                                                }}
                                                                error={!!editErrors[column]}
                                                                helperText={editErrors[column]}
                                                            />
                                                        </div>
                                                    ) : (
                                                        row[column] != null ? row[column].toString() : 'N/A'
                                                    )
                                                ) : (
                                                    row[column] != null ? row[column].toString() : 'N/A'
                                                )}
                                            </TableCell>
                                        ))}
                                        <TableCell className="table-db__table-cell">
                                            {editRow === row ? (
                                                <div className="table-db__buttons">
                                                    <EditButtonDB
                                                        name="Save"
                                                        style="save"
                                                        editClick={() => handleSave(row.id)}
                                                    />

                                                    <EditButtonDB
                                                        name="Cancel"
                                                        style="cancel"
                                                        editClick={handleCancel}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="table-db__buttons">
                                                    <EditButtonDB
                                                        name="Edit"
                                                        style="edit"
                                                        editClick={() => handleEdit(row)}
                                                    />

                                                    <EditButtonDB
                                                        name="Delete"
                                                        style="delete"
                                                        editClick={() => handleDelete(row.id)}
                                                    />
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            )}
            {selectedTable && tableData.length === 0 && (
                <div className="table-db__hint">
                    No data available for this table!
                </div>
            )}
        </div>
    );
}