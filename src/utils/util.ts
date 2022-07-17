import fs from 'fs'
import path from 'path'

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description designed for checking empty of value
 */
export const isEmpty = (value: string | number | Object): boolean => {
    if (value === null) {
        return true
    } else if (typeof value !== 'number' && value === '') {
        return true
    } else if (typeof value === 'undefined' || value === undefined) {
        return true
    } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
        return true
    } else {
        return false
    }
}

/**
 * @method loadGraphqlFileSync
 * @param pattern
 * @param options
 * @description load graphql from graphqls/* files
 */
export const loadGraphqlFileSync = (pattern: string): string => {
    const result = fs.readFileSync(path.join(__dirname, pattern as string), { encoding: 'utf8' })

    return result
}
