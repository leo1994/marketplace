import { BaseError } from '../index'

describe('BaseError', () => {
  it('should return error message', () => {
    const error = new BaseError('Error Name', 'Error Message', true)
    expect(error.message).toBe('Error Message')
    expect(error.name).toBe('Error Name')
    expect(error.isOperational).toBe(true)
  })
})
