import { Application, Response } from 'express'
import offerRoutes from '../controller/offers/routes'
import productRoutes from '../controller/products/routes'
import storeRoutes from '../controller/stores/routes'

//Routing
export class AppRoutes {
    public offerRoutes(app: Application): void {
        app.use('/api/offer', offerRoutes)
    }
    public productRoutes(app: Application): void {
        app.use('/api/product', productRoutes)
    }
    public storeRoutes(app: Application): void {
        app.use('/api/store', storeRoutes)
    }
}
