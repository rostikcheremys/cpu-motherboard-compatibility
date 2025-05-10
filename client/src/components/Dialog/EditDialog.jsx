import './Dialog.css';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

export const EditDialog = ({open, onCancel, onConfirm, title, description, confirmText, cancelText, error }) => {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle className="dialog__title">{title}</DialogTitle>

            <DialogContent>
                <DialogContentText className="dialog__description">
                    {description}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button className="dialog__button" onClick={onConfirm} autoFocus>
                    {confirmText}
                </Button>
                <Button className="dialog__button" onClick={onCancel}>
                    {cancelText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};