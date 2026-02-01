import pino from 'pino'

// Create a logger instance optimized for Vercel
// In production, logs are JSON for structured logging
// In development, use pino-pretty for readable output
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  // Use JSON format in production for Vercel Log Drain compatibility
  ...(process.env.NODE_ENV === 'production'
    ? {
        formatters: {
          level: (label) => ({ level: label }),
        },
        timestamp: pino.stdTimeFunctions.isoTime,
      }
    : {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      }),
})

// Create child loggers for different parts of the application
export const apiLogger = logger.child({ module: 'api' })
export const cartLogger = logger.child({ module: 'cart' })
export const checkoutLogger = logger.child({ module: 'checkout' })

export default logger
