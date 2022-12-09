import Joi, { ValidationErrorItem } from 'joi'
import { CreateStoreRequest } from '@application/usecases/createStore'
import { CreateStoreSchema, UpdateStoreSchema } from './storeSchema'
import { ValidationErrorType } from '@application/exceptions/ValidationError'
import { UpdateStoreRequest } from '@application/usecases/updateStore'

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

const CreateStoreValidator = (storeRequest: CreateStoreRequest): ValidationErrorType | false => JoiValidator(storeRequest, CreateStoreSchema)
const UpdateStoreValidator = (storeRequest: UpdateStoreRequest): ValidationErrorType | false => JoiValidator(storeRequest, UpdateStoreSchema)

export {
  CreateStoreValidator,
  UpdateStoreValidator
}
