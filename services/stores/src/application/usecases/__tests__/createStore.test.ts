import { CreateStore } from '@application/usecases/createStore'

describe('CreateStore', () => {
  it('should create a store', async () => {
    const createStore = new CreateStore()
    const store = await createStore.execute({ name: 'Store 1', fee: 10 })
    expect(store.name).toBe('Store 1')
    expect(store.fee).toBe(10)
  })
})
