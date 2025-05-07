import './Table.css';

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from "@mui/material/TableHead";
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export const MotherboardTable = ({ motherboardData }) => {
    if (!motherboardData) console.error('Error: No motherboard data provided to MotherboardTable');

    return (
        <TableContainer className="table-container" component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Specifications</TableCell>
                        <TableCell align="center">Motherboard</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Manufacturer</TableCell>
                        <TableCell align="center">{motherboardData.manufacturer}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">{motherboardData.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Socket</TableCell>
                        <TableCell align="center">{motherboardData.socket}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Chipset</TableCell>
                        <TableCell align="center">{motherboardData.chipset}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Form Factor</TableCell>
                        <TableCell align="center">{motherboardData.form_factor}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Memory Type</TableCell>
                        <TableCell align="center">{motherboardData.memory_type}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>RAM Slots</TableCell>
                        <TableCell align="center">{motherboardData.ram_slots}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>RAM Channels</TableCell>
                        <TableCell align="center">{motherboardData.ram_channels}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Max RAM Capacity</TableCell>
                        <TableCell align="center">{motherboardData.max_ram_capacity} GB</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Min RAM Frequency</TableCell>
                        <TableCell align="center">{motherboardData.min_ram_frequency} MHz</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Max RAM Frequency</TableCell>
                        <TableCell align="center">{motherboardData.max_ram_frequency} MHz</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>XMP Support</TableCell>
                        <TableCell align="center">{motherboardData.xmp_support ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};