import './SpecsTable.css';

import {
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer
} from '@mui/material';

export const SpecsTable = ({ title, data, fields }) => {
    if (!data) {
        console.error(`Error: No data provided to ${title} Table`);
        return null;
    }

    return (
        <TableContainer className="specs-table" component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Specifications</TableCell>
                        <TableCell className="specs-table_table_cell"> {title}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {fields.map(({ label, key, unit }) => (
                        <TableRow key={key}>
                            <TableCell>{label}</TableCell>
                            <TableCell className="specs-table_table_cell">
                                {typeof data[key] === 'boolean'
                                    ? data[key] ? 'Yes' : 'No'
                                    : `${data[key]}${unit || ''}`}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};