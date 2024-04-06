
import type { CodegenConfig } from 'npm:@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/schema.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        scalars: {
          DateTime: 'Date'
        }
      }
    }
  }
};

export default config;
