
import { CreateProductRequest } from '@application/usecases/createProduct'
import { UpdateProductRequest } from '@application/usecases/updateProduct'
import { JoiValidator } from '@marketplace/core'
import { CreateProductSchema, UpdateProductSchema } from './productSchema'

const CreateProductValidator = (createProductRequest: CreateProductRequest) => JoiValidator(createProductRequest, CreateProductSchema)
const UpdateProductValidator = (updateProductRequest: UpdateProductRequest) => JoiValidator(updateProductRequest, UpdateProductSchema)

export {
  CreateProductValidator,
  UpdateProductValidator
}
