import GraphqlService from '@/services/graphql.service'
import { NextFunction, Request, Response } from 'express'
import { RequestInfo } from 'express-graphql'
import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'

class GraphqlController {
    private graphqlService: GraphqlService = new GraphqlService()

    public graphqlProcess = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // extension: add time
            const extensions = ({ document, variables, operationName, result, context }: RequestInfo) => {
                return {
                    runTime:
                        Date.now() -
                        (
                            context as {
                                [key: string]: any
                            }
                        )?.startTime,
                }
            }

            const schema = new GraphQLSchema({
                query: new GraphQLObjectType({
                    name: 'RootQueryType',
                    fields: {
                        hello: {
                            type: GraphQLString,
                            resolve() {
                                return 'world'
                            },
                        },
                    },
                }),
            })

            // Root resolver
            const root = {
                hello: () => 'Hello world!',
            }

            const source = '{ hello }'

            // const re = await graphql({ schema, source })
            let a
            graphql({ schema, source, rootValue: root }).then(response => {
                console.log(response)

                a = response
            })

            res.header({
                'Content-Type': 'application/json',
            })
                .status(200)
                .send(a)
        } catch (err) {
            console.log(err)

            next(err)
        }
    }
}

export default GraphqlController
