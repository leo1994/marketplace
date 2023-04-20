import OrderDBRepository from '@application/repositories/orderDBRepository'
import OrderTopicRepository from '@application/repositories/orderTopicRepository'
import { CreateOrderValidator } from '@application/validators'
import Order from '@domain/order'
import OrderStatus from '@domain/orderStatus'
import { ValidationError } from '@marketplace/core'
import Logger from '@marketplace/logger'

export type CreateOrderRequest = {
  productList: string[]
}
export default class CreateOrder {
  constructor (private readonly orderRepository: OrderDBRepository, private readonly orderTopicRepository: OrderTopicRepository) { }

  async execute ({ productList }: CreateOrderRequest): Promise<Order> {
    try {
      const error = CreateOrderValidator({ productList })
      if (error) {
        throw new ValidationError(error)
      }
      const order = await this.orderRepository.create({
        productList,
        status: OrderStatus.CreatingOrder
      })
      await this.orderTopicRepository.publishOrderCreated(order)
      return order
    } catch (error) {
      Logger.error(error)
      throw error
    }
  }
}
