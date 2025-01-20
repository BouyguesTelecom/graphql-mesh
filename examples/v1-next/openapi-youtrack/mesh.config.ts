import { defineConfig } from '@bouygues-telecom/graphql-compose-cli';
import { loadOpenAPISubgraph } from '@bouygues-telecom/graphql-openapi-omnigraph';

export const composeConfig = defineConfig({
  subgraphs: [
    {
      sourceHandler: loadOpenAPISubgraph('YouTrack', {
        source: '{env.YOUTRACK_SERVICE_URL}/api/openapi.json',
        endpoint: '{env.YOUTRACK_SERVICE_URL}/api',
        jsonApi: true,
        operationHeaders: {
          Authorization: 'Bearer {env.YOUTRACK_TOKEN}',
        },
      }),
    },
  ],
});
