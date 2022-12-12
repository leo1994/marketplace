import OrderDBRepository from '@application/repositories/orderDBRepository'
import Order from '@domain/order'
import { NotFoundError } from '@marketplace/core'

export default class GetOrderById {
  constructor (private readonly orderRepository: OrderDBRepository) { }

  async execute (id: string): Promise<Order> {
    const order = await this.orderRepository.getById(id)

    if (!order) {
      throw new NotFoundError(`Order with id ${id} not found`)
    }

    return order
  }
}
