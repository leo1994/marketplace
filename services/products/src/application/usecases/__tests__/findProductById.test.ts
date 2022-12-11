import { FindProductById } from '@application/usecases'
import { NotFoundError } from '@marketplace/core'
import StoreDBRepositoryMock from '../__mocks__/productDBRepositoryMock'

const mockStoreRepository = new StoreDBRepositoryMock()

describe('FindProductById', () => {
  it('should find a product by id', async () => {
    const findProductById = new FindProductById(mockStoreRepository)
    const product = await findProductById.execute('1')
    expect(product).toHaveProperty('id')
    expect(product).toHaveProperty('name')
    expect(product).toHaveProperty('price')
    expect(product.id).toBe('1')
    expect(product.name).toBe('Product 1')
    expect(product).toHaveProperty('storeId')
  })

  it('should return error when product does not exist', async () => {
    const findProductById = new FindProductById(mockStoreRepository)
    try {
      await findProductById.execute('abc')
    } catch (error: any) {
      expect(error).toBeInstanceOf(NotFoundError)
      expect(error.message).toBe('Product with id abc not found')
    }
  })
})
