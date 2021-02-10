const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//Crear el servidor express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors())


//Directorio publico
//Este 'public' en realidad es el path, pero como estamos en la misma carpeta, solo se coloca eso
app.use(express.static('public'));

//parsear body
app.use(express.json());



//rutas
//Aqui estoy diciendo, todo lo que exporte routes/auth, sera utilizado en api/auth
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//Escuchar peticiones
app.listen(process.env.PORT, ()=>{
    console.log(`Server active in port ${process.env.PORT}`) 
});