import './Tables.css';

import React from 'react';

import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from "@mui/material/TableHead";
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export const CPUTable = ({ cpuData }) => {
    if (!cpuData) console.error('Error: No CPU data provided to CPUTable');

    return (
        <TableContainer className="table-container" component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Specifications</TableCell>
                        <TableCell align="center">CPU</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Manufacturer</TableCell>
                        <TableCell align="center">{cpuData.manufacturer}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="center">{cpuData.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Socket</TableCell>
                        <TableCell align="center">{cpuData.socket}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Core Count</TableCell>
                        <TableCell align="center">{cpuData.core_count}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Thread Count</TableCell>
                        <TableCell align="center">{cpuData.thread_count}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Base Frequency</TableCell>
                        <TableCell align="center">{cpuData.base_frequency} GHz</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Max Frequency</TableCell>
                        <TableCell align="center">{cpuData.max_frequency} GHz</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Cache L3</TableCell>
                        <TableCell align="center">{cpuData.cache_l3} MB</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Architecture</TableCell>
                        <TableCell align="center">{cpuData.architecture}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Family</TableCell>
                        <TableCell align="center">{cpuData.family}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Generation</TableCell>
                        <TableCell align="center">{cpuData.generation}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Has Integrated GPU</TableCell>
                        <TableCell align="center">{cpuData.has_integrated_gpu ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Unlocked Multiplier</TableCell>
                        <TableCell align="center">{cpuData.unlocked_multiplier ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Memory Type</TableCell>
                        <TableCell align="center">{cpuData.memory_type}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Memory Max GB</TableCell>
                        <TableCell align="center">{cpuData.memory_max_gb} GB</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Process (nm)</TableCell>
                        <TableCell align="center">{cpuData.process_nm} nm</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>TDP (Watts)</TableCell>
                        <TableCell align="center">{cpuData.tdp_watts} W</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};