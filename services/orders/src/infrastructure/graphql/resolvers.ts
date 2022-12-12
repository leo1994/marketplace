import { CreateOrder } from '@application/usecases'
import OrderDBRepositoryMongoDB from '@infrastructure/database/mongo/orderDBRepositoryMongoDB'
import { Resolvers } from '@infrastructure/generate'

const orderRepository = new OrderDBRepositoryMongoDB()

const createOrder = new CreateOrder(orderRepository)

export const resolvers: Resolvers = {
  Mutation: {
    createOrder: async () => {
      const order = await createOrder.execute()
      return order
    }
  }
}
