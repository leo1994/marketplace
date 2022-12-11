import ProductDBRepository from '@application/repositories/productDBRepository'

export default class DeleteProductById {
  constructor (private readonly productRepository: ProductDBRepository) {}

  async execute (id: string): Promise<boolean> {
    const isSuccessed = await this.productRepository.delete(id)
    return isSuccessed
  }
}
