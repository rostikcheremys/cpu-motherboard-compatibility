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
        console.error('Error fetching CPUs:', err.stack);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

app.get('/api/motherboards', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name FROM motherboards');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching motherboards:', err.stack);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

app.get('/api/motherboards/compatible/:cpuId', async (req, res) => {
    const { cpuId } = req.params;
    if (!cpuId || cpuId === 'undefined') {
        return res.status(400).json({ error: 'Invalid CPU ID' });
    }
    try {
        const result = await pool.query(
            'SELECT m.id, m.name FROM motherboards m ' +
            'JOIN compatibility c ON m.id = c.motherboard_id ' +
            'WHERE c.cpu_id = $1',
            [cpuId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching compatible motherboards:', err.stack);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

app.get('/api/cpu/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'SELECT c.id, c.name, cg.name AS generation, s.name AS socket, m.name AS manufacturer, mt.name AS memory_type, ' +
            'cf.name AS family, ca.name AS architecture, c.core_count, c.thread_count, c.base_frequency, c.max_frequency, ' +
            'c.cache_l3, c.has_integrated_gpu, c.unlocked_multiplier, c.memory_max_gb, c.process_nm, c.tdp_watts ' +
            'FROM cpus c ' +
            'JOIN cpu_generations cg ON cg.id = c.generation_id ' +
            'JOIN sockets s ON s.id = c.socket_id ' +
            'JOIN manufacturers m ON m.id = c.manufacturer_id ' +
            'JOIN memory_types mt ON mt.id = c.memory_type_id ' +
            'JOIN cpu_families cf ON cf.id = c.family_id ' +
            'JOIN cpu_architectures ca ON ca.id = c.architecture_id ' +
            'WHERE c.id = $1',
            [id]
        );
        if (!result.rows[0]) {
            return res.status(404).json({ error: 'CPU not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching CPU:', err.stack);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

app.get('/api/motherboard/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            'SELECT m.id, m.name, ch.name AS chipset, s.name AS socket, mf.name AS manufacturer, ff.name AS form_factor, ' +
            'mt.name AS memory_type, m.ram_slots, m.ram_channels, m.max_ram_capacity, m.min_ram_frequency, ' +
            'm.max_ram_frequency, m.xmp_support ' +
            'FROM motherboards m ' +
            'JOIN chipsets ch ON ch.id = m.chipset_id ' +
            'JOIN sockets s ON s.id = m.socket_id ' +
            'JOIN manufacturers mf ON mf.id = m.manufacturer_id ' +
            'JOIN form_factors ff ON ff.id = m.form_factor_id ' +
            'JOIN memory_types mt ON mt.id = m.memory_type_id ' +
            'WHERE m.id = $1',
            [id]
        );
        if (!result.rows[0]) {
            return res.status(404).json({ error: 'Motherboard not found' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching motherboard:', err.stack);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});