
import fs from 'fs'
import { resolve } from 'path'

import { resolvers } from './resolvers'
import { MongoClient, Graphql } from '@marketplace/core'
import Logger from '@marketplace/logger'

const graphqlFile = fs.readFileSync(resolve(__dirname, 'schema.graphql'), { encoding: 'utf-8' })

// TODO: Move this to a config file
const mongoUri = process.env.MONGO_URL || 'mongodb://localhost:27017'

const main = async () => {
  Logger.info('Starting stores service')
  await MongoClient.connect(mongoUri)
  await Graphql.init(graphqlFile, resolvers)
}

main()
