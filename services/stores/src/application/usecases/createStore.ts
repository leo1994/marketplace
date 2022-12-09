import ValidationError from '@application/exceptions/ValidationError'
import StoreDBRepository from '@application/repositories/storeDBRepository'
import { StoreValidator } from '@application/validators'

export type StoreRequest = {
  name: string;
  fee?: number;
}

export class CreateStore {
  constructor (private readonly storeRepository: StoreDBRepository) {}

  async execute ({ name, fee }: StoreRequest): Promise<any> {
    const error = StoreValidator({ name, fee })
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
