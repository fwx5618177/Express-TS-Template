#!/usr/bin/env node

/**
 * Module dependencies.
 */

import { app } from './app'
import debug from 'debug'
import * as http from 'http'
import { AddressInfo } from 'net'

interface ErrnoException extends Error {
    errno?: number
    code?: string
    path?: string
    syscall?: string
    stack?: string
}

const debugLog = debug('backend:server')

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
        // named pipe
        return val
    }

    if (port >= 0) {
        // port number
        return port
    }

    return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: ErrnoException) {
    if (error.syscall !== 'listen') {
        throw error
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr: string | AddressInfo = server.address() as AddressInfo
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    debugLog('Listening on ' + bind)

    debugLog('Href: ' + `http://localhost:${port}`)
}
