import { CreateProduct, DeleteProduct, FindProductById, FindProductsByStoreId, UpdateProduct } from '@application/usecases'
import ProductDBRepositoryMongoDB from '@infrastructure/database/mongo/productDBRepositoryMongoDB'
import { Resolvers } from '@infrastructure/generate'

const productRepository = new ProductDBRepositoryMongoDB()

const createProduct = new CreateProduct(productRepository)
const findProductsByStoreId = new FindProductsByStoreId(productRepository)
const findProductById = new FindProductById(productRepository)
const updateProduct = new UpdateProduct(productRepository)
const deleteProduct = new DeleteProduct(productRepository)

export const resolvers: Resolvers = {
  Query: {
    products: async (_: any, { storeId }: { storeId: string }) => findProductsByStoreId.execute(storeId),
    product: async (_: any, { id }: { id: string }) => findProductById.execute(id)
  },
  Store: {
    products: async (store: any) => findProductsByStoreId.execute(store.id)
  },
  Product: {
    store: async (product: any) => ({
      __typename: 'Store',
      id: product.storeId
    })
  },
  Mutation: {
    createProduct: async (_: any, { name, price, storeId }: { name: string, price: number, storeId: string }) => {
      const product = await createProduct.execute({ name, price, storeId })
      return product
    },
    updateProduct: async (_: any, { id, name, price }: { id: string, name?: string | null, price?: number | null }) => {
      const product = await updateProduct.execute({ id, name, price })
      return product
    },
    deleteProduct: async (_: any, { id }: { id: string }) => {
      const isSuccessed = await deleteProduct.execute(id)
      return isSuccessed
    }
  }
}
