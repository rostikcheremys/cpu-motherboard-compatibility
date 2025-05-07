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

app.get('/api/components/filter', async (req, res) => {
    const {
        type,
        manufacturers,
        sockets,
        coreCountMin,
        coreCountMax,
        threadCountMin,
        threadCountMax,
        cacheL3Min,
        cacheL3Max,
        architectures,
        families,
        generations,
        hasIntegratedGpu,
        unlockedMultiplier,
        memoryTypes,
        memoryMaxGbMin,
        memoryMaxGbMax,
        processNmMin,
        processNmMax,
        tdpMin,
        tdpMax,
        chipsets,
        formFactors,
        ramSlots,
        ramChannels,
        maxRamCapacity,
        minRamFrequency,
        maxRamFrequency,
        xmpSupport
    } = req.query;

    try {
        let query, conditions, params, paramIndex;

        if (type === 'cpu') {
            query = `
                SELECT c.id, c.name
                FROM cpus c
                JOIN manufacturers m ON m.id = c.manufacturer_id
                JOIN sockets s ON s.id = c.socket_id
                JOIN cpu_architectures ca ON ca.id = c.architecture_id
                JOIN cpu_families cf ON cf.id = c.family_id
                JOIN cpu_generations cg ON cg.id = c.generation_id
                JOIN memory_types mt ON mt.id = c.memory_type_id
            `;
            conditions = [];
            params = [];
            paramIndex = 1;

            if (manufacturers) {
                const manufacturerList = manufacturers.split(',').map(item => item.trim());
                conditions.push(`m.name = ANY($${paramIndex}::text[]) AND m.id BETWEEN 1 AND 2`);
                params.push(manufacturerList);
                paramIndex++;
            } else {
                conditions.push(`m.id BETWEEN 1 AND 2`);
            }
            if (sockets) {
                const socketList = sockets.split(',').map(item => item.trim());
                conditions.push(`s.name = ANY($${paramIndex}::text[])`);
                params.push(socketList);
                paramIndex++;
            }
            if (coreCountMin) {
                conditions.push(`c.core_count >= $${paramIndex}`);
                params.push(parseInt(coreCountMin));
                paramIndex++;
            }
            if (coreCountMax) {
                conditions.push(`c.core_count <= $${paramIndex}`);
                params.push(parseInt(coreCountMax));
                paramIndex++;
            }
            if (threadCountMin) {
                conditions.push(`c.thread_count >= $${paramIndex}`);
                params.push(parseInt(threadCountMin));
                paramIndex++;
            }
            if (threadCountMax) {
                conditions.push(`c.thread_count <= $${paramIndex}`);
                params.push(parseInt(threadCountMax));
                paramIndex++;
            }
            if (cacheL3Min) {
                conditions.push(`c.cache_l3 >= $${paramIndex}`);
                params.push(parseInt(cacheL3Min));
                paramIndex++;
            }
            if (cacheL3Max) {
                conditions.push(`c.cache_l3 <= $${paramIndex}`);
                params.push(parseInt(cacheL3Max));
                paramIndex++;
            }
            if (architectures) {
                const architectureList = architectures.split(',').map(item => item.trim());
                conditions.push(`ca.name = ANY($${paramIndex}::text[])`);
                params.push(architectureList);
                paramIndex++;
            }
            if (families) {
                const familyList = families.split(',').map(item => item.trim());
                conditions.push(`cf.name = ANY($${paramIndex}::text[])`);
                params.push(familyList);
                paramIndex++;
            }
            if (generations) {
                const generationList = generations.split(',').map(item => item.trim());
                conditions.push(`cg.name = ANY($${paramIndex}::text[])`);
                params.push(generationList);
                paramIndex++;
            }
            if (hasIntegratedGpu) {
                conditions.push(`c.has_integrated_gpu = $${paramIndex}`);
                params.push(hasIntegratedGpu === 'true');
                paramIndex++;
            }
            if (unlockedMultiplier) {
                conditions.push(`c.unlocked_multiplier = $${paramIndex}`);
                params.push(unlockedMultiplier === 'true');
                paramIndex++;
            }
            if (memoryTypes) {
                const memoryTypeList = memoryTypes.split(',').map(item => item.trim());
                conditions.push(`mt.name = ANY($${paramIndex}::text[])`);
                params.push(memoryTypeList);
                paramIndex++;
            }
            if (memoryMaxGbMin) {
                conditions.push(`c.memory_max_gb >= $${paramIndex}`);
                params.push(parseInt(memoryMaxGbMin));
                paramIndex++;
            }
            if (memoryMaxGbMax) {
                conditions.push(`c.memory_max_gb <= $${paramIndex}`);
                params.push(parseInt(memoryMaxGbMax));
                paramIndex++;
            }
            if (processNmMin) {
                conditions.push(`c.process_nm >= $${paramIndex}`);
                params.push(parseInt(processNmMin));
                paramIndex++;
            }
            if (processNmMax) {
                conditions.push(`c.process_nm <= $${paramIndex}`);
                params.push(parseInt(processNmMax));
                paramIndex++;
            }
            if (tdpMin) {
                conditions.push(`c.tdp_watts >= $${paramIndex}`);
                params.push(parseInt(tdpMin));
                paramIndex++;
            }
            if (tdpMax) {
                conditions.push(`c.tdp_watts <= $${paramIndex}`);
                params.push(parseInt(tdpMax));
                paramIndex++;
            }

            if (conditions.length > 0) {
                query += ' WHERE ' + conditions.join(' AND ');
            }
            console.log('CPU Query:', query, params);
            const cpuResult = await pool.query(query, params);
            console.log('CPU Result:', cpuResult.rows.length);
            res.json({ cpus: cpuResult.rows, motherboards: [] });
        } else if (type === 'motherboard') {
            query = `
                SELECT m.id, m.name
                FROM motherboards m
                JOIN manufacturers mf ON mf.id = m.manufacturer_id
                JOIN sockets s ON s.id = m.socket_id
                JOIN chipsets ch ON ch.id = m.chipset_id
                JOIN form_factors ff ON ff.id = m.form_factor_id
                JOIN memory_types mt ON mt.id = m.memory_type_id
            `;
            conditions = [];
            params = [];
            paramIndex = 1;

            if (manufacturers) {
                const manufacturerList = manufacturers.split(',').map(item => item.trim());
                conditions.push(`mf.name = ANY($${paramIndex}::text[]) AND mf.id >= 3`);
                params.push(manufacturerList);
                paramIndex++;
            } else {
                conditions.push(`mf.id >= 3`);
            }
            if (sockets) {
                const socketList = sockets.split(',').map(item => item.trim());
                conditions.push(`s.name = ANY($${paramIndex}::text[])`);
                params.push(socketList);
                paramIndex++;
            }
            if (chipsets) {
                const chipsetList = chipsets.split(',').map(item => item.trim());
                conditions.push(`ch.name = ANY($${paramIndex}::text[])`);
                params.push(chipsetList);
                paramIndex++;
            }
            if (formFactors) {
                const formFactorList = formFactors.split(',').map(item => item.trim());
                conditions.push(`ff.name = ANY($${paramIndex}::text[])`);
                params.push(formFactorList);
                paramIndex++;
            }
            if (memoryTypes) {
                const memoryTypeList = memoryTypes.split(',').map(item => item.trim());
                conditions.push(`mt.name = ANY($${paramIndex}::text[])`);
                params.push(memoryTypeList);
                paramIndex++;
            }
            if (ramSlots) {
                const ramSlotsList = ramSlots.split(',').map(item => parseInt(item.trim()));
                if (ramSlotsList.length > 0) {
                    conditions.push(`m.ram_slots = ANY($${paramIndex}::int[])`);
                    params.push(ramSlotsList);
                    paramIndex++;
                }
            }
            if (ramChannels) {
                const ramChannelsList = ramChannels.split(',').map(item => parseInt(item.trim()));
                if (ramChannelsList.length > 0) {
                    conditions.push(`m.ram_channels = ANY($${paramIndex}::int[])`);
                    params.push(ramChannelsList);
                    paramIndex++;
                }
            }
            if (maxRamCapacity) {
                const maxRamCapacityList = maxRamCapacity.split(',').map(item => parseInt(item.trim()));
                if (maxRamCapacityList.length > 0) {
                    conditions.push(`m.max_ram_capacity = ANY($${paramIndex}::int[])`);
                    params.push(maxRamCapacityList);
                    paramIndex++;
                }
            }
            if (minRamFrequency) {
                const minRamFrequencyList = minRamFrequency.split(',').map(item => parseInt(item.trim()));
                if (minRamFrequencyList.length > 0) {
                    conditions.push(`m.min_ram_frequency = ANY($${paramIndex}::int[])`);
                    params.push(minRamFrequencyList);
                    paramIndex++;
                }
            }
            if (maxRamFrequency) {
                const maxRamFrequencyList = maxRamFrequency.split(',').map(item => parseInt(item.trim()));
                if (maxRamFrequencyList.length > 0) {
                    conditions.push(`m.max_ram_frequency = ANY($${paramIndex}::int[])`);
                    params.push(maxRamFrequencyList);
                    paramIndex++;
                }
            }
            if (xmpSupport) {
                conditions.push(`m.xmp_support = $${paramIndex}`);
                params.push(xmpSupport === 'true');
                paramIndex++;
            }

            if (conditions.length > 0) {
                query += ' WHERE ' + conditions.join(' AND ');
            }
            console.log('Motherboard Query:', query, params);
            const motherboardResult = await pool.query(query, params);
            console.log('Motherboard Result:', motherboardResult.rows.length);
            res.json({ cpus: [], motherboards: motherboardResult.rows });
        } else {
            res.status(400).json({ error: 'Type parameter is required (cpu or motherboard)' });
        }
    } catch (err) {
        console.error('Error filtering components:', err.stack);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

app.get('/api/filter-options', async (req, res) => {
    try {
        const [
            manufacturersCpu,
            manufacturersMotherboard,
            sockets,
            architectures,
            families,
            generations,
            memoryTypes,
            chipsets,
            formFactors,
            cpuNumericRanges,
            motherboardNumericValues
        ] = await Promise.all([
            pool.query('SELECT DISTINCT name FROM manufacturers WHERE id BETWEEN 1 AND 2 ORDER BY name'),
            pool.query('SELECT DISTINCT name FROM manufacturers WHERE id >= 3 ORDER BY name'),
            pool.query('SELECT DISTINCT name FROM sockets ORDER BY name'),
            pool.query('SELECT DISTINCT name FROM cpu_architectures ORDER BY name'),
            pool.query('SELECT DISTINCT name FROM cpu_families ORDER BY name'),
            pool.query('SELECT DISTINCT name FROM cpu_generations ORDER BY name'),
            pool.query('SELECT DISTINCT name FROM memory_types ORDER BY name'),
            pool.query('SELECT DISTINCT name FROM chipsets ORDER BY name'),
            pool.query('SELECT DISTINCT name FROM form_factors ORDER BY name'),
            pool.query(`
                SELECT 
                    MIN(core_count) AS core_count_min, MAX(core_count) AS core_count_max,
                    MIN(thread_count) AS thread_count_min, MAX(thread_count) AS thread_count_max,
                    MIN(cache_l3) AS cache_l3_min, MAX(cache_l3) AS cache_l3_max,
                    MIN(memory_max_gb) AS memory_max_gb_min, MAX(memory_max_gb) AS memory_max_gb_max,
                    MIN(process_nm) AS process_nm_min, MAX(process_nm) AS process_nm_max,
                    MIN(tdp_watts) AS tdp_min, MAX(tdp_watts) AS tdp_max
                FROM cpus
            `),
            pool.query(`
                SELECT DISTINCT ram_slots, ram_channels, max_ram_capacity, min_ram_frequency, max_ram_frequency
                FROM motherboards
                ORDER BY ram_slots, ram_channels, max_ram_capacity, min_ram_frequency, max_ram_frequency
            `)
        ]);

        const options = {
            manufacturers: {
                cpu: manufacturersCpu.rows.map(row => row.name),
                motherboard: manufacturersMotherboard.rows.map(row => row.name)
            },
            sockets: sockets.rows.map(row => row.name),
            architectures: architectures.rows.map(row => row.name),
            families: families.rows.map(row => row.name),
            generations: generations.rows.map(row => row.name),
            memoryTypes: memoryTypes.rows.map(row => row.name),
            chipsets: chipsets.rows.map(row => row.name),
            formFactors: formFactors.rows.map(row => row.name),
            ranges: {
                coreCount: {
                    min: cpuNumericRanges.rows[0].core_count_min,
                    max: cpuNumericRanges.rows[0].core_count_max
                },
                threadCount: {
                    min: cpuNumericRanges.rows[0].thread_count_min,
                    max: cpuNumericRanges.rows[0].thread_count_max
                },
                cacheL3: {
                    min: cpuNumericRanges.rows[0].cache_l3_min,
                    max: cpuNumericRanges.rows[0].cache_l3_max
                },
                memoryMaxGb: {
                    min: cpuNumericRanges.rows[0].memory_max_gb_min,
                    max: cpuNumericRanges.rows[0].memory_max_gb_max
                },
                processNm: {
                    min: cpuNumericRanges.rows[0].process_nm_min,
                    max: cpuNumericRanges.rows[0].process_nm_max
                },
                tdp: {
                    min: cpuNumericRanges.rows[0].tdp_min,
                    max: cpuNumericRanges.rows[0].tdp_max
                },
                ramSlots: motherboardNumericValues.rows.map(row => row.ram_slots),
                ramChannels: motherboardNumericValues.rows.map(row => row.ram_channels),
                maxRamCapacity: motherboardNumericValues.rows.map(row => row.max_ram_capacity),
                minRamFrequency: motherboardNumericValues.rows.map(row => row.min_ram_frequency),
                maxRamFrequency: motherboardNumericValues.rows.map(row => row.max_ram_frequency)
            }
        };

        res.json(options);
    } catch (err) {
        console.error('Error fetching filter options:', err.stack);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

app.listen(5001, () => {
    console.log('Server is running on port 5001');
});