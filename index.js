require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } =  require('./database/config');

// Crear servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use( express.json() );

//Base de Datos
dbConnection();

// Directorio publico
app.use( express.static('public') );

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/cuestionarios', require('./routes/cuestionarios'));
app.use('/api/post', require('./routes/post'));
//app.use('/api/preguntas', require('./routes/preguntas'));
// app.use('/api/respuestas', require('./routes/respuestas'));

//levantar el servidor
app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto: ' + process.env.PORT);
})