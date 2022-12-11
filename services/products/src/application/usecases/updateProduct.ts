
import { NotFoundError, ValidationError } from '@marketplace/core'
import ProductDBRepository from '@application/repositories/productDBRepository'
import { UpdateProductValidator } from '@application/validators'
import Product from '@domain/product'

export type UpdateProductRequest = {
  id: string;
  name?: string | null;
  price?: number | null;
}

export default class UpdateProduct {
  constructor (private readonly productRepository: ProductDBRepository) { }

  async execute ({ id, name, price }: UpdateProductRequest): Promise<Product> {
    const error = UpdateProductValidator({ id, name, price })
    if (error) {
      throw new ValidationError(error)
    }
    const product = await this.productRepository.findById(id)

    if (!product) {
      throw new NotFoundError(`Product with id ${id} not found`)
    }

    if (name) {
      product.name = name
    }

    if (price) {
      product.price = price
    }

    await this.productRepository.update(product)

    return product
  }
}
