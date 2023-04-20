import { CreateOrder, GetOrderById } from '@application/usecases'
import OrderDBRepositoryMongoDB from '@infrastructure/database/mongo/orderDBRepositoryMongoDB'
import { Resolvers } from '@infrastructure/generate'
import OrderTopicRepositoryKafka from '@infrastructure/topic/kafka'

const orderDBRepository = new OrderDBRepositoryMongoDB()
const orderTopicRepository = new OrderTopicRepositoryKafka()

const createOrder = new CreateOrder(orderDBRepository, orderTopicRepository)
const getOrderById = new GetOrderById(orderDBRepository)

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
