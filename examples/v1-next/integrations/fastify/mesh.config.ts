import { defineConfig } from '@bouygues-telecom/graphql-compose-cli';
import { loadOpenAPISubgraph } from '@bouygues-telecom/graphql-openapi-omnigraph';

export const composeConfig = defineConfig({
  subgraphs: [
    {
      sourceHandler: loadOpenAPISubgraph('Pets', {
        source: './swagger/pets.json',
        endpoint: `http://localhost:{context.headers['x-upstream-port']:4001}`,
      }),
    },
  ],
});
