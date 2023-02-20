import { returnStatus } from '../config/config.json'
import { IProducts, ProductModel } from '../models/products'
import logger from '../utils/logger'

export default class ProductService {
    public async add(data: IProducts) {
        try {
            const result = await ProductModel.create(data)
            if (result) {
                return { status: returnStatus.success, data: result }
            } else {
                return { status: returnStatus.failure, data: result }
            }
        } catch (err: any) {
            logger.error(`ProductService-add : ${err.stack}`)
            throw err
        }
    }
}
