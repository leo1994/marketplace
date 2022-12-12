import CreateOrder from '../createOrder'
import OrderDBRepositoryMock from '../__mocks__/orderDBRepositoryMock'

const mockOrderRepository = new OrderDBRepositoryMock()

describe('CreateOrder', () => {
  it('should create a new order', async () => {
    const createOrder = new CreateOrder(mockOrderRepository)

    const order = await createOrder.execute()

    expect(order).toHaveProperty('id')
    expect(order).toHaveProperty('status')
    expect(order.status).toBe('CreatingOrder')
  })
})
