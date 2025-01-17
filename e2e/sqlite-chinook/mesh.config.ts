import { defineConfig } from '@bouygues-telecom/graphql-compose-cli';
import { loadSQLiteSubgraph } from '@omnigraph/sqlite';

export const composeConfig = defineConfig({
  subgraphs: [
    {
      sourceHandler: loadSQLiteSubgraph('chinook', {
        db: 'chinook.db',
      }),
    },
  ],
});
