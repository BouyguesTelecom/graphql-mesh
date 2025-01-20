import { defineConfig as defineComposeConfig } from '@bouygues-telecom/graphql-compose-cli';
import { loadOpenAPISubgraph } from '@bouygues-telecom/graphql-openapi-omnigraph';
import { Opts } from '@e2e/opts';
import { defineConfig as defineGatewayConfig } from '@graphql-hive/gateway';

const opts = Opts(process.argv);

export const composeConfig = defineComposeConfig({
  subgraphs: [
    {
      sourceHandler: loadOpenAPISubgraph('OpenAPICallbackExample', {
        source: './services/api/openapi.yml',
        endpoint: `http://localhost:${opts.getServicePort('api')}`,
      }),
    },
  ],
});

export const gatewayConfig = defineGatewayConfig({
  webhooks: true,
});
