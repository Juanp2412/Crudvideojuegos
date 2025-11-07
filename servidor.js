const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { probarConexion } = require('./config/basedatos');
const {
    obtenertodoslosvideojuegos,
    obtenervideojuegosporid,
    crearvideojuego,
    ActualizarVideojuego,
    EliminarVideojuego
} = require('./controller/videojuegoscontrolador');

const app = express();
const puerto = process.env.PORT || 3000;

// 🔧 Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public')); // Sirve el front (index.html, CSS, etc.)

// 🏠 Página principal
app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Servidor Activo</title>
    <style>
        html, body {
            height: 100%;
            margin: 0;
            background-color: #000;
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
        }
        h1 { color: #4caf50; }
    </style>
</head>
<body>
    <h1>🎮 Servidor del CRUD de Videojuegos Activo</h1>
    <p>Backend conectado a MySQL (XAMPP) y listo para peticiones API.</p>
    <a href="/index.html" style="color:#4caf50; text-decoration:none;">👉 Ir al CRUD</a>
</body>
</html>`);
});

// 📡 Rutas API
app.get('/api/videojuegos', obtenertodoslosvideojuegos);
app.get('/api/videojuegos/:id', obtenervideojuegosporid);
app.post('/api/videojuegos', crearvideojuego);
app.put('/api/videojuegos/:id', ActualizarVideojuego);
app.delete('/api/videojuegos/:id', EliminarVideojuego);

// 🚀 Inicialización del servidor
const iniciarServidor = async () => {
    try {
        await probarConexion(); // Verifica la conexión a MySQL
        app.listen(puerto, () => {
            console.log(`✅ Servidor corriendo en: http://localhost:${puerto}`);
            console.log(`📦 Base de datos: ${process.env.DB_NAME}`);
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error.message);
    }
};

iniciarServidor();
