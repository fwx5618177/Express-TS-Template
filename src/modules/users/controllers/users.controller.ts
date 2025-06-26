import { NextFunction, Request, Response } from 'express'
import { User } from '@prisma/client'
import UserService from '../services/users.service'
import { CreateUserDto } from '../dtos/users.dto'

class UserController {
    public userService: UserService = new UserService()

    public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const findAllUsersData: User[] = await this.userService.findAllUser()

            res.status(200).json({
                data: findAllUsersData,
                message: 'Users retrieved successfully',
                success: true,
            })
        } catch (err) {
            next(err)
        }
    }

    public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = Number(req.params.id)
            const findOneUserData: User = await this.userService.findUserById(userId)

            res.status(200).json({
                data: findOneUserData,
                message: 'User retrieved successfully',
                success: true,
            })
        } catch (err) {
            next(err)
        }
    }

    public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userData: CreateUserDto = req.body
            const createUserData: User = await this.userService.createUser(userData)

            res.status(201).json({
                data: createUserData,
                message: 'User created successfully',
                success: true,
            })
        } catch (err) {
            next(err)
        }
    }

    public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = Number(req.params.id)
            const userData: CreateUserDto = req.body
            const updateUserData: User = await this.userService.updateUser(userId, userData)

            res.status(200).json({
                data: updateUserData,
                message: 'User updated successfully',
                success: true,
            })
        } catch (err) {
            next(err)
        }
    }

    public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = Number(req.params.id)
            const deleteUserData: User = await this.userService.deleteUser(userId)

            res.status(200).json({
                data: deleteUserData,
                message: 'User deleted successfully',
                success: true,
            })
        } catch (err) {
            next(err)
        }
    }
}

export default UserController
