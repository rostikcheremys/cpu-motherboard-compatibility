import "./EditButton.css"

import { Button } from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';

export const EditButton = ({ isEditOpen }) => {
    return(
        <div className="edit-button">
            <Button
                className="edit-button__button"
                variant="contained"
                onClick={isEditOpen}
            >
                <div className="edit-button__content">
                    <EditIcon className="edit-button__icon" />
                </div>
                Edit
            </Button>
        </div>
    );
}