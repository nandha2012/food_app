import { Router } from 'express'
import StoreController from './controller'

class StoreRoutes {
    private storeController = new StoreController()
    router: Router
    constructor() {
        this.router = Router()
        this.init()
    }
    init() {
        this.router.post('/', this.storeController.create)
    }
}

const storeRoutes = new StoreRoutes()
storeRoutes.init()
export default storeRoutes.router
