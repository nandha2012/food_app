import { Router } from 'express'
import ProductController from './controller'

class ProductRoutes {
    private productController = new ProductController()
    router: Router
    constructor() {
        this.router = Router()
        this.init()
    }
    init() {
        this.router.post('/', this.productController.create)
    }
}

const productRoutes = new ProductRoutes()
productRoutes.init()
export default productRoutes.router
