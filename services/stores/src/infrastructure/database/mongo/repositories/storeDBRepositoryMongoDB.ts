import StoreDBRepository from '@application/repositories/storeDBRepository'
import Store from '@domain/store'
import MongoHelper from '@infrastructure/database/mongo'
import { ObjectId } from 'mongodb'

export default class StoreDBRepositoryMongoDB implements StoreDBRepository {
  async create (store: Store): Promise<Store> {
    const document = await MongoHelper.getCollection('stores').insertOne(store)
    return MongoHelper.map({ ...store, _id: document.insertedId })
  }

  async update (store: Store): Promise<Store | null> {
    const document = await MongoHelper.getCollection('stores').findOneAndUpdate(
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
    return MongoHelper.map({ ...store, _id: document.value._id })
  }

  async findById (id: string): Promise<Store | null> {
    const document = await MongoHelper.getCollection('stores').findOne({ _id: new ObjectId(id) })
    if (!document) {
      return null
    }
    return MongoHelper.map(document)
  }
}
