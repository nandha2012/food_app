import express from 'express'
import app from './config/app'
import { ENV } from './config/config.json'
app.listen(
    ENV.NODE_ENV === 'development' ? ENV.PORT_DEV : ENV.PORT_PROD,
    () => {
        console.log(
            `server is running ${
                ENV.NODE_ENV === 'development' ? ENV.PORT_DEV : ENV.PORT_PROD
            }`
        )
    }
)
