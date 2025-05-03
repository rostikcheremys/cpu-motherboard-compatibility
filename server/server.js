import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/cpus', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name FROM cpus');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/motherboards', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name FROM motherboards');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/motherboards/compatible/:cpuId', async (req, res) => {
    const { cpuId } = req.params;
    try {
        const result = await pool.query(
            'SELECT m.id, m.name FROM motherboards m ' +
            'JOIN compatibility c ON m.id = c.motherboard_id ' +
            'WHERE c.cpu_id = $1',
            [cpuId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});


/*app.get('/api/compatibility', async (req, res) => {
    const query = `
        SELECT 
            cpus.id AS cpu_id,
            cpus.name AS cpu_name,
            cpu_generation.name AS cpu_generation,
            socket.name AS cpu_socket,
            cpu_manufacturer.name AS cpu_manufacturer,
            cpu_memory_type.name AS cpu_memory_type,

            motherboards.id AS motherboard_id,
            motherboards.name AS motherboard_name,
            chipset.name AS motherboard_chipset,
            motherboard_socket.name AS motherboard_socket,
            motherboard_manufacturer.name AS motherboard_manufacturer,
            form_factor.name AS motherboard_form_factor,
            motherboard_memory_type.name AS motherboard_memory_type
        FROM 
            compatibility
        JOIN cpus ON cpus.id = compatibility.cpu_id
        JOIN motherboards ON motherboards.id = compatibility.motherboard_id
        JOIN socket ON socket.id = cpus.socket_id
        JOIN chipset ON chipset.id = motherboards.chipset_id
        JOIN cpu_generation ON cpu_generation.id = cpus.generation_id
        JOIN manufacturer AS cpu_manufacturer ON cpu_manufacturer.id = cpus.manufacturer_id
        JOIN manufacturer AS motherboard_manufacturer ON motherboard_manufacturer.id = motherboards.manufacturer_id
        JOIN form_factor ON form_factor.id = motherboards.form_factor_id
        JOIN memory_type AS cpu_memory_type ON cpu_memory_type.id = cpus.memory_type_id
        JOIN memory_type AS motherboard_memory_type ON motherboard_memory_type.id = motherboards.memory_type_id
        JOIN socket AS motherboard_socket ON motherboard_socket.id = motherboards.socket_id;
    `;

    try {
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});*/

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});
