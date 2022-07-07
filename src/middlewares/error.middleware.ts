/**
 * 错误中间件
 */

import { HttpException } from '@/exceptions/HttpException'
import { logger } from '@/utils/loggers'
import { NextFunction, Request, Response } from 'express'

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    try {
        const status: number = error.status || 500
        const message = error.message || 'Something went wrong'

        logger.error(`[${req.method}] ${req.path} >> StatusCode: ${status}, Message: ${message}`)
        res.status(status).json({ message })
    } catch (err) {
        next(err)
    }
}

export default errorMiddleware
