import './EditDatabase.css';

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from "@mui/material/TableHead";
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { CircularProgress } from "@mui/material";

import { Header } from "../../components/Header/Header.jsx";
import { Select } from "../../components/Select/Select.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";
import { EditDialog } from "../../components/Dialog/EditDialog.jsx";
import { ErrorDialog } from "../../components/Dialog/ErrorDialog.jsx";
import { BackButton } from "../../components/BackButton/BackButton.jsx";
import { EditTableButton } from "../../components/EditTableButton/EditTableButton.jsx";

export const EditDatabase = ({ darkMode, setDarkMode }) => {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editRow, setEditRow] = useState(null);
    const [newRowForEdit, setNewRowForEdit] = useState({});
    const [newRowForAdd, setNewRowForAdd] = useState({});
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogAction, setDialogAction] = useState(null);
    const [dialogConfig, setDialogConfig] = useState({
        title: '',
        description: '',
        confirmText: '',
        cancelText: '',
    });

    const navigate = useNavigate();

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    useEffect(() => {
        fetchTables();
    }, []);

    useEffect(() => {
        if (error) {
            setErrorDialogOpen(true);
        }
    }, [error]);

    const fetchTables = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/tables');
            if (response.ok) {
                const data = await response.json();
                setTables(data);
            } else {
                setError('Failed to load tables!');
            }
        } catch (err) {
            setError('Error fetching tables!');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchTableData = async (tableName) => {
        try {
            const response = await fetch(`http://localhost:3001/api/table/${tableName}`);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    const cols = Object.keys(data[0]);
                    setColumns(cols);
                    setTableData(data);
                } else {
                    setColumns([]);
                    setTableData([]);
                }
            } else {
                setError('Failed to load table data!');
            }
        } catch (err) {
            setError('Error fetching table data!');
            console.error(err);
        }
    };

    const handleTableChange = (event, newValue) => {
        setSelectedTable(newValue);
        setEditRow(null);
        setNewRowForEdit({});
        setNewRowForAdd({});
        if (newValue) {
            fetchTableData(newValue.name);
        } else {
            setTableData([]);
            setColumns([]);
        }
    };

    const handleEdit = (row) => {
        setEditRow(row);
        setNewRowForEdit({ ...row });
    };

    const openDialog = (action, config) => {
        setDialogAction(() => action);
        setDialogConfig(config);
        setDialogOpen(true);
    };

    const handleCancelDialog = () => {
        setDialogOpen(false);
        setDialogAction(null);
    };

    const handleConfirmDialog = () => {
        if (dialogAction) {
            dialogAction();
        }
        setDialogOpen(false);
        setDialogAction(null);
    };

    const handleConfirmErrorDialog = () => {
        setErrorDialogOpen(false);
        setError(null);
    };

    const handleCancelErrorDialog = () => {
        setErrorDialogOpen(false);
        setError(null);
    };

    const handleSave = async (id) => {
        openDialog(
            async () => {
                try {
                    const response = await fetch(`http://localhost:3001/api/table/${selectedTable.name}/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newRowForEdit),
                    });
                    if (response.ok) {
                        fetchTableData(selectedTable.name);
                        setEditRow(null);
                    } else {
                        setError('Failed to save changes!');
                    }
                } catch (err) {
                    setError('Error saving changes!');
                    console.error(err);
                }
            },
            {
                title: 'Confirm Save',
                description: 'Are you sure you want to save changes?',
                confirmText: 'Save',
                cancelText: 'Cancel',
            }
        );
    };

    const handleAdd = async () => {
        const existingIds = new Set(tableData.map(row => parseInt(row.id)));
        let newId = tableData.length > 0 ? Math.max(...existingIds) + 1 : 1;

        while (existingIds.has(newId)) {
            newId += 1;
        }

        const updatedNewRowForAdd = {
            ...newRowForAdd,
            id: newId.toString(),
        };

        openDialog(
            async () => {
                try {
                    const response = await fetch(`http://localhost:3001/api/table/${selectedTable.name}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedNewRowForAdd),
                    });
                    if (response.ok) {
                        fetchTableData(selectedTable.name);
                        setNewRowForAdd({});
                    } else {
                        setError('Failed to add new row!');
                    }
                } catch (err) {
                    setError('Error adding new row!');
                    console.error(err);
                }
            },
            {
                title: 'Confirm Add',
                description: 'Are you sure you want to add a new row?',
                confirmText: 'Add',
                cancelText: 'Cancel',
            }
        );
    };

    const handleDelete = async (id) => {
        openDialog(
            async () => {
                try {
                    const response = await fetch(`http://localhost:3001/api/table/${selectedTable.name}/${id}`, {
                        method: 'DELETE',
                    });
                    if (response.ok) {
                        fetchTableData(selectedTable.name);
                    } else {
                        setError('Failed to delete row!');
                    }
                } catch (err) {
                    setError('Error deleting row!');
                    console.error(err);
                }
            },
            {
                title: 'Confirm Delete',
                description: 'Are you sure you want to delete this row?',
                confirmText: 'Delete',
                cancelText: 'Cancel',
            }
        );
    };

    const handleBack = () => {
        openDialog(
            () => navigate("/"),
            {
                title: 'Confirm Exit',
                description: 'Are you sure you want to go back? Unsaved changes will be lost.',
                confirmText: 'Yes',
                cancelText: 'No',
            }
        );
    };

    if (loading) return (
        <div className="edit-database__loading">
            <CircularProgress />
        </div>
    );

    return (
        <div className="edit-database__container">
            <div className="edit-database__content">
                <Header
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                />

                <BackButton onBack={handleBack} />

                <div className="edit-database__tables-select">
                    <h5 className="edit-database__hint">Select table:</h5>
                    <Select
                        options={tables}
                        onChange={handleTableChange}
                    />
                </div>

                <div className="edit-database__text-fields-container">
                    {selectedTable && columns.length > 0 && (
                        <div className="edit-database__text-fields-wrapper">
                            <div className="edit-database__text-fields">
                                {columns
                                    .filter(column => column !== 'id')
                                    .map((column) => (
                                    <TextField
                                        className="edit-database__text-field-add"
                                        variant="outlined"
                                        key={column}
                                        label={column}
                                        value={newRowForAdd[column] || ''}
                                        onChange={(e) => setNewRowForAdd({ ...newRowForAdd, [column]: e.target.value })}
                                    />
                                ))}
                            </div>

                            <EditTableButton
                                name="Add"
                                style="add"
                                editClick={handleAdd}
                            />
                        </div>
                    )}
                </div>

                {selectedTable && tableData.length > 0 && (
                    <div className="edit-database__table-container">
                        <Paper className="edit-database__paper">
                            <Table className="edit-database__table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell className="edit-database__table-cell">
                                                {column}
                                            </TableCell>
                                        ))}
                                        <TableCell className="edit-database__table-cell">
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((row) => (
                                        <TableRow key={row.id || row.name}>
                                            {columns
                                                .map((column) => (
                                                <TableCell key={column} className="edit-database__table-cell">
                                                    {editRow === row ? (
                                                        column !== 'id' ? (
                                                            <div>
                                                                <TextField
                                                                    className="edit-database__text-field"
                                                                    variant="outlined"
                                                                    value={newRowForEdit[column] != null ? newRowForEdit[column].toString() : ''}
                                                                    onChange={(e) => setNewRowForEdit({ ...newRowForEdit, [column]: e.target.value })}
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
                                            <TableCell className="edit-database__table-cell">
                                                {editRow === row ? (
                                                    <div className="edit-database__table-buttons">
                                                        <EditTableButton
                                                            name="Save"
                                                            style="save"
                                                            editClick={() => handleSave(row.id)}
                                                        />

                                                        <EditTableButton
                                                            name="Delete"
                                                            style="delete"
                                                            editClick={() => handleDelete(row.id)}
                                                        />
                                                    </div>
                                                ) : (
                                                    <EditTableButton
                                                        name="Edit"
                                                        style="edit"
                                                        editClick={() => handleEdit(row)}
                                                    />
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
                    <div className="edit-database__hint">
                        No data available for this table!
                    </div>
                )}
            </div>

            <EditDialog
                open={dialogOpen}
                onCancel={handleCancelDialog}
                onConfirm={handleConfirmDialog}
                title={dialogConfig.title}
                description={dialogConfig.description}
                confirmText={dialogConfig.confirmText}
                cancelText={dialogConfig.cancelText}
            />

            <ErrorDialog
                open={errorDialogOpen}
                onCancel={handleCancelErrorDialog}
                onConfirm={handleConfirmErrorDialog}
                description={error || 'An error occurred.'}
            />

            <Footer />
        </div>
    );
};