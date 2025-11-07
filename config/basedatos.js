const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const probarConexion = async () => {
    try {
        const conexion = await pool.getConnection(); 
        console.log('Conexión exitosa a la base de datos');
        console.log(`Base de datos: ${process.env.DB_NAME}`);
        conexion.release();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message)
    }
};

module.exports = {pool, probarConexion};
