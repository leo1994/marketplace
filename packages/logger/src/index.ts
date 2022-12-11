import { createLogger, format, transports } from 'winston'

const Logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: process.env.SERVICE_NAME || 'unknown' },
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  Logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }))
}

export default Logger
