// Test find store by id

import { NotFoundError } from '@application/exceptions'
import StoreDBRepositoryMock from '../__mocks__/storeDBRepositoryMock'
import FindStoreById from '@application/usecases/findStoreById'

const mockStoreRepository = new StoreDBRepositoryMock()

describe('FindStoreById', () => {
  it('should find a store by id', async () => {
    const findStoreById = new FindStoreById(mockStoreRepository)
    const store = await findStoreById.execute('1')
    expect(store.name).toBe('Store 1')
    expect(store.fee).toBeDefined()
  })

  it('should return error when store not found', async () => {
    const findStoreById = new FindStoreById(mockStoreRepository)
    try {
      await findStoreById.execute('4')
    } catch (error: any) {
      expect(error).toBeInstanceOf(NotFoundError)
      expect(error.message).toBe('Store with id 4 not found')
    }
  })
})
