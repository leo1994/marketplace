
import { CreateOrderRequest } from '@application/usecases/createOrder'
import { JoiValidator } from '@marketplace/core'
import { CreateOrderSchema } from './orderSchema'

const CreateOrderValidator = (createOrderRequest: CreateOrderRequest) => JoiValidator(createOrderRequest, CreateOrderSchema)

export {
  CreateOrderValidator
}
