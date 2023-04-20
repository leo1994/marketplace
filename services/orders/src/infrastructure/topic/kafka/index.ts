import OrderTopicRepository from '@application/repositories/orderTopicRepository'
import Order from '@domain/order'
import { KafkaHelper } from '@marketplace/core'

export default class OrderTopicRepositoryKafka implements OrderTopicRepository {
  public async publishOrderCreated (order: Order): Promise<void> {
    return KafkaHelper.send('order-created', order)
  }
}
