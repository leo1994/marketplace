import StoreDBRepository from '@application/repositories/storeDBRepository'
import Store from '@domain/store'
import { MongoClient } from '@marketplace/core'
import { ObjectId } from 'mongodb'

export default class StoreDBRepositoryMongoDB implements StoreDBRepository {
  private COLLECTION_NAME = 'stores'

  async create (store: Omit<Store, 'id'>): Promise<Store> {
    const document = await MongoClient.getCollection(this.COLLECTION_NAME).insertOne(store)
    return MongoClient.map({ ...store, _id: document.insertedId })
  }

  async update (store: Store): Promise<Store | null> {
    const document = await MongoClient.getCollection(this.COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(store.id) },
      {
        $set: {
          name: store.name,
          fee: store.fee
        }
      }
    )
    if (!document.value) {
      return null
    }
    return MongoClient.map({ ...store, _id: document.value._id })
  }

  async getAll (): Promise<Store[]> {
    const documents = await MongoClient.getCollection(this.COLLECTION_NAME).find().toArray()
    return documents.map(document => MongoClient.map(document))
  }

  async findById (id: string): Promise<Store | null> {
    const document = await MongoClient.getCollection(this.COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
    if (!document) {
      return null
    }
    return MongoClient.map(document)
  }
}
