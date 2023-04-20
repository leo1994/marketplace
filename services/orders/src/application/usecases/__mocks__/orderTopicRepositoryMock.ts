import OrderTopicRepository from '@application/repositories/orderTopicRepository'
import Order from '@domain/order'

export default class OrderTopicRepositoryMock implements OrderTopicRepository {
  public async publishOrderCreated (order: Order): Promise<void> {
    return Promise.resolve()
  }
}
