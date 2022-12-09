
import { NotFoundError, ValidationError } from '@application/exceptions/'
import StoreDBRepository from '@application/repositories/storeDBRepository'
import { UpdateStoreValidator } from '@application/validators'
import Store from '@domain/store'

export type UpdateStoreRequest = {
  id: string;
  name?: string;
  fee?: number;
}

export default class UpdateStore {
  constructor (private readonly storeRepository: StoreDBRepository) { }

  async execute ({ id, name, fee }: UpdateStoreRequest): Promise<Store> {
    const error = UpdateStoreValidator({ id, name, fee })
    if (error) {
      throw new ValidationError(error)
    }
    const store = await this.storeRepository.findById(id)

    if (!store) {
      throw new NotFoundError(`Store with id ${id} not found`)
    }

    if (name) {
      store.name = name
    }

    if (fee) {
      store.fee = fee
    }

    await this.storeRepository.update(store)

    return store
  }
}
