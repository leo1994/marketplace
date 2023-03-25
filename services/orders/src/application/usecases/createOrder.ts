import OrderDBRepository from '@application/repositories/orderDBRepository'
import { CreateOrderValidator } from '@application/validators'
import Order from '@domain/order'
import OrderStatus from '@domain/orderStatus'
import { ValidationError } from '@marketplace/core'
import Kafka from '@infrastructure/kafka'
import Logger from '@marketplace/logger'

export type CreateOrderRequest = {
  productList: string[]
}
export default class CreateOrder {
  constructor (private readonly orderRepository: OrderDBRepository, private readonly orderQueueRepository: Kafka) { }

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
      await this.orderQueueRepository.send('order', order)

      return order
    } catch (error) {
      Logger.error(error)
      throw error
    }
  }
}
