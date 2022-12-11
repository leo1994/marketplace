import StoreDBRepository from '@application/repositories/storeDBRepository'
import Store from '@domain/store'

const stores = Array.from({ length: 3 }, (_, i) => i + 1).map((i) => ({
  id: i.toString(),
  name: `Store ${i}`,
  fee: Math.floor(Math.random() * (100 - 1 + 1)) + 1
}))

export default class StoreDBRepositoryMock implements StoreDBRepository {
  async create (store: Omit<Store, 'id'>): Promise<Store> {
    stores.push({ ...store, id: (stores.length + 1).toString() })
    return { ...store, id: (stores.length + 1).toString() }
  }

  async update (store: Store): Promise<Store | null> {
    const index = stores.findIndex((s) => s.id === store.id)
    if (index === -1) {
      return null
    }
    if (store.name) {
      stores[index].name = store.name
    }
    if (store.fee) {
      stores[index].fee = store.fee
    }
    return stores[index]
  }

  async findById (id: string): Promise<Store | null> {
    return stores.find((s) => s.id === id) || null
  }

  async getAll (): Promise<Store[]> {
    return stores
  }
}
