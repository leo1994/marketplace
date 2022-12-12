import { FindProductsByStoreId, CreateProduct } from '@application/usecases'
import ProductDBRepositoryMock from '../__mocks__/productDBRepositoryMock'

const mockProductRepository = new ProductDBRepositoryMock()

describe('FindProductsByStoreId', () => {
  it('should find products by product id', async () => {
    const createProduct = new CreateProduct(mockProductRepository)
    await createProduct.execute({ name: 'Product 1', price: 1.5, storeId: 'abc' })
    await createProduct.execute({ name: 'Product 2', price: 2.5, storeId: 'abc' })
    await createProduct.execute({ name: 'Product 3', price: 3.5, storeId: 'abc' })

    const findProductsByStoreId = new FindProductsByStoreId(mockProductRepository)
    const products = await findProductsByStoreId.execute('abc')
    expect(products).toHaveLength(3)
    expect(products[0]).toHaveProperty('id')
    expect(products[0]).toHaveProperty('name')
    expect(products[0]).toHaveProperty('price')
    expect(products[0]).toHaveProperty('storeId')
    expect(products[0].storeId).toBe('abc')
  })

  it('should return empty array when product does not have products', async () => {
    const findProductsByStoreId = new FindProductsByStoreId(mockProductRepository)
    const products = await findProductsByStoreId.execute('notExistProductId')
    expect(products).toHaveLength(0)
  })
})
