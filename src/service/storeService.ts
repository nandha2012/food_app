import { returnStatus } from '../config/config.json'
import { IStore, StoreModel } from '../models/stores'
import logger from '../utils/logger'

export default class StoreService {
    public async add(data: IStore) {
        try {
            const result = await StoreModel.create(data)
            if (result) {
                return { status: returnStatus.success, data: result }
            } else {
                return { status: returnStatus.failure, data: result }
            }
        } catch (err: any) {
            logger.error(`StoreService-add : ${err.stack}`)
            throw err
        }
    }
}
