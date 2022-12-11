import ProductDBRepository from '@application/repositories/productDBRepository'
import Product from '@domain/product'

export default class FindProductById {
  constructor (private readonly productRepository: ProductDBRepository) {}

  async execute (storeId: string): Promise<Product[]> {
    const products = await this.productRepository.findAllByStoreId(storeId)
    return products
  }
}
