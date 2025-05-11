import React from "react";

import {
    Accordion,
    AccordionSummary,
    Typography,
    Slider,
    Checkbox,
    AccordionDetails,
    FormControlLabel
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
                              handleRangeChangeCommitted
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
        handleRangeChange(setRange, newValue);
    };

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
                {isCheckbox && options.length > 0 ? (
                    options.map((option) => (
                        <FormControlLabel
                            key={option}
                            control={
                                <Checkbox
                                    checked={selectedValues.includes(option)}
                                    onChange={() => onCheckboxChange(option)}
                                />
                            }
                            label={option}
                        />
                    ))
                ) : isRange && range ? (
                    <Slider
                        value={range}
                        onChange={onRangeChange}
                        onChangeCommitted={handleRangeChangeCommitted}
                        valueLabelDisplay="auto"
                        min={options.min}
                        max={options.max}
                        step={type === "TDP (Watts)" ? 5 : 1}
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