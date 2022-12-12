
import { JoiValidator } from '@marketplace/core'
import { CreateOrderSchema } from './orderSchema'

const CreateOrderValidator = (createOrderRequest: any) => JoiValidator(createOrderRequest, CreateOrderSchema)

export {
  CreateOrderValidator
}
