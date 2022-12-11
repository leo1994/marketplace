export default class BaseError extends Error {
  public readonly isOperational: boolean

  constructor (name: string, message: string, isOperational: boolean) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)

    this.name = name

    this.isOperational = isOperational
    Error.captureStackTrace(this)
  }
}
