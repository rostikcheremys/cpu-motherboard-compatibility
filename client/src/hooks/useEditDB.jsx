import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export const useEditDB = () => {
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editRow, setEditRow] = useState(null);
    const [newRowForEdit, setNewRowForEdit] = useState({});
    const [newRowForAdd, setNewRowForAdd] = useState({});
    const [addErrors, setAddErrors] = useState({});
    const [editErrors, setEditErrors] = useState({});
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

    const isValidateEdit = () => {
        const newEditErrors = {};
        const requiredFields = columns.filter(column => column !== 'id');

        requiredFields.forEach(column => {
            if (!newRowForEdit[column] || newRowForEdit[column].toString().trim() === '') {
                newEditErrors[column] = 'This field is required';
            }
        });

        setEditErrors(newEditErrors);
        return Object.keys(newEditErrors).length === 0;
    };

    const isValidateAdd = () => {
        const newErrors = {};
        const requiredFields = columns.filter(column => column !== 'id');

        requiredFields.forEach(column => {
            if (!newRowForAdd[column] || newRowForAdd[column].toString().trim() === '') {
                newErrors[column] = 'This field is required!';
            }
        });

        setAddErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleTableChange = (event, newValue) => {
        setSelectedTable(newValue);
        setEditRow(null);
        setNewRowForEdit({});
        setNewRowForAdd({});
        setAddErrors({});
        setEditErrors({});

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
        setEditErrors({});
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

    const handleAdd = async () => {
        if (!isValidateAdd()) {
            return;
        }

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
                        setAddErrors({});
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

    const handleSave = async (id) => {
        if (!isValidateEdit()) {
            return;
        }

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
                        setEditErrors({});
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

    const handleCancel = () => {
        openDialog(
            () => {
                setEditRow(null);
                setNewRowForEdit({});
                setEditErrors({});
            },
            {
                title: 'Confirm Cancel',
                description: 'Are you sure you want to cancel editing? Changes will be discarded.',
                confirmText: 'Yes',
                cancelText: 'No',
            }
        );
    };

    return {
        tables,
        selectedTable,
        tableData,
        columns,
        loading,
        error,
        editRow,
        newRowForEdit,
        setNewRowForEdit,
        newRowForAdd,
        setNewRowForAdd,
        addErrors,
        setAddErrors,
        editErrors,
        setEditErrors,
        errorDialogOpen,
        dialogOpen,
        dialogConfig,
        handleTableChange,
        handleEdit,
        handleAdd,
        handleSave,
        handleDelete,
        handleBack,
        handleCancel,
        handleCancelDialog,
        handleConfirmDialog,
        handleConfirmErrorDialog,
        handleCancelErrorDialog,
    };
};