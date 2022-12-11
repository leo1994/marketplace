import { NotFoundError } from '@marketplace/core'
import StoreDBRepository from '@application/repositories/storeDBRepository'
import Store from '@domain/store'

export default class FindStoreById {
  constructor (private readonly storeRepository: StoreDBRepository) {}

  async execute (id: string): Promise<Store> {
    const store = await this.storeRepository.findById(id)

    if (!store) {
      throw new NotFoundError(`Store with id ${id} not found`)
    }

    return store
  }
}
