import * as fs from 'fs'
import * as path from 'path'
import { ENV } from '../config/config.json'

const test = path.dirname(__filename)
let dir = ENV.LOG_DIR
if (!dir) dir = path.resolve('logs')

// create directory if it is not present
if (!fs.existsSync(dir)) {
    // Create the directory if it does not exist
    fs.mkdirSync(dir)
}

let winston = require('winston')
require('winston-daily-rotate-file')
// create transport which create logger file
let transport = new winston.transports.DailyRotateFile({
    filename: dir + '/%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
})

transport.on('rotate', function (oldFilename: any, newFilename: any) {
    console.log('oldFilename', oldFilename)
    console.log('newFilename', newFilename)
})
//create logger
export default winston.createLogger({
    transports: [transport],
})
