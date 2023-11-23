const express = require('express')
require('dotenv').config()
const { dbConnection } = require('./database/config')
const cors = require('cors')

//Crear Express App
const app = express();

//Base de Datos
dbConnection();

//CORS
app.use( cors() )

app.use(express.static('public'))

//Lectura y parseo del body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/userRoutes'))
app.use('/api/property', require('./routes/propertyRoutes'))

//Escuchar en puerto 4000
app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto', process.env.PORT)
})

//HEADERS
const headers = {
    cors: {
        origin:'http://127.0.0.1:5173',
        methods:["GET", "POST"]
    }
}

app.use( cors(headers) )