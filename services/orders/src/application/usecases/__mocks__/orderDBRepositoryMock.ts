import OrderDBRepository from '@application/repositories/orderDBRepository'
import Order from '@domain/order'

const orders = Array.from({ length: 10 }, (_, i) => ({
  id: `${i}`,
  status: 'CreatingOrder'
}))

export default class OrderDBRepositoryMock implements OrderDBRepository {
  async create (order: Omit<Order, 'id'>): Promise<Order> {
    orders.push({ ...order, id: `${orders.length + 1}` })
    return { ...order, id: `${orders.length + 1}` }
  }
}
