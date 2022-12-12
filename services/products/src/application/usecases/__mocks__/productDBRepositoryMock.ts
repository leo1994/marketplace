import ProductDBRepository from '@application/repositories/productDBRepository'
import Product from '@domain/product'

const products = Array.from({ length: 50 }, (_, i) => i + 1).map((i) => ({
  id: i.toString(),
  name: `Product ${i}`,
  price: Math.floor(Math.random() * 1000) / 100,
  storeId: Math.floor(Math.random() * 10).toString()
}))

export default class ProductDBRepositoryMock implements ProductDBRepository {
  async create (product: Omit<Product, 'id'>): Promise<Product> {
    products.push({ ...product, id: (products.length + 1).toString() })
    return { ...product, id: (products.length).toString() }
  }

  async update (product: Product): Promise<Product | null> {
    const index = products.findIndex((p) => p.id === product.id)
    if (index === -1) {
      return null
    }
    if (product.name) {
      products[index].name = product.name
    }
    if (product.price) {
      products[index].price = product.price
    }
    if (product.storeId) {
      products[index].storeId = product.storeId
    }
    return products[index]
  }

  async findById (id: string): Promise<Product | null> {
    return products.find((p) => p.id === id) || null
  }

  async findAllByStoreId (storeId: string): Promise<Product[]> {
    return products.filter((p) => p.storeId === storeId)
  }

  async delete (id: string): Promise<boolean> {
    const index = products.findIndex((p) => p.id === id)
    if (index === -1) {
      return false
    }
    products.splice(index, 1)
    return true
  }
}
