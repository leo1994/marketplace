export default class BaseError extends Error {
  public readonly isOperational: boolean

  constructor (message: string, isOperational: boolean) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)

    this.isOperational = isOperational

    Error.captureStackTrace(this)
  }
}
