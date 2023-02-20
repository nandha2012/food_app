import { Errback, Request, Response } from 'express'
import { DateTime } from 'luxon'
import { ENV, returnStatus, statusCode } from '../../config/config.json'
import OfferService from '../../service/offerService'
import ProductService from '../../service/productService'
import logger from '../../utils/logger'

export default class ProductController {
    public async create(req: Request, res: Response) {
        try {
            const data = req.body
            const productService: ProductService = new ProductService()
            const result = await productService.add(data)
            if (result.status === returnStatus.success) {
                return res.status(statusCode.success).json({
                    data: result.data,
                    message: 'success',
                })
            }
            return res.status(statusCode.badRequest).json({
                data: [],
                message: 'failed',
            })
        } catch (err: any) {
            logger.error(`error-callMapController-callback : ${err.stack}`)

            res.status(statusCode.internalServerError).json({
                message: err.stack,
            })
        }
    }
}
