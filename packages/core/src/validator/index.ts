import { ObjectSchema, ValidationErrorItem } from 'joi'
import { ValidationErrorType } from '../exceptions/ValidationError'

export default (payload: any, schema: ObjectSchema): ValidationErrorType | false => {
  const { error } = schema.validate(payload, { abortEarly: false, convert: false })
  if (error) {
    return error.details.reduce(
      (prev, errorItem: ValidationErrorItem) => ({
        ...prev,
        [errorItem.path.join('.')]: errorItem.message
      }), {} as ValidationErrorType
    )
  }
  return false
}
