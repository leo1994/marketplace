import { ValidationError } from '@marketplace/core'
import ProductDBRepository from '@application/repositories/productDBRepository'
import { CreateProductValidator } from '@application/validators'
import Product from '@domain/product'

export type CreateProductRequest = {
  name: string;
  price: number;
  storeId: string;
}

export default class CreateProduct {
  constructor (private readonly productRepository: ProductDBRepository) {}

  async execute ({ name, price, storeId }: CreateProductRequest): Promise<Product> {
    const error = CreateProductValidator({ name, price, storeId })
    if (error) {
      throw new ValidationError(error)
    }
    const product = await this.productRepository.create({ name, price, storeId })
    return product
  }
}
