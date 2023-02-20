import { Errback, Request, Response } from 'express'
import { DateTime } from 'luxon'
import { ENV, returnStatus, statusCode } from '../../config/config.json'
import StoreService from '../../service/storeService'
import logger from '../../utils/logger'

export default class StoreController {
    public async create(req: Request, res: Response) {
        try {
            const data = req.body
            const storeService: StoreService = new StoreService()
            const result = await storeService.add(data)
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
            logger.error(`error-storeController-create : ${err.stack}`)

            res.status(statusCode.internalServerError).json({
                message: err.stack,
            })
        }
    }
}
