import './EditDatabase.css';

import { useState, useEffect } from 'react';

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
import { EditTableButton } from "../../components/EditTableButton/EditTableButton.jsx";

export const EditDatabase = ({ darkMode, setDarkMode }) => {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editRow, setEditRow] = useState(null);
    const [newRow, setNewRow] = useState({});

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/tables');
            if (response.ok) {
                const data = await response.json();
                setTables(data);
            } else {
                setError('Failed to load tables');
            }
        } catch (err) {
            setError('Error fetching tables');
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
                setError('Failed to load table data');
            }
        } catch (err) {
            setError('Error fetching table data');
            console.error(err);
        }
    };

    const handleTableChange = (event, newValue) => {
        setSelectedTable(newValue);
        setEditRow(null);
        setNewRow({});
        if (newValue) {
            fetchTableData(newValue.name);
        } else {
            setTableData([]);
            setColumns([]);
        }
    };

    const handleEdit = (row) => {
        setEditRow(row);
        setNewRow({ ...row });
    };

    const handleSave = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/table/${selectedTable.name}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRow),
            });
            if (response.ok) {
                fetchTableData(selectedTable.name);
                setEditRow(null);
                alert('Changes saved successfully!');
            } else {
                setError('Failed to save changes');
            }
        } catch (err) {
            setError('Error saving changes');
            console.error(err);
        }
    };

    const handleAdd = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/table/${selectedTable.name}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRow),
            });
            if (response.ok) {
                fetchTableData(selectedTable.name);
                setNewRow({});
                alert('New row added successfully!');
            } else {
                setError('Failed to add new row');
            }
        } catch (err) {
            setError('Error adding new row');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/api/table/${selectedTable.name}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchTableData(selectedTable.name);
                alert('Row deleted successfully!');
            } else {
                setError('Failed to delete row');
            }
        } catch (err) {
            setError('Error deleting row');
            console.error(err);
        }
    };

    if (loading) return (
        <div className="edit-database__loading">
            <CircularProgress />
        </div>
    );

    if (error) return <div>{error}</div>;

    return (
        <div className="edit-database__container">
            <div className="edit-database__content">
                <Header
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                />

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
                                {columns.map((column) => (
                                    <TextField
                                        className="edit-database__text-field-add"
                                        variant="outlined"
                                        key={column}
                                        label={column}
                                        value={newRow[column] || ''}
                                        onChange={(e) => setNewRow({...newRow, [column]: e.target.value})}
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
                                            actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((row) => (
                                        <TableRow key={row.id || row.name}>
                                            {columns.map((column) => (
                                                <TableCell key={column} className="edit-database__table-cell">
                                                    {editRow === row ? (
                                                        <div>
                                                            <TextField
                                                                className="edit-database__text-field"
                                                                variant="outlined"
                                                                value={newRow[column] != null ? newRow[column].toString() : ''}
                                                                onChange={(e) => setNewRow({ ...newRow, [column]: e.target.value })}
                                                            />
                                                        </div>
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
                    <div className="edit-database__hint">No data available for this table!а</div>
                )}
            </div>
            <Footer />
        </div>
    );
};