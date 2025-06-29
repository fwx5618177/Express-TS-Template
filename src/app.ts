import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import hpp from 'hpp'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import chalk from 'chalk'
import { Routes } from '@interfaces/routes.interface'
import { LOG_FORMAT, NODE_ENV, ORIGIN, PORT, CREDENTIALS } from '@config'
import { logger, stream } from '@utils/loggers'
import CorsMiddleware from '@middlewares/cors.middlewares'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import errorMiddleware from '@/middlewares/error.middleware'
import { ApolloServer, gql } from 'apollo-server-express'

class App {
    public app: express.Application
    public env: string
    public port: string | number

    constructor(routes: Routes[]) {
        this.app = express()
        this.env = NODE_ENV || 'development'
        this.port = PORT || 3000

        this.initializeMiddlewares()
        this.initializeRoutes(routes)
        this.initializeSwagger()
        this.initializeErrorHandling()
        this.intialGraphqlApollo()
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`=====================================`)
            logger.info(`======= ENV: ${chalk.red(this.env)} =======`)
            logger.info(`Listening on the port: ${chalk.green(this.port)}`)
            logger.info(`Link: ${chalk.bgGreenBright('http://localhost:' + this.port)}/`)
            logger.info(`=====================================`)
        })
    }

    public getServer(): express.Application {
        return this.app
    }

    private initializeMiddlewares() {
        this.app.use(morgan(LOG_FORMAT as string, { stream }))

        this.app.use(
            cors({
                origin: ORIGIN,
                credentials: CREDENTIALS,
            }),
        )

        this.app.use(CorsMiddleware)

        this.app.use(hpp())
        this.app.use(helmet({ contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false, crossOriginEmbedderPolicy: false }))
        this.app.use(compression())

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(cookieParser())
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/', route.router)
        })
    }

    private initializeSwagger() {
        const options = {
            swaggerDefinition: {
                info: {
                    title: 'REST API',
                    version: '1.0.0',
                    description: 'Example docs',
                },
                host: 'localhost:3000', // the host or url of the app
                basePath: '/api', // the basepath of your endpoint
            },
            explorer: true,
            // apis: ['docs/swagger.yaml'],
            apis: ['**/*.ts'],
        }

        const specs = swaggerJSDoc(options)
        this.app.use('/api', swaggerUi.serve, swaggerUi.setup(specs))
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware)
    }

    private async intialGraphqlApollo() {
        const typeDefs = gql`
            type Query {
                hello: String
            }
        `

        const resolvers = {
            Query: {
                hello: () => 'Hello world!',
            },
        }
        const server = new ApolloServer({ typeDefs, resolvers })
        await server.start()
        server.applyMiddleware({ app: this.app })
    }
}

export default App
