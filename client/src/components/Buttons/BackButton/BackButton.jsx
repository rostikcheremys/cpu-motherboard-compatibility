import "./BackButton.css"

import { Button } from "@mui/material";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const BackButton = ({ onBack }) => {
    return(
        <div className="back-button">
            <Button
                className="back-button__button"
                variant="contained"
                onClick={onBack}
            >
                <div className="back-button__content">
                    <ArrowBackIcon className="back-button__icon" />
                </div>
                Back
            </Button>
        </div>
    );
}