import {
  defineConfig as defineComposeConfig,
  loadGraphQLHTTPSubgraph,
} from '@bouygues-telecom/graphql-compose-cli';
import { loadOpenAPISubgraph } from '@bouygues-telecom/graphql-openapi-omnigraph';
import { Opts } from '@e2e/opts';
import { defineConfig as defineGatewayConfig } from '@graphql-hive/gateway';
import rest from '@graphql-mesh/transport-rest';

const opts = Opts(process.argv);

export const composeConfig = defineComposeConfig({
  subgraphs: [
    {
      sourceHandler: loadOpenAPISubgraph('greetings', {
        source: `http://localhost:${opts.getServicePort('greetings')}/openapi.json`,
        endpoint: `http://localhost:${opts.getServicePort('greetings')}`,
      }),
    },
    {
      sourceHandler: loadGraphQLHTTPSubgraph('helloer', {
        endpoint: `http://localhost:${opts.getServicePort('helloer')}/graphql`,
      }),
    },
  ],
});

export const gatewayConfig = defineGatewayConfig({
  transports: {
    rest,
    http: import('@graphql-mesh/transport-http'),
  },
});
