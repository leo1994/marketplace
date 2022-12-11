import ProductDBRepository from '@application/repositories/productDBRepository'
import Product from '@domain/product'
import { MongoClient } from '@marketplace/core'
import { ObjectId } from 'mongodb'

export default class ProductDBRepositoryMongoDB implements ProductDBRepository {
  private COLLECTION_NAME = 'products'
  async create (product: Omit<Product, 'id'>): Promise<Product> {
    const document = await MongoClient.getCollection(this.COLLECTION_NAME).insertOne({ ...product, storeId: new ObjectId(product.storeId) })
    return MongoClient.map({ ...product, _id: document.insertedId })
  }

  async update (product: Product): Promise<Product | null> {
    const document = await MongoClient.getCollection(this.COLLECTION_NAME).findOneAndUpdate({ _id: new ObjectId(product.id) }, { $set: product })
    return document.value ? MongoClient.map(document.value) : null
  }

  async findById (id: string): Promise<Product | null> {
    const document = await MongoClient.getCollection(this.COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
    return document ? MongoClient.map(document) : null
  }

  async findAllByStoreId (storeId: string): Promise<Product[]> {
    const documents = await MongoClient.getCollection(this.COLLECTION_NAME).find({ storeId: new ObjectId(storeId) }).toArray()
    return documents.map((document) => MongoClient.map(document))
  }

  async delete (id: string): Promise<boolean> {
    const document = await MongoClient.getCollection(this.COLLECTION_NAME).findOneAndDelete({ _id: new ObjectId(id) })
    return !!document.value
  }
}
