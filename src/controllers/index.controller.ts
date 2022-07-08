import { NextFunction, Request, Response } from 'express'

class IndexController {
    public index = (req: Request, res: Response, next: NextFunction): void => {
        try {
            res.sendStatus(200)
        } catch (err) {
            next(err)
        }
    }
}

export default IndexController
