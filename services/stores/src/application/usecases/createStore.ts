import { ValidationError } from '@application/exceptions'
import StoreDBRepository from '@application/repositories/storeDBRepository'
import { CreateStoreValidator } from '@application/validators'
import Store from '@domain/store'

export type CreateStoreRequest = {
  name: string;
  fee?: number;
}

export default class CreateStore {
  constructor (private readonly storeRepository: StoreDBRepository) {}

  async execute ({ name, fee }: CreateStoreRequest): Promise<Store> {
    const error = CreateStoreValidator({ name, fee })
    if (error) {
      throw new ValidationError(error)
    }
    // FIXME: This is must be in the domain layer
    if (!fee) {
      fee = 10
    }
    const store = await this.storeRepository.create({ name, fee })
    return store
  }
}
