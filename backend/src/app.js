const express = require('express')
const cors = require('cors')
const app = express()

//configuracion
app.set('port', process.env.PORT || 4000)

//middlewares
app.use(cors()) 
    //permite hacer consultas al backend desde el frontend
app.use(express.json()) 
    //hace que el get y el post usen json

//rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a mi api rest full')
})

//ruta para la api de usuarios
app.use('/api/users', require('./routes/usuario'))

module.exports = app