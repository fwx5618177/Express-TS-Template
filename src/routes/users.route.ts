import UserController from '@/controllers/users.controller'
import { Routes } from '@/interfaces/routes.interface'
import { Router } from 'express'

class UserRoute implements Routes {
    public path = '/users'
    public router: Router = Router()
    public usersController: UserController = new UserController()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.usersController.getUsers)
    }
}

export default UserRoute
