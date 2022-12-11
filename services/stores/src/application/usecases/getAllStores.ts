import StoreDBRepository from '@application/repositories/storeDBRepository'
import Store from '@domain/store'

export default class GetAllStores {
  constructor (private storeRepository: StoreDBRepository) {}

  async execute (): Promise<Store[]> {
    const stores = await this.storeRepository.getAll()
    return stores
  }
}
