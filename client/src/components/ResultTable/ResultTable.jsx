import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const ResultTable = ({ compatibilityData }) => {

    if (!compatibilityData) {
        return <p>No compatibility data available.</p>;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Parameter</TableCell>
                        <TableCell align="center">Processor</TableCell>
                        <TableCell align="center">Motherboard</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">{compatibilityData.cpu_name}</TableCell>
                        <TableCell align="center">{compatibilityData.motherboard_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Generation</TableCell>
                        <TableCell align="center">{compatibilityData.cpu_generation}</TableCell>
                        <TableCell align="center">-</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Socket</TableCell>
                        <TableCell align="center">{compatibilityData.cpu_socket}</TableCell>
                        <TableCell align="center">{compatibilityData.motherboard_socket}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Manufacturer</TableCell>
                        <TableCell align="center">{compatibilityData.cpu_manufacturer}</TableCell>
                        <TableCell align="center">{compatibilityData.motherboard_manufacturer}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Memory Type</TableCell>
                        <TableCell align="center">{compatibilityData.cpu_memory_type}</TableCell>
                        <TableCell align="center">{compatibilityData.motherboard_memory_type}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Chipset</TableCell>
                        <TableCell align="center">-</TableCell>
                        <TableCell align="center">{compatibilityData.motherboard_chipset}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Form Factor</TableCell>
                        <TableCell align="center">-</TableCell>
                        <TableCell align="center">{compatibilityData.motherboard_form_factor}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};
