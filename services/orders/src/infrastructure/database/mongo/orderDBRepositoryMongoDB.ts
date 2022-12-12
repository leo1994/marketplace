import OrderDBRepository from '@application/repositories/orderDBRepository'
import Order from '@domain/order'
import { MongoClient } from '@marketplace/core'
import { ObjectId } from 'mongodb'

export default class ProductDBRepositoryMongoDB implements OrderDBRepository {
  private COLLECTION_NAME = 'orders'
  async create (order: Omit<Order, 'id'>): Promise<Order> {
    const document = await MongoClient.getCollection(this.COLLECTION_NAME).insertOne({ ...order })
    return MongoClient.map({ ...order, _id: document.insertedId })
  }

  async getById (id: string): Promise<Order | null> {
    const document = await MongoClient.getCollection(this.COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
    return document ? MongoClient.map(document) : null
  }
}
