import { CreatePostBlog, Post } from '@/dtos/graphql.dto'
import { mock_createPost, mock_deletePost, mock_getPostById, mock_listPosts, mock_updatePost } from '@/mocks/graphql.mocks'
import GraphqlService from '@/services/graphql.service'
import { loadGraphqlFileSync } from '@/utils/util'
import { NextFunction, Request, Response } from 'express'
import { graphql, buildSchema } from 'graphql'

class GraphqlController {
    private graphqlService: GraphqlService = new GraphqlService()

    /**
     *
     * @param req
     * @param res
     * @param next
     * @description connect db and query data
     */
    public graphqlProcess = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const source = req.body.query

            const graphqlSchema = loadGraphqlFileSync('../graphqls/schema.graphql')

            const schema = buildSchema(graphqlSchema)

            // resolver
            const root = {
                listPosts: async (): Promise<Post[]> => await this.graphqlService.listPosts(),
                getPostById: async (postId: string): Promise<Post> => await this.graphqlService.getPostById(postId),
                createPost: async (args: { post: CreatePostBlog }): Promise<Post> => await this.graphqlService.createPost(args.post),
                deletePost: async (postId: string): Promise<Post> => await this.graphqlService.deletePost(postId),
                updatePost: async (args: { post: CreatePostBlog }): Promise<Post> => await this.graphqlService.updatePost(args.post),
            }

            const result = await graphql({ schema, source, rootValue: root })

            res.header({
                'Content-Type': 'application/json',
            })
                .status(200)
                .send(result)
        } catch (err) {
            console.log(err)

            next(err)
        }
    }

    /**
     *
     * @param req
     * @param res
     * @param next
     * @description return mock data from mocks.* file
     */
    public graphqlProcessMock = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const source = req.body.query

            const graphqlSchema = loadGraphqlFileSync('../graphqls/schema.graphql')

            const schema = buildSchema(graphqlSchema)

            // resolver
            const root = {
                listPosts: mock_listPosts,
                getPostById: mock_getPostById,
                createPost: mock_createPost,
                deletePost: mock_deletePost,
                updatePost: mock_updatePost,
            }

            const result = await graphql({ schema, source, rootValue: root })

            res.header({
                'Content-Type': 'application/json',
            })
                .status(200)
                .send(result)
        } catch (err) {
            console.log(err)

            next(err)
        }
    }
}

export default GraphqlController
