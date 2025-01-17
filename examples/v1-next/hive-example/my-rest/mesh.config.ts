import { defineConfig as defineComposeConfig } from '@bouygues-telecom/graphql-compose-cli';
import { loadOpenAPISubgraph } from '@omnigraph/openapi';

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
