import { CreateStore, FindStoreById, GetAllStores, UpdateStore } from '@application/usecases'
import StoreDBRepositoryMongoDB from '@infrastructure/database/mongo/storeDBRepositoryMongoDB'
import { Resolvers } from '@infrastructure/generate'

const storeRepository = new StoreDBRepositoryMongoDB()

const createStore = new CreateStore(storeRepository)
const updateStore = new UpdateStore(storeRepository)
const findStoreById = new FindStoreById(storeRepository)
const getAllStores = new GetAllStores(storeRepository)

export const resolvers: Resolvers = {
  Query: {
    stores: async () => getAllStores.execute(),
    store: async (_: any, { id }: { id: string }) => {
      const store = await findStoreById.execute(id)
      return store
    }
  },
  Mutation: {
    createStore: async (_: any, { name, fee }: { name: string, fee: number }) => {
      const store = await createStore.execute({ name, fee })
      return store
    },
    updateStore: async (_: any, { id, name, fee }) => {
      const store = await updateStore.execute({ id, name, fee })
      return store
    }
  }
}
