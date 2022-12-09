import { MongoClient, Collection } from 'mongodb'

export default class MongoHelper {
  private static client: MongoClient | null = null
  private static uri: string | null = null

  static async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  }

  static async disconnect (): Promise<void> {
    if (!this.client) {
      return
    }
    await this.client.close()
    this.client = null
  }

  static getCollection (name: string): Collection {
    if (!this.client) {
      throw new Error('MongoDB client is not connected')
    }
    return this.client.db().collection(name)
  }

  static map (data: any): any {
    const { _id, ...rest } = data
    return { ...rest, id: _id.toHexString() }
  }

  static mapCollection (collection: any[]): any[] {
    return collection.map(c => MongoHelper.map(c))
  }
}
