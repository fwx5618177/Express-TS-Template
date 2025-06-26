import { ApiResponse, PaginatedResponse, QueryParams } from '@/types'
import { MESSAGES, PAGINATION } from '../constants'

/**
 * 创建标准 API 响应
 */
export function createApiResponse<T>(data: T, message: string = MESSAGES.SUCCESS, success = true): ApiResponse<T> {
    return {
        data,
        message,
        success,
    }
}

/**
 * 创建分页响应
 */
export function createPaginatedResponse<T>(data: T[], total: number, page: number = PAGINATION.DEFAULT_PAGE, limit: number = PAGINATION.DEFAULT_LIMIT, message: string = MESSAGES.SUCCESS): PaginatedResponse<T> {
    return {
        data,
        message,
        success: true,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    }
}

/**
 * 验证分页参数
 */
export function validatePaginationParams(query: QueryParams) {
    const page = Math.max(1, parseInt(String(query.page)) || PAGINATION.DEFAULT_PAGE)
    const limit = Math.min(PAGINATION.MAX_LIMIT, Math.max(1, parseInt(String(query.limit)) || PAGINATION.DEFAULT_LIMIT))

    return { page, limit }
}

/**
 * 生成随机字符串
 */
export function generateRandomString(length = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}

/**
 * 延迟函数
 */
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 安全的 JSON 解析
 */
export function safeJsonParse<T = any>(str: string, defaultValue: T = null as T): T {
    try {
        return JSON.parse(str)
    } catch {
        return defaultValue
    }
}

/**
 * 格式化文件大小
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
