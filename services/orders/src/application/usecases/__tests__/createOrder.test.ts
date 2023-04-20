import { ValidationError } from '@marketplace/core'
import CreateOrder from '../createOrder'
import OrderDBRepositoryMock from '../__mocks__/orderDBRepositoryMock'
import OrderTopicRepositoryMock from '../__mocks__/orderTopicRepositoryMock'

const mockOrderDBRepository = new OrderDBRepositoryMock()
const mockOrderTopicRepository = new OrderTopicRepositoryMock()

describe('CreateOrder', () => {
  it('should create a new order', async () => {
    const createOrder = new CreateOrder(mockOrderDBRepository, mockOrderTopicRepository)
    const productList = ['1', '2', '3']
    const order = await createOrder.execute({ productList })

    expect(order).toHaveProperty('id')
    expect(order).toHaveProperty('status')
    expect(order).toHaveProperty('productList')
    expect(order.productList).toEqual(productList)
    expect(order.status).toBe('CreatingOrder')
  })

  it('should returno an error if product list is empty', async () => {
    const createOrder = new CreateOrder(mockOrderDBRepository, mockOrderTopicRepository)
    const productList: string[] = []
    try {
      await createOrder.execute({ productList })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const message = JSON.parse(error.message)
      expect(message).toHaveProperty('productList')
      expect(message.productList).toBe('Product list is empty')
    }
  })

  it('should returno an error if product list is null', async () => {
    const createOrder = new CreateOrder(mockOrderDBRepository, mockOrderTopicRepository)
    const productList: string[] = ['']
    try {
      await createOrder.execute({ productList })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const message = JSON.parse(error.message)
      expect(message).toHaveProperty('productList')
      expect(message.productList).toBe('Product list is empty')
      expect(message['productList.0']).toBe('Product id is empty')
    }
  })
})
