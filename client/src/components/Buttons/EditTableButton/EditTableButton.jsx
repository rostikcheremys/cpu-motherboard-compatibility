import "./EditTableButton.css"

import { Button } from "@mui/material";

import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

export const EditTableButton = ({ name, style, editClick }) => {
    const icons = {
        add: AddIcon,
        edit: EditIcon,
        save: SaveIcon,
        delete: DeleteIcon,
    };

    const IconComponent = icons[style];

    return(
        <div className="edit-table-button">
            <Button
                className={`edit-table-button__button ${style}`}
                variant="contained"
                onClick={editClick}
            >
                <div className="edit-table-button__content">
                    {IconComponent && <IconComponent className="edit-table-button__icon" />}
                </div>
                {name}
            </Button>
        </div>
    );
}