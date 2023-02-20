import { Router } from 'express'
import OffersController from './controller'

class OfferRoutes {
    private offersController = new OffersController()
    router: Router
    constructor() {
        this.router = Router()
        this.init()
    }
    init() {
        this.router.post('/', this.offersController.create)
        this.router.get('/', this.offersController.get)
        this.router.get('/:id', this.offersController.getById)
        this.router.patch('/:id', this.offersController.edit)
        this.router.delete('/:id', this.offersController.delete)
    }
}

const offerRoutes = new OfferRoutes()
offerRoutes.init()
export default offerRoutes.router
