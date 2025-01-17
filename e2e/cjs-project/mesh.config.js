const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const { defineConfig } = require('@bouygues-telecom/graphql-compose-cli');

const composeConfig = defineConfig({
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

module.exports = { composeConfig };
