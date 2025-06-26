/**
 *  日志系统
 */
import { LOG_DIR } from '@config'
import path from 'path'
import winston from 'winston'
import chalk from 'chalk'
import winstonDaily from 'winston-daily-rotate-file'
import { existsSync, mkdirSync } from 'fs'

// logs dir - 确保日志文件生成在项目根目录的 logs 文件夹中
const getLogDir = (): string => {
    // 处理 LOG_DIR 环境变量，确保有默认值
    const envLogDir = LOG_DIR && LOG_DIR !== 'undefined' ? String(LOG_DIR) : 'logs'

    // 如果是绝对路径，直接使用
    if (path.isAbsolute(envLogDir)) {
        return envLogDir
    }

    // 如果是相对路径，但包含 '../'，说明配置可能有误，强制使用项目根目录的 logs
    if (envLogDir.includes('../')) {
        console.warn(`⚠️  LOG_DIR 配置可能有误: ${envLogDir}，将使用项目根目录的 logs 文件夹`)
        return path.join(process.cwd(), 'logs')
    }

    // 正常的相对路径，基于项目根目录
    return path.join(process.cwd(), envLogDir)
}

const logDir: string = getLogDir()

// 创建日志目录和子目录
if (!existsSync(logDir)) {
    mkdirSync(logDir, { recursive: true })
}

// 确保子目录存在
const debugDir = path.join(logDir, 'debug')
const errorDir = path.join(logDir, 'error')

if (!existsSync(debugDir)) {
    mkdirSync(debugDir, { recursive: true })
}

if (!existsSync(errorDir)) {
    mkdirSync(errorDir, { recursive: true })
}

// 启动时显示日志目录信息
if (process.env.NODE_ENV === 'development') {
    console.log(`📝 日志文件将保存到: ${logDir}`)
}

// Define log format
const logFormat: winston.Logform.Format = winston.format.printf(({ timestamp, level, message }: winston.Logform.TransformableInfo): string => `${timestamp} [${chalk.red(level)}]: ${message}`)

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    ),
    transports: [
        // debug log setting
        new winstonDaily({
            level: 'debug',
            datePattern: 'YYYY-MM-DD',
            dirname: path.join(logDir, 'debug'), // log file /logs/debug/*.log in save
            filename: `%DATE%.log`,
            maxFiles: 30, // 30 Days saved
            json: false,
            zippedArchive: true,
        }),
        // error log setting
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: path.join(logDir, 'error'), // log file /logs/error/*.log in save
            filename: `%DATE%.log`,
            maxFiles: 30, // 30 Days saved
            handleExceptions: true,
            json: false,
            zippedArchive: true,
        }),
    ],
})

logger.add(
    new winston.transports.Console({
        format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
    }),
)

const stream = {
    write: (message: string) => {
        logger.info(message.substring(0, message.lastIndexOf('\n')))
    },
}

export { logger, stream }
