import { CreateOrder, GetOrderById } from '@application/usecases'
import OrderDBRepositoryMongoDB from '@infrastructure/database/mongo/orderDBRepositoryMongoDB'
import { Resolvers } from '@infrastructure/generate'
import Kafka from '@infrastructure/kafka'

const orderRepository = new OrderDBRepositoryMongoDB()
const kafka = new Kafka()

const createOrder = new CreateOrder(orderRepository, kafka)
const getOrderById = new GetOrderById(orderRepository)

export const resolvers: Resolvers = {
  Query: {
    order: async (_, { id }: { id: string }) => {
      const order = await getOrderById.execute(id)
      return order
    }
  },
  Mutation: {
    createOrder: async (_, { productList }: { productList: string[]}) => {
      const order = await createOrder.execute({ productList })
      return order
    }
  }
}
