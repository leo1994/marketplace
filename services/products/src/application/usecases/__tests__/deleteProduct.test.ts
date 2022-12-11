import { DeleteProduct } from '@application/usecases'
import { SchemaErrorMessages } from '@application/validators/productSchema'
import { ValidationError } from '@marketplace/core'
import StoreDBRepositoryMock from '../__mocks__/productDBRepositoryMock'

const mockStoreRepository = new StoreDBRepositoryMock()

describe('DeleteProduct', () => {
  it('should delete a product', async () => {
    const deleteProduct = new DeleteProduct(mockStoreRepository)
    const isSuccessed = await deleteProduct.execute('1')
    expect(isSuccessed).toBe(true)
  })

  it('should return error when product does not exist', async () => {
    const deleteProduct = new DeleteProduct(mockStoreRepository)
    const isSuccessed = await deleteProduct.execute('abc')
    expect(isSuccessed).toBe(false)
  })

  it('should return error when id is not provided', async () => {
    const deleteProduct = new DeleteProduct(mockStoreRepository)
    try {
      await deleteProduct.execute('')
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.id).toBe(SchemaErrorMessages.idRequired)
    }
  })
})
