const express = require('express')
const cors = require('cors');
const { connection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/usuarios'

        // Conectar a base de datos
        this.connectionDB();

        /* Funciones que van a añadir otras funcionalidades a mi Webserver.
        Función que se va a ajecutar siempre que levantemos nuestro servidor */
        this.middlewares();
    
        // Rutas de mi aplicación
        this.routes();
    }

    async connectionDB() {
        await connection()
    }

    middlewares(){
        /* CORS */
        // Nos permite proteger nuestro servidor, relativamente superficial
        // Con ella podemos restringir quién puede hacer peticiones a nuestra API y quién no
        // lo que se conoce como whitelist
        // Esta relacionado con la seguridad de nuestro server
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use(express.json())

        // Directorio público
        this.app.use(express.static('public'))
    }
    
    routes() {
        this.app.use(this.usersPath, require('../routes/users'))
    }


    listen() {
        this.app.listen(this.port, () => console.log(`Corriendo en el puerto ${this.port}`))
    }
}

module.exports = Server