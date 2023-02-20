import * as dotenv from 'dotenv'
import * as _ from 'lodash'
const statusCode = {
    success: 200,
    created: 201,
    empty: 204,
    multiStatus: 207,
    badRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    notFound: 404,
    conflict: 409,
    preconditionFailed: 412,
    internalServerError: 500,
}
const returnStatus = {
    success: 1,
    failure: 0,
    invalid: 2,
}

let ENV: any = {}
try {
    ENV = dotenv.config().parsed
    if (_.isEmpty(ENV)) {
        console.error('~FILE .env NEED TO BE CONFIGURED~')
    }
} catch (err) {
    console.error('~FILE .env NEED TO BE CONFIGURED~')
    process.exit(1)
}

export { ENV, statusCode, returnStatus }
