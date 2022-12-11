import { ValidationError, NotFoundError } from '@application/exceptions/'
import { SchemaErrorMessages } from '@application/validators/storeSchema'
import { UpdateStore } from '@application/usecases/'
import StoreDBRepositoryMock from '../__mocks__/storeDBRepositoryMock'

const mockStoreRepository = new StoreDBRepositoryMock()

describe('UpdateStore', () => {
  it('should update a store', async () => {
    const updateStore = new UpdateStore(mockStoreRepository)
    const store = await updateStore.execute({ id: '1', name: 'Store Updated', fee: 10 })
    expect(store.name).toBe('Store Updated')
    expect(store.fee).toBe(10)
  })

  it('should return error when name is not provided', async () => {
    const updateStore = new UpdateStore(mockStoreRepository)
    try {
      await updateStore.execute({ id: '1', name: '' })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.name).toBe(SchemaErrorMessages.nameRequired)
    }
  })

  it('should return error when fee is 0', async () => {
    const updateStore = new UpdateStore(mockStoreRepository)
    try {
      await updateStore.execute({ id: '3', name: 'Store 3', fee: 0 })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.fee).toBe(SchemaErrorMessages.feeMin)
    }
  })

  it('should return error when fee is negative', async () => {
    const updateStore = new UpdateStore(mockStoreRepository)
    try {
      await updateStore.execute({ id: '1', name: 'Store 4', fee: -1 })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.fee).toBe(SchemaErrorMessages.feeMin)
    }
  })

  it('should return error when fee is greater than 100', async () => {
    const updateStore = new UpdateStore(mockStoreRepository)
    try {
      await updateStore.execute({ id: '1', name: 'Store 5', fee: 101 })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.fee).toBe(SchemaErrorMessages.feeMax)
    }
  })

  it('should return error when id is not provided', async () => {
    const updateStore = new UpdateStore(mockStoreRepository)
    try {
      await updateStore.execute({ id: '', name: 'Store 6' })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.id).toBe(SchemaErrorMessages.idRequired)
    }
  })

  it('should return error when store not found', async () => {
    const updateStore = new UpdateStore(mockStoreRepository)
    try {
      await updateStore.execute({ id: '4', name: 'Store 7' })
    } catch (error: any) {
      expect(error).toBeInstanceOf(NotFoundError)
      expect(error.message).toBe('Store with id 4 not found')
    }
  })
})
