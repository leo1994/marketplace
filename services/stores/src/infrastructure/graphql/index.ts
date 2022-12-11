
import fs from 'fs'
import gql from 'graphql-tag'
import { resolve } from 'path'

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { buildSubgraphSchema } from '@apollo/subgraph'
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'

import { resolvers } from './resolvers'
import MongoHelper from '@infrastructure/database/mongo'

const graphqlFile = fs.readFileSync(resolve(__dirname, 'schema.graphql'), { encoding: 'utf-8' })

const typeDefs = gql(graphqlFile)

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers: resolvers as any }),
  plugins: [
    // Install a landing page plugin based on NODE_ENV
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageLocalDefault()
  ]
})

const main = async () => {
  const mongoUri = process.env.MONGO_URL || 'mongodb://mongo:27017'
  await MongoHelper.connect(mongoUri)
  const { url } = await startStandaloneServer(server)

  console.log(`🚀  Server ready at: ${url}`)
}

process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
  throw reason
})

process.on('uncaughtException', () => {
  process.exit(1)
})

process.on('exit', function (code) {
  MongoHelper.disconnect()
  return console.log(`Process to exit with code ${code}`)
})

main()
