import './EditDB.css';

import { CircularProgress } from "@mui/material";

import { useEditDB } from "../../hooks/useEditDB.jsx";

import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";
import { BackButton } from "../../components/Buttons/BackButton/BackButton.jsx";
import { SelectDB } from "../../components/SelectDB/SelectDB.jsx";
import { TextFieldsDB } from "../../components/TextFieldsDB/TextFieldsDB.jsx";
import { TableDB } from "../../components/TableDB/TableDB.jsx";
import { EditDialog } from "../../components/Dialog/EditDialog.jsx";
import { ErrorDialog } from "../../components/Dialog/ErrorDialog.jsx";

export const EditDB = ({ darkMode, setDarkMode }) => {
    const {
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
    } = useEditDB();

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
    };

    if (loading) return (
        <div className="edit-db__loading">
            <CircularProgress />
        </div>
    );

    return (
        <div className="edit-db">
            <div className="edit-db__container">
                <Header
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                />

                <BackButton onBack={handleBack} />

                <SelectDB
                    options={tables}
                    onChange={handleTableChange}
                />

                <TextFieldsDB
                    selectedTable={selectedTable}
                    columns={columns}
                    newRowForAdd={newRowForAdd}
                    setNewRowForAdd={setNewRowForAdd}
                    addErrors={addErrors}
                    setAddErrors={setAddErrors}
                    handleAdd={handleAdd}
                />

                <TableDB
                    selectedTable={selectedTable}
                    tableData={tableData}
                    columns={columns}
                    editRow={editRow}
                    newRowForEdit={newRowForEdit}
                    setNewRowForEdit={setNewRowForEdit}
                    editErrors={editErrors}
                    setEditErrors={setEditErrors}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
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