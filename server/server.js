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
        manufacturers,
        sockets,
        coreCountMin,
        coreCountMax,
        threadCountMin,
        threadCountMax,
        frequencyMin,
        frequencyMax,
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
        ramSlotsMin,
        ramSlotsMax,
        ramChannelsMin,
        ramChannelsMax,
        maxRamCapacityMin,
        maxRamCapacityMax,
        minRamFrequencyMin,
        minRamFrequencyMax,
        maxRamFrequencyMin,
        maxRamFrequencyMax,
        xmpSupport
    } = req.query;

    try {
        let cpuQuery = `
            SELECT c.id, c.name
            FROM cpus c
            JOIN manufacturers m ON m.id = c.manufacturer_id
            JOIN sockets s ON s.id = c.socket_id
            JOIN cpu_architectures ca ON ca.id = c.architecture_id
            JOIN cpu_families cf ON cf.id = c.family_id
            JOIN cpu_generations cg ON cg.id = c.generation_id
            JOIN memory_types mt ON mt.id = c.memory_type_id
        `;
        let cpuConditions = [];
        let cpuParams = [];
        let cpuParamIndex = 1;

        if (manufacturers) {
            const manufacturerList = manufacturers.split(',').map(item => item.trim());
            cpuConditions.push(`m.name = ANY($${cpuParamIndex}::text[])`);
            cpuParams.push(manufacturerList);
            cpuParamIndex++;
        }
        if (sockets) {
            const socketList = sockets.split(',').map(item => item.trim());
            cpuConditions.push(`s.name = ANY($${cpuParamIndex}::text[])`);
            cpuParams.push(socketList);
            cpuParamIndex++;
        }
        if (coreCountMin) {
            cpuConditions.push(`c.core_count >= $${cpuParamIndex}`);
            cpuParams.push(parseInt(coreCountMin));
            cpuParamIndex++;
        }
        if (coreCountMax) {
            cpuConditions.push(`c.core_count <= $${cpuParamIndex}`);
            cpuParams.push(parseInt(coreCountMax));
            cpuParamIndex++;
        }
        if (threadCountMin) {
            cpuConditions.push(`c.thread_count >= $${cpuParamIndex}`);
            cpuParams.push(parseInt(threadCountMin));
            cpuParamIndex++;
        }
        if (threadCountMax) {
            cpuConditions.push(`c.thread_count <= $${cpuParamIndex}`);
            cpuParams.push(parseInt(threadCountMax));
            cpuParamIndex++;
        }
        if (frequencyMin) {
            cpuConditions.push(`c.base_frequency >= $${cpuParamIndex}`);
            cpuParams.push(parseFloat(frequencyMin));
            cpuParamIndex++;
        }
        if (frequencyMax) {
            cpuConditions.push(`c.max_frequency <= $${cpuParamIndex}`);
            cpuParams.push(parseFloat(frequencyMax));
            cpuParamIndex++;
        }
        if (cacheL3Min) {
            cpuConditions.push(`c.cache_l3 >= $${cpuParamIndex}`);
            cpuParams.push(parseInt(cacheL3Min));
            cpuParamIndex++;
        }
        if (cacheL3Max) {
            cpuConditions.push(`c.cache_l3 <= $${cpuParamIndex}`);
            cpuParams.push(parseInt(cacheL3Max));
            cpuParamIndex++;
        }
        if (architectures) {
            const architectureList = architectures.split(',').map(item => item.trim());
            cpuConditions.push(`ca.name = ANY($${cpuParamIndex}::text[])`);
            cpuParams.push(architectureList);
            cpuParamIndex++;
        }
        if (families) {
            const familyList = families.split(',').map(item => item.trim());
            cpuConditions.push(`cf.name = ANY($${cpuParamIndex}::text[])`);
            cpuParams.push(familyList);
            cpuParamIndex++;
        }
        if (generations) {
            const generationList = generations.split(',').map(item => item.trim());
            cpuConditions.push(`cg.name = ANY($${cpuParamIndex}::text[])`);
            cpuParams.push(generationList);
            cpuParamIndex++;
        }
        if (hasIntegratedGpu) {
            cpuConditions.push(`c.has_integrated_gpu = $${cpuParamIndex}`);
            cpuParams.push(hasIntegratedGpu === 'true');
            cpuParamIndex++;
        }
        if (unlockedMultiplier) {
            cpuConditions.push(`c.unlocked_multiplier = $${cpuParamIndex}`);
            cpuParams.push(unlockedMultiplier === 'true');
            cpuParamIndex++;
        }
        if (memoryTypes) {
            const memoryTypeList = memoryTypes.split(',').map(item => item.trim());
            cpuConditions.push(`mt.name = ANY($${cpuParamIndex}::text[])`);
            cpuParams.push(memoryTypeList);
            cpuParamIndex++;
        }
        if (memoryMaxGbMin) {
            cpuConditions.push(`c.memory_max_gb >= $${cpuParamIndex}`);
            cpuParams.push(parseInt(memoryMaxGbMin));
            cpuParamIndex++;
        }
        if (memoryMaxGbMax) {
            cpuConditions.push(`c.memory_max_gb <= $${cpuParamIndex}`);
            cpuParams.push(parseInt(memoryMaxGbMax));
            cpuParamIndex++;
        }
        if (processNmMin) {
            cpuConditions.push(`c.process_nm >= $${cpuParamIndex}`);
            cpuParams.push(parseInt(processNmMin));
            cpuParamIndex++;
        }
        if (processNmMax) {
            cpuConditions.push(`c.process_nm <= $${cpuParamIndex}`);
            cpuParams.push(parseInt(processNmMax));
            cpuParamIndex++;
        }
        if (tdpMin) {
            cpuConditions.push(`c.tdp_watts >= $${cpuParamIndex}`);
            cpuParams.push(parseInt(tdpMin));
            cpuParamIndex++;
        }
        if (tdpMax) {
            cpuConditions.push(`c.tdp_watts <= $${cpuParamIndex}`);
            cpuParams.push(parseInt(tdpMax));
            cpuParamIndex++;
        }

        if (cpuConditions.length > 0) {
            cpuQuery += ' WHERE ' + cpuConditions.join(' AND ');
        }

        let motherboardQuery = `
            SELECT m.id, m.name
            FROM motherboards m
            JOIN manufacturers mf ON mf.id = m.manufacturer_id
            JOIN sockets s ON s.id = m.socket_id
            JOIN chipsets ch ON ch.id = m.chipset_id
            JOIN form_factors ff ON ff.id = m.form_factor_id
            JOIN memory_types mt ON mt.id = m.memory_type_id
        `;
        let motherboardConditions = [];
        let motherboardParams = [];
        let motherboardParamIndex = 1;

        if (manufacturers) {
            const manufacturerList = manufacturers.split(',').map(item => item.trim());
            motherboardConditions.push(`mf.name = ANY($${motherboardParamIndex}::text[])`);
            motherboardParams.push(manufacturerList);
            motherboardParamIndex++;
        }
        if (sockets) {
            const socketList = sockets.split(',').map(item => item.trim());
            motherboardConditions.push(`s.name = ANY($${motherboardParamIndex}::text[])`);
            motherboardParams.push(socketList);
            motherboardParamIndex++;
        }
        if (chipsets) {
            const chipsetList = chipsets.split(',').map(item => item.trim());
            motherboardConditions.push(`ch.name = ANY($${motherboardParamIndex}::text[])`);
            motherboardParams.push(chipsetList);
            motherboardParamIndex++;
        }
        if (formFactors) {
            const formFactorList = formFactors.split(',').map(item => item.trim());
            motherboardConditions.push(`ff.name = ANY($${motherboardParamIndex}::text[])`);
            motherboardParams.push(formFactorList);
            motherboardParamIndex++;
        }
        if (memoryTypes) {
            const memoryTypeList = memoryTypes.split(',').map(item => item.trim());
            motherboardConditions.push(`mt.name = ANY($${motherboardParamIndex}::text[])`);
            motherboardParams.push(memoryTypeList);
            motherboardParamIndex++;
        }
        if (ramSlotsMin) {
            motherboardConditions.push(`m.ram_slots >= $${motherboardParamIndex}`);
            motherboardParams.push(parseInt(ramSlotsMin));
            motherboardParamIndex++;
        }
        if (ramSlotsMax) {
            motherboardConditions.push(`m.ram_slots <= $${motherboardParamIndex}`);
            motherboardParams.push(parseInt(ramSlotsMax));
            motherboardParamIndex++;
        }
        if (ramChannelsMin) {
            motherboardConditions.push(`m.ram_channels >= $${motherboardParamIndex}`);
            motherboardParams.push(parseInt(ramChannelsMin));
            motherboardParamIndex++;
        }
        if (ramChannelsMax) {
            motherboardConditions.push(`m.ram_channels <= $${motherboardParamIndex}`);
            motherboardParams.push(parseInt(ramChannelsMax));
            motherboardParamIndex++;
        }
        if (maxRamCapacityMin) {
            motherboardConditions.push(`m.max_ram_capacity >= $${motherboardParamIndex}`);
            motherboardParams.push(parseInt(maxRamCapacityMin));
            motherboardParamIndex++;
        }
        if (maxRamCapacityMax) {
            motherboardConditions.push(`m.max_ram_capacity <= $${motherboardParamIndex}`);
            motherboardParams.push(parseInt(maxRamCapacityMax));
            motherboardParamIndex++;
        }
        if (minRamFrequencyMin) {
            motherboardConditions.push(`m.min_ram_frequency >= $${motherboardParamIndex}`);
            motherboardParams.push(parseInt(minRamFrequencyMin));
            motherboardParamIndex++;
        }
        if (minRamFrequencyMax) {
            motherboardConditions.push(`m.min_ram_frequency <= $${motherboardParamIndex}`);
            motherboardParams.push(parseInt(minRamFrequencyMax));
            motherboardParamIndex++;
        }
        if (maxRamFrequencyMin) {
            motherboardConditions.push(`m.max_ram_frequency >= $${motherboardParamIndex}`);
            motherboardParams.push(parseInt(maxRamFrequencyMin));
            motherboardParamIndex++;
        }
        if (maxRamFrequencyMax) {
            motherboardConditions.push(`m.max_ram_frequency <= $${motherboardParamIndex}`);
            motherboardParams.push(parseInt(maxRamFrequencyMax));
            motherboardParamIndex++;
        }
        if (xmpSupport) {
            motherboardConditions.push(`m.xmp_support = $${motherboardParamIndex}`);
            motherboardParams.push(xmpSupport === 'true');
            motherboardParamIndex++;
        }

        if (motherboardConditions.length > 0) {
            motherboardQuery += ' WHERE ' + motherboardConditions.join(' AND ');
        }

        const [cpuResult, motherboardResult] = await Promise.all([
            pool.query(cpuQuery, cpuParams),
            pool.query(motherboardQuery, motherboardParams)
        ]);

        res.json({
            cpus: cpuResult.rows,
            motherboards: motherboardResult.rows
        });
    } catch (err) {
        console.error('Error filtering components:', err.stack);
        res.status(500).json({ error: 'Database error', details: err.message });
    }
});

app.get('/api/filter-options', async (req, res) => {
    try {
        const [
            manufacturers,
            sockets,
            architectures,
            families,
            generations,
            memoryTypes,
            chipsets,
            formFactors,
            cpuNumericRanges,
            motherboardNumericRanges
        ] = await Promise.all([
            pool.query('SELECT DISTINCT name FROM manufacturers ORDER BY name'),
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
                    MIN(base_frequency) AS frequency_min, MAX(max_frequency) AS frequency_max,
                    MIN(cache_l3) AS cache_l3_min, MAX(cache_l3) AS cache_l3_max,
                    MIN(memory_max_gb) AS memory_max_gb_min, MAX(memory_max_gb) AS memory_max_gb_max,
                    MIN(process_nm) AS process_nm_min, MAX(process_nm) AS process_nm_max,
                    MIN(tdp_watts) AS tdp_min, MAX(tdp_watts) AS tdp_max
                FROM cpus
            `),
            pool.query(`
                SELECT 
                    MIN(ram_slots) AS ram_slots_min, MAX(ram_slots) AS ram_slots_max,
                    MIN(ram_channels) AS ram_channels_min, MAX(ram_channels) AS ram_channels_max,
                    MIN(max_ram_capacity) AS max_ram_capacity_min, MAX(max_ram_capacity) AS max_ram_capacity_max,
                    MIN(min_ram_frequency) AS min_ram_frequency_min, MAX(min_ram_frequency) AS min_ram_frequency_max,
                    MIN(max_ram_frequency) AS max_ram_frequency_min, MAX(max_ram_frequency) AS max_ram_frequency_max
                FROM motherboards
            `)
        ]);

        const options = {
            manufacturers: manufacturers.rows.map(row => row.name),
            sockets: sockets.rows.map(row => row.name),
            architectures: architectures.rows.map(row => row.name),
            families: families.rows.map(row => row.name),
            generations: generations.rows.map(row => row.name),
            memoryTypes: memoryTypes.rows.map(row => row.name),
            chipsets: chipsets.rows.map(row => row.name),
            formFactors: formFactors.rows.map(row => row.name),
            ranges: {
                coreCount: {
                    min: cpuNumericRanges.rows[0].core_count_min || 1,
                    max: cpuNumericRanges.rows[0].core_count_max || 64
                },
                threadCount: {
                    min: cpuNumericRanges.rows[0].thread_count_min || 1,
                    max: cpuNumericRanges.rows[0].thread_count_max || 128
                },
                frequency: {
                    min: cpuNumericRanges.rows[0].frequency_min || 1,
                    max: cpuNumericRanges.rows[0].frequency_max || 6,
                    step: 0.1
                },
                cacheL3: {
                    min: cpuNumericRanges.rows[0].cache_l3_min || 1,
                    max: cpuNumericRanges.rows[0].cache_l3_max || 128
                },
                memoryMaxGb: {
                    min: cpuNumericRanges.rows[0].memory_max_gb_min || 1,
                    max: cpuNumericRanges.rows[0].memory_max_gb_max || 256
                },
                processNm: {
                    min: cpuNumericRanges.rows[0].process_nm_min || 1,
                    max: cpuNumericRanges.rows[0].process_nm_max || 100
                },
                tdp: {
                    min: cpuNumericRanges.rows[0].tdp_min || 1,
                    max: cpuNumericRanges.rows[0].tdp_max || 200
                },
                ramSlots: {
                    min: motherboardNumericRanges.rows[0].ram_slots_min || 1,
                    max: motherboardNumericRanges.rows[0].ram_slots_max || 8
                },
                ramChannels: {
                    min: motherboardNumericRanges.rows[0].ram_channels_min || 1,
                    max: motherboardNumericRanges.rows[0].ram_channels_max || 4
                },
                maxRamCapacity: {
                    min: motherboardNumericRanges.rows[0].max_ram_capacity_min || 1,
                    max: motherboardNumericRanges.rows[0].max_ram_capacity_max || 256
                },
                minRamFrequency: {
                    min: motherboardNumericRanges.rows[0].min_ram_frequency_min || 1600,
                    max: motherboardNumericRanges.rows[0].min_ram_frequency_max || 6000
                },
                maxRamFrequency: {
                    min: motherboardNumericRanges.rows[0].max_ram_frequency_min || 1600,
                    max: motherboardNumericRanges.rows[0].max_ram_frequency_max || 6000
                }
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