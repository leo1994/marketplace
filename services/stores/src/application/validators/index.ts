import { CreateStoreRequest } from '@application/usecases/createStore'
import { CreateStoreSchema, UpdateStoreSchema } from './storeSchema'
import { JoiValidator } from '@marketplace/core'
import { UpdateStoreRequest } from '@application/usecases/updateStore'

const CreateStoreValidator = (storeRequest: CreateStoreRequest) => JoiValidator(storeRequest, CreateStoreSchema)
const UpdateStoreValidator = (storeRequest: UpdateStoreRequest) => JoiValidator(storeRequest, UpdateStoreSchema)

export {
  CreateStoreValidator,
  UpdateStoreValidator
}
