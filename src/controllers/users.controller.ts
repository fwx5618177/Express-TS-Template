import { NextFunction, Request, Response } from 'express'

class UserController {
    // public userService: UserService

    public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const a = 1
        } catch (err) {
            next(err)
        }
    }
}

export default UserController
