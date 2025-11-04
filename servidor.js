const express = require('express');
const cors = require ('cors');
require('dotenv').config();
const {probarConexion} = require('./config/basedatos');
const {
    obtenertodoslosvideojuegos,
    obtenervideojuegosporid,
    crearvideojuego
} = require('./controller/videojuegoscontrolador');

const app = express();
const puerto = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.send(`<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Videojuegos</title>
    <style>
    html {
            height: 100%;
        }
        body {
            margin : 0;
            background-color: black;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            font-family: Arial, Helvetica, sans-serif;
            text-align: center;
        }
    </style>
</head>
<body>
    <div>   
        <h1>Lista de Videojuegos</h1>
        <p> servidor activo</p>
        </p>
       
    </div>
</body>
</html>`);
});

app.get('/api/videojuegos', obtenertodoslosvideojuegos);
app.get('/api/videojuegos/:id', obtenervideojuegosporid);
app.post('/api/videojuegos', crearvideojuego);

const iniciarServidor = async () => {
    try {
        await probarConexion();

        app.listen(puerto, () => {
            console.log(`Servidor corriendo en http://localhost:${puerto}`);
        });
    }catch (error) {
        console.error('Error al iniciar:', error.message)
    }
};

iniciarServidor();


