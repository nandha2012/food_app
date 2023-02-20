import { Errback, Request, Response } from 'express'
import { DateTime } from 'luxon'
import { ENV, returnStatus, statusCode } from '../../config/config.json'
import { IOffer } from '../../models/offers'
import OfferService from '../../service/offerService'
import { useObjectID } from '../../utils/hooks'
import logger from '../../utils/logger'

export default class OffersController {
    public async create(req: Request, res: Response) {
        try {
            const data = req.body
            const offerService: OfferService = new OfferService()
            const result = await offerService.add(data)
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
            logger.error(`error-OffersController-create : ${err.stack}`)

            res.status(statusCode.internalServerError).json({
                message: err.stack,
            })
        }
    }
    public async get(req: Request, res: Response) {
        try {
            const { type, dayOfWeek, startDate, endDate }: any = req.query.type

            const filters: any = {}
            if (type) {
                filters.type = type
            }
            if (dayOfWeek) {
                filters.dayOfWeek = dayOfWeek
            }
            if (startDate && endDate) {
                filters.startDate = { $lte: new Date(endDate) }
                filters.endDate = { $gte: new Date(startDate) }
            }

            const offerService: OfferService = new OfferService()
            const result = await offerService.get(filters)
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
            logger.error(`error-OffersController-create : ${err.stack}`)

            res.status(statusCode.internalServerError).json({
                message: err.stack,
            })
        }
    }
    public async getById(req: Request, res: Response) {
        try {
            const id = req.params.id

            const offerService: OfferService = new OfferService()
            if (useObjectID(id)) {
                const result = await offerService.getById(useObjectID(id))
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
            }
            return res.status(statusCode.badRequest).json({
                data: [],
                message: 'invalid Id',
            })
        } catch (err: any) {
            logger.error(`error-OffersController-create : ${err.stack}`)

            res.status(statusCode.internalServerError).json({
                message: err.stack,
            })
        }
    }
    public async edit(req: Request, res: Response) {
        try {
            const data = req.body
            const offerService: OfferService = new OfferService()
            const result = await offerService.update(data)
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
            logger.error(`error-OffersController-create : ${err.stack}`)

            res.status(statusCode.internalServerError).json({
                message: err.stack,
            })
        }
    }
    public async delete(req: Request, res: Response) {
        try {
            const data = req.body
            const offerService: OfferService = new OfferService()
            const result = await offerService.delete(data)
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
            logger.error(`error-OffersController-create : ${err.stack}`)

            res.status(statusCode.internalServerError).json({
                message: err.stack,
            })
        }
    }
}
