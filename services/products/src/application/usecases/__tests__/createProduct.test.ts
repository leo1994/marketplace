import { CreateProduct } from '@application/usecases'
import { SchemaErrorMessages } from '@application/validators/productSchema'
import { ValidationError } from '@marketplace/core'
import ProductDBRepositoryMock from '../__mocks__/productDBRepositoryMock'

const mockProductRepository = new ProductDBRepositoryMock()

describe('CreateProduct', () => {
  it('should create a product', async () => {
    const createProduct = new CreateProduct(mockProductRepository)
    const product = await createProduct.execute({ name: 'Product 1', price: 10, storeId: '1' })
    expect(product.name).toBe('Product 1')
    expect(product.price).toBe(10)
    expect(product.id).toBeDefined()
  })

  it('should return error when name is not provided', async () => {
    const createProduct = new CreateProduct(mockProductRepository)
    try {
      await createProduct.execute({ name: '', storeId: '1', price: 10 })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.name).toBe(SchemaErrorMessages.nameRequired)
    }
  })

  it('should return error when price is 0', async () => {
    const createProduct = new CreateProduct(mockProductRepository)
    try {
      await createProduct.execute({ name: 'Product 3', storeId: '1', price: 0 })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.price).toBe(SchemaErrorMessages.priceMin)
    }
  })

  it('should return error when price is negative', async () => {
    const createProduct = new CreateProduct(mockProductRepository)
    try {
      await createProduct.execute({ name: 'Product 4', storeId: '1', price: -1 })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.price).toBe(SchemaErrorMessages.priceMin)
    }
  })

  it('should return error when storeId is not provided', async () => {
    const createProduct = new CreateProduct(mockProductRepository)
    try {
      await createProduct.execute({ name: 'Product 5', price: 10, storeId: '' })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.storeId).toBe(SchemaErrorMessages.idRequired)
    }
  })

  it('should return error when price precision greater then 2', async () => {
    const createProduct = new CreateProduct(mockProductRepository)
    try {
      await createProduct.execute({ name: 'Product 6', storeId: '1', price: 10.123 })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.price).toBe(SchemaErrorMessages.pricePrecision)
    }
  })
})
