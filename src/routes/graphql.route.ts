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
        this.router.get(`${this.path}`, this.graphqlController.graphqlProcess)
        // this.router.get(`${this.path}`, (req, res) => {
        //     res.header({
        //         'Content-Type': 'application/json',
        //     })
        //         .status(200)
        //         .json({
        //             a: 'data',
        //         })
        // })
        // try {
        //     this.router.get(
        //         `${this.path}`,
        //         graphqlHTTP({
        //             schema: this.schema as GraphQLSchema, // Must be provided
        //             rootValue: this.root,
        //             graphiql: true,
        //         }),
        //         (req, res) => {
        //             res.header({
        //                 'Content-Type': 'application/json',
        //             })
        //                 .status(200)
        //                 .json({
        //                     a: 'data',
        //                 })
        //         },
        //     )
        // } catch (err) {
        //     console.log(err)
        // }
    }
}

export default GrapglRoute
