import Order from '@domain/order'

export default interface OrderTopicRepository {
    publishOrderCreated(order: Order): Promise<void>;

}
