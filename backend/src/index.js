require('dotenv').config()

const app = require('./app')
require('./database')

//esta logica es para ejecutar el servidor
async function main() {
    await app.listen(app.get('port'))
    console.log('listening on port ', app.get('port'))
}

main()