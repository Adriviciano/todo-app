const mongoose = require('mongoose')

//conexion a la base de datos
const URI = process.env.MONGODB_URI || 'mongodb://localhost/todoDB'

mongoose.connect(URI)
const connection = mongoose.connection

connection.once('open', () => {
    console.log('Database connected: ', URI);

    connection.collection('usuarios').createIndex({ nickname: 1 }, { unique: true });
})
