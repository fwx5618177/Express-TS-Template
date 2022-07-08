/**
 * 路由接口
 */

import { Router } from 'express'

export interface Routes {
    path?: string
    router: Router
}

export const ClassCount: any[] = []

export class baseI {
    constructor() {
        if (this.constructor !== baseI) {
            ClassCount.push(this)
        }
    }
}
