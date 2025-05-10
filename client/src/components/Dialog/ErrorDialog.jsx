import './Dialog.css';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

export const ErrorDialog = ({open, onCancel, onConfirm, description }) => {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle className="dialog__title error">Error</DialogTitle>

            <DialogContent>
                <DialogContentText className="dialog__description">
                    {description}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button className="dialog__button" onClick={onConfirm} autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};