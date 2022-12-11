import StoreDBRepositoryMock from '../__mocks__/storeDBRepositoryMock'
import { GetAllStores } from '@application/usecases'

const mockStoreRepository = new StoreDBRepositoryMock()

describe('GetAllStores', () => {
  it('should get all stores', async () => {
    const getAllStores = new GetAllStores(mockStoreRepository)
    const stores = await getAllStores.execute()
    expect(stores.length).toBe(3)
    expect(stores[0].name).toBe('Store 1')
    expect(stores[0].fee).toBeDefined()
  })
})
