import { ObjectId } from 'mongoose'
import { returnStatus } from '../config/config.json'
import { IOffer, IOfferProcducts, OfferModel } from '../models/offers'
import logger from '../utils/logger'

export default class OfferService {
    public async add(data: IOffer) {
        try {
            const result = await OfferModel.create(data)
            if (result) {
                return { status: returnStatus.success, data: result }
            } else {
                return { status: returnStatus.failure, data: result }
            }
        } catch (err: any) {
            logger.error(`offerService-add : ${err.stack}`)
            throw err
        }
    }

    public async get(match = {}) {
        try {
            const result = await OfferModel.find(match)
            if (result) {
                return { status: returnStatus.success, data: result }
            } else {
                return { status: returnStatus.failure, data: result }
            }
        } catch (err: any) {
            logger.error(`offerService-get : ${err.stack}`)
            throw err
        }
    }

    public async getById(id: any) {
        try {
            const result = await OfferModel.find(id)

            if (result) {
                return { status: returnStatus.success, data: result }
            } else {
                return {
                    status: returnStatus.failure,
                    data: result,
                    message: 'Offer not found',
                }
            }
        } catch (err: any) {
            logger.error(`offerService-getById : ${err.stack}`)
            throw err
        }
    }

    public async update(data: IOffer) {
        try {
            const updates = Object.keys(data)
            const allowedUpdates = [
                'storeName',
                'products',
                'type',
                'dayOfWeek',
                'startDate',
                'endDate',
            ]
            const isValidOperation = updates.every((update) =>
                allowedUpdates.includes(update)
            )
            if (!isValidOperation) {
                return {
                    status: returnStatus.failure,
                    data: [],
                    message: 'Invalid updates',
                }
            }
            const result = await OfferModel.findByIdAndUpdate(data.id, data, {
                new: true,
                runValidators: true,
            })

            if (result) {
                return { status: returnStatus.success, data: result }
            } else {
                return { status: returnStatus.failure, data: result }
            }
        } catch (err: any) {
            logger.error(`offerService-update : ${err.stack}`)
            throw err
        }
    }

    public async delete(data: IOffer) {
        try {
            const result = await OfferModel.findByIdAndDelete(data.id)

            if (result) {
                return { status: returnStatus.success, data: result }
            } else {
                return { status: returnStatus.failure, data: result }
            }
        } catch (err: any) {
            logger.error(`offerService-delete : ${err.stack}`)
            throw err
        }
    }
}
