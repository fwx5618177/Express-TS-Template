import { Router } from 'express'
import { Routes } from '@interfaces/routes.interface'
import GraphqlController from '@/controllers/graphql.controller'

class GrapglRoute implements Routes {
    public path = '/graphql'
    public router: Router = Router()
    public graphqlController: GraphqlController = new GraphqlController()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, this.graphqlController.graphqlProcess)
        this.router.post(`${this.path}/mock`, this.graphqlController.graphqlProcessMock)
    }
}

export default GrapglRoute
