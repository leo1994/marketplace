import OrderDBRepository from '@application/repositories/orderDBRepository'
import Order from '@domain/order'
import OrderStatus from '@domain/orderStatus'

export default class CreateOrder {
  constructor (private readonly orderRepository: OrderDBRepository) { }

  async execute (): Promise<Order> {
    const order = this.orderRepository.create({
      status: OrderStatus.CreatingOrder
    })
    return order
  }
}
