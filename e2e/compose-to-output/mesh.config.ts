import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { defineConfig } from '@bouygues-telecom/graphql-compose-cli';

export const composeConfig = defineConfig({
  subgraphs: [
    {
      sourceHandler: () => ({
        name: 'helloworld',
        schema$: new GraphQLSchema({
          query: new GraphQLObjectType({
            name: 'Query',
            fields: {
              hello: {
                type: GraphQLString,
                resolve: () => 'world',
              },
            },
          }),
        }),
      }),
    },
  ],
});
