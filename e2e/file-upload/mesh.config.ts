import { Opts } from '@e2e/opts';
import { defineConfig, loadGraphQLHTTPSubgraph } from '@bouygues-telecom/graphql-compose-cli';

const opts = Opts(process.argv);

export const composeConfig = defineConfig({
  subgraphs: [
    {
      sourceHandler: loadGraphQLHTTPSubgraph('bucket', {
        endpoint: `http://localhost:${opts.getServicePort('bucket')}/graphql`,
      }),
    },
  ],
});
