import { NotFoundError } from '@marketplace/core'
import ProductDBRepository from '@application/repositories/productDBRepository'
import Product from '@domain/product'

export default class FindProductById {
  constructor (private readonly productRepository: ProductDBRepository) {}

  async execute (id: string): Promise<Product> {
    const product = await this.productRepository.findById(id)

    if (!product) {
      throw new NotFoundError(`Product with id ${id} not found`)
    }

    return product
  }
}
