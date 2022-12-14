import { ValidationError } from '@marketplace/core'
import { CreateStore } from '@application/usecases'
import { SchemaErrorMessages } from '@application/validators/storeSchema'
import StoreDBRepositoryMock from '../__mocks__/storeDBRepositoryMock'

const mockStoreRepository = new StoreDBRepositoryMock()

describe('CreateStore', () => {
  it('should create a store', async () => {
    const createStore = new CreateStore(mockStoreRepository)
    const store = await createStore.execute({ name: 'Store 1', fee: 10 })
    expect(store.name).toBe('Store 1')
    expect(store.fee).toBe(10)
    expect(store.id).toBeDefined()
  })

  it('should create a store with default fee', async () => {
    const createStore = new CreateStore(mockStoreRepository)
    const store = await createStore.execute({ name: 'Store 2' })
    expect(store.name).toBe('Store 2')
    expect(store.fee).toBe(10)
    expect(store.id).toBeDefined()
  })

  it('should return error when name is not provided', async () => {
    const createStore = new CreateStore(mockStoreRepository)
    try {
      await createStore.execute({ name: '' })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.name).toBe(SchemaErrorMessages.nameRequired)
    }
  })

  it('should return error when fee is 0', async () => {
    const createStore = new CreateStore(mockStoreRepository)
    try {
      await createStore.execute({ name: 'Store 3', fee: 0 })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.fee).toBe(SchemaErrorMessages.feeMin)
    }
  })

  it('should return error when fee is negative', async () => {
    const createStore = new CreateStore(mockStoreRepository)
    try {
      await createStore.execute({ name: 'Store 4', fee: -1 })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.fee).toBe(SchemaErrorMessages.feeMin)
    }
  })

  it('should return error when fee is greater than 100', async () => {
    const createStore = new CreateStore(mockStoreRepository)
    try {
      await createStore.execute({ name: 'Store 5', fee: 101 })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.fee).toBe(SchemaErrorMessages.feeMax)
    }
  })

  it('should return error when fee is not a number', async () => {
    const createStore = new CreateStore(mockStoreRepository)
    try {
      await createStore.execute({ name: 'Store 6', fee: NaN })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.fee).toBe(SchemaErrorMessages.feeRequired)
    }
  })

  it('should return error when name is empty and fee 0', async () => {
    const createStore = new CreateStore(mockStoreRepository)
    try {
      await createStore.execute({ name: '', fee: 0 })
    } catch (error: any) {
      expect(error).toBeInstanceOf(ValidationError)
      const errorMessages = JSON.parse(error.message)
      expect(errorMessages.name).toBe(SchemaErrorMessages.nameRequired)
      expect(errorMessages.fee).toBe(SchemaErrorMessages.feeMin)
    }
  })
})
