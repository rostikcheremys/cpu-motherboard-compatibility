import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/cpu', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name FROM cpu');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/motherboard', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name FROM motherboard');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
