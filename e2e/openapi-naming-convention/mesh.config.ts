import {
  createNamingConventionTransform,
  defineConfig as defineComposeConfig,
  upperCase,
} from '@bouygues-telecom/graphql-compose-cli';
import { loadOpenAPISubgraph } from '@bouygues-telecom/graphql-openapi-omnigraph';
import { defineConfig as defineGatewayConfig } from '@graphql-hive/gateway';

export const composeConfig = defineComposeConfig({
  subgraphs: [
    {
      sourceHandler: loadOpenAPISubgraph('Wiki', {
        source: './openapi.json',
        endpoint: 'https://api.chucknorris.io',
      }),
      transforms: [
        createNamingConventionTransform({
          enumValues: upperCase,
        }),
      ],
    },
  ],
});

export const gatewayConfig = defineGatewayConfig({});
