import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import * as path from 'path'
import { ENV } from './config.json'
import { AppRoutes } from '../routes/routes'
var cors = require('cors')

class App {
    public app: express.Application
    public mongourl: string = `${ENV.DB_URI}/${ENV.DB_NAME}`

    private routesprev: AppRoutes = new AppRoutes()
    constructor() {
        this.app = express()
        this.config()
        this.mongosetup()

        this.routesprev.offerRoutes(this.app)
        this.routesprev.productRoutes(this.app)
        this.routesprev.storeRoutes(this.app)
    }

    private config(): void {
        this.app.use(cors())
        this.app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
        this.app.use(bodyParser.json({ limit: '50mb' }))

        this.app.use(express.static(path.join(__dirname, 'public')))
    }

    private mongosetup(): void {
        mongoose
            .connect(this.mongourl)
            .then(() => console.log('db connected'))
            .catch((err: any) => console.log('cannot connect db', err))
    }
}

export default new App().app
