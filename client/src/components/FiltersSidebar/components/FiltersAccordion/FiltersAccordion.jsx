import {
    Accordion,
    AccordionSummary,
    Typography,
    Slider,
    Checkbox,
    AccordionDetails,
    FormControlLabel,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

export const FiltersAccordion = ({
                                     title,
                                     options,
                                     selectedValues,
                                     setSelectedValues,
                                     range,
                                     setRange,
                                     type,
                                     expandedAccordions,
                                     handleAccordionChange,
                                     handleCheckboxChange,
                                     handleBooleanChange,
                                     handleRangeChange,
                                     handleRangeChangeCommitted,
                                 }) => {
    const isRange = type === "range";
    const isBoolean = type === "boolean";
    const isCheckbox = type === "checkbox";

    const onCheckboxChange = (option) => {
        handleCheckboxChange(setSelectedValues, selectedValues, option);
    };

    const onBooleanChange = (value) => {
        handleBooleanChange(setSelectedValues, value);
    };

    const onRangeChange = (event, newValue) => {
        handleRangeChange(setRange)(event, newValue);
    };

    const validRange = Array.isArray(range) && range.length === 2 && range.every((val) => typeof val === "number")
        ? range
        : [options?.min || 0, options?.max || 100];

    const min = isRange ? (options?.min ?? 0) : undefined;
    const max = isRange ? (options?.max ?? 100) : undefined;
    const step = title === "TDP (Watts)" ? 5 : 1;

    return (
        <Accordion
            className="filters-sidebar__accordion"
            expanded={expandedAccordions.has(title)}
            onChange={handleAccordionChange(title)}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {isCheckbox && Array.isArray(options) && options.length > 0 ? (
                    options.map((option) => (
                        <FormControlLabel
                            key={option}
                            control={
                                <Checkbox
                                    checked={selectedValues.includes(option)}
                                    onChange={() => onCheckboxChange(option)}
                                />
                            }
                            label={option.toString()}
                        />
                    ))
                ) : isRange && min !== undefined && max !== undefined ? (
                    <Slider
                        value={validRange}
                        onChange={onRangeChange}
                        onChangeCommitted={handleRangeChangeCommitted}
                        valueLabelDisplay="auto"
                        min={min}
                        max={max}
                        step={step}
                    />
                ) : isBoolean ? (
                    <>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedValues === true}
                                    onChange={() => onBooleanChange(true)}
                                />
                            }
                            label="Yes"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedValues === false}
                                    onChange={() => onBooleanChange(false)}
                                />
                            }
                            label="No"
                        />
                    </>
                ) : (
                    <Typography>No {title.toLowerCase()} available</Typography>
                )}
            </AccordionDetails>
        </Accordion>
    );
};