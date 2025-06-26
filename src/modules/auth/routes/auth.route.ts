import AuthController from '../controllers/auth.controller'
import { CreateUserDto } from '../../users/dtos/users.dto'
import { Routes } from '@types'
import authMiddleware from '@/middlewares/auth.middleware'
import validationMiddleware from '@/middlewares/validation.middleware'
import { Router } from 'express'

class AuthRoute implements Routes {
    public path = '/'
    public router: Router = Router()
    public authController = new AuthController()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp)
        this.router.post(`${this.path}login`, validationMiddleware(CreateUserDto, 'body'), this.authController.logIn)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut)
    }
}

export default AuthRoute
