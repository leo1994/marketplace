import { NotFoundError } from '@marketplace/core'
import CreateOrder from '../createOrder'
import GetOrderById from '../getOrderById'
import OrderDBRepositoryMock from '../__mocks__/orderDBRepositoryMock'

const mockOrderRepository = new OrderDBRepositoryMock()

describe('GetOrderById', () => {
  it('should get a order by id', async () => {
    const getOrderById = new GetOrderById(mockOrderRepository)

    const order = await getOrderById.execute('1')

    expect(order).toHaveProperty('id')
    expect(order).toHaveProperty('status')
  })

  it('should create a new order and get it by id', async () => {
    const createOrder = new CreateOrder(mockOrderRepository)

    const order = await createOrder.execute()

    const getOrderById = new GetOrderById(mockOrderRepository)

    const orderById = await getOrderById.execute(order.id)

    expect(orderById).toHaveProperty('id')
    expect(orderById).toHaveProperty('status')
    expect(orderById.id).toBe(order.id)
    expect(orderById.status).toBe(order.status)
  })

  it('should throw an error if order not found', async () => {
    const getOrderById = new GetOrderById(mockOrderRepository)
    try {
      await getOrderById.execute('NotExistOrderId')
    } catch (error: any) {
      expect(error).toBeInstanceOf(NotFoundError)
      expect(error.message).toBe('Order with id NotExistOrderId not found')
    }
  })
})
