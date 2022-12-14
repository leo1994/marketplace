import Order from '@domain/order'

export default interface OrderDBRepository {
  create: (order: Omit<Order, 'id'>) => Promise<Order>
  getById: (id: string) => Promise<Order | null>
}
