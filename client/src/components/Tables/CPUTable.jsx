import './Table.css';

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
                        <TableCell className="table-container_table_cell">CPU</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Manufacturer</TableCell>
                        <TableCell className="table-container_table_cell">{cpuData.manufacturer}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell className="table-container_table_cell">{cpuData.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Socket</TableCell>
                        <TableCell className="table-container_table_cell">{cpuData.socket}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Core Count</TableCell>
                        <TableCell className="table-container_table_cell">{cpuData.core_count}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Thread Count</TableCell>
                        <TableCell className="table-container_table_cell">{cpuData.thread_count}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Base Frequency</TableCell>
                        <TableCell className="table-container_table_cell">{cpuData.base_frequency} GHz</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Max Frequency</TableCell>
                        <TableCell className="table-container_table_cell">{cpuData.max_frequency} GHz</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Cache L3</TableCell>
                        <TableCell className="table-container_table_cell">{cpuData.cache_l3} MB</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Architecture</TableCell>
                        <TableCell className="table-container_table_cell">{cpuData.architecture}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Family</TableCell>
                        <TableCell className="table-container_table_cell">{cpuData.family}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Generation</TableCell>
                        <TableCell className="table-container_table_cell">{cpuData.generation}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Has Integrated GPU</TableCell>
                        <TableCell className="table-container_table_cell">{cpuData.has_integrated_gpu ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Unlocked Multiplier</TableCell>
                        <TableCell className="table-container_table_cell">{cpuData.unlocked_multiplier ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Memory Type</TableCell>
                        <TableCell className="table-container_table_cell">{cpuData.memory_type}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Memory Max GB</TableCell>
                        <TableCell className="table-container_table_cell">{cpuData.memory_max_gb} GB</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Process (nm)</TableCell>
                        <TableCell className="table-container_table_cell">{cpuData.process_nm} nm</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>TDP (Watts)</TableCell>
                        <TableCell className="table-container_table_cell">{cpuData.tdp_watts} W</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};