/**
 * 路由接口
 */

import { Router } from 'express'

export interface Routes {
    path?: string
    router: Router
}

export const ClassCount: any[] = []

export class BaseI {
    constructor() {
        if (this.constructor !== BaseI) {
            ClassCount.push(this)
        }
    }
}
