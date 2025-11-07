const { pool } = require('../config/basedatos');

// Obtener todos los videojuegos
const obtenertodoslosvideojuegos = async (req, res) => {
    try {
        const consulta = 'SELECT * FROM juegos ORDER BY id ASC';
        const [rows] = await pool.query(consulta);

        res.json({
            exito: true,
            mensaje: 'Videojuegos obtenidos correctamente',
            datos: rows,
            total: rows.length
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            exito: false,
            mensaje: 'Error al obtener los videojuegos',
            error: error.message
        });
    }
};

// Obtener videojuego por ID
const obtenervideojuegosporid = async (req, res) => {
    try {
        const { id } = req.params;
        const consulta = 'SELECT * FROM juegos WHERE id = ?';
        const [rows] = await pool.query(consulta, [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                exito: false,
                mensaje: 'Videojuego no encontrado'
            });
        }

        res.json({
            exito: true,
            mensaje: 'Videojuego obtenido correctamente',
            datos: rows[0]
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            exito: false,
            mensaje: 'Error al obtener el videojuego',
            error: error.message
        });
    }
};

// Crear videojuego
const crearvideojuego = async (req, res) => {
    try {
        const { nombre, genero, plataforma, precio, fecha_lanzamiento, desarrollador, descripcion } = req.body;

        if (!nombre || !genero || !plataforma || !precio) {
            return res.status(400).json({
                exito: false,
                mensaje: 'Los campos nombre, genero, plataforma y precio son obligatorios'
            });
        }

        const consulta = `
            INSERT INTO juegos (nombre, genero, plataforma, precio, fecha_lanzamiento, desarrollador, descripcion)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const valores = [nombre, genero, plataforma, precio, fecha_lanzamiento, desarrollador, descripcion];
        const [resultado] = await pool.query(consulta, valores);

        // Obtenemos el videojuego recién insertado
        const [nuevo] = await pool.query('SELECT * FROM juegos WHERE id = ?', [resultado.insertId]);

        res.status(201).json({
            exito: true,
            mensaje: 'Videojuego creado correctamente',
            datos: nuevo[0]
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            exito: false,
            mensaje: 'Error al crear el videojuego',
            error: error.message
        });
    }
};

// Actualizar videojuego
const ActualizarVideojuego = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, genero, plataforma, precio, fecha_lanzamiento, desarrollador, descripcion } = req.body;

        if (!nombre || !genero || !plataforma || !precio) {
            return res.status(400).json({
                exito: false,
                mensaje: 'Los campos nombre, genero, plataforma y precio son obligatorios'
            });
        }

        const consulta = `
            UPDATE juegos
            SET nombre = ?, genero = ?, plataforma = ?, precio = ?, fecha_lanzamiento = ?, desarrollador = ?, descripcion = ?
            WHERE id = ?
        `;

        const valores = [nombre, genero, plataforma, precio, fecha_lanzamiento, desarrollador, descripcion, id];
        const [resultado] = await pool.query(consulta, valores);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                exito: false,
                mensaje: 'Videojuego no encontrado'
            });
        }

        const [actualizado] = await pool.query('SELECT * FROM juegos WHERE id = ?', [id]);

        res.json({
            exito: true,
            mensaje: 'Videojuego actualizado correctamente',
            datos: actualizado[0]
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            exito: false,
            mensaje: 'Error al actualizar el videojuego',
            error: error.message
        });
    }
};

// Eliminar videojuego
const EliminarVideojuego = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM juegos WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                exito: false,
                mensaje: 'Videojuego no encontrado'
            });
        }

        await pool.query('DELETE FROM juegos WHERE id = ?', [id]);

        res.json({
            exito: true,
            mensaje: 'Videojuego eliminado correctamente',
            datos: rows[0]
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            exito: false,
            mensaje: 'Error al eliminar el videojuego',
            error: error.message
        });
    }
};

module.exports = {
    obtenertodoslosvideojuegos,
    obtenervideojuegosporid,
    crearvideojuego,
    ActualizarVideojuego,
    EliminarVideojuego
};
