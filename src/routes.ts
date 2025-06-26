/**
 * 整合router
 */

import { Routes } from '@types'
import { UserRoute } from '@/modules/users'
import { AuthRoute } from '@/modules/auth'
import { GraphqlRoute } from '@/modules/graphql'

const RouteLists: {
    [key: string]: Routes
} = {
    users: new UserRoute(),
    auth: new AuthRoute(),
    graphql: new GraphqlRoute(),
}

export default RouteLists
