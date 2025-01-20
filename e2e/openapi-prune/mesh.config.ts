import {
  createPruneTransform,
  defineConfig as defineComposeConfig,
} from '@bouygues-telecom/graphql-compose-cli';
import { loadOpenAPISubgraph } from '@bouygues-telecom/graphql-openapi-omnigraph';
import { Opts } from '@e2e/opts';
import { defineConfig as defineGatewayConfig } from '@graphql-hive/gateway';

const opts = Opts(process.argv);

export const composeConfig = defineComposeConfig({
  subgraphs: [
    {
      sourceHandler: loadOpenAPISubgraph('Wiki', {
        source: './openapi.json',
        endpoint: 'http://localhost:' + opts.getServicePort('Wiki'),
      }),
      transforms: [createPruneTransform()],
    },
  ],
});
export const gatewayConfig = defineGatewayConfig({});
