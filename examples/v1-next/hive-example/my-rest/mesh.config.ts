import { defineConfig as defineComposeConfig } from '@bouygues-telecom/graphql-compose-cli';
import { loadOpenAPISubgraph } from '@bouygues-telecom/graphql-openapi-omnigraph';

export const composeConfig = defineComposeConfig({
  subgraphs: [
    {
      sourceHandler: loadOpenAPISubgraph('myrest', {
        source: './openapi.json',
        endpoint: 'http://localhost:4002',
      }),
    },
  ],
});
