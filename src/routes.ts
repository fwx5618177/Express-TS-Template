/**
 * 整合router
 */

import { Routes } from '@interfaces/routes.interface'
import IndexRoute from '@routes/index.route'
import UserRoute from '@routes/users.route'

const RouteLists: {
    [key: string]: Routes
} = {
    index: new IndexRoute(),
    users: new UserRoute(),
}

export default RouteLists
