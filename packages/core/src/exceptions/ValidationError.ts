import BaseError from './BaseError'

export type ValidationErrorType = {
  [key: string]: string
};

export default class ValidationError extends BaseError {
  constructor (message: ValidationErrorType) {
    const jsonMessage = JSON.stringify(message)
    super('ValidationError', jsonMessage, true)
  }
}
