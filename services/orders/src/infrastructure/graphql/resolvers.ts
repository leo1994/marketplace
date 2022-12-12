import { CreateOrder, GetOrderById } from '@application/usecases'
import OrderDBRepositoryMongoDB from '@infrastructure/database/mongo/orderDBRepositoryMongoDB'
import { Resolvers } from '@infrastructure/generate'

const orderRepository = new OrderDBRepositoryMongoDB()

const createOrder = new CreateOrder(orderRepository)
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
