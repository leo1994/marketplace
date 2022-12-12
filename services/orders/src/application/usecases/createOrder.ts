import OrderDBRepository from '@application/repositories/orderDBRepository'
import { CreateOrderValidator } from '@application/validators'
import Order from '@domain/order'
import OrderStatus from '@domain/orderStatus'
import { ValidationError } from '@marketplace/core'

export type CreateOrderRequest = {
  productList: string[]
}
export default class CreateOrder {
  constructor (private readonly orderRepository: OrderDBRepository) { }

  async execute ({ productList }: CreateOrderRequest): Promise<Order> {
    const error = CreateOrderValidator({ productList })
    if (error) {
      throw new ValidationError(error)
    }
    const order = this.orderRepository.create({
      productList,
      status: OrderStatus.CreatingOrder
    })
    return order
  }
}
