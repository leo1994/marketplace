import ValidationError from '@application/exceptions/ValidationError'
import { StoreValidator } from '@application/validators'

export type StoreRequest = {
  name: string;
  fee?: number;
}

export class CreateStore {
  async execute ({ name, fee }: StoreRequest): Promise<any> {
    const error = StoreValidator({ name, fee })
    if (error) {
      throw new ValidationError(error)
    }
    if (!fee) {
      fee = 10
    }
    return { name, fee }
  }
}
