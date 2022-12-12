import { UpdateProduct } from '@application/usecases'
import { SchemaErrorMessages } from '@application/validators/productSchema'
import { NotFoundError, ValidationError } from '@marketplace/core'
import ProductDBRepositoryMock from '../__mocks__/productDBRepositoryMock'

const mockProductRepository = new ProductDBRepositoryMock()

describe('UpdateProduct', () => {
  it('should update a product', async () => {
    const updateProduct = new UpdateProduct(mockProductRepository)
    const product = await updateProduct.execute({
      id: '1',
      name: 'Product Updated',
      price: 10.99
    })
    expect(product).toHaveProperty('id')
    expect(product).toHaveProperty('name')
    expect(product).toHaveProperty('price')
    expect(product.id).toBe('1')
    expect(product.name).toBe('Product Updated')
    expect(product.price).toBe(10.99)
    expect(product).toHaveProperty('storeId')
  })

  it('should return error when product does not exist', async () => {
    const updateProduct = new UpdateProduct(mockProductRepository)
    try {
      await updateProduct.execute({
        id: 'abc',
        name: 'Product 1',
        price: 10.99
      })
    } catch (error: any) {
      expect(error).toBeInstanceOf(NotFoundError)
      expect(error.message).toBe('Product with id abc not found')
    }
  })

  it('should return error when id is not provided', async () => {
    const updateProduct = new UpdateProduct(mockProductRepository)
    try {
      await updateProduct.execute({
        id: '',
        name: 'Product 1',
        price: 10.99
      })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.id).toBe(SchemaErrorMessages.idRequired)
    }
  })

  it('should return error when name is not provided', async () => {
    const updateProduct = new UpdateProduct(mockProductRepository)
    try {
      await updateProduct.execute({
        id: '1',
        name: '',
        price: 10.99
      })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.name).toBe(SchemaErrorMessages.nameRequired)
    }
  })

  it('should return error when price is not provided', async () => {
    const updateProduct = new UpdateProduct(mockProductRepository)
    try {
      await updateProduct.execute({
        id: '1',
        name: 'Product 1',
        price: 0
      })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.price).toBe(SchemaErrorMessages.priceRequired)
    }
  })

  it('should return error when price is not a number', async () => {
    const updateProduct = new UpdateProduct(mockProductRepository)
    try {
      await updateProduct.execute({
        id: '1',
        name: 'Product 1',
        price: NaN
      })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.price).toBe(SchemaErrorMessages.priceRequired)
    }
  })

  it('should return error when price is less than 0', async () => {
    const updateProduct = new UpdateProduct(mockProductRepository)
    try {
      await updateProduct.execute({
        id: '1',
        name: 'Product 1',
        price: -1
      })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.price).toBe(SchemaErrorMessages.priceMin)
    }
  })
})
