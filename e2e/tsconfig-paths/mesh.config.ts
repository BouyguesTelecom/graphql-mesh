// @ts-expect-error
import { schema } from '@e2e/tsconfig-paths/schema';
import { defineConfig } from '@bouygues-telecom/graphql-compose-cli';

export const composeConfig = defineConfig({
  subgraphs: [
    {
      sourceHandler: () => ({
        name: 'helloworld',
        schema$: schema,
      }),
    },
  ],
});
