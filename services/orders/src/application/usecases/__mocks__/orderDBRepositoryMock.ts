import OrderDBRepository from '@application/repositories/orderDBRepository'
import Order from '@domain/order'
import OrderStatus from '@domain/orderStatus'

const orders = Array.from({ length: 10 }, (_, i) => ({
  id: `${i}`,
  status: Object.keys(OrderStatus)[Math.floor(Math.random() * Object.keys(OrderStatus).length)] as OrderStatus
}))

export default class OrderDBRepositoryMock implements OrderDBRepository {
  async create (order: Omit<Order, 'id'>): Promise<Order> {
    orders.push({ ...order, id: `${orders.length + 1}` })
    return { ...order, id: `${orders.length}` }
  }

  async getById (id: string): Promise<Order | null> {
    return orders.find((p) => p.id === id) || null
  }
}
