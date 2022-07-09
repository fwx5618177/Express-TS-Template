import { NextFunction, Request, Response } from 'express'
import { User } from '@prisma/client'
import UserService from '@/services/users.service'

class UserController {
    public userService: UserService = new UserService()

    public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllUsers: User[] = await this.userService.findAllUser()
        } catch (err) {
            next(err)
        }
    }
}

export default UserController
