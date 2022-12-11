import gql from 'graphql-tag'
import { startStandaloneServer } from '@apollo/server/standalone'

import { ApolloServer } from '@apollo/server'
import { buildSubgraphSchema } from '@apollo/subgraph'
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'

export default class Graphql {
  private static server: ApolloServer | null = null

  static async init (graphqlFile: string, resolver: any): Promise<{ url: string }> {
    const typeDefs = gql(graphqlFile)
    const port = Number(process.env.APP_PORT) || 4000
    this.server = new ApolloServer({
      schema: buildSubgraphSchema({ typeDefs, resolvers: resolver }),
      plugins: [
        // Install a landing page plugin based on NODE_ENV
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageDisabled()
          : ApolloServerPluginLandingPageLocalDefault()
      ]
    })

    return await startStandaloneServer(this.server, {
      listen: {
        port
      }
    })
  }
}
