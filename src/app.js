//Configura aplicação

import express from 'express'
import routes from './routes.js'

import './database'

class App { //Criando classe, ajuda a organizar a inicialização do express
    constructor(){
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(express.json())
    }

    routes() {
        this.app.use(routes)
    }
}

export default new App().app