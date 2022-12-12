
import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/infrastructure/graphql/schema.graphql',
  generates: {
    'src/infrastructure/generate/index.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: { federation: true }
    }
  }
}

export default config
