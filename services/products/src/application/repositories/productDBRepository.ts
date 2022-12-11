import Product from '@domain/product'

export default interface ProductDBRepository {
  create: (product: Omit<Product, 'id'>) => Promise<Product>
  update: (product: Product) => Promise<Product | null>
  delete: (id: string) => Promise<boolean>
  findById: (id: string) => Promise<Product | null>
  findAllByStoreId: (storeId: string) => Promise<Product[]>
}
