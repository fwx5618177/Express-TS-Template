/**
 * 路由接口
 */

import { Router } from 'express'

export interface Routes {
    path?: string
    router: Router
}
