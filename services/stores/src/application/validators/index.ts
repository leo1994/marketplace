import Joi, { ValidationErrorItem } from 'joi'
import { StoreRequest } from '@application/usecases/createStore'
import StoreSchema from './storeSchema'
import { ValidationErrorType } from '@application/exceptions/ValidationError'

const JoiValidator = (payload: any, schema: Joi.ObjectSchema) => {
  const { error } = schema.validate(payload, { abortEarly: false })
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

const StoreValidator = (storeRequest: StoreRequest): ValidationErrorType | false => JoiValidator(storeRequest, StoreSchema)

export {
  StoreValidator
}
